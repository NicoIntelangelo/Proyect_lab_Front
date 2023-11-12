import React, { useState } from "react";
import "./AlertComponent.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";

const AlertComponent = ({ message, onClose }) => {
    const { theme } = useContext(ThemeContext);
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    return (
        <div className={`custom-alert ${visible ? "show" : ""}`}>
            <div className="alert-content">
                <span className="close" onClick={handleClose}>
                    &times;
                </span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default AlertComponent;
