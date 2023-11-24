import React from "react";
import "./Register.css";

import RegisterComponent from "../../components/registerComponent/RegisterComponent";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import LogInComponent from "../../components/logIn/LogInComponent";

const Register = () => {
    const { theme } = useContext(ThemeContext);

    const [RegisterLogin, setRegisterLogin] = React.useState(false);

    const toggleRegisterLogin = () => setRegisterLogin(!RegisterLogin);

    return (
        <div
            className={
                theme === "dark"
                    ? "r-container r-container-dark dark"
                    : "r-container"
            }
        >
            <div className="r-sub-container">
                {RegisterLogin === true ? (
                    <RegisterComponent
                        toggleRegisterLogin={toggleRegisterLogin}
                    />
                ) : (
                    <LogInComponent toggleRegisterLogin={toggleRegisterLogin} />
                )}
            </div>
        </div>
    );
};

export default Register;
