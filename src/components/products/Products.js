import React from "react";
import ProductCard from "../productCard/ProductCard";
import "./Products.css";
//import { useContext } from "react";
//import { ThemeContext } from "../../services/theme/theme.context";

const Products = ({ products, brandfilter }) => {
    //const { theme } = useContext(ThemeContext);

    var filteredProducts = [];

    for (let i = 0; i < brandfilter.length; i++) {
        var brandProducts = products.filter((p) => p.brand === brandfilter[i]);
        filteredProducts = filteredProducts.concat(brandProducts);
    }
    console.log(filteredProducts);

    if (brandfilter.length > 0) {
        var productsList = filteredProducts.map((product) => (
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
    } else {
        productsList = products.map((product) => (
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
    }

    // const productsList = filteredProducts.map((product) => (
    //     <ProductCard
    //         key={product.id}
    //         id={product.id}
    //         price={product.price}
    //         discount={product.discount}
    //         brand={product.brand}
    //         productName={product.productName}
    //         image="https://acdn.mitiendanube.com/stores/219/431/products/824f0f4a-d566-4f40-812e-d2c7d9c13ac5-1910a0efe81b0c4db216935215790830-480-0.webp"
    //     />
    // ));

    return <div className="products-grid">{productsList}</div>;
};

export default Products;
