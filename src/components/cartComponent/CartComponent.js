import React, { useState } from "react";
import "./CartComponent.css";
import { useCart } from "../../services/cartContext/cart.context";
import CartItemCard from "../cartItemCard/CartItemCard";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { Button } from "@nextui-org/react";
import AlertComponent from "../alertComponent/AlertComponent";
import AuthService from "../../services/authentication/auth.service";
import BACK_END_URL from "../../assets/BackendUrl";

const CartComponent = () => {
    const authService = new AuthService();
    const { theme } = useContext(ThemeContext);
    const { cart } = useCart();
    const { dispatch } = useCart();

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

    var totalQuantity = 0;
    cart.map((product) => (totalQuantity = totalQuantity + product.quantity));

    var totalPrice = 0;
    cart.map(
        (product) =>
            (totalPrice =
                totalPrice + product.discountAppliedPrice * product.quantity)
    );

    var products_ids = cart.map((product) => product.id);

    console.log(products_ids);

    const addSale = async () => {
        try {
            console.log(authService.isLoggedIn());
            if (authService.isLoggedIn() !== true) {
                showAlertWithMessage(
                    "Debe Iniciar sesion para realizar esta accion",
                    "Volver"
                );
                return false;
            }

            const response = await fetch(BACK_END_URL + "/sale", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${authService.getSession().token}`,
                },
                body: JSON.stringify({
                    prodcutsIds: products_ids,
                    price: totalPrice,
                }),
            });

            if (response.status === 201) {
                const products = await response.json();
                console.log(products, response.status);
                showAlertWithMessage(
                    "Compra Realizada exitosamente",
                    "Continuar"
                );
                dispatch({ type: "CLEAR_CART" });

                return products;
            } else {
                showAlertWithMessage(
                    "Hubo un problema al intentar realizar la compra",
                    "Volver"
                );

                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            showAlertWithMessage(
                "Hubo un problema al intentar realizar la compra",
                "Volver"
            );
            console.log(error);
        }
    };

    return (
        <div className="cart-component">
            <div>
                {showAlert && (
                    <AlertComponent
                        message={alertMessage}
                        buttonMessage={alertButtonMessage}
                        onClose={closeAlert}
                    />
                )}
            </div>
            <h2 className="cart-title">Mi Carrito</h2>

            {cart.length > 0 ? (
                <div className="cart-container">
                    <div className="cart-items-container">
                        {cart.map((product) => (
                            <div
                                className="cart-card-component"
                                key={"cart-component" + product.id}
                            >
                                <CartItemCard product={product} />
                            </div>
                        ))}
                    </div>

                    <div
                        className={
                            theme === "dark"
                                ? "total-price-container total-price-container-dark"
                                : "total-price-container"
                        }
                    >
                        <div className="title-resumen">Resumen de compra</div>

                        {totalQuantity === 1 ? (
                            <div className="title-productos">1 Producto</div>
                        ) : (
                            <div className="title-productos">
                                {totalQuantity} Productos
                            </div>
                        )}

                        <div className="total-price">Total: ${totalPrice}</div>

                        <Button
                            className="bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button finish-button"
                            onClick={addSale}
                        >
                            Comprar
                        </Button>
                    </div>
                </div>
            ) : (
                <h5 className="no-products">No hay productos en el carrito</h5>
            )}
        </div>
    );
};

export default CartComponent;
