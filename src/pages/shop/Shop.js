import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider } from "@nextui-org/react";

import "./Shop.css";

import Products from "../../components/products/Products";
import ProductsFilter from "../../components/productsFilter/ProductsFilter";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = React.useState([]);
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
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params]);

    return (
        <>
            <div
                class={
                    theme === "dark"
                        ? "shop-container shop-container-dark dark"
                        : "shop-container"
                }
            >
                <ProductsFilter brand={brand} setBrand={setBrand} />
                <Divider orientation="vertical" />
                <Products products={products} brandfilter={brand} />
            </div>
        </>
    );
};

export default Shop;
