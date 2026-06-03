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