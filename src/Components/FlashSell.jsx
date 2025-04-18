import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TimerCount from './utility/TimerCount';

// image import
import FlashSell1 from '../assets/images/FlashSell/Flashsell1.webp';
import FlashSell2 from '../assets/images/FlashSell/Flashsell2.jpg';
import FlashSell3 from '../assets/images/FlashSell/Flashsell3.webp';
import FlashSell4 from '../assets/images/FlashSell/Flashsell4.webp';
import FlashSell5 from '../assets/images/FlashSell/FlashSell5.jpg';

const deals = [
  {
    id: 1,
    name: 'Edifier R1280T Powered Bookshelf Speakers',
    price: 85.62,
    originalPrice: 320.54,
    soldBy: 'Young Music Shop',
    rating: 5,
    reviews: 1,
    image: FlashSell1
  },

  {
    id: 2,
    name: 'Samsung UHD TV 24inch',
    price: 589.99,
    originalPrice: 599.6,
    soldBy: 'GameWorld UK',
    rating: 5,
    reviews: 2,
    image: FlashSell2
  },
  {
    id: 3,
    name: 'DJI Phantom 4 Quadcopter Camera, White',
    price: 945.99,
    originalPrice: 12975,
    soldBy: 'DigitalWorld US',
    rating: 5,
    reviews: 3,
    image: FlashSell3
  },
  {
    id: 4,
    name: 'LG White Front Load Steam Washer',
    price: 10025.5,
    originalPrice: 10429.7,
    soldBy: 'Global Store',
    rating: 5,
    reviews: 2,
    image: FlashSell4
  },

  {
    id: 5,
    name: 'Smart Watch',
    price: 4999,
    originalPrice: 5499,
    soldBy: 'TechHub',
    rating: 4,
    reviews: 10,
    image: FlashSell5
  }
];

const DealOfTheDay = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container">
      <div className="font-Work_sans mx-auto py-10 ">
        <div className="flex flex-col md:flex-row md:items-center items-start justify-between border-gray-400 py-1 md:py-2 border-b-[0.5px] border-opacity-[40%] mb-6">
          <div className="flex gap-x-5 justify-between md:justify-start items-center  md:w-2/3 w-full ">
            <h2 className=" text-xl md:text-2xl  font-medium">Deals Of The Day</h2>
            <TimerCount />
          </div>
          <div className="">
            <a href="#" className="text-gray-600 text-sm font-semibold underline">
              View All
            </a>
          </div>
        </div>
        <Slider {...settings}>
          {deals.map((deal) => (
            <div key={deal.id} className="px-2">
              <div className="bg-white rounded-lg overflow-hidden  ">
                <div className="size-44 md:size-52">
                  <img src={deal.image} alt={deal.name} className="w-full object-contain p-4" />
                </div>
                <div className="p-4">
                  <div className="flex items-baseline space-x-2">
                    <p className="text-lg font-bold text-green-600">${deal.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</p>
                  </div>
                  <h3 className="text-sm font-medium text-blue-600 cursor-pointer mt-1 line-clamp-2">{deal.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">Sold By: {deal.soldBy}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(deal.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({deal.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DealOfTheDay;
