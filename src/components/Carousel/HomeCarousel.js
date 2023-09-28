import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const HomeCarousel = () => {
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
                variant="light"
            >
                <Carousel.Item>
                    <img
                        onClick={print}
                        alt="."
                        class="img-fluid"
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
                        class="img-fluid"
                        src="https://acdn.mitiendanube.com/stores/219/431/themes/rio/1-slide-1695741399440-2889794928-7fc9dd715d4c764e08e65783d0c8538d1695741420-1920-1920.webp?1560854256"
                    />
                    <Carousel.Caption>
                        <h3>Winter Sale</h3>
                        <p>Promos con todas las tarjetas</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomeCarousel;
