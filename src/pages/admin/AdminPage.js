import React, { useContext, useState } from "react";
import "./AdminPage.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { AddProduct } from "../../components/addProduct/AddProduct";
import EditProduct from "../../components/editProduct/EditProduct";
import AlertComponent from "../../components/alertComponent/AlertComponent";
import AuthService from "../../services/authentication/auth.service";

const AdminPage = () => {
    const authService = new AuthService();
    const { theme } = useContext(ThemeContext);

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

    const addProductHandler = async (product) => {
        try {
            console.log(authService.isLoggedIn());
            if (authService.isLoggedIn() !== true) {
                showAlertWithMessage(
                    "Debe Iniciar sesion para realizar esta accion",
                    "Volver"
                );
                return false;
            }

            const response = await fetch("https://localhost:7254/products", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${authService.getSession().token}`,
                },
                body: JSON.stringify({
                    id: 0,
                    brand: product.brand,
                    productName: product.productName,
                    category: product.category,
                    sizes: product.sizes,
                    price: product.price,
                    discount: product.discount,
                    image: product.image,
                    isNewArticle: product.isNewArticle,
                }),
            });

            if (response.status === 201) {
                const product = await response.json();
                console.log(product, response.status);
                showAlertWithMessage("Producto cargado con exito", "Continuar");
                return product;
            } else {
                showAlertWithMessage(
                    "Hubo un problema al intentar cargar el Producto",
                    "Volver" 
                );
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            showAlertWithMessage(
                "Hubo un problema al intentar cargar el Producto",
                "Volver"
            );
            console.log(error);
        }
    };

    const editProductHandler = async (product) => {
        try {
            const response = await fetch("https://localhost:7254/products", {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    id: product.id,
                    brand: product.brand,
                    productName: product.productName,
                    category: product.category,
                    sizes: product.sizes,
                    price: product.price,
                    discount: product.discount,
                    image: product.image,
                    isNewArticle: product.isNewArticle,
                }),
            });
            if (response.status === 200) {
                const product = await response.json();
                console.log(product, response.status);
                showAlertWithMessage("Producto cargado con exito", "Continuar");
                return product;
            } else {
                showAlertWithMessage(
                    "Problemas al intentar editar el producto",
                    "Volver"
                );
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            showAlertWithMessage(
                "Problemas al intentar editar el producto",
                "Volver"
            );
            console.log(error);
        }
    };

    return (
        <div
            className={
                theme === "dark"
                    ? "ap-container ap-container-dark dark"
                    : "ap-container"
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
            <div className="ap-sub-container">
                <h1 className="">AdminPage</h1>
                <AddProduct onProductAdded={addProductHandler} />
                <EditProduct onProductEdit={editProductHandler} />
            </div>
        </div>
    );
};

export default AdminPage;
