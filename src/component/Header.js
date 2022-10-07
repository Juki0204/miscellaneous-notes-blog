import Link from 'next/link';
import Image from 'next/image';


export default function Header(){
    return (
        <header>
                <h1>
                    <Link href="/">
                        <a>
                            <Image
                                layout="fill"
                                objectFit="contain"
                                alt="ざくざく、ごろん。"
                                src="/img/header_logo.png"
                            />
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
                        display: flex;
                        justify-content: center;
                    }

                    a{
                        display: block;
                        width: 100%;
                        height: auto;
                    }

                    @media screen and (max-width:767px){
                        header{
                            height: 80px;
                        }
                    }
                `}</style>
            </header>
    )
}

