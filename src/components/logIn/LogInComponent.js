import React from "react";

import "./LoginComponent.css";
import { Button, Input } from "@nextui-org/react";

import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";

import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

const LogInComponent = () => {
    const { theme } = useContext(ThemeContext);

    const [isVisible, setIsVisible] = React.useState(false);

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
                    Ingresar
                </Button>
            </div>
        </div>
    );
};

export default LogInComponent;
