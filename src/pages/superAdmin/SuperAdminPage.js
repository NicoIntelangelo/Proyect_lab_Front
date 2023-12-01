import React, { useContext } from "react";
import "./SuperAdminPage.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { Navigate } from "react-router-dom";
import { RoleContext } from "../../services/authentication/role.context";
import { Link } from "react-router-dom";

const SuperAdminPage = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const { role } = useContext(RoleContext);

  if (role === 2) {
    return (
      <div
        className={
          theme === "dark"
            ? "sap-container sap-container-dark dark"
            : "sap-container"
        }
      >
        <div className="sap-sub-container">
          <h1 className="my-10">Gestión de administradores</h1>
          {children}
        </div>
      </div>
    );
  } else {
    return <Navigate to="/404" as={Link} />;
  }
};

export default SuperAdminPage;
