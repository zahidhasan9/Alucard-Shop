import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdSearch } from 'react-icons/io';
import { SlHandbag } from 'react-icons/sl';
import { FiUser } from 'react-icons/fi';

import { IconMenu2 } from '@tabler/icons-react';

function Navbar() {
  return (
    <div className=" font-Work_sans bg-yellow-500">
      <div className="border-black border-b-[0.5px] border-opacity-[30%] shadow-sm ">
        <div className="flex justify-between items-center gap-x-5">
          <div className="font-Work_sans font-bold ml-20 py-5 text-[35px] text-[white]">
            <span className="text-black">ZOTAC</span>FURY
          </div>

          <div className="flex items-center h-[42px] shadow-sm overflow-hidden bg-white rounded-xl">
            {/* Dropdown */}
            <div className="relative hidden md:block overflow-hidden text-[14px] font-medium text-[#666666] border-r-[1px] border-gray-600">
              <div className="flex items-center px-4 h-[42px] gap-1 ">
                <h1>All</h1>
                <IoIosArrowDown className="text-[16px] opacity-70 scale-x-[0.85]" />
              </div>
              <select className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer">
                <option selected>All</option>
                <option>Car &amp; Toolsnvbvvvvvvbnnnnnnnn</option>
                <option>Books &amp; Office</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="flex-1">
              <div className="search">
                <input
                  type="text"
                  name="s"
                  autoComplete="off"
                  placeholder="I'm shopping for..."
                  className="py-2 px-5 w-full outline-none"
                />
                <input type="hidden" name="post_type" value="product" />
                {/* Search Results div, you can populate dynamically */}
                <div className="search-results woocommerce"></div>
              </div>
            </div>

            {/* Search Button */}
            <button type="submit" className="bg-black text-white px-4 py-3 font-bold leading-6">
              <h1 className="hidden md:block">Search</h1>
              <div>
                <IoMdSearch className=" md:hidden  text-[25px] " />
              </div>
            </button>
          </div>

          <div className="mr-28">
            <div className="flex text-black justify-center text-[25px] items-center cursor-pointer">
              <SlHandbag className="mr-4" />
              <FiUser className="mr-1" />
              <div className="flex gap-x-2">
                <div className="font-bold text-[11px]">
                  <p>Log in</p>
                  <p>Register</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div clasName="2nd header">
        <div className='flex py-4 items-center justify-center' >
          <div className='flex items-center  gap-x-2 z-50 '>
            <IconMenu2 stroke={3} size={25} className="text-black" />
            <h1>Shop By Depertment</h1>
          </div>
         </div>
      </div>
    </div>
  );
}

export default Navbar;

//Icon gula Tabler Icons , Lucide icon diye bodlano lagbe
