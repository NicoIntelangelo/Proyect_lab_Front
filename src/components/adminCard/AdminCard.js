import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminCard.css";

const AdminCard = ({ name, id }) => {
  const navigate = useNavigate();

  const editAdminHandler = () => {
    navigate("/superadmin/" + id);
  };
  return (
    <div key={id} className="admin-card">
      <div>
        <div className="admin-name">Nombre de admin:</div>
        <div> {name}</div>
      </div>
      <Button
        onClick={editAdminHandler}
        className="edit-admin-button bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
      >
        Editar
      </Button>
    </div>
  );
};

export default AdminCard;
