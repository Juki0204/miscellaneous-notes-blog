import { client } from '/libs/client';

import Layout from '/src/component/base/Layout';
import CardContainer from '/src/component/CardContainer';
import { Pagination } from '/src/component/Pagination';
import Metadata from '/src/component/base/Metadata';


// 動的なページを作成
export const getStaticPaths = async () => {
    const repos = await client.get({ endpoint: "blog" });
    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`);
    return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
    const id = context.params.id;

    const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 8, limit: 8 } });
    const categoryData = await client.get({endpoint: 'categories'});
    const tagsData = await client.get({endpoint: 'tags'});

    return {
        props: {
        blog: data.contents,
        category: categoryData.contents,
        tags: tagsData.contents,
        totalCount: data.totalCount,
        id: id,
        },
    };
};

const PER_PAGE = 8; 

// pages/blog/[id].js
export default function BlogPageId({ blog,category,tags,totalCount,id }) {
    return (
    <Layout category={category} tags={tags}>
      <Metadata
        title="最新記事一覧"
        description="なおまるが運営する雑記ブログ「ざくざく、ごろん。」の最新記事一覧ページです。WEB関連の事から趣味のクワガタ飼育、その他日常生活に関する事など、いろいろな記事を書いています。"
        type="blog"
      />
      <CardContainer
        blog={blog}
        totalCount={totalCount}
        id={id}
      />
      <Pagination blog={blog} totalCount={totalCount} id={id} directory="/page/" />
    </Layout>
  );
}
