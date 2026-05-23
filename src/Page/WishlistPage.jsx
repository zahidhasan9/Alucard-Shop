// import { useEffect, useState } from 'react';
// import { Heart, Trash2 } from 'lucide-react';

// import ProductCard from '../Components/Product/ProductCard';
// import EmptyState from '../Components/UI/EmptyState';
// import usePageTitle from '../hooks/usePageTitle';

// const WISHLIST_KEY = 'wishlistProducts';

// const WishlistPage = () => {
//   const [items, setItems] = useState([]);

//   usePageTitle(
//     'Wishlist | Alucard Shop',
//     'View your saved wishlist products.'
//   );

//   const loadWishlist = () => {
//     setItems(JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]'));
//   };

//   useEffect(() => {
//     loadWishlist();

//     window.addEventListener('wishlistUpdated', loadWishlist);

//     return () => {
//       window.removeEventListener('wishlistUpdated', loadWishlist);
//     };
//   }, []);

//   const clearWishlist = () => {
//     localStorage.removeItem(WISHLIST_KEY);
//     setItems([]);
//     window.dispatchEvent(new Event('wishlistUpdated'));
//   };

//   if (!items.length) {
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
//             onClick={clearWishlist}
//             className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-yellow-400 hover:bg-yellow-400 hover:text-black"
//           >
//             <Trash2 size={17} />
//             Clear Wishlist
//           </button>
//         </div>

//         <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//           {items.map((product) => (
//             <ProductCard key={product?._id || product?.slug} product={product} />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default WishlistPage;


import { useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from '../Components/Product/ProductCard';
import EmptyState from '../Components/UI/EmptyState';
import usePageTitle from '../hooks/usePageTitle';
import { clearWishlist, fetchWishlist } from '../features/wishlistSlice';

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

  if (loading && !products.length) {
    return (
      <main className="min-h-[60vh] bg-gray-100 px-4 py-14">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center font-black text-gray-600 shadow-sm ring-1 ring-black/5">
          Loading wishlist...
        </div>
      </main>
    );
  }

  if (error && !products.length) {
    return (
      <main className="bg-gray-100 px-4 py-14">
        <EmptyState
          title="Wishlist could not be loaded"
          message={error}
          buttonText="Browse Products"
          buttonLink="/products"
        />
      </main>
    );
  }

  if (!products.length) {
    return (
      <main className="bg-gray-100 px-4 py-14">
        <EmptyState
          title="Your wishlist is empty"
          message="Save products you love and find them here later."
          buttonText="Browse Products"
          buttonLink="/products"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <Heart size={23} />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
                Saved
              </p>

              <h1 className="text-3xl font-black text-gray-950">
                My Wishlist
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearWishlist}
            disabled={clearing}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-yellow-400 hover:bg-yellow-400 hover:text-black disabled:opacity-60"
          >
            <Trash2 size={17} />
            {clearing ? 'Clearing...' : 'Clear Wishlist'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product?._id || product?.slug}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;