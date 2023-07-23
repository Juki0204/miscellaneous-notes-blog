import parse from 'html-react-parser';
import Image from 'next/image';
// import DOMPurify from 'dompurify';
import DOMPurify from 'isomorphic-dompurify';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const image = css`
    width: 100%;
    max-width: 500px;
    height: auto;
    position: relative !important;
`;

export default function ConvertBody({contentHTML, className}){
    const cleanHtmlString = DOMPurify.sanitize(contentHTML,{
        USE_PROFILES: {html:true}
    });
    const contentReact = parse(cleanHtmlString, {
        replace: (node) => {
            if(node.name === 'img'){
                const{src, alt} = node.attribs
                return <Image
                            fill
                            src={src}
                            alt={alt}
                            sizes="auto"
                            css={image}
                        />
            }
        }
    })

    return <div className={className}>{contentReact}</div>
}

