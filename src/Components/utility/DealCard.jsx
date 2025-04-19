import React from 'react';
import { Star } from 'lucide-react';
// Single Deal Card here use props way
export const DealCard = ({ deal }) => {
  const discount = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);

  return (
    <div className="px-3">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden h-full">
        <div className="relative h-52 flex items-center justify-center">
          <img src={deal.image} alt={deal.name} className="max-h-full max-w-full object-contain p-4" />
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {discount}% Off
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center space-x-2 mb-2">
            <p className="text-xl font-bold text-green-600">${deal.price.toFixed(2)}</p>
            <p className="text-sm text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</p>
          </div>

          <h3 className="text-base font-medium text-blue-600 hover:text-blue-800 cursor-pointer line-clamp-2 mb-2">
            {deal.name}
          </h3>

          <p className="text-xs text-gray-500 mb-3">Sold By: {deal.soldBy}</p>

          <div className="flex items-center mb-4">
            {[...Array(deal.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
            <span className="text-xs text-gray-500 ml-2">({deal.reviews})</span>
          </div>

          <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
