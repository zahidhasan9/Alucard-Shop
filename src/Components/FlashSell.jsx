// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { Star } from 'lucide-react';
// import TimerCount from './utility/TimerCount';

// // Image imports
// import FlashSell1 from '../assets/images/FlashSell/Flashsell1.webp';
// import FlashSell2 from '../assets/images/FlashSell/Flashsell2.jpg';
// import FlashSell3 from '../assets/images/FlashSell/Flashsell3.webp';
// import FlashSell4 from '../assets/images/FlashSell/Flashsell4.webp';
// import FlashSell5 from '../assets/images/FlashSell/FlashSell5.jpg';

// const deals = [
//   {
//     id: 1,
//     name: 'Edifier R1280T Powered Bookshelf Speakers',
//     price: 85.62,
//     originalPrice: 320.54,
//     soldBy: 'Young Music Shop',
//     rating: 5,
//     reviews: 1,
//     image: FlashSell1
//   },
//   {
//     id: 2,
//     name: 'Samsung UHD TV 24inch',
//     price: 589.99,
//     originalPrice: 599.6,
//     soldBy: 'GameWorld UK',
//     rating: 5,
//     reviews: 2,
//     image: FlashSell2
//   },
//   {
//     id: 3,
//     name: 'DJI Phantom 4 Quadcopter Camera, White',
//     price: 945.99,
//     originalPrice: 12975,
//     soldBy: 'DigitalWorld US',
//     rating: 5,
//     reviews: 3,
//     image: FlashSell3
//   },
//   {
//     id: 4,
//     name: 'LG White Front Load Steam Washer',
//     price: 10025.5,
//     originalPrice: 10429.7,
//     soldBy: 'Global Store',
//     rating: 5,
//     reviews: 2,
//     image: FlashSell4
//   },
//   {
//     id: 5,
//     name: 'Aple Series 5pro  Smart Watch',
//     price: 4999,
//     originalPrice: 5499,
//     soldBy: 'TechHub',
//     rating: 4,
//     reviews: 10,
//     image: FlashSell5
//   }
// ];

// const DealOfTheDay = () => {
//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1
//         }
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };

//   return (
//     <div className="container bg-white overflow-hidden">
//       <div className="font-Work_sans mx-auto py-12 px-4">
//         <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 mb-8">
//           <div className="flex gap-x-6 items-center justify-between md:justify-start w-full md:w-2/3">
//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Deals of the Day</h2>
//             <TimerCount />
//           </div>
//           <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-800 transition mt-4 md:mt-0">
//             View All
//           </a>
//         </div>
//         <Slider {...settings}>
//           {deals.map((deal) => (
//             <div key={deal.id} className="px-3">
//               <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full">
//                 <div className="relative h-48 flex items-center justify-center bg-gray-50">
//                   <img src={deal.image} alt={deal.name} className="max-h-full max-w-full object-contain p-4" />
//                   <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
//                     {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% Off
//                   </span>
//                 </div>
//                 <div className="p-5">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <p className="text-xl font-bold text-green-600">${deal.price.toFixed(2)}</p>
//                     <p className="text-sm text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</p>
//                   </div>
//                   <h3 className="text-base font-medium text-blue-600 hover:text-blue-800 cursor-pointer line-clamp-2 mb-2">
//                     {deal.name}
//                   </h3>
//                   <p className="text-xs text-gray-500 mb-3">Sold By: {deal.soldBy}</p>
//                   <div className="flex items-center mb-4">
//                     {[...Array(deal.rating)].map((_, i) => (
//                       <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//                     ))}
//                     <span className="text-xs text-gray-500 ml-2">({deal.reviews})</span>
//                   </div>
//                   <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default DealOfTheDay;









import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, Sparkles, Timer } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { getFlashsellProducts } from '../features/productSlice';
import ProductCard from './Product/ProductCard';
import ProductCardSkeleton from './UI/ProductCardSkeleton';
import EmptyState from './UI/EmptyState';

const FLASH_THEME = {
  colors: {
    sectionBg: '#F7F7F5',

    black: '#0A0A0A',
    yellow: '#F7C600',

    wrapperBg: 'rgba(255,255,255,0.86)',
    cardBg: 'rgba(255,255,255,0.72)',
    cardBorder: 'rgba(10,10,10,0.07)',

    text: '#0A0A0A',
    mutedText: 'rgba(10,10,10,0.56)',

    shadow: '0 14px 40px rgba(0,0,0,0.055)',
    hoverShadow: '0 18px 50px rgba(0,0,0,0.10)',
  },
};

const getCountdown = () => {
  const now = new Date();
  const end = new Date();

  end.setHours(23, 59, 59, 999);

  const diff = Math.max(0, end - now);

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownBox = ({ label, value }) => {
  return (
    <div
      className="min-w-[64px] rounded-2xl px-3 py-2.5 text-center"
      style={{
        backgroundColor: FLASH_THEME.colors.yellow,
        color: FLASH_THEME.colors.black,
      }}
    >
      <p className="text-xl font-semibold leading-none tracking-[-0.04em]">
        {String(value).padStart(2, '0')}
      </p>

      <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] opacity-70">
        {label}
      </p>
    </div>
  );
};

const FlashSell = () => {
  const dispatch = useDispatch();

  const { flashPro = [], flashLoading, loading } = useSelector(
    state => state.product
  );

  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    if (!flashPro?.length) {
      dispatch(getFlashsellProducts());
    }
  }, [dispatch, flashPro?.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isLoading = flashLoading || (loading && !flashPro?.length);

  return (
    <section
      className="font-Work_sans"
      style={{ backgroundColor: FLASH_THEME.colors.sectionBg }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
        {/* Slim Header */}
        <div
          className="rounded-[28px] border p-2.5 backdrop-blur-xl"
          style={{
            backgroundColor: FLASH_THEME.colors.wrapperBg,
            borderColor: FLASH_THEME.colors.cardBorder,
            boxShadow: FLASH_THEME.colors.shadow,
          }}
        >
          <div
            className="flex flex-col gap-5 rounded-[22px] border px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
            style={{
              backgroundColor: FLASH_THEME.colors.cardBg,
              borderColor: FLASH_THEME.colors.cardBorder,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: FLASH_THEME.colors.yellow,
                  color: FLASH_THEME.colors.black,
                }}
              >
                <Sparkles size={21} strokeWidth={1.85} />
              </div>

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: FLASH_THEME.colors.yellow }}
                >
                  Limited Time
                </p>

                <h2
                  className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
                  style={{ color: FLASH_THEME.colors.text }}
                >
                  Flash Sale
                </h2>

                <p
                  className="mt-2 max-w-xl text-sm font-medium leading-6"
                  style={{ color: FLASH_THEME.colors.mutedText }}
                >
                  Grab premium tech deals before the day ends.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: FLASH_THEME.colors.black,
                  color: FLASH_THEME.colors.yellow,
                }}
              >
                <Timer size={16} />
                Deal ends in
              </div>

              <div className="flex gap-2">
                <CountdownBox label="Hours" value={countdown.hours} />
                <CountdownBox label="Mins" value={countdown.minutes} />
                <CountdownBox label="Secs" value={countdown.seconds} />
              </div>
            </div>
          </div>
        </div>

        {/* Product Area */}
        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : flashPro?.length ? (
            <>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.22em]"
                    style={{ color: FLASH_THEME.colors.yellow }}
                  >
                    Today’s Picks
                  </p>

                  <h3
                    className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
                    style={{ color: FLASH_THEME.colors.text }}
                  >
                    Best deals selected for you.
                  </h3>
                </div>

                <Link
                  to="/products"
                  className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
                  style={{
                    backgroundColor: FLASH_THEME.colors.black,
                    color: FLASH_THEME.colors.yellow,
                  }}
                >
                  Browse All
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {flashPro.slice(0, 8).map(product => (
                  <ProductCard
                    key={product?._id || product?.slug}
                    product={product}
                  />
                ))}
              </div>

              <div className="mt-7 text-center sm:hidden">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: FLASH_THEME.colors.black,
                    color: FLASH_THEME.colors.yellow,
                  }}
                >
                  View All Deals
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </>
          ) : (
            <div
              className="rounded-[28px] border p-6"
              style={{
                backgroundColor: FLASH_THEME.colors.wrapperBg,
                borderColor: FLASH_THEME.colors.cardBorder,
                boxShadow: FLASH_THEME.colors.shadow,
              }}
            >
              <EmptyState
                title="No flash deals"
                message="Flash sale products are not available right now."
                buttonText="Browse Products"
                buttonLink="/products"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlashSell;