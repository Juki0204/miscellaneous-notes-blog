import Header from '/src/component/base/Header';
import Footer from '/src/component/base/Footer';
// import Image from 'next/image';


export default function Layout({children}){
    return (
        <>
            <Header />
                <main>
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