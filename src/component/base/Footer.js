import Link from 'next/link';
import Image from 'next/image';

import { List, ListItem, Text } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const footer = css`
    width: 100%;
    background: #999;   
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
            </List>
            <Text fontSize='sm' lineHeight='30px' color='white' whiteSpace='nowrap' textAlign='center'>&copy; 2022 naomaru All rights reserved.</Text>
        </footer>
    )
}

