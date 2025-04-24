import React, { useState } from 'react';
import Breadcrumb from '../../Breadcrumb';
import HeaderOfView from './HeaderOfView';
import ProductFilter from './ProductFilter';

const ProductView = () => {
  const [view, setView] = useState('grid');

  return (
    <>
      <div>
        <Breadcrumb />
        <HeaderOfView />
        <ProductFilter />
        <div></div>
      </div>
    </>
  );
};

export default ProductView;

{
  /* <div>
  <div className="flex justify-end mb-4">
    <button
      onClick={() => setView('grid')}
      className={`p-2 ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
    >
      <FiGrid size={24} />
    </button>
    <button
      onClick={() => setView('list')}
      className={`p-2 ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
    >
      <FiList size={24} />
    </button>
  </div>
  <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-4'}>
    {products.map((product) => (
      <div
        key={product.id}
        className={
          view === 'grid'
            ? 'bg-white p-4 rounded-lg shadow-md'
            : 'bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center'
        }
      >
        <img
          src={product.image}
          alt={product.name}
          className={view === 'grid' ? 'w-full h-40 object-cover mb-4' : 'w-32 h-32 object-cover mr-4'}
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>; */
}
