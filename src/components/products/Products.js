import React from "react";
import ProductCard from "../productCard/ProductCard";

const Products = ({ products }) => {
    const productsList = products.map((product) => (
        <ProductCard
            key={product.id}
            price={product.price}
            discount={product.discount}
            brand={product.brand}
            productName={product.productName}
            image={product.image}
        />
    ));

    return <div>{productsList}</div>;
};

export default Products;
