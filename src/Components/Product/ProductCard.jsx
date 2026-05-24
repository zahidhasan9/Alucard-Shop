

// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Eye, ShoppingBag, Star } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import QuickViewModal from './QuickViewModal';
// import WishlistButton from '../WishlistButton';
// import { fetchWishlist } from '../../features/wishlistSlice';

// const RECENT_KEY = 'recentlyViewedProducts';

// export const saveRecentlyViewed = (product) => {
//   if (!product?._id) return;

//   const oldItems = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
//   const filtered = oldItems.filter((item) => item._id !== product._id);
//   const updated = [product, ...filtered].slice(0, 10);

//   localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
// };

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();

//   const { isAuthenticated } = useSelector((state) => state.user);
//   const [quickView, setQuickView] = useState(false);

//   useEffect(() => {
//     if (isAuthenticated) {
//       dispatch(fetchWishlist());
//     }
//   }, [dispatch, isAuthenticated]);

//   if (!product) return null;

//   const image = product?.thumbnail || product?.images?.[0] || product?.image;
//   const brand = product?.brand?.name || product?.brand || 'Alucard';

//   const discount =
//     product?.discount ||
//     (product?.oldPrice && product?.price
//       ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//       : 0);

//   return (
//     <>
//       <article className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
//         <div className="relative aspect-square overflow-hidden bg-gray-100">
//           {discount > 0 && (
//             <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white shadow">
//               -{discount}%
//             </span>
//           )}

//           <div className="absolute right-3 top-3 z-10">
//             <WishlistButton productId={product?._id} />
//           </div>

//           <Link
//             to={`/product/${product?.slug}`}
//             onClick={() => saveRecentlyViewed(product)}
//           >
//             <img
//               src={image}
//               alt={product?.name || 'Product image'}
//               loading="lazy"
//               decoding="async"
//               className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//             />
//           </Link>

//           <div className="absolute inset-x-3 bottom-3 translate-y-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//             <button
//               type="button"
//               onClick={() => setQuickView(true)}
//               className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-black text-yellow-400 shadow-lg transition hover:bg-yellow-400 hover:text-black"
//             >
//               <Eye size={16} />
//               Quick View
//             </button>
//           </div>
//         </div>

//         <div className="p-4">
//           <p className="truncate text-xs font-black uppercase tracking-wide text-gray-400">
//             {brand}
//           </p>

//           <Link
//             to={`/product/${product?.slug}`}
//             onClick={() => saveRecentlyViewed(product)}
//           >
//             <h3 className="mt-1 line-clamp-2 min-h-11 text-sm font-black leading-5 text-gray-950 hover:text-yellow-600">
//               {product?.name}
//             </h3>
//           </Link>

//           <div className="mt-3 flex items-center gap-1 text-yellow-500">
//             <Star size={15} fill="currentColor" />
//             <span className="text-xs font-black text-gray-800">
//               {product?.rating || 0}
//             </span>
//             <span className="text-xs font-semibold text-gray-400">
//               ({product?.numReviews || 0})
//             </span>
//           </div>

//           <div className="mt-4 flex items-end justify-between gap-2">
//             <div>
//               <p className="text-lg font-black text-green-600">
//                 ৳{product?.price || 0}
//               </p>

//               {product?.oldPrice && (
//                 <p className="text-xs font-semibold text-gray-400 line-through">
//                   ৳{product.oldPrice}
//                 </p>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={() => setQuickView(true)}
//               className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black transition hover:bg-black hover:text-yellow-400"
//               aria-label="Quick view"
//             >
//               <ShoppingBag size={18} />
//             </button>
//           </div>
//         </div>
//       </article>

//       {quickView && (
//         <QuickViewModal product={product} onClose={() => setQuickView(false)} />
//       )}
//     </>
//   );
// };

// export default ProductCard;

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import QuickViewModal from './QuickViewModal';
import WishlistButton from '../WishlistButton';
import { fetchWishlist } from '../../features/wishlistSlice';

const RECENT_KEY = 'recentlyViewedProducts';

export const saveRecentlyViewed = (product) => {
  if (!product?._id) return;

  const oldItems = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  const filtered = oldItems.filter((item) => item._id !== product._id);
  const updated = [product, ...filtered].slice(0, 10);

  localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const [quickView, setQuickView] = useState(false);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchWishlist());
  }, [dispatch, isAuthenticated]);

  const image = useMemo(() => {
    if (!product) return '/placeholder.png';

    return (
      product?.thumbnail?.url ||
      product?.thumbnail ||
      product?.images?.[0]?.url ||
      product?.images?.[0] ||
      product?.image?.url ||
      product?.image ||
      '/placeholder.png'
    );
  }, [product]);

  if (!product) return null;

  const brand = product?.brand?.name || product?.brand || 'Alucard';
  const slug = product?.slug || product?._id;

  const rating = Number(product?.rating || product?.ratings || 0);
  const reviews = Number(product?.numReviews || product?.reviews?.length || 0);

  const discount =
    product?.discount ||
    (product?.oldPrice && product?.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0);

  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || product?.regularPrice || 0);

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg">
        <div className="relative bg-gray-50">
          {discount > 0 && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-black text-white">
              -{discount}%
            </span>
          )}

          <div className="absolute right-3 top-3 z-10">
            <WishlistButton productId={product?._id} />
          </div>

          <Link
            to={`/product/${slug}`}
            onClick={() => saveRecentlyViewed(product)}
            className="block h-56 overflow-hidden"
          >
            <img
              src={image}
              alt={product?.name || 'Product'}
              className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </Link>

          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => setQuickView(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-4 py-2.5 text-xs font-black text-yellow-400 shadow-lg transition hover:bg-yellow-400 hover:text-gray-950"
            >
              <Eye size={16} />
              Quick View
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-black uppercase tracking-wide text-yellow-700">
            {brand}
          </p>

          <Link
            to={`/product/${slug}`}
            onClick={() => saveRecentlyViewed(product)}
          >
            <h3 className="mt-1 line-clamp-2 min-h-[44px] text-sm font-black leading-5 text-gray-950 transition hover:text-yellow-700">
              {product?.name || product?.title || 'Product'}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                size={14}
                className={
                  item <= Math.round(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
            <span className="ml-1 text-xs font-semibold text-gray-500">
              ({reviews})
            </span>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-lg font-black text-gray-950">
                ৳{price.toLocaleString('en-BD')}
              </p>

              {oldPrice > price && (
                <p className="text-xs font-semibold text-gray-400 line-through">
                  ৳{oldPrice.toLocaleString('en-BD')}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setQuickView(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-yellow-400 text-gray-950 transition hover:bg-gray-950 hover:text-yellow-400"
              aria-label="Quick view"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </article>

      {quickView && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickView(false)}
        />
      )}
    </>
  );
};

export default ProductCard;