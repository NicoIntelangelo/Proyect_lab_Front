import React, { useState } from "react";

import "./RegisterComponent.css";
import { Button, Input } from "@nextui-org/react";
import { ThemeContext } from "../../services/theme/theme.context";

import { useContext } from "react";
import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";

const RegisterComponent = ({ toggleRegisterLogin, onUserAdded }) => {
    const { theme } = useContext(ThemeContext);

    const [isVisible, setIsVisible] = React.useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    };

    const changeUserNameHandler = (event) => {
        setUserName(event.target.value);
    };

    const addUserHandler = (event) => {
        event.preventDefault();
        const newUser = {
            id: 0,
            name: userName,
            username: userName,
            email: email,
            password: password,
        };
        onUserAdded(newUser);
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <div
            className={
                theme === "dark"
                    ? "rc-container rc-container-dark dark"
                    : "rc-container"
            }
        >
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
                    />
                </div>
            </div>
            <div className="r-buttons">
                <Button
                    onClick={addUserHandler}
                    radius="full"
                    className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
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
