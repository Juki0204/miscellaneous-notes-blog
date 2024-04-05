// import React, { useState } from "react";

import { client } from '/libs/client';

import Layout from '/src/component/base/Layout';
import CardContainer from '/src/component/CardContainer';
import { Pagination } from '/src/component/Pagination';
import Metadata from '/src/component/base/Metadata';


export const getStaticProps = async() => {
  const data = await client.get({endpoint: 'blog', queries:{offset:0,limit:10}});
  const categoryData = await client.get({endpoint: 'categories'});
  const tagsData = await client.get({endpoint: 'tags'});
  return{
    props:{
      blog: data.contents,
      category: categoryData.contents,
      tags: tagsData.contents,
      totalCount: data.totalCount,
    },
  };
};

export default function Home({blog,category,tags,totalCount}) {
  console.log(blog);
  return (
    <Layout category={category} tags={tags} location="/">
      <Metadata
        title="トップページ"
        description="なおまるブログのトップページです。WEB関連の事から趣味のクワガタ飼育、その他日常生活に関する事など、いろいろな記事を書いています。"
        type="blog"
      />
      <CardContainer
        blog={blog}
        totalCount={totalCount}
      />
      <Pagination blog={blog} totalCount={totalCount} id="" directory="/page/" />
    </Layout>
  )
}
