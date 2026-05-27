import { Outlet } from "react-router-dom";
import Header from "./pages/header";
import Footer from "./pages/footer";
import Chat from "./pages/chat";

function Layout(){
    return(
        <>
            <Header/>
            <main className="content">
                <Outlet/>
                <Chat />  
            </main>
            <Footer/>
        </>
    )
}

export default Layout