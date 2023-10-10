import React from "react";
import "./Register.css";

import RegisterComponent from "../../components/registrarse/RegisterComponent";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import LogInComponent from "../../components/logIn/LogInComponent";

const Register = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            class={
                theme === "dark"
                    ? "r-container r-container-dark dark"
                    : "r-container"
            }
        >
            <RegisterComponent />
            <LogInComponent />
        </div>
    );
};

export default Register;
