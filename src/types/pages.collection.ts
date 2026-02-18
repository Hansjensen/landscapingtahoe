import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.date().optional(),
  image: z.string().optional(),
  draft: z.boolean(),
};

export const button = z.object({
  enable: z.boolean(),
  label: z.string(),
  link: z.string(),
  icon: z.string().optional(),
});

export const homepage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      satisfied_customers: z.object({
        enable: z.boolean(),
        count: z.string(),
        label: z.string(),
        images: z.array(z.string()),
      }),
      button_solid: button,
      button_outline: button,
    }),
    why_choose_us: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      image: z.string(),
      features: z.array(z.string()),
    }),
    what_we_offer: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      button: button,
    }),
    our_expertise: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      experience: z.object({
        years: z.string(),
        label: z.string(),
      }),
      images: z.array(z.string()),
      skills: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
    blog_section: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const blogpage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    ...commonFields,
    categories: z.array(z.string()).optional(),
    featured: z.boolean().default(false).optional(),
  }),
});

export const aboutpage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    ...commonFields,
    experience: z.object({
      years: z.string(),
      label: z.string(),
    }),

    our_values: z.object({
      enable: z.boolean(),
      image: z.string(),
      values: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        }),
      ),
    }),
    why_choose_us: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      image: z.string(),
      features: z.array(z.string()),
    }),

    our_team: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      members: z.array(
        z.object({
          name: z.string(),
          position: z.string(),
          image: z.string(),
          social: z.array(
            z.object({
              name: z.string(),
              link: z.string(),
              icon: z.string(),
            }),
          ),
        }),
      ),
    }),
  }),
});

export const servicepage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/services" }),
  schema: z.object({
    ...commonFields,
    featured: z.boolean().default(false).optional(),
    icon: z.string().optional(),
    contact_form: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        description: z.string(),
        button_label: z.string(),
      })
      .optional(),
  }),
});

export const appointmentpage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/appointment" }),
  schema: z.object({
    ...commonFields,
  }),
});

export const contactpage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    ...commonFields,
  }),
});

export const regularpage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    ...commonFields,
  }),
});
