import React, { useContext } from "react";
import "./AdminPage.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { Navigate } from "react-router-dom";
import { RoleContext } from "../../services/authentication/role.context";
import { Link } from "react-router-dom";
import { useState } from "react";
import BACK_END_URL from "../../assets/BackendUrl";
import { Button } from "@nextui-org/react";

const AdminPage = ({ children }) => {
    const { theme } = useContext(ThemeContext);
    const { role } = useContext(RoleContext);
    const [downloadInProgress, setDownloadInProgress] = useState(false);

    const handleDownloadPdf = () => {
        setDownloadInProgress(true);

        fetch(BACK_END_URL + "/informe/products", {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al descargar el informe");
                }
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "InformeProductos.pdf";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setDownloadInProgress(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setDownloadInProgress(false);
            });
    };

    if (role === 2 || role === 1) {
        return (
            <div
                className={
                    theme === "dark"
                        ? "ap-container ap-container-dark dark"
                        : "ap-container"
                }
            >
                <div className="ap-sub-container">
                    <h1 className="">Administrar Productos</h1>
                    {children}
                    <Button
                        radius="full"
                        className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button download-pdf-button"
                        // className="download-pdf-button"
                        onClick={handleDownloadPdf}
                        disabled={downloadInProgress}
                    >
                        <img
                            width="37"
                            src="https://img.icons8.com/fluency-systems-regular/48/export-pdf-2.png"
                            alt="export-pdf-2"
                            class={theme === "dark" ? "logo-dark" : ""}
                        />
                    </Button>
                </div>
            </div>
        );
    } else {
        return <Navigate to="/404" as={Link} />;
    }
};

export default AdminPage;
