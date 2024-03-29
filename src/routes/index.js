import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Info1 from "../pages/information/Info1.jsx";
import Info2 from "../pages/information/Info2.jsx";
import Info3 from "../pages/information/Info3.jsx";
import Info4 from "../pages/information/Info4.jsx";
import Info5 from "../pages/information/Info5.jsx";
import Info7 from "../pages/information/Info7.jsx";
import Info8 from "../pages/information/Info8.jsx";
import Info9 from "../pages/information/Info9.jsx";
import Info10 from "../pages/information/Info10.jsx";
const RootRoute = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/instruction' element={<Info1/>} />
                <Route path='/instruction1' element={<Info2/>} />
                <Route path='/instruction2' element={<Info3/>} />
                <Route path='/instruction3' element={<Info4/>} />
                <Route path='/instruction4' element={<Info5/>} />
                <Route path='/instruction5' element={<Info7/>} />
                <Route path='/instruction6' element={<Info8/>} />
                <Route path='/instruction7' element={<Info9/>} />
                <Route path='/instruction8' element={<Info10/>} />
            </Routes>
        </BrowserRouter>
    )
}


export default RootRoute;