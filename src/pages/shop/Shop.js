import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider } from "@nextui-org/react";

import "./Shop.css";

import Products from "../../components/products/Products";
import ProductsFilter from "../../components/productsFilter/ProductsFilter";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import BACK_END_URL from "../../assets/BackendUrl";
import Spinner1 from "../../components/spinner/Spinner1";

const Shop = () => {
    const [originalProducts, setOriginalProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = React.useState([]);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [minPrice, setMinPrice] = useState(0);
    const { theme } = useContext(ThemeContext);

    const params = useParams();

    useEffect(() => {
        fetch(BACK_END_URL + "/products/" + params.category, {
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
        setMaxPrice(e);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e);
    };

    const handleReset = () => {
        setProducts([...originalProducts]);
        setMaxPrice(1000000);
        setMinPrice(0);
    };

    const handleFilter = () => {
        if ((maxPrice !== "") | (minPrice !== "")) {
            const filteredProducts = originalProducts.filter(
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
                {/* <Products
                    products={products}
                    brandFilter={brand}
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                /> */}
                {products.length > 0 ? (
                    <Products
                        products={products}
                        brandFilter={brand}
                        maxPrice={maxPrice}
                        minPrice={minPrice}
                    />
                ) : (
                    <Spinner1 />
                )}
            </div>
        </>
    );
};

export default Shop;
