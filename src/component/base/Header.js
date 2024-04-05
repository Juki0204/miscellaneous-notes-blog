import Link from 'next/link';
import Image from 'next/image';

import { Heading } from '@chakra-ui/react';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const header = css`
    width: 100%;
    height: 80px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    @media (min-width:901px){
        border: none;
    }
`;

const ttlLogo = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
`;

export default function Header(){
    return (
        <header css={header}>
            <Heading as='h1' height='100%'>
                <Link href="/" css={ttlLogo}>
                    <Image src="/img/header_logo.png" fill style={{ objectFit: 'contain' }} alt="なおまるブログ"/>
                </Link>
            </Heading>
        </header>
    )
}
