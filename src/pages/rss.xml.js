import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '@types/consts';

export async function GET(context) {
  const posts = await getCollection('weblog');
  return rss({
    items: posts.map((post) => ({
      ...post.data,
      link: `/resources/${post.id}/`,
    })),
  });
}
