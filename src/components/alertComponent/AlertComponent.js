import React, { useContext, useState } from "react";
import "./AlertComponent.css";
import { Button } from "@nextui-org/react";
import { ThemeContext } from "../../services/theme/theme.context";
//import { ThemeContext } from "../../services/theme/theme.context";
//import { useContext } from "react";

const AlertComponent = ({ message, onClose, buttonMessage }) => {
    const { theme } = useContext(ThemeContext);
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    return (
        <div className={`custom-alert ${visible ? "show" : ""}`}>
            <div
                className={
                    theme === "dark"
                        ? "alert-content alert-content-dark"
                        : "alert-content"
                }
            >
                <span className="close" onClick={handleClose}>
                    &times;
                </span>
                <h2>{message}</h2>
                <Button
                    radius="full"
                    className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
                    onClick={handleClose}
                >
                    {buttonMessage}
                </Button>
            </div>
        </div>
    );
};

export default AlertComponent;
