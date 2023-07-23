import Link from 'next/link';
import Image from 'next/image';

import React from 'react';
import * as Icon from 'react-feather';
//icons => https://feathericons.com/

import { Grid, GridItem, Box, Heading, Text, List, ListItem } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const listItem = css`
  background: #eee;
  cursor: pointer;
  border-left: 4px solid #999;
  transition: .3s all ease;
  box-shadow: 1px 1px 3px #aaa;
  & a{
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 10px;
    gap: 0 5px;
  }
  &:hover{
    background: #999;
    color: white;
  }
`;

const sideBar = css`
  width: 100%;
  border-top: 1px solid #ccc;
  letter-spacing: 2px;
  @media (min-width:901px){
    width: 400px;
    border: none;
    border-radius: 10px;
  }
`;

//次ここのUIをChakraに置き換える作業から
export default function SideBar({category,tags}) {
    return (
      <Grid
        gridArea={'sidebar'}
        templateAreas={`"profile"
                        "category"
                        "tags"`}
        templateRows={'min-content min-content min-content'}
        padding='20px'
        backgroundColor='white'
        css={sideBar}
      > 
        <GridItem area={'profile'} borderBottom='solid 1px #ddd' marginBottom='10px'>
          <Heading as='h2' marginBottom='10px'>Profile</Heading>
          <Box width='150px' aspectRatio='1/1' borderRadius='full' overflow='hidden' position='relative' margin='auto'>
            <Image
              src="/img/profile.jpg"
              fill
              style={{ objectFit: 'contain' }}
              sizes="auto"
              alt="プロフィール画像"
            />
          </Box>
          <Heading as='h3' textAlign='center' margin='5px auto' fontSize='2xl'>なおまる</Heading>
          <Text fontSize='sm' padding='10px' textAlign='justify' margin='5px auto'>
            元パチンコ店マネジャー/現WEBデザイナー。<br />
            最近はReact/Next.jsとTypeScriptを勉強中。<br />
            趣味でクワガタの飼育をしています。<br />
            WEB関係と趣味についてだらだら書いてます。
          </Text>
        </GridItem>
        <GridItem area={'category'}>
            <Heading as='h2' marginBottom='10px'>Category</Heading>
            <List marginBottom='20px'>
              {category.map((category) => (
                <ListItem css={listItem} key={category.id}>
                  <Link href={`/category/${category.id}`}>
                    {category.name}
                  </Link>
                </ListItem>
            ))}
            </List>
        </GridItem>
        <GridItem area={'tags'}>
            <Heading as='h2' marginBottom='10px'>Tags</Heading>
            <List marginBottom='20px'>
              {tags.map((tags) => (
                <ListItem css={listItem} key={tags.id}>
                  <Link href={`/tags/${tags.id}`}>
                    <Icon.Tag width={16} height={16} />{tags.tags}
                  </Link>
                </ListItem>
            ))}
            </List>
        </GridItem>
      </Grid>
    )
}