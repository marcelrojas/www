import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('weblog');
  return rss({
    items: posts.map((post) => ({
      ...post.data,
      link: `/resources/${post.id}/`,
    })),
  });
}
