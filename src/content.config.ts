import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const langEnum = z.enum(['en', 'es']).default('en');

const editionsSchema = z
  .array(
    z.object({
      lang: z.enum(['en', 'es']),
      title: z.string(),
      url: z.string(),
      translatedBy: z.string().optional(),
    })
  )
  .optional();

const blog = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    lang: langEnum,
    editions: editionsSchema,
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: './src/content/portfolio' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    category: z.string().optional(),
    role: z.string().optional(),
    stack: z.array(z.string()).optional(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
    lang: langEnum,
    editions: editionsSchema,
  }),
});

export const collections = { blog, portfolio };