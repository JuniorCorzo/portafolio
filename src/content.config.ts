import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const studyCase = defineCollection({
  loader: glob({ base: "./src/content/study-case", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { "study-case": studyCase };
