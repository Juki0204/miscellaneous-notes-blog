import Image from 'next/image';
import { Container, Badge, Box, Flex, Heading, Text, List, ListItem } from '@chakra-ui/react'

import { client } from "../../libs/client";
import { format } from 'date-fns';
import Layout from '/src/component/base/Layout';
import BackBtn from '/src/component/BackBtn';
import Metadata from '/src/component/base/Metadata';

import ConvertBody from '/src/component/ConvertBody';

import React from 'react';
import * as Icon from 'react-feather';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import cheerio from 'cheerio';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


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

const container = css`
    width: 100%;
    max-width: 880px;
    padding: 20px;
    background: #fff;
    position: relative;
    overflow: hidden;
    letter-spacing: 2px;
    line-height: 1.8;
    font-size: 1rem;
    color: #333;

    @media (min-width:901px){
        padding: 40px;
        border-radius: 8px;
        margin: 0 20px 0 0;
    }

    & h1, & h2, & h3, & h4 {
      font-weight: bold;
      margin-top: 2rem;
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    & h2{
      font-size: 1.5rem;
      position: relative;
      background: #dfefff;
      box-shadow: 0px 0px 0px 5px #dfefff;
      border: dashed 2px white;
      padding: .4em .8em;
      color: #454545;
      &::after {
        position: absolute;
        content: '';
        left: -7px;
        top: -7px;
        border-width: 0 0 15px 15px;
        border-style: solid;
        border-color: #fff #fff #a8d4ff;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
      }
    }
    
    & h3 {
      font-size: 1.25rem;
      color: #444;
    }

    & h4 {
      font-size: 1.1rem;
      color: #555;
    }
    
    & p {
      margin: 1em 0;
    }

    & ul, & ol {
      padding-left: 1.5rem;
      margin: 1em 0;
    }

    & li {
      margin: 0.5em 0;
    }

    & blockquote {
      border-left: 4px solid #ccc;
      padding-left: 1em;
      color: #666;
      margin: 1em 0;
      font-style: italic;
      background-color: #f9f9f9;
    }

    & pre {
      background-color: #f5f5f5;
      padding: 1em;
      overflow-x: auto;
      border-radius: 4px;
      margin: 1.5em 0;
    }

    & code {
      font-family: 'Courier New', monospace;
      background-color: #eee;
      padding: 0.2em 0.4em;
      border-radius: 4px;
    }

    & hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 2em 0;
    }

    & img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1em auto;
    }

    & table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5em 0;
      font-size: 0.95rem;
    }

    & th, & td {
      border: 1px solid #ccc;
      padding: 0.75em;
      text-align: left;
    }

    & th {
      background-color: #f0f0f0;
    }

    & a {
      color: #0070f3;
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }

    & strong {
      font-weight: bold;
    }

    & em {
      font-style: italic;
    }
`;

const blogTtl = css`
    font-size: 2rem;
    border-bottom: 6px solid #ddd;
    padding: 5px 0;
    margin-bottom: 10px;
    text-align: justify;
`;

export default function BlogId({blog,activeTags,category,tags}){
  return (
    <Layout
        category={category}
        tags={tags}
    >
        <Metadata
            title={blog.title}
            description={blog.body.replace(/(<([^>]+)>)/gi, '').substr(0,100)+"..."}
            type="article"
        />
        <Container css={container}>
            <Heading as="h1" css={blogTtl}>{blog.title}</Heading>
            <Box marginBottom='50px'>
                <Flex flexWrap='wrap'>
                    <Badge paddingInline='10px' marginRight='6px' borderRadius='5px' height='20px' lineHeight='20px' backgroundColor='gray.200'>
                        {blog.category && `${blog.category.name}`}
                    </Badge>
                    <List display='flex' gap='10px'>
                        {activeTags.map((activeTags) => (
                            <ListItem display='flex' alignItems='center' gap='3px' fontSize='sm' lineHeight='1' key={activeTags.id}>
                                <Icon.Tag width={14} height={14} />{activeTags.tags}
                            </ListItem>
                        ))}
                    </List>
                </Flex>
                <Box position='relative' marginTop='10px' aspectRatio='16/9' w='100%'>
                    <Image
                        src={blog.eyecatch.url}
                        alt={blog.title}
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </Box>
                <Text display='flex' alignItems='center' justifyContent='right' gap='0 5px' marginTop='10px' lineHeight='1'>
                    <Icon.Clock width={16} height={16} />{format(new Date(blog.publishedAt), "yyyy年MM月dd日")}
                </Text>
            </Box>
            <ConvertBody contentHTML={blog.body} className="post" />
        </Container>
        <BackBtn />
    </Layout>
  )
}