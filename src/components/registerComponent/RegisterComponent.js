import React, { useState } from "react";

import "./RegisterComponent.css";
import { Button, Input } from "@nextui-org/react";
import { ThemeContext } from "../../services/theme/theme.context";

import { useContext } from "react";
import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";
import AlertComponent from "../alertComponent/AlertComponent";
import BACK_END_URL from "../../assets/BackendUrl";

const RegisterComponent = ({ toggleRegisterLogin }) => {
    const { theme } = useContext(ThemeContext);
    const [renderKey, setRenderKey] = useState(0);

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

    const [isVisible, setIsVisible] = React.useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [userName, setUserName] = useState("");
    const [direction, setDirection] = useState("");

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    };
    const changePasswordConfirmHandler = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const changeUserNameHandler = (event) => {
        setUserName(event.target.value);
    };

    const changeDirectionHandler = (event) => {
        setDirection(event.target.value);
    };

    const clearForm = () => {
        setEmail("");
        setPassword("");
        setDirection("");
        setUserName("");
        setRenderKey(renderKey + 1); // Forzar la renderización del componente incrementando el valor de renderKey
    };
    const addUserHandler = async () => {
        try {
            if (password !== passwordConfirm) {
                showAlertWithMessage(
                    "Las Contraseñas no coinciden intentelo nuevamente",
                    "Volver"
                );
                return false;
            }
            const response = await fetch(BACK_END_URL + "/auth", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: userName,
                    email: email,
                    direction: direction,
                    password: password,
                    role: 0,
                }),
            });

            if (response.ok) {
                const user = await response.json();
                console.log(user, response.status);
                showAlertWithMessage("Se a registrado con exito", "Continuar");
                clearForm();
                return user;
            } else {
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            showAlertWithMessage(
                "Hubo un problema al registrarte, intentar nuevamente",
                "Volver"
            );

            console.log(error);
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <div
            key={renderKey}
            className={
                theme === "dark"
                    ? "rc-container rc-container-dark dark"
                    : "rc-container"
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
            <h2>Registrarse</h2>

            <div className="rc-input-container">
                <div id="r-user">
                    <Input
                        label="Usuario"
                        variant="bordered"
                        placeholder="Crear su nombre de usuario"
                        className="max-w-xs"
                        onChange={changeUserNameHandler}
                    />
                </div>
                <div id="r-email">
                    <Input
                        label="Email"
                        variant="bordered"
                        placeholder="Ingresar su Email"
                        className="max-w-xs"
                        onChange={changeEmailHandler}
                    />
                </div>
                <div id="r-email">
                    <Input
                        label="Dirección"
                        variant="bordered"
                        placeholder="Ingresar su Dirección"
                        className="max-w-xs"
                        onChange={changeDirectionHandler}
                    />
                </div>
                <div id="r-password">
                    <Input
                        label="Contraseña"
                        variant="bordered"
                        placeholder="Ingresar su Contraseña"
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
                <div id="r-password-confirm">
                    <Input
                        variant="bordered"
                        placeholder="Confirmar su Contraseña"
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
                        onChange={changePasswordConfirmHandler}
                    />
                </div>
            </div>
            <div className="r-buttons">
                <Button
                    onClick={addUserHandler}
                    radius="full"
                    className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
                    //isDisabled={password !== passwordConfirm ? true : false}
                >
                    Registrarme
                </Button>
                <p className=" button r-p" onClick={toggleRegisterLogin}>
                    Ingresar
                </p>
            </div>
        </div>
    );
};

export default RegisterComponent;
