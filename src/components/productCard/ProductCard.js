import React from "react";

import { Button } from "@nextui-org/react";

import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ price, discount, brand, productName, image, id }) => {
    const priceDiscount = (price / 100) * (100 - discount);

    const productDetail = "/detail/" + id;

    return (
        <div class="pc-container">
            <img class="pc-image" alt="" src={image} />

            <h1 class="title">
                {brand} {productName}
            </h1>
            <h4 class="price">${priceDiscount.toFixed(2)}</h4>
            <h5 class="price-compare">${price}</h5>
            <div class="buy-button">
                <Link to={productDetail}>
                    <Button
                        radius="full"
                        className="col-span-2 row-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg"
                    >
                        Comprar
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
