import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import * as API from '../features/API';

const SearchSuggestions = ({ query, onSelect }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchSuggestions = async () => {
      if (!query || query.trim().length < 2) {
        setItems([]);
        return;
      }

      try {
        setLoading(true);

        const res = await API.getProducts({
          limit: 5,
          skip: 0,
          search: query.trim(),
        });

        const products = res.data?.products || [];

        if (mounted) {
          setItems(products.slice(0, 5));
        }
      } catch (error) {
        if (mounted) {
          setItems([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(fetchSuggestions, 250);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  if (!query || query.trim().length < 2) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-[70] mt-2 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
      <div className="border-b border-gray-100 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
        Search Suggestions
      </div>

      {loading ? (
        <div className="p-4 text-sm font-bold text-gray-500">Searching...</div>
      ) : items.length ? (
        <div className="max-h-80 overflow-auto">
          {items.map((product) => (
            <Link
              key={product?._id || product?.slug}
              to={`/product/${product?.slug}`}
              onClick={onSelect}
              className="flex gap-3 border-b border-gray-50 p-3 transition hover:bg-yellow-50"
            >
              <img
                src={product?.thumbnail || product?.images?.[0]}
                alt={product?.name || 'Product'}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 rounded-2xl bg-gray-100 object-cover"
              />

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-black text-gray-950">
                  {product?.name}
                </h4>

                <p className="mt-1 text-xs font-bold text-green-600">
                  ৳{product?.price || 0}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 p-4 text-sm font-bold text-gray-500">
          <Search size={17} />
          No product found
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;