import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import Classes from "./pages/classes";
import Prices from "./pages/prices";
import Contact from "./pages/contact";
import Profile from "./pages/profile";
import ProfileStyled from "./pages/profile1";
import { AuthProvider } from "./AuthContext";
import YogaDetail from "./pages/classes/yoga";
import Prices1 from "./pages/prices1";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/classes" element={<Classes />} />
                        <Route path="/prices" element={<Prices1 />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/profile" element={<ProfileStyled />} />
                        <Route path="/yoga" element={<YogaDetail />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App