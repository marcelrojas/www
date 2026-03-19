import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const weblog = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: './src/content/weblog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
  }),
});

const showcase = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: './src/content/showcase' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
  }),
});

export const collections = { weblog, showcase };
