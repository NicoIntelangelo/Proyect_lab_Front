import React, { useState } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";

import "./AddProduct.css";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";

import { categories } from "../../assets/productConfig/Categories";
import AlertComponent from "../alertComponent/AlertComponent";
import AuthService from "../../services/authentication/auth.service";
import BACK_END_URL from "../../assets/BackendUrl";

export const AddProduct = () => {
    const authService = new AuthService();
    const { theme } = useContext(ThemeContext);

    const [renderKey, setRenderKey] = useState(0); // Agregar un estado para forzar la renderización

    const [sizesList, setSizesList] = useState([]);
    const sizes = sizesList.join(", ");

    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [image, setImage] = useState("");
    const [newArticle, setNewArticle] = useState(false);

    const changeBrandHandler = (event) => {
        setBrand(event.target.value);
    };
    const changeProductNameHandler = (event) => {
        setProductName(event.target.value);
    };
    const changeCategoryHandler = (event) => {
        setCategory(event.target.value);
    };
    const changePriceHandler = (event) => {
        setPrice(parseFloat(event.target.value));
    };
    const changeDiscountHandler = (event) => {
        setDiscount(parseFloat(event.target.value));
    };
    const changeImageHandler = (event) => {
        setImage(event.target.value);
    };

    const clearForm = () => {
        setImage("");
        setBrand("");
        setProductName("");
        setCategory("");
        setPrice(0);
        setDiscount(0);
        setNewArticle(false);
        setSizesList([]);
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

            const response = await fetch(BACK_END_URL + "/products", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${authService.getSession().token}`,
                },
                body: JSON.stringify({
                    id: 0,
                    brand: brand,
                    productName: productName,
                    category: category,
                    sizes: sizes,
                    price: price,
                    discount: discount,
                    image: image,
                    isNewArticle: newArticle,
                }),
            });

            if (response.status === 201) {
                const product = await response.json();
                console.log(product, response.status);
                showAlertWithMessage("Producto cargado con exito", "Continuar");
                clearForm();
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

    return (
        <div
            key={renderKey}
            className="addp-container"
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
            <h2 className="mt-0 ">Cargar Producto</h2>

            <div className="ap-product-name">
                <Input
                    label="Nombre"
                    variant="bordered"
                    placeholder="Cargar Nombre del producto"
                    onChange={changeProductNameHandler}
                />
            </div>

            <div className="addp-brand-name">
                <Input
                    label="Marca"
                    variant="bordered"
                    placeholder="Cargar Marca del producto"
                    className="max-w-xs"
                    onChange={changeBrandHandler}
                />
            </div>

            <div className="addp-categories">
                <Select
                    label="Categoria"
                    variant="bordered"
                    placeholder="Seleccionar categoría del producto"
                    className="max-w-xs"
                    onChange={changeCategoryHandler}
                >
                    {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className="addp-price">
                <Input
                    variant="bordered"
                    type="number"
                    label="Precio"
                    placeholder="0.00"
                    className="max-w-xs"
                    onChange={changePriceHandler}
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                                $
                            </span>
                        </div>
                    }
                />
            </div>

            <div className="addp-discount">
                <Input
                    min="0"
                    max="100"
                    variant="bordered"
                    type="number"
                    label="Descuento"
                    placeholder="0"
                    className="max-w-xs"
                    onChange={changeDiscountHandler}
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                                %
                            </span>
                        </div>
                    }
                />
            </div>

            <div className="addp-product-image">
                <Input
                    label="Link Imagen"
                    variant="bordered"
                    placeholder="Cargar link de la imagen del producto"
                    className="max-w-xs"
                    onChange={changeImageHandler}
                />
                {image.length > 0 ? (
                    <>
                        <img id="addp-img-preview" alt="" src={image} />
                    </>
                ) : (
                    <></>
                )}
            </div>

            <div className="addp-product-size">
                {category === "" ? (
                    <CheckboxGroup
                        label="Eslegir categoría para desplegar talles"
                        color="primary"
                        value={sizesList}
                        onValueChange={setSizesList}
                        orientation="horizontal"
                    ></CheckboxGroup>
                ) : category === "zapatillas" ? (
                    <CheckboxGroup
                        label="Seleccione talles disponibles"
                        color="primary"
                        value={sizesList}
                        onValueChange={setSizesList}
                        orientation="horizontal"
                    >
                        <Checkbox value="35">35</Checkbox>
                        <Checkbox value="36">36</Checkbox>
                        <Checkbox value="37">37</Checkbox>
                        <Checkbox value="38">38</Checkbox>
                        <Checkbox value="39">39</Checkbox>
                        <Checkbox value="40">40</Checkbox>
                        <Checkbox value="41">41</Checkbox>
                        <Checkbox value="42">42</Checkbox>
                        <Checkbox value="43">43</Checkbox>
                        <Checkbox value="44">44</Checkbox>
                        <Checkbox value="45">45</Checkbox>
                    </CheckboxGroup>
                ) : (
                    <CheckboxGroup
                        label="Seleccione talles disponibles"
                        color="primary"
                        value={sizesList}
                        onValueChange={setSizesList}
                        orientation="horizontal"
                    >
                        <Checkbox value="s">S</Checkbox>
                        <Checkbox value="m">M</Checkbox>
                        <Checkbox value="l">L</Checkbox>
                        <Checkbox value="xl">XL</Checkbox>
                        <Checkbox value="xxl">XXL</Checkbox>
                    </CheckboxGroup>
                )}
            </div>

            <div className="addp-product-new">
                <Checkbox isSelected={newArticle} onValueChange={setNewArticle}>
                    Colocar en la seccion New
                </Checkbox>
            </div>

            <Button
                onClick={addProductHandler}
                radius="full"
                className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
            >
                Cargar
            </Button>
        </div>
    );
};
