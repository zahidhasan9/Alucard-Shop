// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import SliderImg from '../assets/images/Carousel/slider-1.jpg';
// import SliderImg2 from '../assets/images/Carousel/slider-2.jpg';
// import SliderImg3 from '../assets/images/Carousel/slider-3.jpg';

// const slides = [
//   {
//     image: SliderImg,
//     title: "Smartphones & Tablets",
//     subtitle: "Latest & Best Deals",
//     button: "Shop Now",
//   },
//   {
//     image: SliderImg2,
//     title: "Electronics & Gadgets",
//     subtitle: "Top Brands Available",
//     button: "Discover",
//   },
//   {
//     image: SliderImg3,
//     title: "New Arrivals",
//     subtitle: "Check What’s Trending",
//     button: "Explore",
//   },
// ];

// const HeroSlider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     fade: true,
//   };

//   return (
//     <div className="w-full overflow-hidden relative">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index} className="relative h-[300px] sm:h-[400px] md:h-[360px]">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute top-0 left-0 w-full h-full bg-black/10 shadow-black flex items-center">
//               <div className="px-4 sm:px-8 md:px-16 text-white space-y-3 sm:space-y-4 max-w-xl animate-fade-in-up">
//                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold opacity-0 animate-slide-in-up animation-delay-[300ms]">
//                   {slide.title}
//                 </h2>
//                 <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light opacity-0 animate-slide-in-up animation-delay-[500ms]">
//                   {slide.subtitle}
//                 </p>
//                 <button className="mt-2 sm:mt-4 bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg hover:bg-yellow-500 transition-all duration-300 opacity-0 animate-slide-in-up animation-delay-[700ms]">
//                   {slide.button}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default HeroSlider;


import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SliderImg from '../assets/images/Carousel/slider-1.jpg';
import SliderImg2 from '../assets/images/Carousel/slider-2.jpg';
import SliderImg3 from '../assets/images/Carousel/slider-3.jpg';

const slides = [
  {
    image: SliderImg,
    title: 'Smartphones & Tablets',
    subtitle: 'Latest & Best Deals',
    button: 'Shop Now',
  },
  {
    image: SliderImg2,
    title: 'Electronics & Gadgets',
    subtitle: 'Top Brands Available',
    button: 'Discover',
  },
  {
    image: SliderImg3,
    title: 'New Arrivals',
    subtitle: 'Check What’s Trending',
    button: 'Explore',
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: slides.length > 1,
    autoplay: slides.length > 1,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: true,
  };

  return (
    <section className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={slide.title} className="relative">
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[380px] lg:h-[520px]">
              <img
                src={slide.image}
                alt={slide.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding={index === 0 ? 'sync' : 'async'}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xl text-white">
                    <h2 className="text-3xl font-bold sm:text-5xl">
                      {slide.title}
                    </h2>

                    <p className="mt-3 text-base sm:text-xl">
                      {slide.subtitle}
                    </p>

                    <button
                      type="button"
                      className="mt-6 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                    >
                      {slide.button}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;