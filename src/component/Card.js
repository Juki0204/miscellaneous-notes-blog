import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

import React from 'react';
import * as Icon from 'react-feather';


export default function Card({blog,tags}){
    return(
        <li className="card">
            <Link href={`/blog/${blog.id}`} className="card_link">
                <div className="eyecatch">
                    <Image
                        layout="responsive"
                        src={blog.eyecatch.url}
                        alt={blog.title}
                        width={900}
                        height={506}
                        size="(min-width:768px)768px 100vw"
                    />
                </div>
                <div className="detail">
                    <p className="publishedAt"><Icon.Clock width={16} height={16} />{format(new Date(blog.publishedAt), "yyyy年MM月dd日")}</p>
                    <div className="category_box">
                        <span className="category">{blog.category && `${blog.category.name}`}</span>
                        {tags.map((tags) => (
                            <span key={tags.id} className="tags">
                                <Icon.Tag width={14} height={14} />{tags.tags}
                            </span>
                        ))}
                    </div>
                    <h3 className="detail_ttl">{blog.title}</h3>
                    <div className="post">{blog.body.replace(/(<([^>]+)>)/gi, '')}</div>
                </div>
            </Link>

            <style jsx>{`
                .card{
                    width: calc(50% - 5px);
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
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .eyecatch{
                    width: 100%;
                    height: auto;
                    aspect-ratio: 16/9;
                    position: relative;
                    overflow: hidden;
                }

                .eyecatch img{
                    width: 100%;
                    height: auto;
                }

                .detail{
                    background: rgba(255,255,255,.8);
                    width: 100%;
                    padding: 10px;
                    box-sizing: border-box;
                    position: relative;
                }

                .detail_ttl{
                    margin: 3px auto;
                    font-size: 16px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
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
                    margin: 0 5px 0 0;
                    padding: 0 10px;
                    font-size: 12px;
                    letter-spacing: 1px;
                    height: 24px;
                    line-height: 24px;
                }
    
                .tags{
                    display: flex;
                    align-items: center;
                    gap: 0 3px;
                    padding: 0 5px;
                    margin: 0 5px 0 0;
                    font-size: 14px;
                    height: 30px;
                    line-height: 30px;
                }

                .post{
                    font-size: 12px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }

                .publishedAt{
                    display: flex;
                    align-items: center;
                    justify-content: left;
                    gap: 0 5px;
                    padding: 0 2px 2px 0;
                    font-size: 12px;
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

                @media screen and (max-width:767px){
                    .card{
                        width: 100%;
                    }
                    
                    .detail_ttl{
                        margin: 0 auto 3px;
                    }

                    .category, .tags{
                        font-size: 12px;
                        line-height: 20px;
                        height: 20px;
                        margin: 0 5px 3px 0;
                    }
                }
            `}</style>

        </li>
    )
}