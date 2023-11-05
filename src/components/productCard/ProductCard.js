import React from "react";

import { Button } from "@nextui-org/react";

import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

const ProductCard = ({ price, discount, brand, productName, image, id }) => {
    const { theme } = useContext(ThemeContext);

    const priceDiscount = (price / 100) * (100 - discount);
    const productDetail = "/detail/" + id;

    return (
        <div
            className={
                theme === "dark"
                    ? "pc-container pc-container-dark"
                    : "pc-container"
            }
        >
            <img className="pc-image" alt="" src={image} />

            <h1 className="title">
                {brand} {productName}
            </h1>

            {discount > 0 ? (
                <>
                    <h4 className="price">${priceDiscount.toFixed(2)}</h4>
                    <h5 className="price-compare">${price.toFixed(2)}</h5>
                </>
            ) : (
                <>
                    <h4 className="price-no-discount">${price.toFixed(2)}</h4>
                </>
            )}

            <div className="buy-button">
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
