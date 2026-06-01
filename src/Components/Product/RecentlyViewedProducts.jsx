



// import { useEffect, useState } from 'react';
// import { Clock } from 'lucide-react';
// import ProductCard from './ProductCard';

// const RECENT_KEY = 'recentlyViewedProducts';

// const RecentlyViewedProducts = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
//     setItems(saved);
//   }, []);

//   if (!items.length) return null;

//   return (
//     <section className="bg-white py-14">
//       <div className="mx-auto max-w-7xl px-4 lg:px-8">
//         <div className="mb-7 flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//             <Clock size={23} />
//           </div>

//           <div>
//             <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//               History
//             </p>
//             <h2 className="text-2xl font-black text-gray-950">
//               Recently Viewed
//             </h2>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
//           {items.map((product) => (
//             <ProductCard key={product?._id || product?.slug} product={product} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentlyViewedProducts;








import { useEffect, useMemo, useState } from 'react';
import { Clock } from 'lucide-react';

import ProductCard from './ProductCard';

const RECENT_KEY = 'recentlyViewedProducts';

const RecentlyViewedProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      setItems(Array.isArray(saved) ? saved : []);
    } catch {
      setItems([]);
    }
  }, []);

  const visibleItems = useMemo(() => {
    return items.slice(0, 4);
  }, [items]);

  if (!visibleItems.length) return null;

  return (
    <section className="bg-[#f5f5f7] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-black">
            <Clock size={14} />
            History
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-black md:text-5xl">
            Recently Viewed
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-black/55 md:text-base">
            Continue from the products you checked recently.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((product) => (
            <ProductCard key={product?._id || product?.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedProducts;