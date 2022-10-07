import Card from '/src/component/Card';


export default function CardContainer({blog,ttl}) {
    console.log(ttl);
    return(
        <div className="container">
            {ttl !== undefined && (
                <h2 className="ttl">{ttl}</h2>
            )}
            {blog.length === 0 && (
                <p>該当するブログコンテンツがありません。</p>
            )}
            <ul className="card_list">
            {blog.map((blog) => (
                <Card key={blog.id} blog={blog} tags={blog.tags}/>
            ))}
            </ul>

            <style jsx>{`
                .container{
                    grid-area: container;
                    width: 900px;
                    padding: 0 20px 10px 0;
                }

                .ttl{
                    width: 100%;
                    margin: 0 auto 10px;
                }

                .card_list{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px 10px;
                }
                
                @media screen and (max-width:1000px){
                    .container{
                        width: 100%; 
                        padding: 0 0 10px;
                    } 

                    .card_list{
                        gap: 10px;
                    }
                }
            
            `}</style>
        </div>
    )
}