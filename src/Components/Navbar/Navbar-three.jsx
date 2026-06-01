

// import { useEffect, useMemo, useState } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   GitCompare,
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
// import { getCompareProducts } from '../../utils/compareProducts';
// import SearchSuggestions from '../SearchSuggestions';

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isAuthenticated } = useSelector(state => state.user);
//   const cartState = useSelector(state => state.cart || {});
//   const wishlistState = useSelector(state => state.wishlist || {});

//   const [search, setSearch] = useState('');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [compareCount, setCompareCount] = useState(0);

//   const cartItems =
//     cartState.cartItems?.items ||
//     cartState.cartItems ||
//     cartState.items ||
//     cartState.cart?.items ||
//     [];

//   const cartCount = Array.isArray(cartItems)
//     ? cartItems.reduce(
//         (total, item) => total + Number(item.quantity || item.qty || 1),
//         0
//       )
//     : 0;

//   const wishlistCount = useMemo(() => {
//     if (typeof wishlistState.count === 'number') return wishlistState.count;
//     if (Array.isArray(wishlistState.products)) return wishlistState.products.length;
//     if (Array.isArray(wishlistState.items)) return wishlistState.items.length;
//     return 0;
//   }, [wishlistState]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       dispatch(fetchWishlist());
//     }
//   }, [dispatch, isAuthenticated]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       dispatch(setSearchQuery(search.trim()));
//     }, 350);

//     return () => clearTimeout(timer);
//   }, [search, dispatch]);

//   useEffect(() => {
//     const updateCompareCount = () => {
//       setCompareCount(getCompareProducts().length);
//     };

//     updateCompareCount();
//     window.addEventListener('compare-updated', updateCompareCount);

//     return () => {
//       window.removeEventListener('compare-updated', updateCompareCount);
//     };
//   }, []);

//   const handleSearchSubmit = e => {
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
//       ? 'relative text-black font-semibold after:absolute after:-bottom-2 after:left-1/2 after:h-[2px] after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-black'
//       : 'text-black/65 font-medium transition hover:text-black';

//   const mobileNavClass = ({ isActive }) =>
//     isActive
//       ? 'relative flex flex-col items-center gap-1 text-black font-semibold'
//       : 'relative flex flex-col items-center gap-1 text-black/55 font-medium';

//   return (
//     <>
//       {/* Slim top bar */}
//       <div className="hidden border-b border-black/10 bg-black text-yellow-300 lg:block">
//         <div className="container mx-auto flex h-8 items-center justify-between px-4 text-[12px] font-medium">
//           <p className="flex items-center gap-2 text-yellow-300/90">
//             <ShieldCheck size={14} />
//             Secure shopping, fast delivery and trusted support
//           </p>

//           <div className="flex items-center gap-5">
//             <Link to="/products" className="transition hover:text-white">
//               Shop
//             </Link>

//             <Link to="/compare" className="transition hover:text-white">
//               Compare
//             </Link>

//             <Link to="/wishlist" className="transition hover:text-white">
//               Wishlist
//             </Link>

//             <Link
//               to={isAuthenticated ? '/dashboard' : '/login'}
//               className="transition hover:text-white"
//             >
//               {isAuthenticated ? 'My Account' : 'Login'}
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main navbar */}
//       <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F7C600]/95 backdrop-blur-xl">
//         <div className="container mx-auto px-4">
//           <div className="flex min-h-[66px] items-center gap-4">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(prev => !prev)}
//               className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#F7C600] transition hover:bg-black/85 lg:hidden"
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
//             </button>

//             <Link to="/" className="flex min-w-fit items-center gap-2.5">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-[#F7C600]">
//                 <span className="text-lg font-semibold tracking-tight">A</span>
//               </div>

//               <div>
//                 <h1 className="leading-none text-[18px] font-semibold tracking-[-0.03em] text-black">
//                   ALUCARD
//                 </h1>

//                 <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-black/55">
//                   Online Store
//                 </p>
//               </div>
//             </Link>

//             {/* Desktop search */}
//             <form
//               onSubmit={handleSearchSubmit}
//               className="relative hidden h-10 flex-1 items-center rounded-full bg-white/95 shadow-sm ring-1 ring-black/10 lg:flex"
//             >
//               <Search size={16} className="ml-4 text-black/45" />

//               <input
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="Search products..."
//                 className="h-full flex-1 bg-transparent px-3 text-sm font-medium text-black outline-none placeholder:text-black/40"
//                 aria-label="Search products"
//               />

//               {search && (
//                 <button
//                   type="button"
//                   onClick={closeSearch}
//                   className="mr-1 flex h-8 w-8 items-center justify-center rounded-full text-black/40 transition hover:bg-black/5 hover:text-black"
//                   aria-label="Clear search"
//                 >
//                   <X size={15} />
//                 </button>
//               )}

//               <button
//                 type="submit"
//                 className="mr-1 h-8 rounded-full bg-black px-4 text-xs font-semibold text-[#F7C600] transition hover:bg-black/85"
//               >
//                 Search
//               </button>

//               <SearchSuggestions query={search} onSelect={closeSearch} />
//             </form>

//             {/* Desktop simple nav */}
//             <nav className="hidden items-center gap-6 text-sm lg:flex">
//               <NavLink to="/products" className={navLinkClass}>
//                 Products
//               </NavLink>

//               <NavLink to="/compare" className={navLinkClass}>
//                 Compare
//               </NavLink>
//             </nav>

//             {/* Desktop icons */}
//             <div className="ml-auto hidden items-center gap-2 lg:flex">
//               <IconLink
//                 to="/compare"
//                 icon={<GitCompare size={18} />}
//                 count={compareCount}
//                 label="Compare"
//               />

//               <IconLink
//                 to="/wishlist"
//                 icon={<Heart size={18} />}
//                 count={wishlistCount}
//                 label="Wishlist"
//               />

//               <IconLink
//                 to="/cart"
//                 icon={<ShoppingBag size={18} />}
//                 count={cartCount}
//                 label="Cart"
//               />

//               <NavLink
//                 to={isAuthenticated ? '/dashboard' : '/login'}
//                 className="flex h-10 items-center gap-2 rounded-full bg-black px-4 text-sm font-semibold text-[#F7C600] transition hover:bg-black/85"
//               >
//                 <UserRound size={17} />
//                 {isAuthenticated
//                   ? user?.firstName || user?.name || 'Account'
//                   : 'Login'}
//               </NavLink>
//             </div>
//           </div>

//           {/* Mobile search */}
//           <form
//             onSubmit={handleSearchSubmit}
//             className="relative mb-3 flex h-10 items-center rounded-full bg-white/95 shadow-sm ring-1 ring-black/10 lg:hidden"
//           >
//             <Search size={15} className="ml-4 text-black/45" />

//             <input
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search products..."
//               className="h-full flex-1 bg-transparent px-3 text-sm font-medium text-black outline-none placeholder:text-black/40"
//               aria-label="Search products"
//             />

//             {search && (
//               <button
//                 type="button"
//                 onClick={closeSearch}
//                 className="flex h-8 w-8 items-center justify-center rounded-full text-black/40 hover:bg-black/5 hover:text-black"
//                 aria-label="Clear search"
//               >
//                 <X size={15} />
//               </button>
//             )}

//             <button
//               type="submit"
//               className="mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-[#F7C600]"
//               aria-label="Search"
//             >
//               <Search size={15} />
//             </button>

//             <SearchSuggestions query={search} onSelect={closeSearch} />
//           </form>

//           {/* Desktop category/menu row */}
//           <div className="hidden border-t border-black/10 py-2.5 lg:flex lg:items-center lg:justify-between">
//             <div className="flex items-center gap-5 text-[13px]">
//               <span className="inline-flex h-8 items-center gap-2 rounded-full bg-black px-3.5 font-semibold text-[#F7C600]">
//                 <Grid3X3 size={15} />
//                 Category
//               </span>

//               <NavLink to="/" className={navLinkClass}>
//                 Home
//               </NavLink>

//               <NavLink to="/products" className={navLinkClass}>
//                 Products
//               </NavLink>

//               <NavLink to="/compare" className={navLinkClass}>
//                 Compare
//               </NavLink>

//               <NavLink to="/wishlist" className={navLinkClass}>
//                 Wishlist
//               </NavLink>

//               <NavLink to="/cart" className={navLinkClass}>
//                 Cart
//               </NavLink>

//               <NavLink
//                 to={isAuthenticated ? '/dashboard' : '/login'}
//                 className={navLinkClass}
//               >
//                 Account
//               </NavLink>
//             </div>

//             <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/55">
//               <Package size={14} />
//               Premium Gadgets
//             </p>
//           </div>

//           {/* Mobile menu dropdown */}
//           {mobileMenuOpen && (
//             <div className="border-t border-black/10 pb-3 pt-2 lg:hidden">
//               <div className="grid gap-1.5 rounded-2xl bg-white/95 p-2 text-sm font-medium shadow-sm ring-1 ring-black/10">
//                 {[
//                   ['Home', '/'],
//                   ['Products', '/products'],
//                   [
//                     `Compare${compareCount > 0 ? ` (${compareCount})` : ''}`,
//                     '/compare',
//                   ],
//                   ['Wishlist', '/wishlist'],
//                   ['Cart', '/cart'],
//                   [
//                     isAuthenticated ? 'Dashboard' : 'Login / Register',
//                     isAuthenticated ? '/dashboard' : '/login',
//                   ],
//                 ].map(([label, link]) => (
//                   <NavLink
//                     key={link}
//                     to={link}
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="rounded-xl px-4 py-2.5 text-black/75 transition hover:bg-black hover:text-[#F7C600]"
//                   >
//                     {label}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Mobile bottom nav */}
//       <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-white/95 px-4 py-2 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl lg:hidden">
//         <div className="mx-auto grid max-w-md grid-cols-5 items-center gap-1 text-[11px]">
//           <NavLink to="/" className={mobileNavClass}>
//             <Home size={19} />
//             Home
//           </NavLink>

//           <NavLink to="/products" className={mobileNavClass}>
//             <Grid3X3 size={19} />
//             Shop
//           </NavLink>

//           <NavLink
//             to="/compare"
//             className={props => `${mobileNavClass(props)} relative`}
//           >
//             <GitCompare size={19} />
//             Compare
//             {compareCount > 0 && <Badge>{compareCount}</Badge>}
//           </NavLink>

//           <NavLink
//             to="/cart"
//             className={props => `${mobileNavClass(props)} relative`}
//           >
//             <ShoppingBag size={19} />
//             Cart
//             {cartCount > 0 && <Badge>{cartCount}</Badge>}
//           </NavLink>

//           <NavLink
//             to={isAuthenticated ? '/dashboard' : '/login'}
//             className={mobileNavClass}
//           >
//             <UserRound size={19} />
//             Account
//           </NavLink>
//         </div>
//       </nav>
//     </>
//   );
// };

// const IconLink = ({ to, icon, count, label }) => {
//   return (
//     <NavLink
//       to={to}
//       className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-black shadow-sm ring-1 ring-black/10 transition hover:bg-black hover:text-[#F7C600]"
//       title={label}
//     >
//       {icon}
//       {count > 0 && <Badge>{count}</Badge>}
//     </NavLink>
//   );
// };

// const Badge = ({ children }) => {
//   return (
//     <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-[#F7C600] ring-1 ring-[#F7C600]">
//       {children}
//     </span>
//   );
// };

// export default Navbar;









// colors: {
//   mainBackground: '#0A0A0A',
//   mainBackgroundOpacity: '1',
//   primaryText: '#F5C542',
//   mutedText: 'rgba(245, 197, 66, 0.68)',

//   darkButtonBg: '#F5C542',
//   darkButtonText: '#0A0A0A',
//   darkButtonHoverBg: '#FFD84D',

//   logoBg: '#F5C542',
//   logoText: '#0A0A0A',

//   topBarBg: '#000000',
//   topBarText: '#F5C542',
//   topBarHoverText: '#FFFFFF',

//   searchBg: 'rgba(255, 255, 255, 0.95)',
//   searchText: '#0A0A0A',
//   searchPlaceholder: 'rgba(10, 10, 10, 0.42)',

//   linkHoverText: '#FFFFFF',
//   activeUnderline: '#F5C542',
//   mobileMenuHoverBg: '#F5C542',
//   mobileMenuHoverText: '#0A0A0A',

//   badgeBg: '#F5C542',
//   badgeText: '#0A0A0A',
//   badgeRing: '#0A0A0A',

//   border: 'rgba(245, 197, 66, 0.20)',
//   softShadow: '0 10px 30px rgba(0, 0, 0, 0.18)',
// },







import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  GitCompare,
  Grid3X3,
  Heart,
  Home,
  Menu,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react';

import { setSearchQuery } from '../../features/SearchSlice';
import { fetchWishlist } from '../../features/wishlistSlice';
import { getCompareProducts } from '../../utils/compareProducts';
import SearchSuggestions from '../SearchSuggestions';

/**
 * NAVBAR THEME
 * এই object থেকে navbar-এর full color/style control হবে.
 */
const NAVBAR_THEME = {
  brand: {
    name: 'ALUCARD',
    subtitle: 'Online Store',
    logoText: 'A',
    homePath: '/',
  },

  text: {
    topBarMessage: 'Secure shopping, fast delivery and trusted support',
    rightTagline: 'Premium Gadgets',
    searchPlaceholder: 'Search products...',
    categoryText: 'Category',
  },

  colors: {
    // Main navbar
    mainBackground: '#F7C600',
    primaryText: '#0A0A0A',
    mutedText: 'rgba(10, 10, 10, 0.62)',

    // Black/yellow buttons
    darkButtonBg: '#0A0A0A',
    darkButtonText: '#F7C600',
    darkButtonHoverBg: '#1A1A1A',

    // Logo
    logoBg: '#0A0A0A',
    logoText: '#F7C600',

    // Top bar
    topBarBg: '#0A0A0A',
    topBarText: '#F7C600',
    topBarHoverText: '#FFFFFF',

    // Search area
    searchBg: 'rgba(255, 255, 255, 0.96)',
    searchText: '#0A0A0A',
    searchPlaceholder: 'rgba(10, 10, 10, 0.42)',

    // Links
    linkHoverText: '#0A0A0A',
    activeUnderline: '#0A0A0A',

    // Mobile menu dropdown
    mobileMenuBg: 'rgba(255, 255, 255, 0.96)',
    mobileMenuText: 'rgba(10, 10, 10, 0.70)',
    mobileMenuHoverBg: '#0A0A0A',
    mobileMenuHoverText: '#F7C600',

    // Mobile bottom nav
    bottomNavBg: '#0A0A0A',
    bottomNavText: 'rgba(247, 198, 0, 0.62)',
    bottomNavActiveText: '#F7C600',

    // Badge
    badgeBg: '#F7C600',
    badgeText: '#0A0A0A',
    badgeRing: '#0A0A0A',

    // Small hover bg
    clearHoverBg: 'rgba(10, 10, 10, 0.06)',
    clearHoverText: '#0A0A0A',

    // Border/shadow
    border: 'rgba(10, 10, 10, 0.10)',
    bottomBorder: 'rgba(247, 198, 0, 0.22)',
    softShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  },

  size: {
    topBarHeight: '32px',
    mainHeight: '66px',
    logoBox: '40px',
    iconButton: '40px',
    searchHeight: '40px',
    mobileSearchHeight: '40px',
  },

  radius: {
    logo: '12px',
    pill: '999px',
    menu: '18px',
  },
};

const getThemeStyle = theme => ({
  '--nav-main-bg': theme.colors.mainBackground,
  '--nav-primary-text': theme.colors.primaryText,
  '--nav-muted-text': theme.colors.mutedText,

  '--nav-dark-btn-bg': theme.colors.darkButtonBg,
  '--nav-dark-btn-text': theme.colors.darkButtonText,
  '--nav-dark-btn-hover-bg': theme.colors.darkButtonHoverBg,

  '--nav-logo-bg': theme.colors.logoBg,
  '--nav-logo-text': theme.colors.logoText,

  '--nav-top-bg': theme.colors.topBarBg,
  '--nav-top-text': theme.colors.topBarText,
  '--nav-top-hover': theme.colors.topBarHoverText,

  '--nav-search-bg': theme.colors.searchBg,
  '--nav-search-text': theme.colors.searchText,
  '--nav-search-placeholder': theme.colors.searchPlaceholder,

  '--nav-link-hover': theme.colors.linkHoverText,
  '--nav-active-line': theme.colors.activeUnderline,

  '--nav-mobile-menu-bg': theme.colors.mobileMenuBg,
  '--nav-mobile-menu-text': theme.colors.mobileMenuText,
  '--nav-mobile-hover-bg': theme.colors.mobileMenuHoverBg,
  '--nav-mobile-hover-text': theme.colors.mobileMenuHoverText,

  '--nav-bottom-bg': theme.colors.bottomNavBg,
  '--nav-bottom-text': theme.colors.bottomNavText,
  '--nav-bottom-active-text': theme.colors.bottomNavActiveText,

  '--nav-badge-bg': theme.colors.badgeBg,
  '--nav-badge-text': theme.colors.badgeText,
  '--nav-badge-ring': theme.colors.badgeRing,

  '--nav-clear-hover-bg': theme.colors.clearHoverBg,
  '--nav-clear-hover-text': theme.colors.clearHoverText,

  '--nav-border': theme.colors.border,
  '--nav-bottom-border': theme.colors.bottomBorder,
  '--nav-shadow': theme.colors.softShadow,

  '--nav-top-height': theme.size.topBarHeight,
  '--nav-main-height': theme.size.mainHeight,
  '--nav-logo-box': theme.size.logoBox,
  '--nav-icon-button': theme.size.iconButton,
  '--nav-search-height': theme.size.searchHeight,
  '--nav-mobile-search-height': theme.size.mobileSearchHeight,

  '--nav-logo-radius': theme.radius.logo,
  '--nav-pill-radius': theme.radius.pill,
  '--nav-menu-radius': theme.radius.menu,
});

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(state => state.user);
  const cartState = useSelector(state => state.cart || {});
  const wishlistState = useSelector(state => state.wishlist || {});

  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [compareCount, setCompareCount] = useState(0);

  const themeStyle = useMemo(() => getThemeStyle(NAVBAR_THEME), []);

  const cartItems =
    cartState.cartItems?.items ||
    cartState.cartItems ||
    cartState.items ||
    cartState.cart?.items ||
    [];

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + Number(item.quantity || item.qty || 1),
        0
      )
    : 0;

  const wishlistCount = useMemo(() => {
    if (typeof wishlistState.count === 'number') return wishlistState.count;
    if (Array.isArray(wishlistState.products)) {
      return wishlistState.products.length;
    }
    if (Array.isArray(wishlistState.items)) {
      return wishlistState.items.length;
    }

    return 0;
  }, [wishlistState]);

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

  useEffect(() => {
    const updateCompareCount = () => {
      setCompareCount(getCompareProducts().length);
    };

    updateCompareCount();

    window.addEventListener('compare-updated', updateCompareCount);

    return () => {
      window.removeEventListener('compare-updated', updateCompareCount);
    };
  }, []);

  const handleSearchSubmit = e => {
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
      ? 'relative font-semibold text-[var(--nav-primary-text)] after:absolute after:-bottom-2 after:left-1/2 after:h-[2px] after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-[var(--nav-active-line)]'
      : 'font-medium text-[var(--nav-muted-text)] transition hover:text-[var(--nav-link-hover)]';

  const bottomNavClass = ({ isActive }) =>
    isActive
      ? 'relative flex flex-col items-center gap-1 font-semibold text-[var(--nav-bottom-active-text)]'
      : 'relative flex flex-col items-center gap-1 font-medium text-[var(--nav-bottom-text)]';

  return (
    <div style={themeStyle}>
      {/* Top bar */}
      <div
        className="hidden border-b lg:block"
        style={{
          backgroundColor: 'var(--nav-top-bg)',
          borderColor: 'var(--nav-border)',
          color: 'var(--nav-top-text)',
        }}
      >
        <div className="container mx-auto flex h-[var(--nav-top-height)] items-center justify-between px-4 text-[12px] font-medium">
          <p className="flex items-center gap-2 opacity-90">
            <ShieldCheck size={14} />
            {NAVBAR_THEME.text.topBarMessage}
          </p>

          <div className="flex items-center gap-5">
            <TopLink to="/products">Shop</TopLink>
            <TopLink to="/compare">Compare</TopLink>
            <TopLink to="/wishlist">Wishlist</TopLink>

            <TopLink to={isAuthenticated ? '/dashboard' : '/login'}>
              {isAuthenticated ? 'My Account' : 'Login'}
            </TopLink>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-xl"
        style={{
          backgroundColor: 'var(--nav-main-bg)',
          borderColor: 'var(--nav-border)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex min-h-[var(--nav-main-height)] items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition lg:hidden"
              style={{
                backgroundColor: 'var(--nav-dark-btn-bg)',
                color: 'var(--nav-dark-btn-text)',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>

            <Link
              to={NAVBAR_THEME.brand.homePath}
              className="flex min-w-fit items-center gap-2.5"
            >
              <div
                className="flex h-[var(--nav-logo-box)] w-[var(--nav-logo-box)] items-center justify-center"
                style={{
                  backgroundColor: 'var(--nav-logo-bg)',
                  color: 'var(--nav-logo-text)',
                  borderRadius: 'var(--nav-logo-radius)',
                }}
              >
                <span className="text-lg font-semibold tracking-tight">
                  {NAVBAR_THEME.brand.logoText}
                </span>
              </div>

              <div>
                <h1 className="leading-none text-[18px] font-semibold tracking-[-0.03em] text-[var(--nav-primary-text)]">
                  {NAVBAR_THEME.brand.name}
                </h1>

                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--nav-muted-text)]">
                  {NAVBAR_THEME.brand.subtitle}
                </p>
              </div>
            </Link>

            {/* Desktop search */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden h-[var(--nav-search-height)] flex-1 items-center rounded-full shadow-sm ring-1 lg:flex"
              style={{
                backgroundColor: 'var(--nav-search-bg)',
                borderColor: 'var(--nav-border)',
                boxShadow: 'var(--nav-shadow)',
              }}
            >
              <Search size={16} className="ml-4 text-[var(--nav-muted-text)]" />

              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={NAVBAR_THEME.text.searchPlaceholder}
                className="h-full flex-1 bg-transparent px-3 text-sm font-medium outline-none"
                style={{
                  color: 'var(--nav-search-text)',
                }}
                aria-label="Search products"
              />

              {search && (
                <button
                  type="button"
                  onClick={closeSearch}
                  className="mr-1 flex h-8 w-8 items-center justify-center rounded-full transition"
                  style={{
                    color: 'var(--nav-muted-text)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--nav-clear-hover-bg)';
                    e.currentTarget.style.color = 'var(--nav-clear-hover-text)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--nav-muted-text)';
                  }}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}

              <button
                type="submit"
                className="mr-1 h-8 rounded-full px-4 text-xs font-semibold transition"
                style={{
                  backgroundColor: 'var(--nav-dark-btn-bg)',
                  color: 'var(--nav-dark-btn-text)',
                }}
              >
                Search
              </button>

              <SearchSuggestions query={search} onSelect={closeSearch} />
            </form>

            {/* Desktop simple nav */}
            <nav className="hidden items-center gap-6 text-sm lg:flex">
              <NavLink to="/products" className={navLinkClass}>
                Products
              </NavLink>

              <NavLink to="/compare" className={navLinkClass}>
                Compare
              </NavLink>
            </nav>

            {/* Desktop icons */}
            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <IconLink
                to="/compare"
                icon={<GitCompare size={18} />}
                count={compareCount}
                label="Compare"
              />

              <IconLink
                to="/wishlist"
                icon={<Heart size={18} />}
                count={wishlistCount}
                label="Wishlist"
              />

              <IconLink
                to="/cart"
                icon={<ShoppingBag size={18} />}
                count={cartCount}
                label="Cart"
              />

              <NavLink
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="flex h-[var(--nav-icon-button)] items-center gap-2 rounded-full px-4 text-sm font-semibold transition"
                style={{
                  backgroundColor: 'var(--nav-dark-btn-bg)',
                  color: 'var(--nav-dark-btn-text)',
                }}
              >
                <UserRound size={17} />
                {isAuthenticated
                  ? user?.firstName || user?.name || 'Account'
                  : 'Login'}
              </NavLink>
            </div>
          </div>

          {/* Mobile search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative mb-3 flex h-[var(--nav-mobile-search-height)] items-center rounded-full shadow-sm ring-1 lg:hidden"
            style={{
              backgroundColor: 'var(--nav-search-bg)',
              borderColor: 'var(--nav-border)',
              boxShadow: 'var(--nav-shadow)',
            }}
          >
            <Search size={15} className="ml-4 text-[var(--nav-muted-text)]" />

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={NAVBAR_THEME.text.searchPlaceholder}
              className="h-full flex-1 bg-transparent px-3 text-sm font-medium outline-none"
              style={{
                color: 'var(--nav-search-text)',
              }}
              aria-label="Search products"
            />

            {search && (
              <button
                type="button"
                onClick={closeSearch}
                className="flex h-8 w-8 items-center justify-center rounded-full transition"
                style={{
                  color: 'var(--nav-muted-text)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor =
                    'var(--nav-clear-hover-bg)';
                  e.currentTarget.style.color = 'var(--nav-clear-hover-text)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--nav-muted-text)';
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}

            <button
              type="submit"
              className="mr-1 flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                backgroundColor: 'var(--nav-dark-btn-bg)',
                color: 'var(--nav-dark-btn-text)',
              }}
              aria-label="Search"
            >
              <Search size={15} />
            </button>

            <SearchSuggestions query={search} onSelect={closeSearch} />
          </form>

          {/* Desktop category/menu row */}
          <div
            className="hidden border-t py-2.5 lg:flex lg:items-center lg:justify-between"
            style={{
              borderColor: 'var(--nav-border)',
            }}
          >
            <div className="flex items-center gap-5 text-[13px]">
              <span
                className="inline-flex h-8 items-center gap-2 rounded-full px-3.5 font-semibold"
                style={{
                  backgroundColor: 'var(--nav-dark-btn-bg)',
                  color: 'var(--nav-dark-btn-text)',
                }}
              >
                <Grid3X3 size={15} />
                {NAVBAR_THEME.text.categoryText}
              </span>

              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/products" className={navLinkClass}>
                Products
              </NavLink>

              <NavLink to="/compare" className={navLinkClass}>
                Compare
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

            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--nav-muted-text)]">
              <Package size={14} />
              {NAVBAR_THEME.text.rightTagline}
            </p>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div
              className="border-t pb-3 pt-2 lg:hidden"
              style={{
                borderColor: 'var(--nav-border)',
              }}
            >
              <div
                className="grid gap-1.5 p-2 text-sm font-medium shadow-sm ring-1"
                style={{
                  backgroundColor: 'var(--nav-mobile-menu-bg)',
                  borderRadius: 'var(--nav-menu-radius)',
                  borderColor: 'var(--nav-border)',
                }}
              >
                {[
                  ['Home', '/'],
                  ['Products', '/products'],
                  [
                    `Compare${compareCount > 0 ? ` (${compareCount})` : ''}`,
                    '/compare',
                  ],
                  ['Wishlist', '/wishlist'],
                  ['Cart', '/cart'],
                  [
                    isAuthenticated ? 'Dashboard' : 'Login / Register',
                    isAuthenticated ? '/dashboard' : '/login',
                  ],
                ].map(([label, link]) => (
                  <NavLink
                    key={link}
                    to={link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-2.5 transition"
                    style={{
                      color: 'var(--nav-mobile-menu-text)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor =
                        'var(--nav-mobile-hover-bg)';
                      e.currentTarget.style.color =
                        'var(--nav-mobile-hover-text)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color =
                        'var(--nav-mobile-menu-text)';
                    }}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t px-4 py-2 shadow-[var(--nav-shadow)] backdrop-blur-xl lg:hidden"
        style={{
          backgroundColor: 'var(--nav-bottom-bg)',
          borderColor: 'var(--nav-bottom-border)',
        }}
      >
        <div className="mx-auto grid max-w-md grid-cols-5 items-center gap-1 text-[11px]">
          <NavLink to="/" className={bottomNavClass}>
            <Home size={19} />
            Home
          </NavLink>

          <NavLink to="/products" className={bottomNavClass}>
            <Grid3X3 size={19} />
            Shop
          </NavLink>

          <NavLink
            to="/compare"
            className={props => `${bottomNavClass(props)} relative`}
          >
            <GitCompare size={19} />
            Compare
            {compareCount > 0 && <Badge>{compareCount}</Badge>}
          </NavLink>

          <NavLink
            to="/cart"
            className={props => `${bottomNavClass(props)} relative`}
          >
            <ShoppingBag size={19} />
            Cart
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </NavLink>

          <NavLink
            to={isAuthenticated ? '/dashboard' : '/login'}
            className={bottomNavClass}
          >
            <UserRound size={19} />
            Account
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

const TopLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="transition hover:text-[var(--nav-top-hover)]"
    >
      {children}
    </Link>
  );
};

const IconLink = ({ to, icon, count, label }) => {
  return (
    <NavLink
      to={to}
      className="relative flex h-[var(--nav-icon-button)] w-[var(--nav-icon-button)] items-center justify-center rounded-full text-[var(--nav-primary-text)] shadow-sm ring-1 transition hover:bg-[var(--nav-dark-btn-bg)] hover:text-[var(--nav-dark-btn-text)]"
      style={{
        backgroundColor: 'var(--nav-search-bg)',
        borderColor: 'var(--nav-border)',
      }}
      title={label}
    >
      {icon}
      {count > 0 && <Badge>{count}</Badge>}
    </NavLink>
  );
};

const Badge = ({ children }) => {
  return (
    <span
      className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-semibold ring-1"
      style={{
        backgroundColor: 'var(--nav-badge-bg)',
        color: 'var(--nav-badge-text)',
        borderColor: 'var(--nav-badge-ring)',
      }}
    >
      {children}
    </span>
  );
};

export default Navbar;