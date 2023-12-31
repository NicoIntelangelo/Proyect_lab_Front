import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";

const HomeCarousel = () => {
    const { theme } = useContext(ThemeContext);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const print = () => {
        console.log("imagen " + index);
    };

    return (
        <div>
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                variant={theme === "dark" ? "dark" : "light"}
            >
                <Carousel.Item>
                    <img
                        onClick={print}
                        alt="."
                        className="img-fluid"
                        src="https://acdn.mitiendanube.com/stores/219/431/themes/rio/1-slide-1693522291682-6746997536-4707a8e1093671d2aaf12e6833440e421693522310-1920-1920.webp?1032368351"
                    />
                    <Carousel.Caption>
                        <h3>Winter Sale</h3>
                        <p>Promos con todas las tarjetas</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        onClick={print}
                        alt="."
                        className="img-fluid"
                        src="https://acdn.mitiendanube.com/stores/219/431/themes/rio/2-slide-1701175037222-2958479931-b5d74172a7de5d1841f5a1fb46a561751701175043-1920-1920.webp?838414413"
                    />
                    <Carousel.Caption>
                        <h3>Winter Sale</h3>
                        <p>Promos con todas las tarjetas</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        onClick={print}
                        alt="."
                        className="img-fluid"
                        src="https://acdn.mitiendanube.com/stores/219/431/themes/rio/1-slide-1696373909121-8380962305-4fb8e8c81dda1969c08a7200e2a1b80d1696373926-1920-1920.webp?1155540372"
                    />
                    <Carousel.Caption>
                        <h3>New Season</h3>
                        <p>Promos con todas las tarjetas</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomeCarousel;
