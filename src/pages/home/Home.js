import "./Home.css";

import HomeCarousel from "../../components/Carousel/HomeCarousel";
import ProductCard from "../../components/productCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";
import InfoBaner from "../../components/infoBaner/InfoBaner";
import Spinner1 from "../../components/spinner/Spinner1";
import { ThemeContext } from "../../services/theme/theme.context";
import { Divider } from "@nextui-org/react";

const Home = () => {
    const [newProducts, setNewProducts] = useState([]);
    const { theme } = useContext(ThemeContext);

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
        <div
            class={
                theme === "dark"
                    ? "h-container h-container-dark"
                    : "h-container"
            }
        >
            <HomeCarousel />
            <Divider class={theme === "dark" ? "dark" : "light"} />
            <section class="info-section">
                <InfoBaner />
            </section>
            <Divider class={theme === "dark" ? "dark" : "light"} />
            {newProductsList.length > 0 ? (
                <section class="trend-products">
                    <h2 class="new-in">New In</h2>
                    <div class="trend-products-container">
                        <CardSlider>{newProductsList}</CardSlider>
                    </div>
                </section>
            ) : (
                <Spinner1 />
            )}
        </div>
    );
};

export default Home;
