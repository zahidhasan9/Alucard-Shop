import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Star } from 'lucide-react';
import TimerCount from './utility/TimerCount';

// Image imports
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
    name: 'Aple Series 5pro  Smart Watch',
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
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container bg-white overflow-hidden">
      <div className="font-Work_sans mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 mb-8">
          <div className="flex gap-x-6 items-center justify-between md:justify-start w-full md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Deals of the Day</h2>
            <TimerCount />
          </div>
          <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-800 transition mt-4 md:mt-0">
            View All
          </a>
        </div>
        <Slider {...settings}>
          {deals.map((deal) => (
            <div key={deal.id} className="px-3">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full">
                <div className="relative h-48 flex items-center justify-center bg-gray-50">
                  <img src={deal.image} alt={deal.name} className="max-h-full max-w-full object-contain p-4" />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% Off
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-xl font-bold text-green-600">${deal.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</p>
                  </div>
                  <h3 className="text-base font-medium text-blue-600 hover:text-blue-800 cursor-pointer line-clamp-2 mb-2">
                    {deal.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">Sold By: {deal.soldBy}</p>
                  <div className="flex items-center mb-4">
                    {[...Array(deal.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">({deal.reviews})</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
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
