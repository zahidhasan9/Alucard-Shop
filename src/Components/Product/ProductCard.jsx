

// import { useEffect, useMemo, useState } from 'react';
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
//     if (isAuthenticated) dispatch(fetchWishlist());
//   }, [dispatch, isAuthenticated]);

//   const image = useMemo(() => {
//     if (!product) return '/placeholder.png';

//     return (
//       product?.thumbnail?.url ||
//       product?.thumbnail ||
//       product?.images?.[0]?.url ||
//       product?.images?.[0] ||
//       product?.image?.url ||
//       product?.image ||
//       '/placeholder.png'
//     );
//   }, [product]);

//   if (!product) return null;

//   const brand = product?.brand?.name || product?.brand || 'Alucard';
//   const slug = product?.slug || product?._id;

//   const rating = Number(product?.rating || product?.ratings || 0);
//   const reviews = Number(product?.numReviews || product?.reviews?.length || 0);

//   const discount =
//     product?.discount ||
//     (product?.oldPrice && product?.price
//       ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//       : 0);

//   const price = Number(product?.price || 0);
//   const oldPrice = Number(product?.oldPrice || product?.regularPrice || 0);

//   return (
//     <>
//       <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg">
//         <div className="relative bg-gray-50">
//           {discount > 0 && (
//             <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-black text-white">
//               -{discount}%
//             </span>
//           )}

//           <div className="absolute right-3 top-3 z-10">
//             <WishlistButton productId={product?._id} />
//           </div>

//           <Link
//             to={`/product/${slug}`}
//             onClick={() => saveRecentlyViewed(product)}
//             className="block h-56 overflow-hidden"
//           >
//             <img
//               src={image}
//               alt={product?.name || 'Product'}
//               className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
//               loading="lazy"
//             />
//           </Link>

//           <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//             <button
//               type="button"
//               onClick={() => setQuickView(true)}
//               className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-4 py-2.5 text-xs font-black text-yellow-400 shadow-lg transition hover:bg-yellow-400 hover:text-gray-950"
//             >
//               <Eye size={16} />
//               Quick View
//             </button>
//           </div>
//         </div>

//         <div className="p-4">
//           <p className="text-xs font-black uppercase tracking-wide text-yellow-700">
//             {brand}
//           </p>

//           <Link
//             to={`/product/${slug}`}
//             onClick={() => saveRecentlyViewed(product)}
//           >
//             <h3 className="mt-1 line-clamp-2 min-h-[44px] text-sm font-black leading-5 text-gray-950 transition hover:text-yellow-700">
//               {product?.name || product?.title || 'Product'}
//             </h3>
//           </Link>

//           <div className="mt-2 flex items-center gap-1">
//             {[1, 2, 3, 4, 5].map((item) => (
//               <Star
//                 key={item}
//                 size={14}
//                 className={
//                   item <= Math.round(rating)
//                     ? 'fill-yellow-400 text-yellow-400'
//                     : 'text-gray-300'
//                 }
//               />
//             ))}
//             <span className="ml-1 text-xs font-semibold text-gray-500">
//               ({reviews})
//             </span>
//           </div>

//           <div className="mt-3 flex items-end justify-between gap-3">
//             <div>
//               <p className="text-lg font-black text-gray-950">
//                 ৳{price.toLocaleString('en-BD')}
//               </p>

//               {oldPrice > price && (
//                 <p className="text-xs font-semibold text-gray-400 line-through">
//                   ৳{oldPrice.toLocaleString('en-BD')}
//                 </p>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={() => setQuickView(true)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-yellow-400 text-gray-950 transition hover:bg-gray-950 hover:text-yellow-400"
//               aria-label="Quick view"
//             >
//               <ShoppingBag size={18} />
//             </button>
//           </div>
//         </div>
//       </article>

//       {quickView && (
//         <QuickViewModal
//           product={product}
//           onClose={() => setQuickView(false)}
//         />
//       )}
//     </>
//   );
// };

// export default ProductCard;





import { lazy, memo, Suspense, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Star } from 'lucide-react';

import WishlistButton from '../WishlistButton';

const QuickViewModal = lazy(() => import('./QuickViewModal'));

const RECENT_KEY = 'recentlyViewedProducts';
const RATING_STARS = [1, 2, 3, 4, 5];

export const saveRecentlyViewed = (product) => {
  const productId = product?._id || product?.id || product?.slug;
  if (!productId) return;

  try {
    const oldItems = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    const safeOldItems = Array.isArray(oldItems) ? oldItems : [];

    const filtered = safeOldItems.filter((item) => {
      const itemId = item?._id || item?.id || item?.slug;
      return itemId !== productId;
    });

    const updated = [product, ...filtered].slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {
    localStorage.setItem(RECENT_KEY, JSON.stringify([product]));
  }
};

const getImage = (product) => {
  return (
    product?.thumbnail?.url ||
    product?.thumbnail ||
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    product?.image?.url ||
    product?.image ||
    '/placeholder.png'
  );
};

const getPrice = (value) => {
  const price = Number(value || 0);
  return `৳${price.toLocaleString('en-BD')}`;
};

const getDiscount = (product) => {
  if (product?.discount) return Number(product.discount);

  const oldPrice = Number(product?.oldPrice || product?.regularPrice || 0);
  const price = Number(product?.price || 0);

  if (oldPrice > price && price > 0) {
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  return 0;
};

const ProductCard = ({ product }) => {
  const [quickView, setQuickView] = useState(false);

  const image = useMemo(() => getImage(product), [product]);

  if (!product) return null;

  const productId = product?._id || product?.id || product?.slug;
  const slug = product?.slug || product?._id || product?.id;
  const name = product?.name || product?.title || 'Product';
  const brand = product?.brand?.name || product?.brand || 'Alucard';

  const rating = Number(product?.rating || product?.ratings || 0);
  const reviews = Number(product?.numReviews || product?.reviews?.length || 0);
  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || product?.regularPrice || 0);
  const discount = getDiscount(product);

  const handleOpenProduct = () => {
    saveRecentlyViewed(product);
  };

  return (
    <>
      <article className="group min-w-0 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-sm transition-colors duration-200 hover:border-black/15 hover:shadow-md sm:rounded-[28px]">
        {/* Image area */}
        <div className="relative bg-[#f5f5f7]">
          {discount > 0 && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#F7C600] px-2.5 py-1 text-[10px] font-black leading-none text-black shadow-sm sm:left-3 sm:top-3 sm:text-[11px]">
              Save {discount}%
            </span>
          )}

          <div className="absolute right-2.5 top-2.5 z-10 sm:right-3 sm:top-3">
            <WishlistButton
              productId={productId}
              className="!h-9 !w-9 !rounded-full !bg-white !p-0 !shadow-sm !ring-1 !ring-black/10 sm:!h-10 sm:!w-10"
            />
          </div>

          <Link
            to={`/product/${slug}`}
            onClick={handleOpenProduct}
            className="flex aspect-[4/3] items-center justify-center overflow-hidden sm:aspect-square"
          >
            <img
              src={image}
              alt={name}
              className="h-full w-full object-contain p-5 transition-transform duration-200 group-hover:scale-[1.02] sm:p-6"
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-[10px] font-black uppercase tracking-[0.14em] text-black/35 sm:text-[11px]">
              {brand}
            </p>

            <div className="flex shrink-0 items-center gap-1 rounded-full bg-black/[0.04] px-2 py-1">
              <Star size={12} className="fill-[#F7C600] text-[#F7C600]" />
              <span className="text-[11px] font-bold text-black/60">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <Link to={`/product/${slug}`} onClick={handleOpenProduct}>
            <h3 className="line-clamp-2 min-h-[40px] text-[14px] font-semibold leading-snug tracking-[-0.015em] text-black transition-colors hover:text-black/70 sm:min-h-[44px] sm:text-[15px]">
              {name}
            </h3>
          </Link>

          <div className="mt-2.5 flex items-center gap-1">
            {RATING_STARS.map((item) => (
              <Star
                key={item}
                size={13}
                className={
                  item <= Math.round(rating)
                    ? 'fill-[#F7C600] text-[#F7C600]'
                    : 'fill-black/10 text-black/10'
                }
              />
            ))}

            <span className="ml-1 text-[11px] font-semibold text-black/35">
              ({reviews})
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-end gap-2">
            <span className="text-lg font-black tracking-[-0.035em] text-black sm:text-xl">
              {getPrice(price)}
            </span>

            {oldPrice > price && (
              <span className="pb-0.5 text-[11px] font-semibold text-black/30 line-through sm:text-xs">
                {getPrice(oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2 sm:mt-4">
            <Link
              to={`/product/${slug}`}
              onClick={handleOpenProduct}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#F7C600] px-4 text-sm font-black text-black transition-colors hover:bg-yellow-300"
            >
              Details
            </Link>

            <button
              type="button"
              onClick={() => setQuickView(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#F7C600] text-black transition-colors hover:bg-yellow-300"
              aria-label="Quick view"
              title="Quick view"
            >
              <Eye size={17} />
            </button>
          </div>
        </div>
      </article>

      {quickView && (
        <Suspense fallback={null}>
          <QuickViewModal product={product} onClose={() => setQuickView(false)} />
        </Suspense>
      )}
    </>
  );
};

export default memo(ProductCard);