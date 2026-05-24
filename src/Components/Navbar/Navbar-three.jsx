


// import { useEffect, useMemo, useState } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Grid3X3,
//   Heart,
//   Home,
//   Menu,
//   Package,
//   Search,
//   ShieldCheck,
//   ShoppingBag,
//   UserRound,
//   X,
// } from 'lucide-react';

// import { setSearchQuery } from '../../features/SearchSlice';
// import { fetchWishlist } from '../../features/wishlistSlice';
// import SearchSuggestions from '../SearchSuggestions';

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isAuthenticated } = useSelector((state) => state.user);
//   const cartState = useSelector((state) => state.cart || {});
//   const wishlistState = useSelector((state) => state.wishlist || {});

//   const [search, setSearch] = useState('');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const cartItems =
//     cartState.cartItems?.items ||
//     cartState.cartItems ||
//     cartState.items ||
//     cartState.cart?.items ||
//     [];

//   const cartCount = Array.isArray(cartItems)
//     ? cartItems.reduce((total, item) => total + Number(item.quantity || item.qty || 1), 0)
//     : 0;

//   const wishlistCount = useMemo(() => {
//     if (typeof wishlistState.count === 'number') return wishlistState.count;
//     if (Array.isArray(wishlistState.products)) return wishlistState.products.length;
//     if (Array.isArray(wishlistState.items)) return wishlistState.items.length;
//     return 0;
//   }, [wishlistState]);

//   useEffect(() => {
//     if (isAuthenticated) dispatch(fetchWishlist());
//   }, [dispatch, isAuthenticated]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       dispatch(setSearchQuery(search.trim()));
//     }, 350);

//     return () => clearTimeout(timer);
//   }, [search, dispatch]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     dispatch(setSearchQuery(search.trim()));
//     navigate('/products');
//     setMobileMenuOpen(false);
//   };

//   const closeSearch = () => {
//     setSearch('');
//     setMobileMenuOpen(false);
//   };

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? 'relative text-black font-black after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-black'
//       : 'text-black/75 font-bold transition hover:text-black';

//   const mobileNavClass = ({ isActive }) =>
//     isActive
//       ? 'relative flex flex-col items-center gap-1 text-black font-black'
//       : 'relative flex flex-col items-center gap-1 text-black/65 font-bold';

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-yellow-400 shadow-md">
//         <div className="hidden border-b border-black/10 bg-yellow-300/80 px-4 py-2 text-xs font-semibold text-black/80 lg:block">
//           <div className="container mx-auto flex items-center justify-between">
//             <p className="flex items-center gap-2">
//               <ShieldCheck size={15} />
//               Secure shopping, fast delivery and trusted support
//             </p>

//             <div className="flex items-center gap-5">
//               <Link to="/products" className="hover:underline">
//                 Shop
//               </Link>
//               <Link to="/wishlist" className="hover:underline">
//                 Wishlist
//               </Link>
//               <Link to={isAuthenticated ? '/dashboard' : '/login'} className="hover:underline">
//                 {isAuthenticated ? 'My Account' : 'Login'}
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setMobileMenuOpen((prev) => !prev)}
//               className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-yellow-400 shadow-sm transition hover:bg-black/90 lg:hidden"
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
//             </button>

//             <Link to="/" className="shrink-0 leading-none">
//               <h1 className="text-xl font-black tracking-tight text-black sm:text-2xl">
//                 ALUCARD
//               </h1>
//               <p className="text-[10px] font-black tracking-[0.3em] text-black/70">
//                 ONLINE STORE
//               </p>
//             </Link>

//             <form
//               onSubmit={handleSearchSubmit}
//               className="relative hidden flex-1 overflow-visible rounded-full border-2 border-black bg-white shadow-sm lg:flex"
//             >
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search for products..."
//                 className="h-11 flex-1 bg-transparent px-4 text-sm font-semibold text-black outline-none placeholder:text-gray-500"
//                 aria-label="Search products"
//               />

//               {search && (
//                 <button
//                   type="button"
//                   onClick={closeSearch}
//                   className="px-2 text-gray-500 hover:text-black"
//                 >
//                   <X size={18} />
//                 </button>
//               )}

//               <button
//                 type="submit"
//                 className="flex h-11 items-center gap-2 rounded-r-full bg-black px-5 text-sm font-black text-yellow-400 transition hover:bg-gray-900"
//               >
//                 <Search size={18} />
//                 Search
//               </button>

//               {search && <SearchSuggestions query={search} onClose={closeSearch} />}
//             </form>

//             <div className="ml-auto hidden items-center gap-3 lg:flex">
//               <NavLink to="/products" className="flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-sm font-black text-black hover:bg-black hover:text-yellow-400">
//                 <Package size={18} />
//                 Products
//               </NavLink>

//               <IconLink to="/wishlist" count={wishlistCount} icon={<Heart size={20} />} />
//               <IconLink to="/cart" count={cartCount} icon={<ShoppingBag size={20} />} />

//               <NavLink
//                 to={isAuthenticated ? '/dashboard' : '/login'}
//                 className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-black text-yellow-400 transition hover:bg-gray-900"
//               >
//                 <UserRound size={18} />
//                 {isAuthenticated ? user?.firstName || user?.name || 'Account' : 'Login'}
//               </NavLink>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSearchSubmit}
//             className="relative mt-3 flex overflow-visible rounded-full border-2 border-black bg-white shadow-sm lg:hidden"
//           >
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search products..."
//               className="h-10 flex-1 bg-transparent px-4 text-sm font-semibold text-black outline-none placeholder:text-gray-500"
//               aria-label="Search products"
//             />

//             {search && (
//               <button
//                 type="button"
//                 onClick={closeSearch}
//                 className="px-2 text-gray-500 hover:text-black"
//               >
//                 <X size={18} />
//               </button>
//             )}

//             <button
//               type="submit"
//               className="grid h-10 w-12 place-items-center rounded-r-full bg-black text-yellow-400"
//             >
//               <Search size={18} />
//             </button>

//             {search && <SearchSuggestions query={search} onClose={closeSearch} />}
//           </form>
//         </div>

//         <nav className="hidden border-t border-black/10 bg-yellow-300/90 lg:block">
//           <div className="container mx-auto flex items-center gap-8 px-4 py-3 text-sm">
//             <span className="flex items-center gap-2 font-black text-black">
//               <Grid3X3 size={18} />
//               Shop By Category
//             </span>
//             <NavLink to="/" className={navLinkClass}>
//               Home
//             </NavLink>
//             <NavLink to="/products" className={navLinkClass}>
//               Products
//             </NavLink>
//             <NavLink to="/wishlist" className={navLinkClass}>
//               Wishlist
//             </NavLink>
//             <NavLink to="/cart" className={navLinkClass}>
//               Cart
//             </NavLink>
//             <NavLink to={isAuthenticated ? '/dashboard' : '/login'} className={navLinkClass}>
//               Account
//             </NavLink>
//           </div>
//         </nav>

//         {mobileMenuOpen && (
//           <div className="border-t border-black/10 bg-yellow-300 px-4 py-3 lg:hidden">
//             <div className="grid gap-2 text-sm font-bold">
//               {[
//                 ['Home', '/'],
//                 ['Products', '/products'],
//                 ['Wishlist', '/wishlist'],
//                 ['Cart', '/cart'],
//                 [
//                   isAuthenticated ? 'Dashboard' : 'Login / Register',
//                   isAuthenticated ? '/dashboard' : '/login',
//                 ],
//               ].map(([label, link]) => (
//                 <Link
//                   key={label}
//                   to={link}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="rounded-2xl px-4 py-3 text-black transition hover:bg-black hover:text-yellow-400"
//                 >
//                   {label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </header>

//       <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-2 py-2 shadow-[0_-4px_18px_rgba(0,0,0,0.08)] lg:hidden">
//         <div className="grid grid-cols-5 items-center text-[11px]">
//           <NavLink to="/" className={mobileNavClass}>
//             <Home size={21} />
//             Home
//           </NavLink>

//           <NavLink to="/products" className={mobileNavClass}>
//             <Package size={21} />
//             Shop
//           </NavLink>

//           <NavLink to="/wishlist" className={(props) => `${mobileNavClass(props)} relative`}>
//             <Heart size={21} />
//             Wish
//             {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
//           </NavLink>

//           <NavLink to="/cart" className={(props) => `${mobileNavClass(props)} relative`}>
//             <ShoppingBag size={21} />
//             Cart
//             {cartCount > 0 && <Badge>{cartCount}</Badge>}
//           </NavLink>

//           <NavLink to={isAuthenticated ? '/dashboard' : '/login'} className={mobileNavClass}>
//             <UserRound size={21} />
//             Account
//           </NavLink>
//         </div>
//       </nav>
//     </>
//   );
// };

// const IconLink = ({ to, icon, count }) => (
//   <NavLink
//     to={to}
//     className="relative grid h-10 w-10 place-items-center rounded-full bg-black/10 text-black transition hover:bg-black hover:text-yellow-400"
//   >
//     {icon}
//     {count > 0 && <Badge>{count}</Badge>}
//   </NavLink>
// );

// const Badge = ({ children }) => (
//   <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white">
//     {children}
//   </span>
// );

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
  Heart,
} from 'lucide-react';

import { setSearchQuery } from '../../features/SearchSlice';
import { fetchWishlist } from '../../features/wishlistSlice';
import SearchSuggestions from '../SearchSuggestions';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart || state.Cart || {});

  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const wishlistState = useSelector((state) => state.wishlist || {});
  const { count: wishlistCount = 0 } = useSelector((state) => state.wishlist);

  const cartItems =
    cartState.cartItems || cartState.items || cartState.cart?.items || [];

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + (item.quantity || item.qty || 1),
        0
      )
    : 0;

  useEffect(() => {
  if (isAuthenticated) {
    dispatch(fetchWishlist());
  }
}, [dispatch, isAuthenticated]);

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

  const closeSearch = () => {
    setSearch('');
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
      <header className="sticky top-0 z-50 bg-yellow-400 text-black shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
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

              <Link to="/wishlist" className="transition hover:text-black">
                Wishlist
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

        <div className="border-b border-black/10">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-yellow-400 shadow-sm transition hover:bg-black/90 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

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

            <form
              onSubmit={handleSearchSubmit}
              className="relative mx-auto hidden w-full max-w-2xl items-center rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/15 transition focus-within:ring-2 focus-within:ring-black lg:flex"
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

              <SearchSuggestions query={search} onSelect={closeSearch} />
            </form>

            <div className="ml-auto flex items-center gap-2">
              <Link
                to="/products"
                className="hidden h-11 items-center gap-2 rounded-2xl px-3 text-sm font-black text-black transition hover:bg-black hover:text-yellow-400 md:flex"
              >
                <Grid3X3 size={20} />
                Products
              </Link>

              <Link
                to="/wishlist"
                className="relative hidden h-11 w-11 items-center justify-center rounded-2xl bg-black text-yellow-400 shadow-sm transition hover:bg-gray-900 sm:flex"
                aria-label="Wishlist"
              >
                <Heart size={22} />

                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-black text-black ring-2 ring-yellow-400">
                    {wishlistCount}
                  </span>
                )}
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

          <div className="px-4 pb-4 lg:hidden">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/15 focus-within:ring-2 focus-within:ring-black"
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

              <SearchSuggestions query={search} onSelect={closeSearch} />
            </form>
          </div>
        </div>

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

            <NavLink to="/wishlist" className={navLinkClass}>
              Wishlist
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

        {mobileMenuOpen && (
          <div className="border-t border-black/10 bg-yellow-400 px-4 py-4 shadow-sm lg:hidden">
            <div className="grid gap-2 text-sm font-black">
              {[
                ['Home', '/'],
                ['Products', '/products'],
                ['Wishlist', '/wishlist'],
                ['Cart', '/cart'],
                [isAuthenticated ? 'Dashboard' : 'Login / Register', isAuthenticated ? '/dashboard' : '/login'],
              ].map(([label, link]) => (
                <Link
                  key={label}
                  to={link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-black transition hover:bg-black hover:text-yellow-400"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-yellow-400 px-2 py-2 shadow-[0_-6px_24px_rgba(0,0,0,0.12)] lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 text-[11px]">
          <NavLink to="/" className={mobileNavClass}>
            <Home size={21} />
            Home
          </NavLink>

          <NavLink to="/products" className={mobileNavClass}>
            <Search size={21} />
            Shop
          </NavLink>

          <NavLink to="/wishlist" className={(props) => `${mobileNavClass(props)} relative`}>
            <Heart size={21} />
            Wish
            {wishlistCount > 0 && (
              <span className="absolute right-4 top-0 rounded-full bg-black px-1.5 text-[10px] font-black text-yellow-400">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className={(props) => `${mobileNavClass(props)} relative`}>
            <ShoppingBag size={21} />
            Cart
            {cartCount > 0 && (
              <span className="absolute right-4 top-0 rounded-full bg-black px-1.5 text-[10px] font-black text-yellow-400">
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