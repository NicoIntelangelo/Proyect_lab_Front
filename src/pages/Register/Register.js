import React from "react";
import "./Register.css";

import RegisterComponent from "../../components/registerComponent/RegisterComponent";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import LogInComponent from "../../components/logIn/LogInComponent";
//import { useCallback } from "react";

const Register = () => {
    const { theme } = useContext(ThemeContext);

    const [RegisterLogin, setRegisterLogin] = React.useState(false);

    const toggleRegisterLogin = () => setRegisterLogin(!RegisterLogin);

    // const addUserHandler = useCallback((user) => {
    //     fetch("http://localhost:8080/auth/create", {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             id: 0,
    //             name: user.name,
    //             username: user.name,
    //             email: user.email,
    //             password: user.password,
    //         }),
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 console.log(response.json());
    //                 return response.json();
    //             } else {
    //                 console.log(
    //                     "Error en la solicitud: " +
    //                         response.status +
    //                         " " +
    //                         response.statusText
    //                 );
    //                 throw new Error("La respuesta del servidor no fue exitosa");
    //             }
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    // const addUserHandler = async (user) => {
    //     try {
    //         const response = await fetch("http://localhost:8080/auth/create", {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 id: 0,
    //                 name: user.name,
    //                 username: user.name,
    //                 email: user.email,
    //                 password: user.password,
    //             }),
    //         });

    //         if (response.ok) {
    //             const user = await response.json();
    //             console.log(user, response.status);
    //             return user;
    //         } else {
    //             throw new Error("La respuesta del servidor no fue exitosa");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const addUserHandler = async (user) => {
        try {
            const response = await fetch("https://localhost:7254/auth", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    direction: "string",
                    password: user.password,
                    role: 0,
                }),
            });

            if (response.ok) {
                const user = await response.json();
                console.log(user, response.status);
                return user;
            } else {
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const authentication = async (user) => {
        try {
            const response = await fetch(
                "https://localhost:7254/auth/authenticate",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        email: user.email,
                        password: user.password,
                    }),
                }
            );

            if (response.ok) {
                const token = await response.text();
                console.log(token, response.status);
                console.log(token);
                return token;
            } else {
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                        onUserAdded={addUserHandler}
                    />
                ) : (
                    <LogInComponent
                        toggleRegisterLogin={toggleRegisterLogin}
                        authentication={authentication}
                    />
                )}
            </div>
        </div>
    );
};

export default Register;
