


// import { lazy, Suspense } from 'react';

// import Carousel from '../Components/Carousel';
// import usePageTitle from '../hooks/usePageTitle';
// import CategoryIconSection from '../Components/Home/CategoryIconSection';
// import TrustBadges from '../Components/Home/TrustBadges';
// import BrandStrip from '../Components/Home/BrandStrip';
// import Testimonials from '../Components/Home/Testimonials';

// const Banner = lazy(() => import('../Components/Banner'));
// const FlashSell = lazy(() => import('../Components/FlashSell'));
// const ProductCardSet = lazy(() => import('../Components/Product/ProductCardSet'));
// const Newsletter = lazy(() => import('../Components/Newsletter'));
// const RecentlyViewedProducts = lazy(() =>
//   import('../Components/Product/RecentlyViewedProducts')
// );

// const HomePage = () => {
//   usePageTitle(
//     'Alucard Shop | Online Shopping',
//     'Buy clothing, electronics, accessories and daily essentials from Alucard Shop.'
//   );

//   return (
//     <>
//       <Carousel />
//       <TrustBadges />
//       <CategoryIconSection />

//       <Suspense fallback={null}>
//         <Banner />
//         <FlashSell />
//         <ProductCardSet />
//         <RecentlyViewedProducts />
//         <BrandStrip />
//         <Testimonials />
//         <Newsletter />
//       </Suspense>
//     </>
//   );
// };

// export default HomePage;











import { lazy, Suspense } from 'react';

import Carousel from '../Components/Carousel';
import usePageTitle from '../hooks/usePageTitle';
import TrustBadges from '../Components/Home/TrustBadges';
import CategoryIconSection from '../Components/Home/CategoryIconSection';

const Banner = lazy(() => import('../Components/Banner'));
const FlashSell = lazy(() => import('../Components/FlashSell'));
const ProductCardSet = lazy(() => import('../Components/Product/ProductCardSet'));
const RecentlyViewedProducts = lazy(() =>
  import('../Components/Product/RecentlyViewedProducts')
);
const BrandStrip = lazy(() => import('../Components/Home/BrandStrip'));
const Testimonials = lazy(() => import('../Components/Home/Testimonials'));
const Newsletter = lazy(() => import('../Components/Newsletter'));

const SectionFallback = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="h-36 animate-pulse rounded-[28px] bg-white shadow-sm ring-1 ring-black/5" />
    </div>
  );
};

const HomePage = () => {
  usePageTitle(
    'Alucard Shop | Online Shopping',
    'Buy clothing, electronics, accessories and daily essentials from Alucard Shop.'
  );

  return (
    <>
      <Carousel />
      <TrustBadges />
      <CategoryIconSection />

      <Suspense fallback={<SectionFallback />}>
        <Banner />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FlashSell />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ProductCardSet />
      </Suspense>

      <Suspense fallback={null}>
        <RecentlyViewedProducts />
        <BrandStrip />
        <Testimonials />
        <Newsletter />
      </Suspense>
    </>
  );
};

export default HomePage;