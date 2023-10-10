import React from "react";

import "./RegisterComponent.css";
import { Button, Input } from "@nextui-org/react";
import { ThemeContext } from "../../services/theme/theme.context";

import { useContext } from "react";
import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";

const RegisterComponent = () => {
    const { theme } = useContext(ThemeContext);

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <div
            class={
                theme === "dark"
                    ? "rc-container rc-container-dark dark"
                    : "rc-container"
            }
        >
            <h2>Registrarse</h2>
            <div class="rc-input-container">
                <div id="email">
                    <Input
                        label="Email"
                        variant="bordered"
                        placeholder="Enter your email"
                        className="max-w-xs"
                    />
                </div>
                <div id="password">
                    <Input
                        label="Password"
                        variant="bordered"
                        placeholder="Enter your password"
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
                <div id="button"></div>
                <Button
                    radius="full"
                    className="col-span-2 row-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg"
                >
                    Registrarse
                </Button>
            </div>
        </div>
    );
};

export default RegisterComponent;
