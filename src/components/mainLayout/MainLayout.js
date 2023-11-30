import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";

const MainLayout = () => {
    return (
        <>
            <Header />
            <div
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    zIndex: 999,
                }}
            >
                <ThemeSwitch />
            </div>
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
