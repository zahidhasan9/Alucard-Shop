


// import { useEffect } from 'react';
// import { Heart, Trash2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import ProductCard from '../Components/Product/ProductCard';
// import EmptyState from '../Components/UI/EmptyState';
// import usePageTitle from '../hooks/usePageTitle';
// import { clearWishlist, fetchWishlist } from '../features/wishlistSlice';

// const WishlistPage = () => {
//   const dispatch = useDispatch();

//   const {
//     products = [],
//     loading = false,
//     clearing = false,
//     error = null,
//   } = useSelector((state) => state.wishlist || {});

//   usePageTitle(
//     'Wishlist | Alucard Shop',
//     'View your saved wishlist products.'
//   );

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   const handleClearWishlist = () => {
//     dispatch(clearWishlist());
//   };

//   if (loading && !products.length) {
//     return (
//       <main className="min-h-[60vh] bg-gray-100 px-4 py-14">
//         <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center font-black text-gray-600 shadow-sm ring-1 ring-black/5">
//           Loading wishlist...
//         </div>
//       </main>
//     );
//   }

//   if (error && !products.length) {
//     return (
//       <main className="bg-gray-100 px-4 py-14">
//         <EmptyState
//           title="Wishlist could not be loaded"
//           message={error}
//           buttonText="Browse Products"
//           buttonLink="/products"
//         />
//       </main>
//     );
//   }

//   if (!products.length) {
//     return (
//       <main className="bg-gray-100 px-4 py-14">
//         <EmptyState
//           title="Your wishlist is empty"
//           message="Save products you love and find them here later."
//           buttonText="Browse Products"
//           buttonLink="/products"
//         />
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-8 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-7 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//               <Heart size={23} />
//             </div>

//             <div>
//               <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//                 Saved
//               </p>

//               <h1 className="text-3xl font-black text-gray-950">
//                 My Wishlist
//               </h1>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleClearWishlist}
//             disabled={clearing}
//             className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-yellow-400 hover:bg-yellow-400 hover:text-black disabled:opacity-60"
//           >
//             <Trash2 size={17} />
//             {clearing ? 'Clearing...' : 'Clear Wishlist'}
//           </button>
//         </div>

//         <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => (
//             <ProductCard
//               key={product?._id || product?.slug}
//               product={product}
//             />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default WishlistPage;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Trash2,
  PackageCheck,
  ArrowRight,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import EmptyState from '../Components/UI/EmptyState';
import usePageTitle from '../hooks/usePageTitle';
import {
  clearWishlist,
  fetchWishlist,
  toggleWishlistItem,
} from '../features/wishlistSlice';
import { addToCart, fetchCart } from '../features/cartSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();

  const {
    products = [],
    loading = false,
    clearing = false,
    error = null,
  } = useSelector((state) => state.wishlist || {});

  usePageTitle(
    'Wishlist | Alucard Shop',
    'View your saved wishlist products.'
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  const handleRemove = (productId) => {
    dispatch(toggleWishlistItem(productId));
  };

  const handleMoveToCart = async (product) => {
    await dispatch(
      addToCart({
        productId: product?._id,
        quantity: 1,
        price: product?.price,
      })
    );
    dispatch(fetchCart());
  };

  if (loading && !products.length) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-64 rounded-xl bg-gray-200" />
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-32 rounded-2xl bg-white" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error && !products.length) {
    return (
      <EmptyState
        icon={Heart}
        title="Wishlist unavailable"
        message={error}
        actionLabel="Go Shopping"
        actionTo="/products"
      />
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        message="Save products you love and come back to them anytime."
        actionLabel="Explore Products"
        actionTo="/products"
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
      <div className="container mx-auto">
        <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-yellow-600 p-6 text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-bold text-yellow-300">
                  <Heart size={18} />
                  Saved Products
                </p>
                <h1 className="mt-2 text-3xl font-black">My Wishlist</h1>
                <p className="mt-1 text-sm text-gray-200">
                  {products.length} product{products.length > 1 ? 's' : ''}{' '}
                  saved for later.
                </p>
              </div>

              <button
                onClick={handleClearWishlist}
                disabled={clearing}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                <Trash2 size={17} />
                {clearing ? 'Clearing...' : 'Clear Wishlist'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product?._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
            >
              <div className="grid gap-4 md:grid-cols-[140px_1fr_auto] md:items-center">
                <Link
                  to={`/product/${product?.slug || product?._id}`}
                  className="block overflow-hidden rounded-xl bg-gray-100"
                >
                  <img
                    src={
                      product?.thumbnail || product?.images?.[0] || product?.image
                    
                    }
                    alt={product?.name || product?.title || 'Product'}
                    className="h-36 w-full object-cover transition hover:scale-105 md:h-32"
                  />
                </Link>

                <div>
                  <Link
                    to={`/product/${product?.slug || product?._id}`}
                    className="text-lg font-bold text-gray-950 hover:text-yellow-700"
                  >
                    {product?.name || product?.title}
                  </Link>

                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {product?.description || 'Premium product from Alucard Shop.'}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="text-xl font-black text-gray-950">
                      ৳{Number(product?.price || 0).toLocaleString('en-BD')}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product?.stock === 0
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {product?.stock === 0 ? 'Out of Stock' : 'In Stock'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:w-48">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={product?.stock === 0}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-black text-gray-950 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <ShoppingBag size={17} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleRemove(product?._id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={17} />
                    Remove
                  </button>

                  <Link
                    to={`/product/${product?.slug || product?._id}`}
                    className="inline-flex items-center justify-center gap-1 text-sm font-bold text-yellow-700 hover:text-orange-600"
                  >
                    View Details <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <div className="flex gap-3">
            <PackageCheck className="text-yellow-700" />
            <p className="text-sm leading-6 text-yellow-900">
              Tip: Add your favorite products to cart before stock runs out.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;