import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react'

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const backBtn = css`
    display: flex;
    width: 100%;
    max-width: 880px;
    height: 60px;
    line-height: 60px;
    margin: 10px 20px 0 0;
    background: #fff;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    grid-area: pagination;
    cursor: pointer;
    transition: .3s all ease;
    letter-spacing: 2px;
    &:hover{
        background: #999;
        color: #fff;
    }
`;

export default function BackBtn(){
    const router = useRouter();
    return (
        <Button css={backBtn} alia-label="戻る" onClick={() => router.back()}>
            記事一覧へ戻る
        </Button>
    )
}