import { client } from '/libs/client';

import Layout from '/src/component/Layout';
import SideBar from '/src/component/SideBar';
import CardContainer from '/src/component/CardContainer';
import { Pagination } from '/src/component/Pagination';


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

    const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 6, limit: 6 } });
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

const PER_PAGE = 6; 

// pages/blog/[id].js
export default function BlogPageId({ blog,category,tags,totalCount,id }) {
    console.log(id);
    return (
    <Layout>
      <CardContainer
        blog={blog}
        totalCount={totalCount}
        id={id}
      />
      <Pagination blog={blog} totalCount={totalCount} id={id} directory="/page/" />
      <SideBar category={category} tags={tags} />
    </Layout>
  );
}
