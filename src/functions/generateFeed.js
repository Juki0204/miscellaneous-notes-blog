import { Feed } from 'feed';

export const generateFeed = async ( post ) => {
  const baseUrl = 'https://naomaru-blog.vercel.app';

  const feed = new Feed({
    title: 'なおまるブログ',
    description: '',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    copyright: '2022 naomaru All rights reserved',
    updated: new Date(),
    auther: {
      name: 'naomaru',
    },
    feed: `${baseUrl}/feed`,
  });

  const posts = post;

  posts.forEach(post => {
    const url = `${baseUrl}/${post.id}`;
    feed.addItem({
      title: post.title,
      description: post.description,
      content: post.content,
      id: url,
      link: url,
      date: new Date(post.publishedAt),
    });
  });

  return feed.rss2();
}