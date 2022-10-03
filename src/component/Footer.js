

export default function Footer(){
    return (
        <footer>
            <p>&copy; 2022 N.T. All rights reserved.</p>

            <style jsx>{`
                footer{
                    width: 100%;
                    height: 30px;
                    background: #eee;
                }
            
                p{
                    margin: 0;
                    font-size: 14px;
                    line-height: 30px;
                    white-space: nowrap;
                    text-align: center;
                }
            `}</style>
        </footer>
    )
}

