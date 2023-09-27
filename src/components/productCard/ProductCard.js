import React from "react";

import { Button } from "@nextui-org/react";

import "./ProductCard.css";

const ProductCard = ({ price, discount, brand, productName, image }) => {
    const priceDiscount = (price / 100) * (100 - discount);

    return (
        <div class="pc-container">
            <img class="pc-image" alt="" src={image} />

            <small class="stock">En Stock</small>
            <h1 class="title">
                {brand}
                {productName}
            </h1>
            <h4 class="price">${priceDiscount.toFixed(2)}</h4>
            <h5 class="price-compare">${price}</h5>

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
