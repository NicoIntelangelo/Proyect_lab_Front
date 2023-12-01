import React, { useContext, useEffect, useState } from "react";
import BACK_END_URL from "../../assets/BackendUrl";
import AuthService from "../../services/authentication/auth.service";
import { ThemeContext } from "../../services/theme/theme.context";
import AlertComponent from "../alertComponent/AlertComponent";
import { Button } from "@nextui-org/react";
import "./ManageAdmins.css";
import "../spinner/Spinner1";
import Spinner1 from "../spinner/Spinner1";
import AdminCard from "../adminCard/AdminCard";
import { useNavigate } from "react-router-dom";

const ManageAdmins = () => {
  const [adminList, setAdminList] = useState([]);
  const authService = new AuthService();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  //////////////////////////////////////////////////////////////////////////////
  const [alertMessage, setAlertMessage] = useState("");
  const [alertButtonMessage, setAlertButtonMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const isLoggedIn = authService.isLoggedIn();

  const showAlertWithMessage = (message, buttonMessage) => {
    setAlertMessage(message);
    setAlertButtonMessage(buttonMessage);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
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
      .then((admins) => setAdminList(admins))
      .catch((error) => console.log(error));
  }, [isLoggedIn]);

  const addAdminHandler = () => {
    navigate("/superadmin/add");
  };

  return (
    <div
      className="manage-container"
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
              onClick={closeAlert}
            >
              Continuar
            </Button>
          </AlertComponent>
        )}
      </div>
      <h2 className="list-admins-title ">Lista de Admins</h2>
      {adminList.length > 0 ? (
        <div>
          {adminList.map((admin) => (
            <AdminCard key={admin.id} name={admin.name} id={admin.id} />
          ))}
          <Button
            onClick={addAdminHandler}
            className="button bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg"
          >
            Agregar nuevo admin
          </Button>
        </div>
      ) : (
        <Spinner1 />
      )}
    </div>
  );
};
export default ManageAdmins;
