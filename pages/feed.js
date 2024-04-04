import { generateFeed } from "../src/functions/generateFeed";

import { client } from '/libs/client';

const getContents = async() => {

  const response = await client.getList({
  customRequestInit: {
    cache: "no-store", // キャッシュを利用せずに常に新しいデータを取得する
  },
    endpoint: "blog",
  });

  return response.contents;
}

export const getServerSideProps = async ({ res }) => {
  const posts = await getContents();
  console.log(posts);

  const xml = await generateFeed(posts);

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); 
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;