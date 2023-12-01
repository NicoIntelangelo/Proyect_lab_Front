import React, { useState } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";

import "./AddAdmin.css";
import { Button, Input } from "@nextui-org/react";
import AlertComponent from "../alertComponent/AlertComponent";
import AuthService from "../../services/authentication/auth.service";
import BACK_END_URL from "../../assets/BackendUrl";

const AddAdmin = () => {
  const authService = new AuthService();
  const { theme } = useContext(ThemeContext);

  const [renderKey, setRenderKey] = useState(0); // Agregar un estado para forzar la renderización

  const [direction, setDirection] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeDirectionHandler = (event) => {
    setDirection(event.target.value);
  };
  const changeNameHandler = (event) => {
    setName(event.target.value);
  };
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const clearForm = () => {
    setDirection("");
    setName("");
    setEmail("");
    setPassword("");
    setRenderKey(renderKey + 1); // Forzar la renderización del componente incrementando el valor de renderKey
  };

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

  const addAdminHandler = async (admin) => {
    try {
      const response = await fetch(BACK_END_URL + "/super", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${authService.getSession().token}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          direction: direction,
          password: password,
        }),
      });

      if (response.status === 201) {
        const admin = await response.json();
        console.log(admin, response.status);
        showAlertWithMessage("Admin cargado con exito", "Continuar");
        clearForm();
        return admin;
      } else {
        showAlertWithMessage(
          "Hubo un problema al intentar cargar el Admin",
          "Volver"
        );
        throw new Error("La respuesta del servidor no fue exitosa");
      }
    } catch (error) {
      showAlertWithMessage(
        "Hubo un problema al intentar cargar el Admin",
        "Volver"
      );
      console.log(error);
    }
  };

  return (
    <div
      key={renderKey}
      className="add-admin-container"
      style={
        theme === "dark"
          ? {
              borderColor: "#ffffff",
            }
          : {
              borderColor: "#000000",
            }
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
      <h2 className="mt-0 ">Agregar admin</h2>

      <div className="add-admin-field">
        <Input
          label="Nombre"
          variant="bordered"
          placeholder="Nombre del admin"
          className="max-w-xs"
          onChange={changeNameHandler}
        />
      </div>

      <div className="add-admin-field">
        <Input
          label="Email"
          variant="bordered"
          placeholder="Email del admin"
          onChange={changeEmailHandler}
        />
      </div>

      <div className="add-admin-field">
        <Input
          label="Dirección"
          variant="bordered"
          placeholder="Dirección del admin"
          className="max-w-xs"
          onChange={changeDirectionHandler}
        />
      </div>

      <div className="add-admin-field">
        <Input
          label="Contraseña"
          variant="bordered"
          placeholder="Contraseña del admin"
          onChange={changePasswordHandler}
        />
      </div>

      <Button
        onClick={addAdminHandler}
        radius="full"
        className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
      >
        Agregar
      </Button>
    </div>
  );
};

export default AddAdmin;
