// import React from 'react';
// import { ChevronDown, Search, ShoppingBag, User, AlignJustify } from 'lucide-react';

// function Navbar() {
//   return (
//     <div className=" font-Work_sans bg-yellow-500">
//       <div className="border-black border-b-[0.5px] border-opacity-[30%] shadow-sm ">
//         <div className="flex justify-between items-center gap-x-5">
//           <div className="font-Work_sans font-bold md:ml-20 pl-6 py-5 text-xl md:text-[35px] text-[white]">
//             <span className="text-black">ZOTAC</span>FURY
//           </div>

//           <div className="hidden md:flex items-center h-[42px] w-1/2 shadow-sm overflow-hidden bg-white rounded-xl  ">
//             {/* Dropdown */}
//             <div className="relative hidden lg:block overflow-hidden text-[14px] font-medium text-[#666666] border-r-[1px] border-gray-600">
//               <div className="flex items-center px-4 h-[42px] gap-1 ">
//                 <h1>All</h1>
//                 <ChevronDown className="size-5 opacity-70 scale-x-[0.85]" />
//               </div>
//               <select className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer">
//                 <option selected>All</option>
//                 <option>Car &amp; Toolsnvbvvvvvvbnnnnnnnn</option>
//                 <option>Books &amp; Office</option>
//               </select>
//             </div>

//             {/* Search Input */}
//             <div className="flex-1">
//               <div className="search">
//                 <input
//                   type="text"
//                   name="s"
//                   autoComplete="off"
//                   placeholder="I'm shopping for..."
//                   className="py-2 px-5 w-full outline-none"
//                 />
//                 <input type="hidden" name="post_type" value="product" />
//                 {/* Search Results div, you can populate dynamically */}
//                 <div className="search-results woocommerce"></div>
//               </div>
//             </div>

//             {/* Search Button */}
//             <button type="submit" className="bg-black text-white px-4 py-3 font-bold leading-6">
//               <h1 className="hidden md:block">Search</h1>
//               {/* <div>
//                 <Search className=" md:hidden  text-[25px] " />
//               </div> */}
//             </button>
//           </div>

//           <div className="md:mr-28 md:pr-0 pr-6 overflow-hidden ">
//             <div className="flex text-black justify-center text-[25px] items-center cursor-pointer">
//               <ShoppingBag className="size-6  mr-4" />
//               <User className="size-6 mr-1" />
//               <div className="flex gap-x-2">
//                 <div className=" leading-3 font-bold text-[11px]">
//                   <p>Log in</p>
//                   <p>Register</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div clasName="2nd header">
//         <div className="flex py-4 items-center justify-center gap-x-2">
//           <div className="flex items-center  gap-x-2 z-50 ">
//             <AlignJustify strokeWidth={3} size={25} className="text-black" />
//             <h1 className="hidden lg:block">Shop By Depertment</h1>
//           </div>
//           <div className="flex items-center md:hidden h-[42px] w-[80%] md:w-1/2 shadow-sm overflow-hidden bg-white rounded-xl">
//             {/* Search Input */}
//             <div className="flex-1">
//               <div className="search">
//                 <input
//                   type="text"
//                   name="s"
//                   autoComplete="off"
//                   placeholder="I'm shopping for..."
//                   className="py-2 px-5 w-full outline-none"
//                 />
//                 <input type="hidden" name="post_type" value="product" />
//                 {/* Search Results div, you can populate dynamically */}
//                 <div className="search-results woocommerce"></div>
//               </div>
//             </div>

//             {/* Search Button */}
//             <button type="submit" className="bg-black text-white px-4 py-3 font-bold leading-6">
//               <h1 className="hidden md:block">Search</h1>
//               <div>
//                 <Search className=" md:hidden  size-5 " />
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

// //Icon gula Tabler Icons , Lucide icon diye bodlano lagbe

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
