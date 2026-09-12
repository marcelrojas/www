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
    category: z.string().optional(),
    lang: z.enum(['en', 'es']).default('en'),
    editions: z.array(z.object({
      lang: z.string(),
      title: z.string(),
      url: z.string(),
      translatedBy: z.string().optional(),
    })).optional(),
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
    category: z.string().optional(),
  }),
});

export const collections = { weblog, showcase };
