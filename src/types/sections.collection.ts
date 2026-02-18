import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { button } from "./pages.collection";

export const ctaSection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    button: button,
  }),
});

export const testimonialSection = defineCollection({
  loader: glob({
    pattern: "testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    ratings: z.object({
      enable: z.boolean(),
      label: z.string(),
      total_reviews: z.string(),
    }),
    testimonials: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        avatar: z.string(),
        content: z.string(),
      }),
    ),
  }),
});

export const faqsSection = defineCollection({
  loader: glob({ pattern: "faqs.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    faqs_list: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
});

export const pricingSection = defineCollection({
  loader: glob({ pattern: "pricing.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    plans: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        description: z.string(),
        features: z.array(z.string()),
        button: button,
      }),
    ),
  }),
});
