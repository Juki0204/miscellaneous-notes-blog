import { useRouter } from 'next/router';

import { client } from "../../libs/client";
import { format } from 'date-fns';
import Layout from '/src/component/Layout';
import SideBar from '/src/component/SideBar';

import React from 'react';
import * as Icon from 'react-feather';

import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';
import cheerio from 'cheerio';


//SSG
export const getStaticProps = async(context) => {
    const id = context.params.id;
    const data = await client.get({endpoint: 'blog', contentId: id});
    const categoryData = await client.get({endpoint: 'categories'});
    const tagsData = await client.get({endpoint: 'tags'});

    const $ = cheerio.load(data.body || "")
    $("pre code").each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text())
        $(elm).html(result.value)
        $(elm).addClass("hljs")
    })

    return{
        props:{
            blog: {...data, body: $.html()},
            activeTags: data.tags,
            category: categoryData.contents,
            tags: tagsData.contents,
        },
    };
};

export const getStaticPaths = async() => {
    const data = await client.get({endpoint: 'blog'});
    const paths = data.contents.map((content) => `/blog/${content.id}`);

    return{
        paths,
        fallback: false,
    }
};


export const BackButton = () => {
  const router = useRouter()
  return (
    <button alia-label="戻る" type="button" onClick={() => router.back()}>
      戻る
    </button>
  )
}

const BlogId = ({blog,activeTags,category,tags}) => {
    const router = useRouter()
    const eyecatchImage = blog.eyecatch.url;
    console.log(eyecatchImage);
  return (
    <Layout>
        <div className="container">
            <div className="title_outer" style={{backgroundImage: "url("+eyecatchImage+")"}}>
                <h2 className="title">{blog.title}</h2>
            </div>
            <p className="publishedAt"><Icon.Clock width={16} height={16} />{format(new Date(blog.publishedAt), "yyyy年MM月dd日")}</p>
            <div className="category_box">
                <span className="category">{blog.category && `${blog.category.name}`}</span>
                {activeTags.map((activeTags) => (
                    <span key={activeTags.id} className="tags">
                        <Icon.Tag width={14} height={14} />{activeTags.tags}
                    </span>
                ))}
            </div>
            <div className="post" dangerouslySetInnerHTML={{__html:`${blog.body}`}}></div>
        </div>
        <p className="back_button" alia-label="戻る" type="button" onClick={() => router.back()}> &lt; 記事一覧へ戻る &gt;</p>
        <SideBar category={category} tags={tags} />

        <style jsx>{`
            .container{
                width: 960px;
                margin: 0 auto;
                padding: 310px 40px 10px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 1px 1px 3px #999;
                position: relative;
                overflow: hidden;
            }
            
            .title {
                display: inline-block;
                margin: 20px;
                color: #000;
                text-shadow: 1px 1px 2px #fff, 1px 1px 2px #fff, 2px 2px 2px #fff, 2px 2px 2px #fff, 2px 2px 0 #fff, 2px 2px 0 #fff;
                font-size: 30px;
                z-index: 1;
                padding: 5px 30px 0;
                text-align: center;
            }

            .title_outer{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 300px;
                background-size: 100% auto;
                background-position: center;
                bckground-repeat: no-repeat;
                backdrop-filter: blur(12px);
                overflow: hidden;
                position: absolute;
                width: 100%;
                top: 0;
                left: 0;
                right: 0;
                margin: auto;
            }

            .title_outer::before {
                background: inherit;
                content: '';
                filter: blur(5px);
                position: absolute;
                top: -10px;
                right: -10px;
                bottom: -10px;
                left: -10px;
            }
            
            .title_outer::after {
                background: rgba(255,255,255,.8);
                content: '';
                filter: blur(5px);
                position: absolute;
                top: -10px;
                right: -10px;
                bottom: -10px;
                left: -10px;
            }
            
            .publishedAt {
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 0 5px;
            }
            
            .category_box{
                margin-bottom: 100px;
                display: flex;
                flex-wrap: wrap;
                justify-content: left;
                align-items: center;
            }

            .category{
                display: inline-block;
                font-weight: bold;
                border-radius: 5px;
                background: #999;
                color: #fff;
                padding: 5px 10px;
            }

            .tags{
                display: flex;
                align-items: center;
                padding: 5px;
                margin-left: 10px;
            }
            
            .back_button{
                display: flex;
                padding: 10px;
                align-items: center;
                justify-content: center;
                grid-area: pagination;
                cursor: pointer;
            }

            @media screen and (max-width:1000px){
                .container{
                    width: 100%;
                    margin: 0 auto;
                    padding: 210px 10px 10px;
                }

                .title_outer{
                    height: 200px;
                }

                .title{
                    margin: 0 auto;
                    font-size: 24px;
                }

                .category_box{
                    margin-bottom: 50px;
                }
            }
        
        `}</style>

    </Layout>
  )
}

export default BlogId