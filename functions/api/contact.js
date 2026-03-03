export async function onRequestPost(context) {
  const { request, env } = context;

  const contentType = request.headers.get("content-type") || "";
  if (
    !contentType.includes("application/x-www-form-urlencoded") &&
    !contentType.includes("multipart/form-data")
  ) {
    return new Response("Unsupported content type", { status: 415 });
  }

  const form = await request.formData();

  const firstName = (form.get("first-name") || "").toString().trim();
  const lastName = (form.get("last-name") || "").toString().trim();
  const email = (form.get("email") || "").toString().trim();
  const phone = (form.get("phone") || "").toString().trim();
  const message = (form.get("message") || "").toString().trim();

  // Honeypot field (add hidden field named "company" to form)
  const company = (form.get("company") || "").toString().trim();
  if (company) {
    return new Response("OK", { status: 200 }); // silently ignore bots
  }

  // Basic validation
  if (!firstName || !lastName || !email || !message) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response("Invalid email format", { status: 400 });
  }

  const fullName = `${firstName} ${lastName}`;

  const payload = {
    from: env.FROM_EMAIL,
    to: [env.TO_EMAIL],
    reply_to: email,
    subject: `New Website Inquiry from ${fullName}`,
    text: `
New Contact Form Submission

Name: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}
    `,
  };

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      return new Response(`Email failed: ${errorText}`, { status: 502 });
    }

    return new Response("Success", { status: 200 });

  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}