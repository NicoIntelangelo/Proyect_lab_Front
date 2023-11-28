import React from "react";

import "./LoginComponent.css";
import { Button, Input } from "@nextui-org/react";

import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";

import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authentication/auth.service";
import { RoleContext } from "../../services/authentication/role.context";
import AlertComponent from "../alertComponent/AlertComponent";

const LogInComponent = ({ toggleRegisterLogin, authentication }) => {
    const { theme } = useContext(ThemeContext);
    const { setRole } = useContext(RoleContext);
    const authService = new AuthService();
    const navigate = useNavigate();

    //////////////////////////////////////////////////////////////////////////////
    const [alertMessage, setAlertMessage] = useState("");
    const [alertButtonMessage, setAlertButtonMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const showAlertWithMessage = (message, buttonMessage) => {
        setAlertMessage(message);
        setAlertButtonMessage(buttonMessage);
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    //////////////////////////////////////////////////////////////////////////

    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    };

    const authenticateUser = async () => {
        try {
            if (password.length <= 0 || email.length <= 0) {
                showAlertWithMessage(
                    "Ingrese todos los datos para poder ingresar",
                    "Volver"
                );
                return false;
            }
            const response = await fetch(
                "http://e-commerce1.somee.com/auth/authenticate",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );

            if (response.ok) {
                const token = await response.text();
                console.log(token);

                if (!token) return false;

                authService.setSession(token);

                const roleResponse = await fetch(
                    "http://e-commerce1.somee.com/user/role",
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${
                                authService.getSession().token
                            }`,
                        },
                    }
                );
                const role = await roleResponse.json();
                setRole(role);

                console.log(role);
                console.log(token, response.status);
                navigate("/home");
                return token;
            } else {
                showAlertWithMessage(
                    "Hubo un problema al intentar ingresar, intentar nuevamente",
                    "Volver"
                );
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            console.log(error);
            showAlertWithMessage(
                "Hubo un problema al intentar ingresar, intentar nuevamente",
                "Volver"
            );
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <div
            className={
                theme === "dark"
                    ? "l-container l-container-dark dark"
                    : "l-container"
            }
        >
            <div>
                {showAlert && (
                    <AlertComponent
                        message={alertMessage}
                        buttonMessage={alertButtonMessage}
                        onClose={closeAlert}
                    />
                )}
            </div>
            <h2>Ingresar</h2>
            <div className="l-input-container">
                <div id="l-email">
                    <Input
                        label="Email"
                        variant="bordered"
                        placeholder="Ingrese su Email"
                        className="max-w-xs"
                        onChange={changeEmailHandler}
                    />
                </div>
                <div id="l-password">
                    <Input
                        label="Contraseña"
                        variant="bordered"
                        placeholder="Ingrese su Contraseña"
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs"
                        onChange={changePasswordHandler}
                    />
                </div>
            </div>
            <div className="l-buttons">
                <Button
                    onClick={authenticateUser}
                    radius="full"
                    className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
                >
                    Ingresar
                </Button>
                <p className=" button l-p" onClick={toggleRegisterLogin}>
                    Registrarme
                </p>
            </div>
        </div>
    );
};

export default LogInComponent;
