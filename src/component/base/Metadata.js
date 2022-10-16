import Head from 'next/head';


export default function Metadata({title, description, type}){
    return(
        <Head>
            <meta name="viewport" content="width=device-width,initial-scale=1.0" />

            <title>{`${title}｜ざくざく、ごろん。`}</title>
            <meta property="description" content={description} />
            
            <meta property="og:site_name" content="ざくざく、ごろん。"/>
            <meta property="og:title" content={`${title}｜ざくざく、ごろん。`} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content="/img/og_image.jpg" />
            {/* <meta property="og:url" content="ページの URL" />  運用するドメインが確定してから */}

            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:title" content={`${title}｜ざくざく、ごろん。`} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content="/img/og_image.jpg" />
        </Head>
    )
}