import React, { useState } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";

import "./EditProduct.css";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";

import { categories } from "../../assets/productConfig/Categories";
import { useEffect } from "react";

const EditProduct = ({ onProductEdit }) => {
    const { theme } = useContext(ThemeContext);

    function convertStringToList(str) {
        const elements = str.split(",").map((element) => element.trim());
        return elements;
    }

    const editProductId = 7;

    useEffect(() => {
        fetch("https://localhost:7254/products/id/" + editProductId, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((product) => {
                //setProduct(product);
                setBrand(product.brand);
                setProductName(product.productName);
                setCategory(product.category);
                setPrice(product.price);
                setDiscount(product.discount);
                setImage(product.image);
                setNewArticle(product.newArticle);
                setSizesList(convertStringToList(product.sizes));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

    const editProductHandler = (event) => {
        event.preventDefault();
        const newProduct = {
            id: editProductId,
            brand: brand,
            productName: productName,
            category: category,
            sizes: sizes,
            price: price,
            discount: discount,
            image: image,
            isNewArticle: newArticle,
        };
        onProductEdit(newProduct);
        console.log(newProduct);
    };

    return (
        <div
            className="editp-container"
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
            <h2 className="mt-0 ">Editar Producto</h2>

            <div className="ap-product-name">
                <Input
                    label="Nombre"
                    variant="bordered"
                    placeholder="Cargar Nombre del producto"
                    //className="max-w-s"
                    onChange={changeProductNameHandler}
                    value={productName}
                />
            </div>

            <div className="editp-brand-name">
                <Input
                    label="Marca"
                    variant="bordered"
                    placeholder="Cargar Marca del producto"
                    className="max-w-xs"
                    onChange={changeBrandHandler}
                    value={brand}
                />
            </div>

            {category.length > 0 ? (
                <div className="editp-categories">
                    <Select
                        label="Categoria"
                        variant="bordered"
                        placeholder="Seleccionar categoría del producto"
                        className="max-w-xs"
                        onChange={changeCategoryHandler}
                        defaultSelectedKeys={[category]}
                    >
                        {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            ) : (
                <></>
            )}

            <div className="editp-price">
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
                    value={price}
                />
            </div>

            <div className="editp-discount">
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
                    value={discount}
                />
            </div>

            <div className="editp-product-image">
                <Input
                    label="Link Imagen"
                    variant="bordered"
                    placeholder="Cargar link de la imagen del producto"
                    className="max-w-xs"
                    onChange={changeImageHandler}
                    value={image}
                />
                {image.length > 0 ? (
                    <>
                        <img id="editp-img-preview" alt="" src={image} />
                    </>
                ) : (
                    <></>
                )}
            </div>

            <div className="editp-product-size">
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

            <div className="editp-product-new">
                <Checkbox
                    isSelected={newArticle}
                    onValueChange={setNewArticle}
                    value={newArticle}
                >
                    Colocar en la seccion New
                </Checkbox>
            </div>

            <Dropdown aria-label="Options Dropdown">
                <DropdownTrigger>
                    <Button className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button">
                        Opciones
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem key="new" onClick={editProductHandler}>
                        Cargar Edición
                    </DropdownItem>

                    <DropdownItem
                        key="delete"
                        className="delete-item"
                        color="danger"
                    >
                        Eliminar Producto
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default EditProduct;
