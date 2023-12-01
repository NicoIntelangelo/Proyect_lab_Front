import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { ThemeContext } from "../../services/theme/theme.context";
import "./ProductDetail.css";
import BACK_END_URL from "../../assets/BackendUrl";
import { useCart } from "../../services/cartContext/cart.context";
import Spinner1 from "../spinner/Spinner1";
import AuthService from "../../services/authentication/auth.service";
import AlertComponent from "../alertComponent/AlertComponent";

const ProductDetail = () => {
    const [product, setProduct] = useState();
    const [talla, setTalla] = useState("");
    const params = useParams();
    const { theme } = useContext(ThemeContext);
    const { dispatch } = useCart();
    const navigate = useNavigate();
    const authService = new AuthService();

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
        navigate("/shop/all");
    };

    //////////////////////////////////////////////////////////////////////////

    function capitalize(str) {
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    const addToCartHandler = () => {
        // Verifica si el producto existe antes de agregarlo al carrito
        if (product) {
            dispatch({ type: "ADD_TO_CART", payload: product });
            navigate("/cart");
        }
    };

    const isNotLog = () => {
        showAlertWithMessage(
            "Debe Ingresar para realizar la acción",
            "Ingresar"
        );
    };

    const navigateLog = () => {
        navigate("/ingresar");
    };

    useEffect(() => {
        fetch(BACK_END_URL + "/products/id/" + params.id, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((product) => {
                setProduct(product);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params]);

    return (
        <div
            className={theme === "dark" ? "pd-container-dark" : "pd-container"}
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
                            onClick={navigateLog}
                        >
                            Ingresar
                        </Button>
                    </AlertComponent>
                )}
            </div>
            {product ? (
                <div className="pd-info">
                    <img
                        src={product.image}
                        alt="imagen de producto"
                        className="pd-image"
                    />
                    <div
                        className={
                            theme === "dark" ? "pd-details dark" : "pd-details"
                        }
                    >
                        <div className="pd-category">
                            {capitalize(product.category)}
                        </div>
                        <h1 className="pd-name">
                            {product.brand} {product.productName}
                        </h1>
                        <div className="pd-price"> ${product.price} </div>

                        <p className="label-talles">Seleccione su talle</p>

                        <RadioGroup
                            orientation="horizontal"
                            value={talla}
                            onValueChange={setTalla}
                            color="primary"
                        >
                            <Radio value="s">S</Radio>
                            <Radio value="m">M</Radio>
                            <Radio value="l">L </Radio>
                            <Radio value="xl">XL</Radio>
                        </RadioGroup>

                        <Button
                            className="button-add-to-cart bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button mt-15"
                            onClick={
                                authService.isLoggedIn()
                                    ? addToCartHandler
                                    : isNotLog
                            }
                        >
                            Agregar al carrito
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className={
                        theme === "dark"
                            ? "charge-container"
                            : "charge-container-dark"
                    }
                >
                    <Spinner1 />
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
