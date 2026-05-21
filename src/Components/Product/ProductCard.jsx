import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';

const WISHLIST_KEY = 'wishlistProducts';
const RECENT_KEY = 'recentlyViewedProducts';

const getProductImage = (product) => {
  return product?.thumbnail || product?.images?.[0] || product?.image || '';
};

const getBrandName = (product) => {
  return product?.brand?.name || product?.brand || 'Alucard';
};

export const saveRecentlyViewed = (product) => {
  if (!product?._id) return;

  const oldItems = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  const filtered = oldItems.filter((item) => item._id !== product._id);
  const updated = [product, ...filtered].slice(0, 8);

  localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
};

const ProductCard = ({ product }) => {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  });

  const wishlistIds = useMemo(
    () => new Set(wishlist.map((item) => item._id)),
    [wishlist]
  );

  if (!product) return null;

  const image = getProductImage(product);
  const discount =
    product?.discount ||
    (product?.oldPrice && product?.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0);

  const isWishlisted = wishlistIds.has(product?._id);

  const toggleWishlist = () => {
    const exists = wishlistIds.has(product._id);

    const updated = exists
      ? wishlist.filter((item) => item._id !== product._id)
      : [product, ...wishlist];

    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white shadow">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={toggleWishlist}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm transition hover:bg-yellow-400 hover:text-black"
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
          />
        </button>

        <Link
          to={`/product/${product?.slug}`}
          onClick={() => saveRecentlyViewed(product)}
        >
          <img
            src={image}
            alt={product?.name || 'Product image'}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute inset-x-3 bottom-3 translate-y-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            to={`/product/${product?.slug}`}
            onClick={() => saveRecentlyViewed(product)}
            className="flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-black text-yellow-400 shadow-lg transition hover:bg-yellow-400 hover:text-black"
          >
            <Eye size={16} />
            Quick View
          </Link>
        </div>
      </div>

      <div className="p-4">
        <p className="truncate text-xs font-black uppercase tracking-wide text-gray-400">
          {getBrandName(product)}
        </p>

        <Link
          to={`/product/${product?.slug}`}
          onClick={() => saveRecentlyViewed(product)}
        >
          <h3 className="mt-1 line-clamp-2 min-h-11 text-sm font-black leading-5 text-gray-950 transition hover:text-yellow-600">
            {product?.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-1 text-yellow-500">
          <Star size={15} fill="currentColor" />
          <span className="text-xs font-black text-gray-800">
            {product?.rating || 0}
          </span>
          <span className="text-xs font-semibold text-gray-400">
            ({product?.numReviews || 0})
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-lg font-black text-green-600">
              ৳{product?.price || 0}
            </p>

            {product?.oldPrice && (
              <p className="text-xs font-semibold text-gray-400 line-through">
                ৳{product.oldPrice}
              </p>
            )}
          </div>

          <Link
            to={`/product/${product?.slug}`}
            onClick={() => saveRecentlyViewed(product)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black transition hover:bg-black hover:text-yellow-400"
            aria-label="View product"
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;