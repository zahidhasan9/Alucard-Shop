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

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSearchQuery } from '../../features/SearchSlice';
// import { Link } from 'react-router-dom';
// // import icon
// import { ChevronDown, Search, ShoppingBag, User, Menu } from 'lucide-react';

// function Navbar() {
//   const { user, isAuthenticated } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const handleSearch = (e) => {
//     dispatch(setSearchQuery(e.target.value));
//   };

//   // Cart item count
//   const { cartItems } = useSelector((state) => state.cart);
//   const totalItem = cartItems?.items?.length || 0;

//   return (
//     <nav className="bg-yellow-500 text-black shadow-xl font-sans sticky top-0 z-50 ">
//       {/* Top Header */}
//       <div className="flex justify-between items-center px-4 sm:px-8 lg:px-20 py-3">
//         {/* Logo */}
//         <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
//           <span className="text-black ">ZOTAC</span> FURY
//         </div>

//         {/* Search Bar - Desktop */}
//         <div className="hidden lg:flex items-center w-full max-w-lg bg-white/90 rounded-full overflow-hidden transition-all duration-300">
//           {/* Category Dropdown */}
//           <div className="relative border-r border-gray-300">
//             <div className="flex items-center px-4 h-full  text-gray-600 text-sm font-medium">
//               <span>All</span>
//               <ChevronDown className="ml-1 w-4 h-4" />
//             </div>
//             <select className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer  text-gray-600 text-sm font-medium focus:outline-none">
//               <option>All</option> <option>Cars & Tools</option>
//               <option>Books & Office</option>
//             </select>
//           </div>

//           {/* Input */}
//           <input
//             type="text"
//             onChange={handleSearch}
//             placeholder="Search products..."
//             className="flex-1 px-4 py-2.5 text-sm bg-transparent text-black focus:outline-none placeholder-gray-500"
//             aria-label="Search products"
//           />

//           {/* Button */}
//           <button
//             className="bg-black text-white px-5 py-2.5 rounded-r-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
//             aria-label="Search"
//           >
//             <Search className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Icons & User */}
//         <div className="flex items-center gap-2 sm:gap-3">
//           <button
//             className="relative p-2 rounded-full hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110"
//             aria-label="Cart"
//           >
//             <Link to="/cart">
//               {' '}
//               <ShoppingBag className="size-6" />
//             </Link>

//             {/* Cart Count Badge */}
//             {totalItem > 0 && (
//               <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 {totalItem}
//               </span>
//             )}
//           </button>

//           {isAuthenticated ? (
//             <Link
//               to="/dashboard"
//               className="p-2 rounded-full hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110"
//             >
//               <User className="size-6" />
//             </Link>
//           ) : (
//             <Link
//               to="/login"
//               className="p-2 rounded-full hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110"
//             >
//               <User className="size-6" />
//             </Link>
//           )}

//           <div className="hidden sm:flex flex-col text-xs font-medium">
//             {isAuthenticated ? (
//               <>
//                 {user?.firstName} {user?.lastName}{' '}
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="hover:text-gray-700 transition-colors">
//                   Log in
//                 </Link>
//                 <Link to="/register" className="hover:text-gray-700 transition-colors">
//                   Register
//                 </Link>
//               </>
//             )}
//             {/* <Link to="/login" className="hover:text-gray-700 transition-colors">
//               Log in
//             </Link>
//             <Link to="/register" className="hover:text-gray-700 transition-colors">
//               Register
//             </Link> */}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Header */}
//       <div className="flex items-center justify-between px-4 sm:px-8 lg:px-20 py-3 border-t border-black/10">
//         {/* Left Menu */}
//         <button className="flex items-center gap-2 hover:bg-yellow-400 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
//           <Menu className="w-5 h-5" strokeWidth={2.5} />
//           <span className="hidden lg:inline font-medium text-sm">Shop By Department</span>
//         </button>

//         {/* Search Bar - Mobile */}
//         <div className="lg:hidden flex items-center w-full max-w-sm bg-white/90 rounded-full overflow-hidden">
//           <input
//             type="text"
//             onChange={handleSearch}
//             placeholder="Search products..."
//             className="flex-1 px-4 py-2 text-sm bg-transparent text-black focus:outline-none placeholder-gray-500"
//             aria-label="Search products"
//           />
//           <button
//             className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-all duration-200"
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



import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Home,
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  Grid3X3,
  Package,
  ShieldCheck,
} from 'lucide-react';

import { setSearchQuery } from '../../features/SearchSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart || state.Cart || {});

  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems =
    cartState.cartItems || cartState.items || cartState.cart?.items || [];

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + (item.quantity || item.qty || 1),
        0
      )
    : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(search.trim()));
    }, 350);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    dispatch(setSearchQuery(search.trim()));
    navigate('/products');
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'relative text-black font-black after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-black'
      : 'text-black/75 font-bold transition hover:text-black';

  const mobileNavClass = ({ isActive }) =>
    isActive
      ? 'relative flex flex-col items-center gap-1 text-black font-black'
      : 'relative flex flex-col items-center gap-1 text-black/65 font-bold';

  return (
    <>
      <header className="top-0 z-50 bg-yellow-400 text-black shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
        {/* Top bar */}
        <div className="hidden border-b border-black/10 bg-yellow-400 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs lg:px-8">
            <p className="flex items-center gap-2 font-bold text-black/75">
              <ShieldCheck size={14} />
              Secure shopping, fast delivery and trusted support
            </p>

            <div className="flex items-center gap-5 font-bold text-black/75">
              <Link to="/products" className="transition hover:text-black">
                Shop
              </Link>

              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="transition hover:text-black"
              >
                {isAuthenticated ? 'My Account' : 'Login'}
              </Link>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="border-b border-black/10">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-yellow-400 shadow-sm transition hover:bg-black/90 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <div className="leading-none">
                <h1 className="text-xl font-black tracking-tight text-black sm:text-2xl">
                  ALUCARD
                  <span className="ml-1 rounded-lg bg-black px-2 py-1 text-sm text-yellow-400 sm:text-base">
                    SHOP
                  </span>
                </h1>

                <p className="mt-1 hidden text-[11px] font-black tracking-[0.22em] text-black/55 sm:block">
                  ONLINE STORE
                </p>
              </div>
            </Link>

            {/* Desktop search */}
            <form
              onSubmit={handleSearchSubmit}
              className="mx-auto hidden w-full max-w-2xl items-center rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/15 transition focus-within:ring-2 focus-within:ring-black lg:flex"
            >
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="h-11 flex-1 bg-transparent px-4 text-sm font-semibold text-black outline-none placeholder:text-gray-500"
                aria-label="Search products"
              />

              <button
                type="submit"
                className="flex h-11 items-center gap-2 rounded-xl bg-black px-5 text-sm font-black text-yellow-400 transition hover:bg-gray-900"
              >
                <Search size={18} />
                Search
              </button>
            </form>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2">
              <Link
                to="/products"
                className="hidden h-11 items-center gap-2 rounded-2xl px-3 text-sm font-black text-black transition hover:bg-black hover:text-yellow-400 md:flex"
              >
                <Grid3X3 size={20} />
                Products
              </Link>

              <Link
                to="/cart"
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-yellow-400 shadow-sm transition hover:bg-gray-900"
                aria-label="Cart"
              >
                <ShoppingBag size={23} />

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-black text-black shadow-sm ring-2 ring-yellow-400">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="hidden h-11 items-center gap-2 rounded-2xl bg-black px-3 text-sm font-black text-yellow-400 shadow-sm transition hover:bg-gray-900 sm:flex"
              >
                <UserRound size={21} />

                <span className="max-w-[115px] truncate">
                  {isAuthenticated
                    ? user?.firstName || user?.name || 'Account'
                    : 'Login'}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile search */}
          <div className="px-4 pb-4 lg:hidden">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/15 focus-within:ring-2 focus-within:ring-black"
            >
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="h-10 flex-1 bg-transparent px-4 text-sm font-semibold text-black outline-none placeholder:text-gray-500"
                aria-label="Search products"
              />

              <button
                type="submit"
                className="flex h-10 w-11 items-center justify-center rounded-xl bg-black text-yellow-400"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-7 px-8 py-3 text-sm">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-2xl bg-black px-4 py-2 font-black text-yellow-400 shadow-sm transition hover:bg-gray-900"
            >
              <Package size={18} />
              Shop By Category
            </Link>

            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>

            <NavLink to="/cart" className={navLinkClass}>
              Cart
            </NavLink>

            <NavLink
              to={isAuthenticated ? '/dashboard' : '/login'}
              className={navLinkClass}
            >
              Account
            </NavLink>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-black/10 bg-yellow-400 px-4 py-4 shadow-sm lg:hidden">
            <div className="grid gap-2 text-sm font-black">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-black transition hover:bg-black hover:text-yellow-400"
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-black transition hover:bg-black hover:text-yellow-400"
              >
                Products
              </Link>

              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-black transition hover:bg-black hover:text-yellow-400"
              >
                Cart
              </Link>

              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-black transition hover:bg-black hover:text-yellow-400"
              >
                {isAuthenticated ? 'Dashboard' : 'Login / Register'}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-yellow-400 px-2 py-2 shadow-[0_-6px_24px_rgba(0,0,0,0.12)] lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 text-[11px]">
          <NavLink to="/" className={mobileNavClass}>
            <Home size={21} />
            Home
          </NavLink>

          <NavLink to="/products" className={mobileNavClass}>
            <Search size={21} />
            Shop
          </NavLink>

          <NavLink
            to="/cart"
            className={(props) => `${mobileNavClass(props)} relative`}
          >
            <ShoppingBag size={21} />
            Cart

            {cartCount > 0 && (
              <span className="absolute right-5 top-0 rounded-full bg-black px-1.5 text-[10px] font-black text-yellow-400">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to={isAuthenticated ? '/dashboard' : '/login'}
            className={mobileNavClass}
          >
            <UserRound size={21} />
            Account
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

