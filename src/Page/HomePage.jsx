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
import Headline from '../Components/Headline';
import usePageTitle from '../hooks/usePageTitle';

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

      <Suspense fallback={null}>
        <Banner />
        <Headline />
        <FlashSell />
        <ProductCardSet />
        <RecentlyViewedProducts />
        <Newsletter />
      </Suspense>
    </>
  );
};

export default HomePage;