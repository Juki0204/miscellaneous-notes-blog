import Link from 'next/link';
// import Image from 'next/image';
import { format } from 'date-fns';

import React from 'react';
import * as Icon from 'react-feather';


export default function Card({blog,tags}){
    var imgSrc = blog.eyecatch.url;
    console.log(imgSrc);
    return(
        <li className="card">
            <Link href={`/blog/${blog.id}`}>
            <a className="card_link">
                <div className="eyecatch">
                    <img src={`${blog.eyecatch.url}`} alt={blog.title}/>
                </div>
                <div className="detail">
                    <h3 className="detail_ttl">{blog.title}</h3>
                    <div className="category_box">
                        <span className="category">{blog.category && `${blog.category.name}`}</span>
                        {tags.map((tags) => (
                            <span key={tags.id} className="tags">
                                <Icon.Tag width={14} height={14} />{tags.tags}
                            </span>
                        ))}
                    </div>
                    <div className="post">{blog.body.replace(/(<([^>]+)>)/gi, '')}</div>
                    <p className="publishedAt"><Icon.Clock width={16} height={16} />{format(new Date(blog.publishedAt), "yyyy年MM月dd日")}</p>
                </div>
            </a>
            </Link>

            <style jsx>{`
                .card{
                    list-style: none;
                    width: 100%;
                    max-height: 300px;
                    border-radius: 8px;
                    overflow: hidden;
                    background: #fff;
                    box-shadow: 1px 1px 3px #999;
                    transition: .3s all ease;
                    animation: fade-in 1s ease 0s forwards;
                }

                .card:hover{
                    transform: scale(1.02);
                }
                
                .card_link{
                    display: flex;
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .eyecatch{
                    width: 300px;
                    height: auto;
                    max-height: 190px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                }

                .eyecatch img{
                    width: auto;
                    height: 100%;
                }

                .detail{
                    background: rgba(255,255,255,.8);
                    width: calc(100% - 300px);
                    padding: 0 0 34px 0;
                    margin: 10px;
                    box-sizing: border-box;
                    position: relative;
                }

                .detail_ttl{
                    margin: 0 auto 10px;
                    font-size: 20px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    border-bottom: 1px solid #999;
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
                    margin: 0 5px 10px 0;
                    padding: 0 10px;
                    font-size: 14px;
                    height: 30px;
                    line-height: 30px;
                }
    
                .tags{
                    display: flex;
                    align-items: center;
                    gap: 0 3px;
                    padding: 0 5px;
                    margin: 0 5px 10px 0;
                    font-size: 14px;
                    height: 30px;
                    line-height: 30px;
                }

                .post{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }

                .publishedAt{
                    display: flex;
                    align-items: center;
                    justify-content: right;
                    gap: 0 5px;
                    margin: 10px 0 0 auto;
                    border-bottom: 1px solid #999;
                    max-width: 200px;
                    width: 100%;
                    padding: 0 2px 2px 0;
                    font-size: 16px;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    box-sizing: border-box;
                }

                @keyframes fade-in{
                    0%{
                        opacity: 0;
                    }
                    100%{
                        opacity: 1;
                    }
                }

                @media screen and (max-width:1000px){
                    .card{
                      width: 100%; 
                      max-width: none;
                    } 

                    .post{
                        display: none;
                    }

                    .eyecatch{
                        max-width: 230px;
                        width: 30%;
                        max-height: 150px;
                    }

                    .detail{
                        max-width: 770px;
                        width: 70%;
                    }
                }

                @media screen and (max-width:767px){
                    .detail{
                        padding: 0;
                    }
                    
                    .detail_ttl{
                        font-size: 16px;
                        margin-bottom: 5px;
                    }

                    .category, .tags{
                        font-size: 12px;
                        line-height: 20px;
                        height: 20px;
                        margin: 0 5px 5px 0;
                    }

                    .publishedAt{
                        bottom: 0;
                        right: 0;
                        margin: 0;
                    }
                }
            `}</style>

        </li>
    )
}