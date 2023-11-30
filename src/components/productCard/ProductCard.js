import React from "react";

import { Button } from "@nextui-org/react";

import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { RoleContext } from "../../services/authentication/role.context";

const ProductCard = ({ price, discount, brand, productName, image, id }) => {
    const { theme } = useContext(ThemeContext);
    const { role } = useContext(RoleContext);

    const priceDiscount = (price / 100) * (100 - discount);

    const navigate = useNavigate();

    const detallesHandler = () => {
        navigate("/detail/" + id);
    };
    const editProductHandler = () => {
        navigate("/admin/" + id);
    };

    return (
        <div
            className={
                theme === "dark"
                    ? "pc-container pc-container-dark"
                    : "pc-container"
            }
            onClick={detallesHandler}
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
            {role === 2 || role === 1 ? (
                <div className="buy-button">
                    <Button
                        className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
                        onClick={editProductHandler}
                    >
                        Editar
                    </Button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ProductCard;
