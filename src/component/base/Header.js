import Link from 'next/link';
// import Image from 'next/image';


export default function Header(){
    return (
        <header>
                <h1>
                    <Link href="/">
                        <a>
                            <img src="/img/header_logo.png" alt="ざくざく、ごろん。"/>
                        </a>
                    </Link>
                </h1>

                <style jsx>{`
                    header{
                        width: 100%;
                        height: 100px;
                        position: fixed;
                        top: 0;
                        background: #fff;
                        box-shadow: 0 0 3px #999;
                        z-index: 10;
                    }
                    
                    h1{
                        height: 100%;
                    }

                    a{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100px;
                        text-align: center;
                    }

                    img{
                        height: 100%;
                        max-width: auto;
                        width: 100%;
                        object-fit: contain;
                    }

                    @media screen and (max-width:767px){
                        header{
                            height: 80px;
                        }

                        a{
                            height: 80px;
                        }

                        img{
                            height: auto;
                            max-width: 432px;
                            width: 100%;
                        }
                    }
                `}</style>
            </header>
    )
}

