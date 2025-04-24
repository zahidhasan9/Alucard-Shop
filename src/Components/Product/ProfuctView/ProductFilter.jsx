import React from 'react';
import { Funnel } from 'lucide-react';

// Image imports
import FlashSell1 from '../../../assets/images/FlashSell/Flashsell1.webp';
import FlashSell2 from '../../../assets/images/FlashSell/Flashsell2.jpg';
import FlashSell3 from '../../../assets/images/FlashSell/Flashsell3.webp';
import FlashSell4 from '../../../assets/images/FlashSell/Flashsell4.webp';
import FlashSell5 from '../../../assets/images/FlashSell/FlashSell5.jpg';

const product = [
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

const ProductFilter = () => {
  return (
    <div className="container font-Work_sans">
      <div className="flex justify-between items-center px-2 mb-7 rounded-md bg-white shadow-xl ">
        <div className="flex items-center space-x-1 px-2.5 py-1.5 shadow-sm bg-slate-100 rounded-md ">
          <Funnel className="size-[15px] " />
          <h1>Filter</h1>
        </div>
        <div className="flex justify-center items-center  gap-3  py-2  text-sm md:text-base ">
          <label className="font-medium text-gray-700">Sort By:</label>
          <select name="sort" className="border border-gray-300 rounded-md px-3 py-1.5 bg-slate-100 focus:outline-none">
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
      {/* Filter Section */}
      <div className="flex pb-10">
        <div className="w-64 hidden lg:block ">
          {/* Filter section */}
          <div className="m-2 bg-white rounded-md shadow-md  hover:shadow-xl">
            <div className="flex px-6 py-1.5 shadow-sm border-b-[1px] border-gray-400 border-opacity-40">
              <h1>Product Category</h1>
            </div>
            <div className="px-6 py-2">
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm ">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
            </div>
          </div>
          {/* filter 2  */}
          <div className="bg-white m-2 shadow-xl rounded-md">
            <div className="flex px-6 py-1.5 shadow-sm border-b-[1px] border-gray-400 border-opacity-40">
              <h1>Product Category</h1>
            </div>
            <div className="px-6 py-2">
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm ">In Stock</h1>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <input type="checkbox" />
                <h1 className="text-sm">In Stock</h1>
              </div>
            </div>
          </div>
        </div>
        {/* product part */}
        <div className="w-full py-2  px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.map((data, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-md p-4 hover:shadow-xl transition duration-300">
                <div className="w-full flex justify-center">
                  <img className="w-40 h-40 object-contain" src={data.image} alt={data.id} />
                </div>
                <div className="mt-4 text-center">
                  <h1 className="text-base cursor-pointer text-blue-700 font-medium font-Blinker ">{data.name}</h1>
                  <h1 className="text-sm font-bold text-green-600 mt-1">{data.price}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
