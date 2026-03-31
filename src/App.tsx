import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import Classes from "./pages/classes";
import Trainers from "./pages/trainers";
import Prices from "./pages/prices";
import Contact from "./pages/contact";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element = {<Layout/>}>
                    <Route path = "/" element = {<Home/>}/>
                    <Route path = "/classes" element = {<Classes/>}/>
                    <Route path = "/trainers" element = {<Trainers/>}/>
                    <Route path = "/prices" element = {<Prices/>}/>
                    <Route path = "/contact" element = {<Contact/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App