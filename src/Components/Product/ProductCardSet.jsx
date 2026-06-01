



// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { getFeaturedProducts } from '../../features/productSlice';
// import ProductCard from './ProductCard';
// import ProductCardSkeleton from '../UI/ProductCardSkeleton';
// import EmptyState from '../UI/EmptyState';

// const ProductCardSet = () => {
//   const dispatch = useDispatch();

//   const { featuredPro = [], featuredLoading, loading } = useSelector(
//     (state) => state.product
//   );

//   useEffect(() => {
//     if (!featuredPro?.length) {
//       dispatch(getFeaturedProducts());
//     }
//   }, [dispatch, featuredPro?.length]);

//   const isLoading = featuredLoading || (loading && !featuredPro?.length);

//   return (
//     <section className="bg-gray-100 py-14">
//       <div className="mx-auto max-w-7xl px-4 lg:px-8">
//         <div className="mb-7 flex items-end justify-between gap-4">
//           <div>
//             <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//               Featured
//             </p>

//             <h2 className="mt-1 text-2xl font-black text-gray-950 md:text-3xl">
//               Popular Products
//             </h2>
//           </div>

//           <Link
//             to="/products"
//             className="rounded-full bg-black px-5 py-2 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
//           >
//             View All
//           </Link>
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//             {Array.from({ length: 8 }).map((_, index) => (
//               <ProductCardSkeleton key={index} />
//             ))}
//           </div>
//         ) : featuredPro?.length ? (
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//             {featuredPro.map((product) => (
//               <ProductCard key={product?._id || product?.slug} product={product} />
//             ))}
//           </div>
//         ) : (
//           <EmptyState
//             title="No featured products"
//             message="Featured products are not available right now."
//             buttonText="Browse Products"
//             buttonLink="/products"
//           />
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductCardSet;











import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { getFeaturedProducts } from '../../features/productSlice';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '../UI/ProductCardSkeleton';
import EmptyState from '../UI/EmptyState';

const ProductCardSet = () => {
  const dispatch = useDispatch();

  const { featuredPro = [], featuredLoading, loading } = useSelector(
    (state) => state.product || {}
  );

  useEffect(() => {
    if (!featuredPro?.length) {
      dispatch(getFeaturedProducts());
    }
  }, [dispatch, featuredPro?.length]);

  const visibleProducts = useMemo(() => {
    return Array.isArray(featuredPro) ? featuredPro.slice(0, 8) : [];
  }, [featuredPro]);

  const isLoading = Boolean(featuredLoading || (loading && !featuredPro?.length));

  return (
    <section className="bg-[#f5f5f7] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-black">
              <Sparkles size={14} />
              Featured
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-black md:text-5xl">
              Popular Products
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-black/55 md:text-base">
              Carefully selected items for smart shopping.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            View All
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : visibleProducts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product?._id || product?.slug} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No featured products"
            message="Featured products will appear here once available."
            actionLabel="Browse products"
            actionTo="/products"
          />
        )}
      </div>
    </section>
  );
};

export default ProductCardSet;