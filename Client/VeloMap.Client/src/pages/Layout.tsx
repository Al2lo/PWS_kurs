import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import '../styles/LayoutStyles.css';

const Layout : FC = () => {
    return <div className="body">
        <Header/>
        <div className="container">
            <Outlet/>
        </div>
        <div>Footer</div>
    </div>
}

export default Layout;