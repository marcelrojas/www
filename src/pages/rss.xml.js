import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('weblog');
  return rss({
    title: 'Marcel Rojas\'s blog',
    description: 'Thoughts on code, design, and passion for everything. Latest posts and updates',
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/resources/${post.id}/`,
    })),
  });
}
