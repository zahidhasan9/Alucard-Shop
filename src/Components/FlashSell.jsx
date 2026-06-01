
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowUpRight, Clock3, Sparkles, Timer } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getFlashsellProducts } from '../features/productSlice';
// import ProductCard from './Product/ProductCard';
// import ProductCardSkeleton from './UI/ProductCardSkeleton';
// import EmptyState from './UI/EmptyState';

// const FLASH_THEME = {
//   colors: {
//     sectionBg: '#F7F7F5',

//     black: '#0A0A0A',
//     yellow: '#F7C600',

//     wrapperBg: 'rgba(255,255,255,0.86)',
//     cardBg: 'rgba(255,255,255,0.72)',
//     cardBorder: 'rgba(10,10,10,0.07)',

//     text: '#0A0A0A',
//     mutedText: 'rgba(10,10,10,0.56)',

//     shadow: '0 14px 40px rgba(0,0,0,0.055)',
//     hoverShadow: '0 18px 50px rgba(0,0,0,0.10)',
//   },
// };

// const getCountdown = () => {
//   const now = new Date();
//   const end = new Date();

//   end.setHours(23, 59, 59, 999);

//   const diff = Math.max(0, end - now);

//   return {
//     hours: Math.floor(diff / (1000 * 60 * 60)),
//     minutes: Math.floor((diff / (1000 * 60)) % 60),
//     seconds: Math.floor((diff / 1000) % 60),
//   };
// };

// const CountdownBox = ({ label, value }) => {
//   return (
//     <div
//       className="min-w-[64px] rounded-2xl px-3 py-2.5 text-center"
//       style={{
//         backgroundColor: FLASH_THEME.colors.yellow,
//         color: FLASH_THEME.colors.black,
//       }}
//     >
//       <p className="text-xl font-semibold leading-none tracking-[-0.04em]">
//         {String(value).padStart(2, '0')}
//       </p>

//       <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] opacity-70">
//         {label}
//       </p>
//     </div>
//   );
// };

// const FlashSell = () => {
//   const dispatch = useDispatch();

//   const { flashPro = [], flashLoading, loading } = useSelector(
//     state => state.product
//   );

//   const [countdown, setCountdown] = useState(getCountdown);

//   useEffect(() => {
//     if (!flashPro?.length) {
//       dispatch(getFlashsellProducts());
//     }
//   }, [dispatch, flashPro?.length]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown(getCountdown());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const isLoading = flashLoading || (loading && !flashPro?.length);

//   return (
//     <section
//       className="font-Work_sans"
//       style={{ backgroundColor: FLASH_THEME.colors.sectionBg }}
//     >
//       <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
//         {/* Slim Header */}
//         <div
//           className="rounded-[28px] border p-2.5 backdrop-blur-xl"
//           style={{
//             backgroundColor: FLASH_THEME.colors.wrapperBg,
//             borderColor: FLASH_THEME.colors.cardBorder,
//             boxShadow: FLASH_THEME.colors.shadow,
//           }}
//         >
//           <div
//             className="flex flex-col gap-5 rounded-[22px] border px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
//             style={{
//               backgroundColor: FLASH_THEME.colors.cardBg,
//               borderColor: FLASH_THEME.colors.cardBorder,
//             }}
//           >
//             <div className="flex items-start gap-4">
//               <div
//                 className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
//                 style={{
//                   backgroundColor: FLASH_THEME.colors.yellow,
//                   color: FLASH_THEME.colors.black,
//                 }}
//               >
//                 <Sparkles size={21} strokeWidth={1.85} />
//               </div>

//               <div>
//                 <p
//                   className="text-xs font-semibold uppercase tracking-[0.22em]"
//                   style={{ color: FLASH_THEME.colors.yellow }}
//                 >
//                   Limited Time
//                 </p>

//                 <h2
//                   className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
//                   style={{ color: FLASH_THEME.colors.text }}
//                 >
//                   Flash Sale
//                 </h2>

//                 <p
//                   className="mt-2 max-w-xl text-sm font-medium leading-6"
//                   style={{ color: FLASH_THEME.colors.mutedText }}
//                 >
//                   Grab premium tech deals before the day ends.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//               <div
//                 className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
//                 style={{
//                   backgroundColor: FLASH_THEME.colors.black,
//                   color: FLASH_THEME.colors.yellow,
//                 }}
//               >
//                 <Timer size={16} />
//                 Deal ends in
//               </div>

//               <div className="flex gap-2">
//                 <CountdownBox label="Hours" value={countdown.hours} />
//                 <CountdownBox label="Mins" value={countdown.minutes} />
//                 <CountdownBox label="Secs" value={countdown.seconds} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Area */}
//         <div className="mt-8">
//           {isLoading ? (
//             <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <ProductCardSkeleton key={index} />
//               ))}
//             </div>
//           ) : flashPro?.length ? (
//             <>
//               <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//                 <div>
//                   <p
//                     className="text-xs font-semibold uppercase tracking-[0.22em]"
//                     style={{ color: FLASH_THEME.colors.yellow }}
//                   >
//                     Today’s Picks
//                   </p>

//                   <h3
//                     className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
//                     style={{ color: FLASH_THEME.colors.text }}
//                   >
//                     Best deals selected for you.
//                   </h3>
//                 </div>

//                 <Link
//                   to="/products?collection=flash-sale"
//                   className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
//                   style={{
//                     backgroundColor: FLASH_THEME.colors.black,
//                     color: FLASH_THEME.colors.yellow,
//                   }}
//                 >
//                   Browse All
//                   <ArrowUpRight size={15} />
//                 </Link>
//               </div>

//               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//                 {flashPro.slice(0, 8).map(product => (
//                   <ProductCard
//                     key={product?._id || product?.slug}
//                     product={product}
//                   />
//                 ))}
//               </div>

//               <div className="mt-7 text-center sm:hidden">
//                 <Link
//                   to="/products?collection=flash-sale"
//                   className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
//                   style={{
//                     backgroundColor: FLASH_THEME.colors.black,
//                     color: FLASH_THEME.colors.yellow,
//                   }}
//                 >
//                   View All Deals
//                   <ArrowUpRight size={15} />
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <div
//               className="rounded-[28px] border p-6"
//               style={{
//                 backgroundColor: FLASH_THEME.colors.wrapperBg,
//                 borderColor: FLASH_THEME.colors.cardBorder,
//                 boxShadow: FLASH_THEME.colors.shadow,
//               }}
//             >
//               <EmptyState
//                 title="No flash deals"
//                 message="Flash sale products are not available right now."
//                 buttonText="Browse Products"
//                 buttonLink="/products"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FlashSell;









import { memo, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, Flame } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { getFlashsellProducts } from '../features/productSlice';
import ProductCard from './Product/ProductCard';
import ProductCardSkeleton from './UI/ProductCardSkeleton';
import EmptyState from './UI/EmptyState';

const getCountdown = () => {
  const now = new Date();
  const end = new Date();

  end.setHours(23, 59, 59, 999);

  const diff = Math.max(0, end - now);

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownBox = memo(({ label, value }) => {
  return (
    <div className="min-w-[58px] rounded-2xl bg-white px-3 py-2 text-center shadow-sm ring-1 ring-black/10">
      <p className="text-lg font-black leading-none text-black">
        {String(value).padStart(2, '0')}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
        {label}
      </p>
    </div>
  );
});

const FlashCountdown = memo(() => {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <CountdownBox label="Hour" value={countdown.hours} />
      <CountdownBox label="Min" value={countdown.minutes} />
      <CountdownBox label="Sec" value={countdown.seconds} />
    </div>
  );
});

const FlashSell = () => {
  const dispatch = useDispatch();

  const { flashPro = [], flashLoading, loading } = useSelector(
    (state) => state.product || {}
  );

  useEffect(() => {
    if (!flashPro?.length) {
      dispatch(getFlashsellProducts());
    }
  }, [dispatch, flashPro?.length]);

  const visibleProducts = useMemo(() => {
    return Array.isArray(flashPro) ? flashPro.slice(0, 8) : [];
  }, [flashPro]);

  const isLoading = Boolean(flashLoading || (loading && !flashPro?.length));

  return (
    <section className="bg-[#f5f5f7] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-black">
                <Flame size={14} />
                Limited Time
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-black md:text-5xl">
                Flash Sale
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-black/55 md:text-base">
                Grab premium deals before the day ends.
              </p>
            </div>

            <div className="flex flex-col gap-2 md:items-end">
              <div className="flex items-center gap-2 text-sm font-bold text-black/55">
                <Clock3 size={17} />
                Deal ends in
              </div>

              <FlashCountdown />
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-black">
                  Today’s Picks
                </h3>

                <p className="text-sm text-black/45">
                  Best deals selected for you.
                </p>
              </div>

              <Link
                to="/products?collection=flash-sale"
                className="hidden items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300 sm:inline-flex"
              >
                Browse All
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
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product?._id || product?.slug} product={product} />
                  ))}
                </div>

                <div className="mt-6 flex justify-center sm:hidden">
                  <Link
                    to="/products?collection=flash-sale"
                    className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-6 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
                  >
                    View All Deals
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </>
            ) : (
              <EmptyState
                title="No flash sale products"
                message="There are no flash sale products available right now."
                actionLabel="Browse products"
                actionTo="/products"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSell;