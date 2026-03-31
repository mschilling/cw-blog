import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { DateTime } from 'luxon';

function parseDate(dateStr: string): Date {
  const dt = DateTime.fromISO(dateStr, { zone: 'Europe/Amsterdam' });
  return dt.toJSDate();
}

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');

  const items = posts
    .map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: parseDate(post.data.publishDate),
      link: `/posts/${post.id}/`,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Computerweetjes.nl',
    description: 'Hoi, welkom op Computerweetjes.nl',
    site: context.site!,
    items,
    customData: '<language>nl-NL</language>',
  });
}
