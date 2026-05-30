import { Outlet } from "react-router-dom";
import Header from "./pages/header";
import Footer from "./pages/footer";
import { useAuth } from "./AuthContext";
import Chat from "./pages/chat";

function Layout(){
    const { user } = useAuth();
    return(
        <>
            <Header/>
            <main className="content">
                <Outlet/>
                {user?.role !== "admin" && <Chat />}
            </main>
            <Footer/>
        </>
    )
}

export default Layout