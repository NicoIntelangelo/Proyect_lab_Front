import React, { useContext, useEffect, useState, useMemo } from "react";
import BACK_END_URL from "../../assets/BackendUrl";
import AuthService from "../../services/authentication/auth.service";
import { ThemeContext } from "../../services/theme/theme.context";
import { Button } from "@nextui-org/react";
import "./ManageAdmins.css";
import Spinner1 from "../spinner/Spinner1";
import AdminCard from "../adminCard/AdminCard";
import { useNavigate } from "react-router-dom";

const ManageAdmins = () => {
    const [adminList, setAdminList] = useState([]);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const authService = useMemo(() => new AuthService(), []); // Memoize the authService instance

    const isLoggedIn = authService.isLoggedIn();

    useEffect(() => {
        const fetchAdminList = async () => {
            try {
                const response = await fetch(
                    BACK_END_URL + "/super/admins-list",
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${
                                authService.getSession().token
                            }`,
                        },
                    }
                );

                const admins = await response.json();
                setAdminList(admins);
            } catch (error) {
                console.error(error);
            }
        };

        if (isLoggedIn) {
            fetchAdminList();
        }
    }, [isLoggedIn, authService]);

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
            <h2 className="list-admins-title ">Lista de Admins</h2>
            {adminList.length > 0 ? (
                <div>
                    {adminList.map((admin) => (
                        <AdminCard
                            key={admin.id}
                            name={admin.name}
                            id={admin.id}
                        />
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
