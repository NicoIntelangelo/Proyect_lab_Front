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

export const AddProduct = ({ onProductAdded }) => {
    const { theme } = useContext(ThemeContext);

    const [sizesList, setSizesList] = React.useState([]);
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

    const addProductHandler = (event) => {
        event.preventDefault();
        const newProduct = {
            id: 0,
            brand: brand,
            productName: productName,
            category: category,
            talles: sizes,
            price: price,
            discount: discount,
            image: image,
            newArticle: newArticle,
        };
        onProductAdded(newProduct);
        console.log(newProduct);
    };

    return (
        <div
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
            <h2 className="mt-0 ">Cargar Producto</h2>

            <div className="ap-product-name">
                <Input
                    label="Nombre"
                    variant="bordered"
                    placeholder="Cargar Nombre del producto"
                    //className="max-w-s"
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
            </div>

            <div className="addp-product-size">
                <CheckboxGroup
                    label="Seleccione talles disponibles"
                    color="primary"
                    value={sizesList}
                    onValueChange={setSizesList}
                    orientation="horizontal"
                >
                    <Checkbox value="m">M</Checkbox>
                    <Checkbox value="s">S</Checkbox>
                    <Checkbox value="l">L</Checkbox>
                    <Checkbox value="xl">XL</Checkbox>
                    <Checkbox value="xxl">XXL</Checkbox>
                </CheckboxGroup>
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
