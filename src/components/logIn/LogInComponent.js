import React from "react";

import "./LoginComponent.css";
import { Button, Input } from "@nextui-org/react";

import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";

import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { useState } from "react";

const LogInComponent = ({ toggleRegisterLogin, authentication }) => {
    const { theme } = useContext(ThemeContext);

    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    };

    const authenticateUser = (event) => {
        event.preventDefault();
        const authUser = {
            email: email,
            password: password,
        };
        authentication(authUser);
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <div
            class={
                theme === "dark"
                    ? "l-container l-container-dark dark"
                    : "l-container"
            }
        >
            <h2>Ingresar</h2>
            <div class="l-input-container">
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
            <div class="l-buttons">
                <Button
                    onClick={authenticateUser}
                    radius="full"
                    className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
                >
                    Ingresar
                </Button>
                <p className=" button" onClick={toggleRegisterLogin}>
                    Registrarme
                </p>
            </div>
        </div>
    );
};

export default LogInComponent;
