import "./Home.css";

import HomeCarousel from "../../components/Carousel/HomeCarousel";
import ProductCard from "../../components/productCard/ProductCard";
import { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";

const Home = () => {
    const [newProducts, setNewProducts] = useState([]);
    useEffect(() => {
        fetch("https://6511a862b8c6ce52b394da9b.mockapi.io/product", {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((products) => {
                const fiteredProducts = products.filter((p) => p.new === true);
                setNewProducts(fiteredProducts);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const newProductsList = newProducts.map((product) => (
        <ProductCard
            key={product.id}
            price={product.price}
            discount={product.discount}
            brand={product.brand}
            productName={product.productName}
            image={product.image}
        />
    ));

    return (
        <div>
            <HomeCarousel />
            <section class="info-section">
                <div class="info-section-container"></div>
            </section>
            {/* <section class="trend-products">
                <div class="trend-products-container">{newProductsList}</div>
            </section> */}
            <CardSlider>{newProductsList}</CardSlider>
        </div>
    );
};

export default Home;
