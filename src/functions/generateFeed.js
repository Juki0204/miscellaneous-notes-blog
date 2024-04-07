import { Feed } from 'feed';

export const generateFeed = async ( post ) => {
  const baseUrl = 'https://naomaru-blog.vercel.app';

  const feed = new Feed({
    title: 'なおまるブログ',
    description: 'なおまるブログのトップページです。WEB関連の事から趣味のクワガタ飼育、その他日常生活に関する事など、いろいろな記事を書いています。',
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
  console.log(posts);

  posts.forEach(post => {
    const url = `${baseUrl}/${post.id}`;
    feed.addItem({
      title: post.title,
      link: url,
      id: post.id,
      published: new Date(post.publishedAt),
      description: post.body.replace(/(<([^>]+)>)/gi, '').substr(0,100)+"...",
      enclosure: {
        url: post.eyecatch.url,
        size: post.eyecatch.width,
        type: 'image/jpeg',
      }
    });
  });

  return feed.rss2();
}