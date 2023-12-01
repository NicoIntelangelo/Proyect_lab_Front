import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useEffect } from "react";
import BACK_END_URL from "../../assets/BackendUrl";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import "./EditAdmin.css";
import AuthService from "../../services/authentication/auth.service";

const EditAdmin = () => {
  const authService = new AuthService();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const params = useParams();
  const editAdminId = params.id;

  const [admins, setAdmins] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [adminDirection, setAdminDirection] = useState("");
  const [renderKey] = useState("");

  const changeAdminDirectionHandler = (event) => {
    setAdminDirection(event.target.value);
  };
  const changeAdminNameHandler = (event) => {
    setAdminName(event.target.value);
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

  const handleClose = () => {
    setShowAlert(false);
    navigate("/superadmin");
  };

  //////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    fetch(BACK_END_URL + "/super/admins-list", {
      method: "GET",
      headers: {
        "content-type": "application.json",
        Authorization: `Bearer ${authService.getSession().token}`,
      },
    })
      .then((response) => response.json())
      .then((admins) => {
        setAdmins(admins);
        if (admins) {
          admins.forEach((admin) => {
            if (admin.id == editAdminId) {
              setAdminName(admin.name);
              setAdminDirection(admin.direction);
            }
          });
        }
      })
      .catch((error) => console.log(error));
  }, [editAdminId]);

  const editAdminHandler = async () => {
    try {
      const response = await fetch(BACK_END_URL + "/user/" + editAdminId, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${authService.getSession().token}`,
        },
        body: JSON.stringify({
          id: editAdminId,
          name: adminName,
          direction: adminDirection,
        }),
      });
      if (response.status === 200) {
        const admin = await response.json();
        console.log(admin);
        showAlertWithMessage("Admin cargado con exito", "Continuar");
        return admin;
      } else {
        showAlertWithMessage("Problemas al intentar editar el admin", "Volver");
        throw new Error("La respuesta del servidor no fue exitosa");
      }
    } catch (error) {
      showAlertWithMessage("Problemas al intentar editar el admin", "Volver");
      console.log(error);
    }
  };

  const deleteAdminHandler = async () => {
    try {
      const response = await fetch(BACK_END_URL + "/user/" + editAdminId, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${authService.getSession().token}`,
        },
      });
      if (response.status === 200) {
        showAlertWithMessage("El admin se eliminó con exito", "Continuar");
      } else {
        showAlertWithMessage(
          "Problemas al intentar eliminar el admin",
          "Volver"
        );
        throw new Error("La respuesta del servidor no fue exitosa");
      }
    } catch (error) {
      showAlertWithMessage("Problemas al intentar eliminar el admin", "Volver");
      console.log(error);
    }
  };

  return (
    <div
      className="edit-admin-container"
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
          >
            <Button
              radius="full"
              className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
              onClick={handleClose}
            >
              Continuar
            </Button>
          </AlertComponent>
        )}
      </div>
      <h2 className="mt-0">Editar Admin ID: {editAdminId}</h2>

      <div className="admin-edit-field">
        <Input
          label="Nombre"
          variant="bordered"
          placeholder="Editar nombre del admin"
          onChange={changeAdminNameHandler}
          value={adminName}
        />
      </div>
      <div className="admin-edit-field">
        <Input
          label="Dirección"
          variant="bordered"
          placeholder="Editar dirección del admin"
          onChange={changeAdminDirectionHandler}
          value={adminDirection}
        />
      </div>
      <Dropdown aria-label="Options Dropdown">
        <DropdownTrigger>
          <Button className="button bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg">
            Opciones
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Options Dropdown">
          <DropdownItem
            key="edited"
            onClick={editAdminHandler}
            aria-labelledby="menu-label"
          >
            Cargar Edición
          </DropdownItem>

          <DropdownItem
            key="deleted"
            className="delete-item"
            color="danger"
            aria-labelledby="menu-label"
            onClick={deleteAdminHandler}
          >
            Eliminar Admin
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default EditAdmin;
