import { Outlet, useLocation } from "react-router-dom";
import Header from "./pages/header";
import Footer from "./pages/footer";
import { useAuth } from "./AuthContext";
import Chat from "./pages/chat";
import { useEffect } from "react";

function Layout() {
    const { user } = useAuth();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Header />
            <main className="content">
                <Outlet />
                {user?.role !== "admin" && <Chat />}
            </main>
            <Footer />
        </>
    )
}

export default Layout