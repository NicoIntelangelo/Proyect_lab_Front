import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Products from "../../components/products/Products";

const Shop = () => {
    const [products, setProducts] = useState([]);

    const params = useParams();

    useEffect(() => {
        fetch("https://6511a862b8c6ce52b394da9b.mockapi.io/product", {
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
    }, []);

    console.log(params.category);

    // useEffect(() => {
    //     fetch("https://6511a862b8c6ce52b394da9b.mockapi.io/product", {
    //         headers: {
    //             Accept: "application/json",
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((products) => {
    //             const fiteredProducts = products.filter(
    //                 (p) => p.category.lower() === params.category
    //             );

    //             setProducts(fiteredProducts);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [params]);

    return (
        <div>
            <Products products={products} />
        </div>
    );
};

export default Shop;
