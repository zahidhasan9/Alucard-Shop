import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SliderImg from '../assets/images/Carousel/slider-1.jpg';
import SliderImg2 from '../assets/images/Carousel/slider-2.jpg';
import SliderImg3 from '../assets/images/Carousel/slider-3.jpg';

const slides = [
  {
    image: SliderImg,
    title: "Smartphones & Tablets",
    subtitle: "Latest & Best Deals",
    button: "Shop Now",
  },
  {
    image: SliderImg2,
    title: "Electronics & Gadgets",
    subtitle: "Top Brands Available",
    button: "Discover",
  },
  {
    image: SliderImg3,
    title: "New Arrivals",
    subtitle: "Check What’s Trending",
    button: "Explore",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  return (
    <div className="w-full overflow-hidden relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[300px] sm:h-[400px] md:h-[360px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/10 shadow-black flex items-center">
              <div className="px-4 sm:px-8 md:px-16 text-white space-y-3 sm:space-y-4 max-w-xl animate-fade-in-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold opacity-0 animate-slide-in-up animation-delay-[300ms]">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light opacity-0 animate-slide-in-up animation-delay-[500ms]">
                  {slide.subtitle}
                </p>
                <button className="mt-2 sm:mt-4 bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg hover:bg-yellow-500 transition-all duration-300 opacity-0 animate-slide-in-up animation-delay-[700ms]">
                  {slide.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
