import React from 'react';
import { Funnel } from 'lucide-react';

const ProductFilter = () => {
  return (
    <div className="container font-Work_sans">
      <div className="flex justify-between items-center px-2 mb-7 rounded-md bg-slate-100 shadow-xl ">
        <div className="flex items-center space-x-1 px-2.5 py-1.5 shadow-sm bg-white rounded-md ">
          <Funnel className="size-[15px] " />
          <h1>Filter</h1>
        </div>
        <div className="flex justify-center items-center  gap-3  py-2  text-sm md:text-base ">
          <label className="font-medium text-gray-700">Sort By:</label>
          <select name="sort" className="border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none">
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
      {/* Filter Section */}
      <div className="flex">
        <div className="bg-black w-1/5"></div>
        <div className="bg-red-500 h-screen w-4/5"></div>
      </div>
    </div>
  );
};

export default ProductFilter;
