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

const CardSlider = ({ children }) => {
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
        className="swiper"
        modules={[Navigation, Pagination, Keyboard]}
        slidesPerView={slides}
        spaceBetween={0}
        navigation={true}
        keyboard={true}
      >
        {children.map((child, index) => {
          return (
            <SwiperSlide className="swiper-slide" key={index}>
              {child}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CardSlider;
