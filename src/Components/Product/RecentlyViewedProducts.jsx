// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Clock } from 'lucide-react';

// const RECENT_KEY = 'recentlyViewedProducts';

// const RecentlyViewedProducts = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
//     setItems(saved);
//   }, []);

//   if (!items.length) return null;

//   return (
//     <section className="bg-white py-12">
//       <div className="mx-auto max-w-7xl px-4 lg:px-8">
//         <div className="mb-6 flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
//             <Clock size={20} className="text-yellow-700" />
//           </div>

//           <div>
//             <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">
//               History
//             </p>
//             <h2 className="text-2xl font-black text-gray-900">
//               Recently Viewed
//             </h2>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
//           {items.map((product) => (
//             <Link
//               key={product?._id || product?.slug}
//               to={`/product/${product?.slug}`}
//               className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
//             >
//               <div className="aspect-square overflow-hidden bg-gray-100">
//                 <img
//                   src={product?.thumbnail}
//                   alt={product?.name || 'Recently viewed product'}
//                   loading="lazy"
//                   decoding="async"
//                   className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//                 />
//               </div>

//               <div className="p-3">
//                 <h3 className="line-clamp-2 text-xs font-bold text-gray-900">
//                   {product?.name}
//                 </h3>
//                 <p className="mt-1 text-sm font-black text-green-600">
//                   ৳{product?.price || 0}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentlyViewedProducts;



import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import ProductCard from './ProductCard';

const RECENT_KEY = 'recentlyViewedProducts';

const RecentlyViewedProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    setItems(saved);
  }, []);

  if (!items.length) return null;

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
            <Clock size={23} />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
              History
            </p>
            <h2 className="text-2xl font-black text-gray-950">
              Recently Viewed
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {items.map((product) => (
            <ProductCard key={product?._id || product?.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedProducts;