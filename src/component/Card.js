import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

import React from 'react';
import * as Icon from 'react-feather';

import { Badge, Box, Container, Flex, Heading, List, ListItem } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const card = css`
    width: 100%;
    max-width: 900px;
    background: #fff;
    box-shadow: 1px 1px 3px #ddd;
    position: relative;
    background: white;
    padding: 10px;
    border-radius: 10px;
    @media (min-width:768px){
        width: calc(50% - 5px);
        transition: .3s all ease;
        &:hover{
            box-shadow: 2px 2px 6px #ccc;
            transform: translate(-2px, -2px);
        }
    }
`;

const cardTtl = css`
    width: 100%;
    margin: 3px auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 40px;
`;

// const post = css`
//     font-size: 12px;
//     display: -webkit-box;
//     -webkit-box-orient: vertical;
//     -webkit-line-clamp: 2;
//     overflow: hidden;
//     text-align: justify;
// `;

export default function Card({blog,tags}){
    return(
        <Container css={card}>
            <Link href={`/blog/${blog.id}`} className="card_link">
                <Box aspectRatio='16/9' overflow='hidden' position='relative' borderRadius='8px'>
                    <Image
                        fill
                        src={blog.eyecatch.url}
                        alt={blog.title}
                        sizes="auto"
                    />
                </Box>
                <Flex flexWrap='wrap' padding='5px'>
                    <Badge paddingInline='10px' marginRight='6px' borderRadius='5px' height='20px' lineHeight='20px' backgroundColor='gray.200'>
                        {blog.category && `${blog.category.name}`}
                    </Badge>
                    <List display='flex' gap='10px'>
                        {tags.map((tags) => (
                            <ListItem display='flex' alignItems='center' gap='3px' fontSize='sm' key={tags.id}>
                                <Icon.Tag width={14} height={14} />{tags.tags}
                            </ListItem>
                        ))}
                    </List>
                    <Heading as='h3' fontSize='md' css={cardTtl}>{blog.title}</Heading>
                    {/* <Text css={post}>{blog.body.replace(/(<([^>]+)>)/gi, '')}</Text> */}
                </Flex>
                <Flex gap='0 5px' alignItems='center' justifyContent='right' fontSize='sm'>
                    <Icon.Clock width={16} height={16} />
                    {format(new Date(blog.publishedAt), "yyyy年MM月dd日")}
                </Flex>
            </Link>
        </Container>
    )
}