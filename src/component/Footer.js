import Link from 'next/link';
import Image from 'next/image';

export default function Footer(){
    return (
        <footer>
            <ul>
                <li>
                    <Link href="/">
                        <a target="_blank">
                            <Image
                                src="/img/Twitter_icon.png"
                                width={32}
                                height={32}
                                alt="Twitter"
                            />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="https://github.com/Juki0204">
                        <a target="_blank">
                            <Image
                                src="/img/GitHub_icon.png"
                                width={32}
                                height={32}
                                alt="GitHub"
                            />
                        </a>
                    </Link>
                </li>
            </ul>
            <p>&copy; 2022 N.T. All rights reserved.</p>

            <style jsx>{`
                footer{
                    width: 100%;
                    background: #999;
                    padding-top: 10px;
                }

                ul{
                    display: flex;
                    justify-content: center;
                }

                li{
                    margin: 0 10px;
                }
            
                p{
                    font-size: 14px;
                    line-height: 30px;
                    color: #fff;
                    white-space: nowrap;
                    text-align: center;
                }
            `}</style>
        </footer>
    )
}

