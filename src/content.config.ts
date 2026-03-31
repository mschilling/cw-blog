import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.string(),
    author: z.string().optional(),
    heroImage: z.string().optional(),
    alt: z.string().optional(),
    _comments: z.boolean().optional(),
    _published: z.boolean().optional(),
    _categories: z.array(z.string()).optional(),
    _tags: z.array(z.string()).optional(),
    _permalink: z.string().optional(),
  }),
});

export const collections = { posts };
