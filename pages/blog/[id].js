import { useRouter } from 'next/router';

import { client } from "../../libs/client";
import { format } from 'date-fns';
import Layout from '/src/component/Layout';
import SideBar from '/src/component/SideBar';

import React from 'react';
import * as Icon from 'react-feather';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
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
            {/* <div className="title_outer" style={{backgroundImage: "url("+eyecatchImage+")"}}>
            </div> */}
            <div className="eyecatch">
                <img src={`${blog.eyecatch.url}`} alt={blog.title}/>
            </div>
            <h2 className="title">{blog.title}</h2>
            <div className="info">
                <div className="category_box">
                    <span className="category">{blog.category && `${blog.category.name}`}</span>
                    {activeTags.map((activeTags) => (
                        <span key={activeTags.id} className="tags">
                            <Icon.Tag width={14} height={14} />{activeTags.tags}
                        </span>
                    ))}
                </div>
                <p className="publishedAt"><Icon.Clock width={16} height={16} />{format(new Date(blog.publishedAt), "yyyy年MM月dd日")}</p>
            </div>
            <div className="post" dangerouslySetInnerHTML={{__html:`${blog.body}`}}></div>
        </div>
        <p className="back_button" alia-label="戻る" type="button" onClick={() => router.back()}> &lt; 記事一覧へ戻る &gt;</p>
        <SideBar category={category} tags={tags} />

        <style jsx>{`
            .container{
                width: 880px;
                margin: 0 20px 0 0;
                padding: 56.22222% 40px 40px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 1px 1px 3px #999;
                position: relative;
                overflow: hidden;
            }
            
            .title {
                display: inline-block;
                margin: 20px auto 10px;
                color: #000;
                border-bottom: 6px solid #999;
                font-size: 30px;
                z-index: 1;
                text-align: left;
            }

            .eyecatch{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }
            .eyecatch img{
                width: 100%;
                height: auto;
            }

            .info{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                align-items: center;
                margin-bottom: 100px;
            }
            
            .publishedAt {
                display: flex;
                align-items: center;
                gap: 0 5px;
            }
            
            .category_box{
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
                font-size: 14px;
                padding: 2px 10px;
            }

            .tags{
                display: flex;
                align-items: center;
                padding: 3px;
                margin-left: 10px;
            }
            
            .back_button{
                display: flex;
                padding: 0 10px;
                margin: 10px auto 30px;
                align-items: center;
                justify-content: center;
                grid-area: pagination;
                cursor: pointer;
                transition: .3s all ease;
            }

            .back_button:hover{
                color: #d00;
            }

            @media screen and (max-width:1000px){
                .container{
                    width: 100%;
                    margin: 0 auto;
                    padding: 56.22222% 10px 10px;
                }

                .title{
                    margin: 10px auto;
                    font-size: 24px;
                    border-bottom: 4px solid #999;
                }

                .info{
                    display: block;
                    margin-bottom: 50px;
                }

                .publishedAt{
                    margin-top: 5px;
                }
            }
        
        `}</style>

    </Layout>
  )
}

export default BlogId