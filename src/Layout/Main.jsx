import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/NavBar/NavBar";

const Main = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname === "/login" || location.pathname === "/registration";
    return (
        <div>
            <div className="max-w-screen-2xl mx-auto">{noHeaderFooter || <NavBar></NavBar>}</div>
            <Outlet></Outlet>
            <div className="max-w-screen-2xl mx-auto">{noHeaderFooter || <Footer></Footer>}</div>
            <ScrollRestoration />
        </div>
    );
};

export default Main;