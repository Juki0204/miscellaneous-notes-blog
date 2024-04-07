import Link from 'next/link';
import Image from 'next/image';

import { List, ListItem, Text } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const footer = css`
    width: 100%;
    background: #ccc;
    padding-top: 10px;
`;

export default function Footer(){
    return (
        <footer css={footer}>
            <List display='flex' justifyContent='center'>
                <ListItem marginInline='10px'>
                    <Link href="/">
                        <Image src="/img/Twitter_icon.png" width={32} height={32} alt="Twitter" />
                    </Link>
                </ListItem>
                <ListItem marginInline='10px'>
                    <Link href="https://github.com/Juki0204">
                        <Image src="/img/GitHub_icon.png" width={32} height={32} alt="GitHub" />
                    </Link>
                </ListItem>
                <ListItem marginInline='10px'>
                    <Link href="/feed">
                        <Image src="/img/RSS_icon.png" width={32} height={32} alt="RSS" />
                    </Link>
                </ListItem>
                <ListItem display='flex' alignItems='end'>
                    <Link href="http://validator.w3.org/feed/check.cgi?url=https%3A//naomaru-blog.vercel.app/feed">
                        <Image src="/img/valid-rss-rogers.png" alt="[Valid RSS]" width={66} height={24} title="Validate my RSS feed" />
                    </Link>
                </ListItem>
            </List>
            <Text fontSize='sm' lineHeight='30px' color='white' whiteSpace='nowrap' textAlign='center'>&copy; 2022 naomaru All rights reserved.</Text>
        </footer>
    )
}

