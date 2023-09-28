import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const [product, setProduct] = useState();
    const params = useParams();

    useEffect(() => {
        fetch("http://localhost:8080/products/detail/" + params.id, {
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
    }, [params]);
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
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default ProductDetail;
