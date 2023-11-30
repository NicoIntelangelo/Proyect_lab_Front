import React, { useContext } from "react";
import "./AdminPage.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { Navigate } from "react-router-dom";
import { RoleContext } from "../../services/authentication/role.context";
import { Link } from "react-router-dom";

const AdminPage = ({ children }) => {
    const { theme } = useContext(ThemeContext);
    const { role } = useContext(RoleContext);

    if (role === 2 || role === 1) {
        return (
            <div
                className={
                    theme === "dark"
                        ? "ap-container ap-container-dark dark"
                        : "ap-container"
                }
            >
                <div className="ap-sub-container">
                    <h1 className="">Gestión de productos</h1>
                    {children}
                </div>
            </div>
        );
    } else {
        return <Navigate to="/404" as={Link} />;
    }
};

export default AdminPage;
