import Link from 'next/link';

import { Flex, Box } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React from 'react';
import * as Icon from 'react-feather';

export const Pagination = ({ totalCount,id,directory }) => {
  const PER_PAGE = 8;

  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  if(!id == ""){
    var idNum = Number(id);
  } else {
    var idNum = 1;
  }

  var maxNum = Math.ceil(Number(totalCount / PER_PAGE));

  const paginationWrap = css`
    gap: 8px;
    grid-area: pagination;
    justify-content: center;
    padding-inline: 10px;
    margin-bottom: 20px;
    @media (min-width: 901px){
      padding-inline: 10px 20px;
      margin-bottom: 20px;
    }
  `;

  const pagination = css`
    display: grid;
    place-content: center;
    background: #fff;
    width: 40px;
    font-size: 20px;
    aspect-ratio: 1/1;
    border-radius: 10px;
    &[data-status="active"]{
      pointer-events: none;
      background: #333;
      color: #fff;
    }
    &[data-status="hidden"]{
      visibility: hidden;
    }
  `;

  return (
    <Flex css={paginationWrap}>
      <Box>
        <Link href={`${directory}${idNum - 1}`} css={pagination} data-status={idNum == 1 ? "hidden" : ""}><Icon.ChevronLeft width='20px' height='20px' /></Link>
      </Box>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <Box key={index}>
          <Link href={ `${directory}${number}`} css={pagination} data-status={number === idNum ? "active" : ""}>
            {number}
          </Link>
        </Box>
      ))}
      <Box>
        <Link href={`${directory}${idNum + 1}`} css={pagination} data-status={idNum == maxNum ? "hidden" : ""}><Icon.ChevronRight width='20px' height='20px' /></Link>
      </Box>
    </Flex>
  );
};