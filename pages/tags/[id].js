import { client } from "../../libs/client";

import Layout from '/src/component/base/Layout';
import CardContainer from '/src/component/CardContainer';
import Metadata from '/src/component/base/Metadata';


export const getStaticPaths = async() => {
    const data = await client.get({endpoint: "tags"});

    const paths = data.contents.map((content) => `/tags/${content.id}`);
    return{
        paths,
        fallback: false,
    };
};

export const getStaticProps = async(context) => {
    const id = context.params.id;
    const data = await client.get({endpoint: "blog", queries:{ filters: `tags[contains]${id}`}});
    const categoryData = await client.get({endpoint: 'categories'});
    const tagsData = await client.get({endpoint: 'tags'});
    
    for(var i = 0; i < tagsData.contents.length; i++){
        if(tagsData.contents[i].id === id){
            var activeTags = tagsData.contents[i].tags;
        }
    }

    return{
        props:{
            blog: data.contents,
            category: categoryData.contents,
            tags: tagsData.contents,
            activeTags: activeTags,
        },
    };
};

export default function TagsId({blog,category,tags,activeTags}){
    return(
        <Layout
            category={category}
            tags={tags}
            ttl={`タグ別記事一覧：${activeTags}`}
        >
            <Metadata
                title={`【${activeTags}】タグを含む記事一覧`}
                description={`なおまるが運営する雑記ブログ「ざくざく、ごろん。」の【${activeTags}】タグを含む記事一覧ページです。WEB関連の事から趣味のクワガタ飼育、その他日常生活に関する事など、いろいろな記事を書いています。`}
                type="blog"
            />
            <CardContainer
                blog={blog}
            />
        </Layout>
    )
}