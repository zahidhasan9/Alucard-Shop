import React from 'react';
import { ChevronDown, Search, ShoppingBag, User, AlignJustify } from 'lucide-react';

function Navbar() {
  return (
    <nav className="font-sans bg-yellow-500 shadow-md">
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 md:px-20 py-4 border-b border-black/20">
        {/* Logo */}
        <div className="text-2xl md:text-4xl font-bold text-white">
          <span className="text-black">ZOTAC</span>FURY
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center w-1/2 bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Category Dropdown */}
          <div className="relative border-r border-gray-300">
            <div className="flex items-center px-4 h-full text-gray-600 text-sm font-medium">
              <span>All</span>
              <ChevronDown className="ml-1 w-4 h-4" />
            </div>
            <select className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer">
              <option>All</option>
              <option>Cars & Tools</option>
              <option>Books & Office</option>
            </select>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="I'm shopping for..."
            className="flex-1 px-4 py-2 focus:outline-none text-sm"
          />

          {/* Button */}
          <button className="bg-black text-white px-5 py-2 font-semibold text-sm hover:bg-black/90 transition">
            Search
          </button>
        </div>

        {/* Icons & User */}
        <div className="flex items-center gap-4 text-black">
          <ShoppingBag className="w-6 h-6" />
          <User className="w-6 h-6" />
          <div className="text-xs font-semibold leading-tight hidden sm:block">
            <p>Log in</p>
            <p>Register</p>
          </div>
        </div>
      </div>

      {/* Bottom Header */}
      <div className="flex items-center justify-between px-6 md:px-20 py-3 gap-4">
        {/* Left Menu */}
        <div className="flex items-center gap-2 cursor-pointer text-black">
          <AlignJustify className="w-6 h-6" strokeWidth={2.5} />
          <span className="hidden lg:block font-medium">Shop By Department</span>
        </div>

        {/* Search Bar - Mobile */}
        <div className="flex md:hidden items-center w-full bg-white rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="I'm shopping for..."
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
          />
          <button className="bg-black text-white px-4 py-2 hover:bg-black/90 transition">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;