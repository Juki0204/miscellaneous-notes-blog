import { client } from "../../libs/client";

import Layout from '/src/component/Layout';
import SideBar from '/src/component/SideBar';
import CardContainer from '/src/component/CardContainer';



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
        <Layout>
            <CardContainer
                blog={blog}
                ttl={`タグ別記事一覧：${activeTags}`}
            />
            <SideBar category={category} tags={tags} />
        </Layout>
    )
}