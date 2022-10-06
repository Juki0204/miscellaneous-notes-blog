import Link from 'next/link';
import Image from 'next/image';


export default function Header(){
    return (
        <header>
                <h1>
                    <Link href="/">
                        <a>
                            <Image
                                width={96}
                                height={50}
                                alt="ヘッダーアイコン"
                                src="/img/header_icon.png"
                            />
                        </a>
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
                        display: flex;
                        justify-content: center;
                    }

                    a{
                        display: block;
                        padding: 5px;
                    }

                `}</style>
            </header>
    )
}

