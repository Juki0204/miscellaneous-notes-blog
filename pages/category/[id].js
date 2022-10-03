import { client } from "/libs/client";

import Layout from '/src/component/Layout';
import SideBar from '/src/component/SideBar';
import CardContainer from '/src/component/CardContainer';



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
        <Layout>
            <CardContainer
                blog={blog}
                ttl={`カテゴリー別記事一覧：${activeCategory}`}
                totalCount={totalCount}
            />
            <SideBar category={category} tags={tags} />
        </Layout>
    )
}