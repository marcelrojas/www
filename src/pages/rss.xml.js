import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('weblog');
  return rss({
    items: posts.map((post) => ({
      ...post.data,
      title: 'Marcel Rojas\'s blog',
      description: 'Thoughts on code, design, and passion for everything. Latest posts and updates',
      site: context.site,
      link: `/resources/${post.id}/`,
    })),
  });
}
