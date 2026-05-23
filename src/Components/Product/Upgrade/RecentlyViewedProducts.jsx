import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentlyViewed } from '../../../utils/recentlyViewed';

const RecentlyViewedProducts = ({ currentId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getRecentlyViewed().filter(item => item._id !== currentId).slice(0, 6));
  }, [currentId]);

  if (!items.length) return null;

  return (
    <section className="mt-14">
      <h2 className="mb-5 text-2xl font-black text-gray-950">Recently viewed</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {items.map(product => (
          <Link key={product._id} to={`/product/${product.slug}`} className="rounded-3xl border bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <img src={product.thumbnail} alt={product.name} className="h-28 w-full rounded-2xl object-cover" />
            <h3 className="mt-2 line-clamp-2 text-xs font-bold text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm font-black">৳{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedProducts;
