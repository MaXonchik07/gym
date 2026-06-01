import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import Classes from "./pages/classes";
import Prices from "./pages/prices";
import Contact from "./pages/contact";
import Profile from "./pages/profile";
import { AuthProvider } from "./AuthContext";
import Yoga from "./pages/classes/yoga";
import Strength from "./pages/classes/strength";
import Cardio from "./pages/classes/cardio";
import Box from "./pages/classes/box";
import Hiit from "./pages/classes/hiit";
import Cycling from "./pages/classes/cycling";
import AcroYoga from "./pages/classes/acroYoga";
import Fullbody from "./pages/classes/fullbody";
import Bodyweight from "./pages/classes/bodyweight";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/classes" element={<Classes />} />
                        <Route path="/prices" element={<Prices />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/classes/yoga" element={<Yoga />} />
                        <Route path="/classes/strength" element={<Strength />} />
                        <Route path="/classes/cardio" element={<Cardio />} />
                        <Route path="/classes/box" element={<Box />} />
                        <Route path="/classes/hiit" element={<Hiit />} />
                        <Route path="/classes/cycling" element={<Cycling />} />
                        <Route path="/classes/acroYoga" element={<AcroYoga />} />
                        <Route path="/classes/fullbody" element={<Fullbody />} />
                        <Route path="/classes/bodyweight" element={<Bodyweight />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App