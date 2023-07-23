import Header from '/src/component/base/Header';
import Footer from '/src/component/base/Footer';
import SideBar from '/src/component/SideBar';
// import Image from 'next/image';

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
        background: #eee;
        padding: 10px;
        min-width: 1300px;
        grid-template-areas: "container sidebar"
                         "pagination sidebar";
        grid-template-columns: 900px 400px;
        grid-template-rows: min-content auto;
    }
`;

export default function Layout({children, category, tags}){
    return (
        <>
            <Header />
                <main>
                    <div css={wrapper}>
                        {children}
                        <SideBar category={category} tags={tags} />
                    </div>
                </main>
            <Footer />
        </>
    )
}