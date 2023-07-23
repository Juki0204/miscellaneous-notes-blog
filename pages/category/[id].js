import { client } from "/libs/client";

import Layout from '/src/component/base/Layout';
import CardContainer from '/src/component/CardContainer';
import Metadata from '/src/component/base/Metadata';


export const getStaticPaths = async() => {
    const data = await client.get({endpoint: "categories"});

    const paths = data.contents.map((content) => `/category/${content.id}`);
    return{
        paths,
        fallback: false,
    };
};

export const getStaticProps = async(context) => {
    const id = context.params.id;
    const data = await client.get({endpoint: "blog", queries:{ filters: `category[equals]${id}`}});
    const categoryData = await client.get({endpoint: 'categories'});
    const tagsData = await client.get({endpoint: 'tags'});

    for(var i = 0; i < categoryData.contents.length; i++){
        if(categoryData.contents[i].id === id){
            var activeCategory = categoryData.contents[i].name;
        }
    }

    return{
        props:{
            blog: data.contents,
            category: categoryData.contents,
            activeCategory: activeCategory,
            tags: tagsData.contents,
        },
    };
};


export default function CategoryId({blog,category,activeCategory,tags,totalCount}){
    return(
        <Layout
            category={category}
            tags={tags}
            ttl={`カテゴリー別記事一覧：${activeCategory}`}
        >
            <Metadata
                title={`【${activeCategory}】カテゴリーの記事一覧`}
                description={`なおまるが運営する雑記ブログ「ざくざく、ごろん。」の【${activeCategory}】カテゴリーの記事一覧ページです。WEB関連の事から趣味のクワガタ飼育、その他日常生活に関する事など、いろいろな記事を書いています。`}
                type="blog"
            />
            <CardContainer
                blog={blog}
                totalCount={totalCount}
            />
        </Layout>
    )
}