// import React from 'react';
// import { ChevronDown, Search, ShoppingBag, User, Menu } from 'lucide-react';

// function Navbar() {
//   return (
//     <nav className="bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg font-Work_sans">
//       {/* Top Header */}
//       <div className="flex justify-between items-center px-4 sm:px-6 lg:px-16 py-3 border-b border-black/10">
//         {/* Logo */}
//         <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
//           <span className="text-black">ZOTAC</span>FURY
//         </div>

//         {/* Search Bar - Desktop */}
//         <div className="hidden lg:flex items-center w-full max-w-xl bg-white rounded-full shadow-md overflow-hidden">
//            <div className="relative border-r border-gray-300">
//                       <div className="flex items-center px-4 h-full  text-gray-600 text-sm font-medium">
//                         <span>All</span>
//                         <ChevronDown className="ml-1 w-4 h-4" />
//                       </div>
//                       <select className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer  text-gray-600 text-sm font-medium focus:outline-none">
//                         <option>All</option>
//                         <option>Cars & Tools</option>
//                         <option>Books & Office</option>
//                       </select>
//                     </div>

//           {/* Input */}
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="flex-1 px-4 py-2.5 text-sm text-gray-800 focus:outline-none placeholder-gray-400"
//             aria-label="Search products"
//           />

//           {/* Button */}
//           <button
//             className="bg-gray-900 text-white px-5 py-2.5 rounded-r-full hover:bg-gray-800 transition-colors duration-200"
//             aria-label="Search"
//           >
//             <Search className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Icons & User */}
//         <div className="flex items-center gap-3 sm:gap-4 text-black">
//           <button className="p-2 hover:bg-yellow-300 rounded-full transition-colors duration-200" aria-label="Cart">
//             <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
//           </button>
//           <button className="p-2 hover:bg-yellow-300 rounded-full transition-colors duration-200" aria-label="User account">
//             <User className="w-5 h-5 sm:w-6 sm:h-6" />
//           </button>
//           <div className="hidden sm:block text-xs font-medium leading-tight">
//             <button className="block hover:text-gray-800 transition-colors">Log in</button>
//             <button className="block hover:text-gray-800 transition-colors">Register</button>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Header */}
//       <div className="flex items-center justify-between px-4 sm:px-6 lg:px-16 py-2.5">
//         {/* Left Menu */}
//         <button className="flex items-center gap-2 text-black hover:bg-yellow-300 px-3 py-2 rounded-lg transition-colors duration-200">
//           <Menu className="w-5 h-5" strokeWidth={2.5} />
//           <span className="hidden lg:inline font-medium text-sm">Shop By Department</span>
//         </button>

//         {/* Search Bar - Mobile */}
//         <div className="lg:hidden flex items-center w-full max-w-md bg-white rounded-full shadow-md overflow-hidden">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="flex-1 px-4 py-2 text-sm text-gray-800 focus:outline-none placeholder-gray-400"
//             aria-label="Search products"
//           />
//           <button
//             className="bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 transition-colors duration-200"
//             aria-label="Search"
//           >
//             <Search className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../../features/SearchSlice';
import { Link } from 'react-router-dom';
// import icon
import { ChevronDown, Search, ShoppingBag, User, Menu } from 'lucide-react';

function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Cart item count
  const { cartItems } = useSelector((state) => state.cart);
  const totalItem = cartItems?.items?.length || 0;

  return (
    <nav className="bg-yellow-500 text-black shadow-xl font-sans sticky top-0 z-50 ">
      {/* Top Header */}
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-20 py-3">
        {/* Logo */}
        <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          <span className="text-black ">ZOTAC</span> FURY
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center w-full max-w-lg bg-white/90 rounded-full overflow-hidden transition-all duration-300">
          {/* Category Dropdown */}
          <div className="relative border-r border-gray-300">
            <div className="flex items-center px-4 h-full  text-gray-600 text-sm font-medium">
              <span>All</span>
              <ChevronDown className="ml-1 w-4 h-4" />
            </div>
            <select className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer  text-gray-600 text-sm font-medium focus:outline-none">
              <option>All</option> <option>Cars & Tools</option>
              <option>Books & Office</option>
            </select>
          </div>

          {/* Input */}
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search products..."
            className="flex-1 px-4 py-2.5 text-sm bg-transparent text-black focus:outline-none placeholder-gray-500"
            aria-label="Search products"
          />

          {/* Button */}
          <button
            className="bg-black text-white px-5 py-2.5 rounded-r-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Icons & User */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="relative p-2 rounded-full hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110"
            aria-label="Cart"
          >
            <Link to="/cart">
              {' '}
              <ShoppingBag className="size-6" />
            </Link>

            {/* Cart Count Badge */}
            {totalItem > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItem}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="p-2 rounded-full hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110"
            >
              <User className="size-6" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="p-2 rounded-full hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110"
            >
              <User className="size-6" />
            </Link>
          )}

          <div className="hidden sm:flex flex-col text-xs font-medium">
            {isAuthenticated ? (
              <>
                {user.firstName} {user.lastName}{' '}
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-700 transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="hover:text-gray-700 transition-colors">
                  Register
                </Link>
              </>
            )}
            {/* <Link to="/login" className="hover:text-gray-700 transition-colors">
              Log in
            </Link>
            <Link to="/register" className="hover:text-gray-700 transition-colors">
              Register
            </Link> */}
          </div>
        </div>
      </div>

      {/* Bottom Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-20 py-3 border-t border-black/10">
        {/* Left Menu */}
        <button className="flex items-center gap-2 hover:bg-yellow-400 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
          <Menu className="w-5 h-5" strokeWidth={2.5} />
          <span className="hidden lg:inline font-medium text-sm">Shop By Department</span>
        </button>

        {/* Search Bar - Mobile */}
        <div className="lg:hidden flex items-center w-full max-w-sm bg-white/90 rounded-full overflow-hidden">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 text-sm bg-transparent text-black focus:outline-none placeholder-gray-500"
            aria-label="Search products"
          />
          <button
            className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-all duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
