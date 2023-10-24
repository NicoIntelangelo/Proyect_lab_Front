import React from "react";
import "./Register.css";

import RegisterComponent from "../../components/registrarse/RegisterComponent";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import LogInComponent from "../../components/logIn/LogInComponent";
import { useCallback } from "react";

const Register = () => {
    const { theme } = useContext(ThemeContext);

    const [RegisterLogin, setRegisterLogin] = React.useState(false);

    const toggleRegisterLogin = () => setRegisterLogin(!RegisterLogin);

    const addUserHandler = useCallback((user) => {
        fetch("http://localhost:8080/auth/create", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id: 0,
                name: user.name,
                username: user.name,
                email: user.email,
                password: user.password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(
                        "Error en la solicitud: " +
                            response.status +
                            " " +
                            response.statusText
                    );
                    throw new Error("La respuesta del servidor no fue exitosa");
                }
            })

            .catch((error) => console.log(error));
    }, []);

    return (
        <div
            class={
                theme === "dark"
                    ? "r-container r-container-dark dark"
                    : "r-container"
            }
        >
            <div class="r-sub-container">
                {RegisterLogin === true ? (
                    <RegisterComponent
                        toggleRegisterLogin={toggleRegisterLogin}
                        onUserAdded={addUserHandler}
                    />
                ) : (
                    <LogInComponent toggleRegisterLogin={toggleRegisterLogin} />
                )}
            </div>
        </div>
    );
};

export default Register;
