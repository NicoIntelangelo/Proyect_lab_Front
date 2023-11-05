import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider } from "@nextui-org/react";

import "./Shop.css";

import Products from "../../components/products/Products";
import ProductsFilter from "../../components/productsFilter/ProductsFilter";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

const Shop = () => {
    const [originalProducts, setOriginalProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = React.useState([]);
    const [maxPrice, setMaxPrice] = useState();
    const [minPrice, setMinPrice] = useState();
    const { theme } = useContext(ThemeContext);

    const params = useParams();

    useEffect(() => {
        fetch("http://localhost:8080/products/" + params.category, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((products) => {
                setProducts(products);
                setOriginalProducts(products); //Guardo en originalProducts para en el reset volver a tener todos los productos
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params]);

    const handleMaxPriceChange = (e) => {
        if (e.target.value !== "") {
            setMaxPrice(parseFloat(e.target.value));
        }
    };

    const handleMinPriceChange = (e) => {
        if (e.target.value !== "") {
            setMinPrice(parseFloat(e.target.value));
        }
    };

    const handleReset = () => {
        setProducts([...originalProducts]);
        setMaxPrice("");
        setMinPrice("");
    };

    const handleFilter = () => {
        if ((maxPrice !== "") | (minPrice !== "")) {
            const filteredProducts = products.filter(
                (p) =>
                    p.price - (p.price * p.discount) / 100 <= maxPrice &&
                    p.price - (p.price * p.discount) / 100 >= minPrice
            );
            setProducts(filteredProducts); // Acá se filtra por precio al tocar el botón filtrar en productsFilter
        }
    };

    return (
        <>
            <div
                className={
                    theme === "dark"
                        ? "shop-container-dark dark"
                        : "shop-container"
                }
            >
                <ProductsFilter
                    brand={brand}
                    setBrand={setBrand}
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    onMaxPriceChange={handleMaxPriceChange}
                    onMinPriceChange={handleMinPriceChange}
                    onFilter={handleFilter}
                    onReset={handleReset}
                />
                <Divider orientation="vertical" />
                <Products
                    products={products}
                    brandFilter={brand}
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                />
            </div>
        </>
    );
};

export default Shop;
