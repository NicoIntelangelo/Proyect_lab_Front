import React from "react";
import ProductCard from "../productCard/ProductCard";
import "./Products.css";

const Products = ({ products, brandfilter }) => {
    const filteredProducts =
        brandfilter.length > 0
            ? products.filter((p) => p.brand === brandfilter[0])
            : products;

    const productsList = filteredProducts.map((product) => (
        <ProductCard
            key={product.id}
            id={product.id}
            price={product.price}
            discount={product.discount}
            brand={product.brand}
            productName={product.productName}
            image="https://acdn.mitiendanube.com/stores/219/431/products/824f0f4a-d566-4f40-812e-d2c7d9c13ac5-1910a0efe81b0c4db216935215790830-480-0.webp"
        />
    ));

    return <div className="products-grid">{productsList}</div>;
};

export default Products;
