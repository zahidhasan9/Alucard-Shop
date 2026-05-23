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
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../features/wishlistSlice';
import WishlistButton from '../Components/Product/Upgrade/WishlistButton';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.wishlist || { products: [] });

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <main className="bg-gray-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 rounded-3xl bg-black p-8 text-white">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow-400"><Heart size={16} /> Saved items</p>
          <h1 className="mt-2 text-4xl font-black">My Wishlist</h1>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center">Loading...</div>
        ) : products?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map(product => (
              <div key={product._id} className="rounded-3xl border bg-white p-3 shadow-sm">
                <Link to={`/product/${product.slug}`}>
                  <img src={product.thumbnail || product.images?.[0]} alt={product.name} className="h-56 w-full rounded-2xl object-cover" />
                  <h2 className="mt-3 line-clamp-2 font-black text-gray-950">{product.name}</h2>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xl font-black">৳{product.price}</span>
                  <WishlistButton productId={product._id} className="!px-3 !py-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-black text-gray-950">Wishlist is empty</h2>
            <Link to="/products" className="mt-4 inline-flex rounded-2xl bg-black px-5 py-3 font-bold text-white">Browse products</Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
