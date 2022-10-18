import parse from 'html-react-parser';
import Image from 'next/image';
// import DOMPurify from 'dompurify';
import DOMPurify from 'isomorphic-dompurify';


export default function ConvertBody({contentHTML, className}){
    const cleanHtmlString = DOMPurify.sanitize(contentHTML,{
        USE_PROFILES: {html:true}
    });
    const contentReact = parse(cleanHtmlString, {
        replace: (node) => {
            if(node.name === 'img'){
                const{src, alt} = node.attribs
                return(
                    <Image
                        layout="responsive"
                        src={src}
                        alt={alt}
                        width={900}
                        height={506}
                        size="(min-width:768px)768px 100vw"
                    />
                )
            }
        }
    })

    return <div className={className}>{contentReact}</div>
}

