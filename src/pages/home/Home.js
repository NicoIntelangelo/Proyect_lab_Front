import "./Home.css";

import HomeCarousel from "../../components/Carousel/HomeCarousel";
import ProductCard from "../../components/productCard/ProductCard";

const Home = () => {
    return (
        <div>
            <HomeCarousel />
            <section class="info-section">
                <div class="info-section-container"></div>
            </section>
            <section class="trend-products">
                <div class="trend-products-container">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </section>
        </div>
    );
};

export default Home;
