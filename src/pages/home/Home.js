import "./Home.css";

import HomeCarousel from "../../components/Carousel/HomeCarousel";
import ProductCard from "../../components/productCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";
import InfoBaner from "../../components/infoBaner/InfoBaner";
import Spinner1 from "../../components/spinner/Spinner1";
import { ThemeContext } from "../../services/theme/theme.context";
import { Divider } from "@nextui-org/react";
import BACK_END_URL from "../../assets/BackendUrl";

const Home = () => {
    const [newProducts, setNewProducts] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetch(BACK_END_URL + "/products/new", {
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
            image={product.image}
        />
    ));

    return (
        <div
            className={
                theme === "dark"
                    ? "dark h-container-dark pb-4"
                    : "h-container pb-4"
            }
        >
            <HomeCarousel />
            <Divider className="home-divider" />
            <section className="info-section">
                <InfoBaner />
            </section>
            <Divider className="home-divider" />
            {newProductsList.length > 0 ? (
                <div className="trend-products">
                    <h2 className="new-in">New In</h2>
                    <div className="trend-products-container">
                        <CardSlider>{newProductsList}</CardSlider>
                    </div>
                </div>
            ) : (
                <Spinner1 />
            )}
        </div>
    );
};

export default Home;
