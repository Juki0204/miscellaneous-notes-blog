import Link from 'next/link';


export default function Header(){
    return (
        <header>
                <h1>
                    <Link href="/">
                    <a>Next.js＋microCMSで作るブログ</a>
                    </Link>
                </h1>

                <style jsx>{`
                    header{
                        width: 100%;
                        height: 60px;
                        position: fixed;
                        top: 0;
                        background: #fff;
                        box-shadow: 0 0 3px #999;
                        z-index: 10;
                    }
                
                    h1{
                        margin: 0;
                        font-size: 24px;
                        line-height: 60px;
                        padding-left: 20px;
                        white-space: nowrap;
                    }

                    @media screen and (max-width:767px){
                        h1{
                            padding: 0;
                            text-align: center;
                        }
                    }
                `}</style>
            </header>
    )
}

