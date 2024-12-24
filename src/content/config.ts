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

const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
    draft: z.boolean().optional(),
});

const blog = defineCollection({
    loader: glob({ pattern: "**/**.md", base: "src/content/blog" }),
    schema: blogSchema,
});
const project = defineCollection({
    loader: glob({ pattern: "**/**.md", base: "src/content/projects" }),
    schema: projectSchema,
});

export type BlogPost = z.infer<typeof blogSchema>;
export type Project = z.infer<typeof projectSchema>;
export const collections = { blog, project };
