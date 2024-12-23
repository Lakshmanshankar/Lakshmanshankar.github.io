import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    tags: z.string().array().optional(),
});

const blog = defineCollection({
    loader: glob({ pattern: "**/**.md", base: "src/content/blog" }),
    schema: blogSchema,
});

export type BlogPost = z.infer<typeof blogSchema>;
export const collections = { blog };
