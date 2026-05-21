import { lazy, Suspense } from 'react';

import Carousel from '../Components/Carousel';
import Headline from '../Components/Headline';

const Banner = lazy(() => import('../Components/Banner'));
const FlashSell = lazy(() => import('../Components/FlashSell'));
const ProductCardSet = lazy(() => import('../Components/Product/ProductCardSet'));
const Newsletter = lazy(() => import('../Components/Newsletter'));

const HomePage = () => {
  return (
    <>
      <Carousel />
      <Headline />

      <Suspense fallback={null}>
        <Banner />
        <FlashSell />
        <ProductCardSet />
        <Newsletter />
      </Suspense>
    </>
  );
};

export default HomePage;