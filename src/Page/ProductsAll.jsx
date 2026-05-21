// import React, { useState } from 'react';
// import Breadcrumb from '../Components/Breadcrumb';
// import HeaderOfView from '../Components/Product/ProductsAll/HeaderOfView';
// import ProductFilter from '../Components/Product/ProductsAll/ProductFilter';

// const ProductView = () => {
//   const [view, setView] = useState('grid');

//   return (
//     <>
//       <div className="bg-gray-100">
//         <Breadcrumb />
//         <HeaderOfView />
//         <ProductFilter />
//         <div></div>
//       </div>
//     </>
//   );
// };

// export default ProductView;

import Breadcrumb from '../Components/Breadcrumb';
import HeaderOfView from '../Components/Product/ProductsAll/HeaderOfView';
import ProductFilter from '../Components/Product/ProductsAll/ProductFilter';
import usePageTitle from '../hooks/usePageTitle';

const ProductsAll = () => {
  usePageTitle(
    'Products | Alucard Shop',
    'Browse all products from Alucard Shop with filters, sorting and search.'
  );

  return (
    <main className="bg-gray-100">
      <Breadcrumb />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <HeaderOfView />
        <ProductFilter />
      </div>
    </main>
  );
};

export default ProductsAll;