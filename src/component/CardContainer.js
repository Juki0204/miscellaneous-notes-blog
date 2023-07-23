import Card from '/src/component/Card';

import { Box, Container, Flex, Text } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
    grid-area: container;
    width: 100%;
    max-width: 900px;
    padding: 10px;
    @media (min-width: 901px){
        padding: 0 20px 10px 10px;
    }
`;

export default function CardContainer({blog}) {
    const blogCount = blog.length;
    
    return(
        <Container css={container}>
            {blog.length === 0 && (
                <Text>該当するブログコンテンツがありません。</Text>
            )}
            <Flex id="blogList" w='100%' flexWrap='wrap' gap='10px'>
            {blog.map((blog) => (
                <Card key={blog.id} blog={blog} tags={blog.tags}/>
            ))}
            {blogCount % 2 == 1 && <Box w='calc(50% - 5px)'></Box>}
            </Flex>
        </Container>
    )
}