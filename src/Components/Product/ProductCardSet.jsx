// import { useEffect } from 'react';
// import ImgBanner from '../../assets/images/Pro-category/c1.webp';
// import { useDispatch, useSelector } from 'react-redux';
// import { getFeaturedProducts } from '../../features/productSlice';
// import { Link } from 'react-router';

// const menu = [
//   { menu: 'Best Seller' },
//   { menu: 'New Arrival' },
//   { menu: 'Boys' },
//   { menu: 'Girls' },
//   { menu: 'Baby' },
//   { menu: 'Women' },
//   { menu: 'Sales Deal' },
//   { menu: 'Combo Offer' }
// ];
// const Product = () => {
//   const { featuredPro } = useSelector((state) => state.product);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getFeaturedProducts());
//   }, [dispatch]);

//   return (
//     <div className=" bg-gray-100 py-20">
//       <div className="container">
//         <div className="flex md:flex-row flex-col gap-[2px]  font-Fira  text-gray-600">
//           <div className="flex justify-center lg:w-[45%] md:w-2/6  overflow-hidden">
//             <div className="relative lg:w-[50%] w-full p-5 bg-white shadow-inner">
//               <div className="flex flex-col items-start gap-y-2 md:gap-y-10 ">
//                 <h1 className="text-xl font-normal md:text-2xl ">Clothing</h1>
//                 <Link to={`/products`}>
//                   <div className="flex flex-wrap md:flex-col cursor-pointer text-[11px] md:text-sm">
//                     {menu.map((menu, idx) => (
//                       <ul className=" md:py-1 pr-3" key={idx}>
//                         <li>{menu.menu}</li>
//                       </ul>
//                     ))}
//                   </div>
//                 </Link>
//                 <div className="absolute top-6 right-5 md:top-auto md:bottom-5 md:right-3">
//                   <Link to={`/products`}>
//                     <h1 className="text-[10px] md:text-xs cursor-pointer">View All</h1>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="w-[60%] hidden lg:block overflow-hidden">
//               <img className="object-cover w-full h-full" src={ImgBanner} alt="banner" />
//             </div>
//           </div>
//           <div className="flex justify-center items-center lg:w-[55%] w-full overflow-hidden h-full">
//             <div className="grid grid-cols-4 md:grid-cols-3 gap-[1px]">
//               {featuredPro?.map((data, idx) => (
//                 <div
//                   key={idx}
//                   className="overflow-hidden flex flex-col items-center justify-center col-span-2 md:col-span-1 md:py-3 shadow-md bg-white "
//                 >
//                   <div className=" lg:size-[193px] md:size-32 size-46">
//                     <img className="object-cover w-full h-full" src={data.thumbnail} alt={data.name} />
//                   </div>
//                   <div className="flex flex-col items-start font-Work_sans md:pt-5 mx-5">
//                     <div className="border-b-[1px] border-opacity-35 border-gray-600 w-full py-1 pt-1">
//                       <h1 className="text-gray-500 font-light font-Blinker leading-tight text-[12px] cursor-pointer ">
//                         {data?.brand?.name}
//                       </h1>
//                     </div>
//                     <Link to={`/product/${data.slug}`}>
//                       <h1 className="text-blue-600 font-medium text-[11px] md:text-sm  leading-tight pt-1 cursor-pointer">
//                         {data.name}
//                       </h1>
//                     </Link>
//                     <p className="text-xs font-bold text-green-600 py-1">Price: {data.price} Tk</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Product;



// import { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, Star } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import ImgBanner from '../../assets/images/Pro-category/c1.webp';
// import { getFeaturedProducts } from '../../features/productSlice';
// import ProductCardSkeleton from '../UI/ProductCardSkeleton';
// import EmptyState from '../UI/EmptyState';

// const menu = [
//   'Best Seller',
//   'New Arrival',
//   'Boys',
//   'Girls',
//   'Baby',
//   'Women',
//   'Sales Deal',
//   'Combo Offer',
// ];

// const RECENT_KEY = 'recentlyViewedProducts';
// const WISHLIST_KEY = 'wishlistProducts';

// function saveRecentlyViewed(product) {
//   if (!product?._id) return;

//   const oldItems = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
//   const filtered = oldItems.filter((item) => item._id !== product._id);
//   const updated = [product, ...filtered].slice(0, 8);

//   localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
// }

// const ProductCardSet = () => {
//   const dispatch = useDispatch();

//   const { featuredPro = [], featuredLoading, loading } = useSelector(
//     (state) => state.product
//   );

//   const [wishlist, setWishlist] = useState(() => {
//     return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
//   });

//   const wishlistIds = useMemo(
//     () => new Set(wishlist.map((item) => item._id)),
//     [wishlist]
//   );

//   useEffect(() => {
//     if (!featuredPro?.length) {
//       dispatch(getFeaturedProducts());
//     }
//   }, [dispatch, featuredPro?.length]);

//   const toggleWishlist = (product) => {
//     if (!product?._id) return;

//     const exists = wishlistIds.has(product._id);

//     const updated = exists
//       ? wishlist.filter((item) => item._id !== product._id)
//       : [product, ...wishlist];

//     setWishlist(updated);
//     localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
//   };

//   const isLoading = featuredLoading || (loading && !featuredPro?.length);

//   return (
//     <section className="bg-gray-100 py-14">
//       <div className="mx-auto max-w-7xl px-4 lg:px-8">
//         <div className="mb-7 flex items-end justify-between gap-4">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">
//               Featured
//             </p>
//             <h2 className="mt-1 text-2xl font-black text-gray-900 md:text-3xl">
//               Popular Clothing
//             </h2>
//           </div>

//           <Link
//             to="/products"
//             className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
//           >
//             View All
//           </Link>
//         </div>

//         <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
//           <aside className="overflow-hidden rounded-3xl bg-white shadow-sm">
//             <div className="relative h-56 overflow-hidden lg:h-full">
//               <img
//                 src={ImgBanner}
//                 alt="Clothing collection"
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-full object-cover"
//               />

//               <div className="absolute inset-0 bg-black/35" />

//               <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
//                 <h3 className="text-2xl font-black">Clothing</h3>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {menu.map((item) => (
//                     <Link
//                       key={item}
//                       to="/products"
//                       className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 transition hover:bg-yellow-400"
//                     >
//                       {item}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </aside>

//           <div>
//             {isLoading ? (
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//                 {Array.from({ length: 8 }).map((_, index) => (
//                   <ProductCardSkeleton key={index} />
//                 ))}
//               </div>
//             ) : featuredPro?.length ? (
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//                 {featuredPro.map((product) => {
//                   const discount =
//                     product?.oldPrice && product?.price
//                       ? Math.round(
//                           ((product.oldPrice - product.price) /
//                             product.oldPrice) *
//                             100
//                         )
//                       : product?.discount || 0;

//                   return (
//                     <article
//                       key={product?._id || product?.slug}
//                       className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
//                     >
//                       <div className="relative aspect-square overflow-hidden bg-gray-100">
//                         {discount > 0 && (
//                           <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
//                             -{discount}%
//                           </span>
//                         )}

//                         <button
//                           type="button"
//                           onClick={() => toggleWishlist(product)}
//                           className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow transition hover:bg-yellow-100"
//                           aria-label="Add to wishlist"
//                         >
//                           <Heart
//                             size={18}
//                             className={
//                               wishlistIds.has(product?._id)
//                                 ? 'fill-red-500 text-red-500'
//                                 : 'text-gray-700'
//                             }
//                           />
//                         </button>

//                         <Link
//                           to={`/product/${product?.slug}`}
//                           onClick={() => saveRecentlyViewed(product)}
//                         >
//                           <img
//                             src={product?.thumbnail}
//                             alt={product?.name || 'Product image'}
//                             loading="lazy"
//                             decoding="async"
//                             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//                           />
//                         </Link>
//                       </div>

//                       <div className="p-4">
//                         <p className="truncate text-xs font-semibold uppercase text-gray-400">
//                           {product?.brand?.name || 'Alucard'}
//                         </p>

//                         <Link
//                           to={`/product/${product?.slug}`}
//                           onClick={() => saveRecentlyViewed(product)}
//                         >
//                           <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold text-gray-900 transition hover:text-yellow-600">
//                             {product?.name}
//                           </h3>
//                         </Link>

//                         <div className="mt-2 flex items-center gap-1 text-yellow-500">
//                           <Star size={15} fill="currentColor" />
//                           <span className="text-xs font-bold text-gray-700">
//                             {product?.rating || 0}
//                           </span>
//                           <span className="text-xs text-gray-400">
//                             ({product?.numReviews || 0})
//                           </span>
//                         </div>

//                         <div className="mt-3 flex items-center justify-between gap-2">
//                           <div>
//                             <p className="text-base font-black text-green-600">
//                               ৳{product?.price || 0}
//                             </p>

//                             {product?.oldPrice && (
//                               <p className="text-xs text-gray-400 line-through">
//                                 ৳{product.oldPrice}
//                               </p>
//                             )}
//                           </div>

//                           <Link
//                             to={`/product/${product?.slug}`}
//                             onClick={() => saveRecentlyViewed(product)}
//                             className="rounded-full bg-black px-3 py-2 text-xs font-bold text-white transition hover:bg-yellow-500 hover:text-black"
//                           >
//                             View
//                           </Link>
//                         </div>
//                       </div>
//                     </article>
//                   );
//                 })}
//               </div>
//             ) : (
//               <EmptyState
//                 title="No featured products"
//                 message="Products are not available right now."
//                 buttonText="Browse Products"
//                 buttonLink="/products"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductCardSet;



import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getFeaturedProducts } from '../../features/productSlice';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '../UI/ProductCardSkeleton';
import EmptyState from '../UI/EmptyState';

const ProductCardSet = () => {
  const dispatch = useDispatch();

  const { featuredPro = [], featuredLoading, loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!featuredPro?.length) {
      dispatch(getFeaturedProducts());
    }
  }, [dispatch, featuredPro?.length]);

  const isLoading = featuredLoading || (loading && !featuredPro?.length);

  return (
    <section className="bg-gray-100 py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
              Featured
            </p>

            <h2 className="mt-1 text-2xl font-black text-gray-950 md:text-3xl">
              Popular Products
            </h2>
          </div>

          <Link
            to="/products"
            className="rounded-full bg-black px-5 py-2 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
          >
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : featuredPro?.length ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featuredPro.map((product) => (
              <ProductCard key={product?._id || product?.slug} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No featured products"
            message="Featured products are not available right now."
            buttonText="Browse Products"
            buttonLink="/products"
          />
        )}
      </div>
    </section>
  );
};

export default ProductCardSet;