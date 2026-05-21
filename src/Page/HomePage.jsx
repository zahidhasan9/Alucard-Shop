// import { lazy, Suspense } from 'react';

// import Carousel from '../Components/Carousel';
// import Headline from '../Components/Headline';

// const Banner = lazy(() => import('../Components/Banner'));
// const FlashSell = lazy(() => import('../Components/FlashSell'));
// const ProductCardSet = lazy(() => import('../Components/Product/ProductCardSet'));
// const Newsletter = lazy(() => import('../Components/Newsletter'));

// const HomePage = () => {
//   return (
//     <>
//       <Carousel />
//       <Headline />

//       <Suspense fallback={null}>
//         <Banner />
//         <FlashSell />
//         <ProductCardSet />
//         <Newsletter />
//       </Suspense>
//     </>
//   );
// };

// export default HomePage;


import { lazy, Suspense } from 'react';

import Carousel from '../Components/Carousel';
import usePageTitle from '../hooks/usePageTitle';
import CategoryIconSection from '../Components/Home/CategoryIconSection';
import TrustBadges from '../Components/Home/TrustBadges';
import BrandStrip from '../Components/Home/BrandStrip';
import Testimonials from '../Components/Home/Testimonials';

const Banner = lazy(() => import('../Components/Banner'));
const FlashSell = lazy(() => import('../Components/FlashSell'));
const ProductCardSet = lazy(() => import('../Components/Product/ProductCardSet'));
const Newsletter = lazy(() => import('../Components/Newsletter'));
const RecentlyViewedProducts = lazy(() =>
  import('../Components/Product/RecentlyViewedProducts')
);

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

      <Suspense fallback={null}>
        <Banner />
        <FlashSell />
        <ProductCardSet />
        <RecentlyViewedProducts />
        <BrandStrip />
        <Testimonials />
        <Newsletter />
      </Suspense>
    </>
  );
};

export default HomePage;