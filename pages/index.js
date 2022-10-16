// import React, { useState } from "react";

import { client } from '/libs/client';

import Layout from '/src/component/base/Layout';
import SideBar from '/src/component/SideBar';
import CardContainer from '/src/component/CardContainer';
import { Pagination } from '/src/component/Pagination';
import Metadata from '/src/component/base/Metadata';


export const getStaticProps = async() => {
  const data = await client.get({endpoint: 'blog', queries:{offset:0,limit:6}});
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

  // カテゴリーフィルター
  // const [showPosts, setShowPosts] = useState(blog);

  // console.log(showPosts);

  // const selectCategory = (category) =>{
  //   if (category === 'all') {
  //     setShowPosts(blog)
  //   } else {
  //     console.log(category.id);
  //     const selectPosts = blog.filter((blog) => blog.category.id === category.id)
  //     setShowPosts(selectPosts)
  //   }

  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   })
  // }


  // タグフィルター

  // const selectTags = (tags) =>{
  //   if (tags === 'all') {
  //     setShowPosts(blog)
  //   } else {
  //     console.log(tags);
  //     // const selectPosts = blog.filter((blog) => blog.tags.indexOf(tags.id))
  //     const selectPosts = [];
  //     for(var i = 0; i < blog.length; i++){
  //       for(var x = 0; x < blog[i].tags.length; x++){
  //         if(blog[i].tags[x].id === tags.id){
  //           selectPosts.push(blog[i]);
  //         }
  //       }
  //     }
  //     setShowPosts(selectPosts)
  //   }

  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   })
  // }


  return (
    <Layout>
      <Metadata
        title="トップページ"
        description="なおまるが運営する雑記ブログ「ざくざく、ごろん。」のトップページです。WEB関連の事から趣味のクワガタ飼育、その他日常生活に関する事など、いろいろな記事を書いています。"
        type="blog"
      />
      <CardContainer
        blog={blog}
        totalCount={totalCount}
      />
      <Pagination blog={blog} totalCount={totalCount} id="" directory="/page/" />
      <SideBar category={category} tags={tags} />
    </Layout>
  )
}
