import React, { useContext } from "react";
import "./AdminPage.css";
import { ThemeContext } from "../../services/theme/theme.context";

const AdminPage = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={
                theme === "dark"
                    ? "ap-container ap-container-dark dark"
                    : "ap-container"
            }
        >
            <div className="ap-sub-container">
                <h1 className="">AdminPage</h1>
                {children}
            </div>
        </div>
    );
};

export default AdminPage;
