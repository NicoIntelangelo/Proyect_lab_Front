import "./Home.css";

import HomeCarousel from "../../components/Carousel/HomeCarousel";
import ProductCard from "../../components/productCard/ProductCard";
import { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";
import InfoBaner from "../../components/infoBaner/InfoBaner";

const Home = () => {
    const [newProducts, setNewProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/products/new", {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((products) => {
                setNewProducts(products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const newProductsList = newProducts.map((product) => (
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

    return (
        <div>
            <HomeCarousel />
            <section class="info-section">
                <InfoBaner />
            </section>
            <section class="trend-products">
                <h2 class="new-in">New In</h2>
                <div class="trend-products-container">
                    <CardSlider>{newProductsList}</CardSlider>
                </div>
            </section>
        </div>
    );
};

export default Home;
