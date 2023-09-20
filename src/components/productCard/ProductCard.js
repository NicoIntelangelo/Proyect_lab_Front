import React from "react";

import { Button } from "@nextui-org/react";

import "./ProductCard.css";

const ProductCard = () => {
    return (
        <div class="pc-container">
            <img
                class="pc-image"
                alt=""
                src="https://acdn.mitiendanube.com/stores/219/431/products/1cb680df-63c3-467c-bafb-1e649ccd4d2c-7633ef89be0e7d4cfd16935177063880-320-0.webp"
            />

            <small class="stock">En Stock</small>
            <h1 class="title">Nike Air Max </h1>
            <h4 class="price">$50.000</h4>
            <h5 class="price-compare">$70.000</h5>

            {/* <button class="buy-button">Comprar</button> */}

            <Button
                radius="full"
                className=" col-span-2 row-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg "
            >
                Comprar
            </Button>
        </div>
    );
};

export default ProductCard;
