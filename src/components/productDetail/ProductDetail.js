import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCart } from "../../services/cartContext/cart.context";
import BACK_END_URL from "../../assets/BackendUrl";

const ProductDetail = () => {
    const [product, setProduct] = useState();
    const { dispatch } = useCart();
    const params = useParams();

    useEffect(() => {
        fetch(BACK_END_URL + "/products/id/" + params.id, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((product) => {
                setProduct(product);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.id]); // Agrega params.id como dependencia para que useEffect se ejecute cuando cambie

    const addToCartHandler = () => {
        // Verifica si el producto existe antes de agregarlo al carrito

        if (product) {
            dispatch({ type: "ADD_TO_CART", payload: product });
        }
    };

    return (
        <div>
            {product ? (
                <div>
                    <h1>
                        {product.brand} {product.productName}
                    </h1>
                    <h4>
                        $
                        {(
                            (product.price / 100) *
                            (100 - product.discount)
                        ).toFixed(2)}
                    </h4>
                    <h5>${product.price.toFixed(2)}</h5>
                    <Button onClick={addToCartHandler}>
                        Agregar a carrito
                    </Button>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default ProductDetail;
