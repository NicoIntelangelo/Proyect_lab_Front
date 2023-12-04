import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../services/theme/theme.context";
import AlertComponent from "../alertComponent/AlertComponent";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
} from "@nextui-org/react";
import "./EditUser.css";

import BACK_END_URL from "../../assets/BackendUrl";
import AuthService from "../../services/authentication/auth.service";
import { jwtDecode } from "jwt-decode";

const EditUser = () => {
    const authService = new AuthService();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const editUser = jwtDecode(authService.getSession().token);

    const [userName, setuserName] = useState("");
    const [userDirection, setuserDirection] = useState("");

    const changeuserDirectionHandler = (event) => {
        setuserDirection(event.target.value);
    };
    const changeuserNameHandler = (event) => {
        setuserName(event.target.value);
    };

    //////////////////////////////////////////////////////////////////////////////
    const [alertMessage, setAlertMessage] = useState("");
    const [alertButtonMessage, setAlertButtonMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertAction, setShowAlertAction] = useState(false);

    const showAlertWithMessage = (message, buttonMessage) => {
        setAlertMessage(message);
        setAlertButtonMessage(buttonMessage);
        setShowAlert(true);
    };

    const showAlertWithMessageAction = (message, buttonMessage) => {
        setAlertMessage(message);
        setAlertButtonMessage(buttonMessage);
        setShowAlertAction(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    const handleCloseAction = () => {
        setShowAlertAction(false);
        navigate("/home");
        authService.resetSession();
    };

    //////////////////////////////////////////////////////////////////////////

    const editUserHandler = async () => {
        try {
            const response = await fetch(
                BACK_END_URL + "/user/" + editUser.sub,
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${
                            authService.getSession().token
                        }`,
                    },
                    body: JSON.stringify({
                        id: editUser.sub,
                        name: userName,
                        direction: userDirection,
                    }),
                }
            );
            if (response.status === 200) {
                const user = await response.json();
                console.log(user);
                showAlertWithMessage("Usuario editado con exito", "Continuar");
                return user;
            } else {
                showAlertWithMessage(
                    "Problemas al intentar editar el usuario",
                    "Volver"
                );
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            showAlertWithMessage(
                "Problemas al intentar editar el usuario",
                "Volver"
            );
            console.log(error);
        }
    };

    const deleteUserHandler = async () => {
        try {
            const response = await fetch(
                BACK_END_URL + "/user/" + editUser.sub,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${
                            authService.getSession().token
                        }`,
                    },
                }
            );
            if (response.status === 200) {
                showAlertWithMessageAction(
                    "El usuario se eliminó con exito",
                    "Continuar"
                );
            } else {
                showAlertWithMessage(
                    "Problemas al intentar eliminar el usuario",
                    "Volver"
                );
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            showAlertWithMessage(
                "Problemas al intentar eliminar el usuario",
                "Volver"
            );
            console.log(error);
        }
    };

    return (
        <div
            className={
                theme === "dark"
                    ? "eu-container eu-container-dark dark"
                    : "eu-container"
            }
        >
            <div>
                {showAlert && (
                    <AlertComponent
                        message={alertMessage}
                        buttonMessage={alertButtonMessage}
                        onClose={closeAlert}
                    ></AlertComponent>
                )}
                {showAlertAction && (
                    <AlertComponent
                        message={alertMessage}
                        buttonMessage={alertButtonMessage}
                        onClose={closeAlert}
                    >
                        <Button
                            radius="full"
                            className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
                            onClick={handleCloseAction}
                        >
                            Continuar
                        </Button>
                    </AlertComponent>
                )}
            </div>

            <div
                className={
                    theme === "dark"
                        ? "eu-sub-container eu-sub-container-dark dark"
                        : "eu-sub-container"
                }
            >
                <h2 className="eu-title">Editar mis datos</h2>

                <div className="eu-name">
                    <Input
                        label="Nombre"
                        variant="bordered"
                        placeholder="Editar nombre del user"
                        onChange={changeuserNameHandler}
                        value={userName}
                    />
                </div>

                <div className="eu-direction">
                    <Input
                        label="Dirección"
                        variant="bordered"
                        placeholder="Editar dirección del user"
                        onChange={changeuserDirectionHandler}
                        value={userDirection}
                    />
                </div>

                <div className="eu-button"></div>
                <Dropdown aria-label="Options Dropdown">
                    <DropdownTrigger>
                        <Button className="button bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg">
                            Opciones
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Options Dropdown">
                        <DropdownItem
                            key="edited"
                            onClick={editUserHandler}
                            aria-labelledby="menu-label"
                        >
                            Cargar Edición
                        </DropdownItem>

                        <DropdownItem
                            key="deleted"
                            className="delete-item"
                            color="danger"
                            aria-labelledby="menu-label"
                            onClick={deleteUserHandler}
                        >
                            Eliminar User
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default EditUser;
