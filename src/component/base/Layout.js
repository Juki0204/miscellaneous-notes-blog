import Header from '/src/component/base/Header';
import Footer from '/src/component/base/Footer';
import SideBar from '/src/component/SideBar';
// import Image from 'next/image';

import { Button, Heading } from '@chakra-ui/react';

import React from 'react';
import * as Icon from 'react-feather';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const wrapper = css`
    width: 100%;
    min-height: 100vh;
    height: auto;
    margin: 0 auto;
    display: grid;
    grid-template-areas: "container"
                         "pagination"
                         "sidebar";
    grid-template-columns: 100%;
    grid-template-rows: min-content min-content min-content;
    justify-content: center;
    position: relative;
    @media (min-width:901px){
        padding: 10px;
        min-width: 1300px;
        grid-template-areas: "container sidebar"
                         "pagination sidebar";
        grid-template-columns: 900px 400px;
        grid-template-rows: min-content auto;
    }
`;

const pageTtl = css`
    padding: 20px 10px 10px;
    font-size: 20px;
    text-align: center;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    @media (min-width: 901px){
        padding: 50px 0 20px;
        font-size: 30px;
    }
`;

const returnTopBtn = css`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 50%;
    background: #ccc; 
`;

const returnTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

export default function Layout({children, category, tags, ttl}){
    return (
        <>
            <Header />
                <main style={{background: "#eee", position: "relative"}}>
                    {ttl && (
                        <Heading as='h2' css={pageTtl}>{ttl}</Heading>
                    )}
                    <div css={wrapper}>
                        {children}
                        <SideBar category={category} tags={tags} />
                    </div>
                    <button css={returnTopBtn} onClick={returnTop}>
                        <Icon.ChevronUp width='20px' height='20px' color='white' />
                    </button>
                </main>
            <Footer />
        </>
    )
}