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
                        <h3>First slide label</h3>
                        <p>
                            Nulla vitae elit libero, a pharetra augue mollis
                            interdum.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        onClick={print}
                        alt="."
                        class="img-fluid"
                        src="https://acdn.mitiendanube.com/stores/219/431/themes/rio/1-slide-1693522291682-6746997536-4707a8e1093671d2aaf12e6833440e421693522310-1920-1920.webp?1032368351"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        onClick={print}
                        alt="."
                        class="img-fluid"
                        src="https://acdn.mitiendanube.com/stores/219/431/themes/rio/1-slide-1693522291682-6746997536-4707a8e1093671d2aaf12e6833440e421693522310-1920-1920.webp?1032368351"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomeCarousel;
