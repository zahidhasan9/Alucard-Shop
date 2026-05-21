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


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SliderImg from '../assets/images/Carousel/slider-1.jpg';
import SliderImg2 from '../assets/images/Carousel/slider-2.jpg';
import SliderImg3 from '../assets/images/Carousel/slider-3.jpg';

const slides = [
  {
    image: SliderImg,
    title: 'Smartphones & Tablets',
    subtitle: 'Latest gadgets with best deals',
  },
  {
    image: SliderImg2,
    title: 'Electronics & Accessories',
    subtitle: 'Explore premium tech products',
  },
  {
    image: SliderImg3,
    title: 'New Arrivals',
    subtitle: 'Fresh products for smart shoppers',
  },
];

const Carousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[300px] overflow-hidden bg-gray-900 sm:h-[420px] lg:h-[560px]">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            active === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding={index === 0 ? 'sync' : 'async'}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 lg:px-8">
        <div className="max-w-xl text-white">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-yellow-300">
            Alucard Shop
          </p>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {slides[active].title}
          </h1>

          <p className="mt-4 text-base text-gray-100 sm:text-lg">
            {slides[active].subtitle}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex rounded-full bg-yellow-400 px-7 py-3 text-sm font-black text-black transition hover:bg-white"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full transition-all ${
              active === index ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;