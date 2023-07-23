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
    @media (min-width:901px){
        padding: 40px;
        border-radius: 8px;
        margin: 0 20px 0 0;
    }
    & p{
        line-height: 2;
    }
    & h2{
        font-size: 1.5rem;
        font-weight: bold; 
        margin-top: 100px;
        position: relative;
        background: #dfefff;
        box-shadow: 0px 0px 0px 5px #dfefff;
        border: dashed 2px white;
        padding: .2em .6em;
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
`;


export default function BlogId({blog,activeTags,category,tags}){
  return (
    <Layout category={category} tags={tags}>
        <Metadata
            title={blog.title}
            description={blog.body.replace(/(<([^>]+)>)/gi, '').substr(0,100)+"..."}
            type="article"
        />
        <Container css={container}>
            <Heading as="h1" fontSize='30px' borderBottom='6px solid #999' padding='5px 0' marginBottom='10px'>{blog.title}</Heading>
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