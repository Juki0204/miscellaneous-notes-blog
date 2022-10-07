import Header from '/src/component/Header';
import Footer from '/src/component/Footer';
// import Image from 'next/image';


export default function Layout({children}){
    return (
        <>
            <Header />
                <main>
                    {/* <div className="heading">
                        <h1>なおまる<span>の</span>徒然雑記</h1>
                    </div> */}
                    <div className="wrapper">
                        {children}
                    </div>

                <style jsx>{`
                    .wrapper {
                        min-width: 1300px;
                        width: 100%;
                        min-height: 100vh;
                        height: auto;
                        margin: 0 auto;
                        padding: 140px 0 10px;
                        display: grid;
                        grid-template-areas: "container sidebar"
                                             "pagination sidebar";
                        grid-template-columns: 900px 400px;
                        grid-template-rows: min-content auto;
                        justify-content: center;
                        background: url("/img/Common_bg_pc.jpg") top left / 100% auto repeat;
                    }

                    .heading{
                        margin-top: 60px;
                        height: 340px;
                        background: url("/img/heading_bg.jpg") center / cover no-repeat;
                        display: flex;
                        align-items: center;
                        justify-content: left;
                    }
                    
                    // h1{
                    //     padding: 0 100px 6px;
                    //     color: #fff;
                    //     font-weight: normal;
                    //     font-size: 60px;
                    //     // text-shadow: 1px 1px 1px #000, 2px 1px 1px #000, 1px 2px 1px #000;
                    //     letter-spacing: 2px;
                    //     background: rgba(0,0,0,0.6);
                    //     margin-top: 100px;
                    //     position: relative;
                    // }

                    // h1::after{
                    //     content: "";
                    //     width: calc(100% - 6px);
                    //     height: 2px;
                    //     background: #fff;
                    //     position: absolute;
                    //     bottom: 6px;
                    //     left: 0;
                    // }

                    // h1 span{
                    //     font-size: 90%;
                    //     margin: 0;
                    // }

                    @media screen and (max-width:1000px){
                        .wrapper {
                            min-width: 0;
                            padding: 110px 10px 10px;
                            grid-template-areas: "container"
                                                 "pagination"
                                                 "sidebar";
                            grid-template-columns: 100%;
                            grid-template-rows: min-content min-content min-content;
                            background: url("/img/Common_bg_sp.jpg") top left / 100% auto repeat;
                        }

                        // .heading{
                        //     height: 290px;
                        //     background: url("/img/heading_bg.jpg") -100px center / cover no-repeat;
                        // }

                        // h1{
                        //     font-size: 5vw;
                        //     padding: 0 50px 6px;
                        // }
                    }

                    @media screen and (max-width:767px){
                        .wrapper {
                            padding: 90px 10px 10px;
                        }
                    }
                
                `}</style>
                
                </main>
            <Footer />
        </>
    )
}