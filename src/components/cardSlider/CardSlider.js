import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./CardSlider.css";

// import required modules
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

const CardSlider = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    const width = window.innerWidth;
    var slides = 0;

    switch (true) {
        case width > 300 && width < 600:
            slides = 1;
            break;
        case width > 600 && width < 800:
            slides = 2;
            break;
        case width > 800 && width < 1200:
            slides = 3;
            break;
        case width > 1200:
            slides = 4;
            break;
        default:
            slides = 2;
    }

    return (
        <>
            <Swiper
                //onSlideChange={() => console.log("slide change")}
                modules={[Navigation, Pagination, Keyboard]}
                slidesPerView={slides}
                spaceBetween={0}
                navigation={true}
                //pagination={true}
                keyboard={true}
                className="mySwiper"
            >
                {children.map((child) => {
                    return (
                        <SwiperSlide
                            class={
                                theme === "dark"
                                    ? "swiper-slide swiper-slide-dark"
                                    : "swiper-slide"
                            }
                        >
                            {child}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export default CardSlider;
