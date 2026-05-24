import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  GitCompare,
  Package,
  Star,
  Trash2,
  XCircle,
} from 'lucide-react';

import {
  clearCompareProducts,
  getCompareProducts,
  toggleCompareProduct,
} from '../utils/compareProducts';
import EmptyState from '../Components/UI/EmptyState';
import usePageTitle from '../hooks/usePageTitle';

const CompareProducts = () => {
  const [products, setProducts] = useState([]);

  usePageTitle(
    'Compare Products | Alucard Shop',
    'Compare products by price, brand, rating, stock, features and specifications.'
  );

  useEffect(() => {
    const load = () => setProducts(getCompareProducts());
    load();

    window.addEventListener('compare-updated', load);
    return () => window.removeEventListener('compare-updated', load);
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p?.category?.name).filter(Boolean))],
    [products]
  );

  const formatPrice = (amount) =>
    `৳${Number(amount || 0).toLocaleString('en-BD')}`;

  const getImage = (product) =>
    product?.thumbnail?.url ||
    product?.thumbnail ||
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    '/placeholder.png';

  const getStock = (product) =>
    Number(product?.countInStock ?? product?.stock ?? 0);

  const getBrand = (product) =>
    product?.brand?.name || product?.brand || 'N/A';

  const getVariantText = (product) => {
    if (Array.isArray(product?.variants) && product.variants.length) {
      return product.variants
        .map((item) => {
          if (typeof item === 'string') return item;
          return `${item?.name || item?.type || 'Variant'}: ${
            Array.isArray(item?.options)
              ? item.options.join(', ')
              : item?.value || 'Available'
          }`;
        })
        .join(' | ');
    }

    if (product?.selectedVariants) {
      return Object.entries(product.selectedVariants)
        .map(([key, value]) => `${key}: ${value}`)
        .join(' | ');
    }

    return 'N/A';
  };

  const getFeatureText = (product) => {
    if (Array.isArray(product?.features) && product.features.length) {
      return product.features
        .map((feature) =>
          typeof feature === 'string'
            ? feature
            : `${feature?.title || feature?.name || 'Feature'}: ${
                feature?.value || ''
              }`
        )
        .join(' | ');
    }

    return product?.shortDescription || product?.description || 'N/A';
  };

  if (!products.length) {
    return (
      <EmptyState
        icon={GitCompare}
        title="No products to compare"
        message="Add products to compare from the product listing page."
        actionLabel="Explore Products"
        actionTo="/products"
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 font-Work_sans">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-yellow-700"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

          <button
            onClick={() => {
              clearCompareProducts();
              setProducts([]);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>

        <div className="mb-6 rounded-2xl bg-gray-950 p-6 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-yellow-400">
            Product Compare
          </p>
          <h1 className="mt-2 text-3xl font-black">Compare Products</h1>
          <p className="mt-2 text-sm text-gray-300">
            Compare {products.length} product{products.length > 1 ? 's' : ''}{' '}
            side by side. Maximum 4 products.
          </p>

          {categories.length > 1 && (
            <div className="mt-4 rounded-xl bg-yellow-400/15 p-3 text-sm font-semibold text-yellow-200">
              Tip: You are comparing products from different categories. Some
              specifications may not match.
            </div>
          )}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[980px] text-sm">
            <tbody>
              <CompareRow
                label="Product"
                values={products.map((product) => (
                  <div className="text-center">
                    <img
                      src={getImage(product)}
                      alt={product?.name}
                      className="mx-auto h-36 w-36 object-contain"
                    />

                    <Link
                      to={`/product/${product?.slug || product?._id}`}
                      className="mt-3 line-clamp-2 block font-black text-gray-950 hover:text-yellow-700"
                    >
                      {product?.name}
                    </Link>

                    <button
                      onClick={() => {
                        const updated = toggleCompareProduct(product);
                        setProducts(updated);
                      }}
                      className="mt-3 rounded-full border border-red-200 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              />

              <CompareRow
                label="Current Price"
                highlight
                values={products.map((p) => formatPrice(p?.price))}
              />

              <CompareRow
                label="Old Price"
                values={products.map((p) =>
                  Number(p?.oldPrice || 0) > 0 ? formatPrice(p.oldPrice) : 'N/A'
                )}
              />

              <CompareRow
                label="Discount"
                values={products.map((p) =>
                  Number(p?.discount || 0) > 0 ? `${p.discount}% OFF` : 'No discount'
                )}
              />

              <CompareRow
                label="Brand"
                values={products.map((p) => getBrand(p))}
              />

              <CompareRow
                label="Category"
                values={products.map((p) => p?.category?.name || 'N/A')}
              />

              <CompareRow
                label="Rating"
                values={products.map((p) => (
                  <span className="inline-flex items-center justify-center gap-1 font-black text-yellow-600">
                    <Star size={15} className="fill-yellow-400 text-yellow-400" />
                    {Number(p?.rating || 0).toFixed(1)}
                  </span>
                ))}
              />

              <CompareRow
                label="Reviews"
                values={products.map((p) =>
                  p?.numReviews ?? p?.reviews?.length ?? 0
                )}
              />

              <CompareRow
                label="Stock Status"
                values={products.map((p) =>
                  getStock(p) > 0 ? (
                    <span className="inline-flex items-center justify-center gap-1 font-bold text-green-600">
                      <CheckCircle size={15} />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-1 font-bold text-red-600">
                      <XCircle size={15} />
                      Out of Stock
                    </span>
                  )
                )}
              />

              <CompareRow
                label="Stock Quantity"
                values={products.map((p) => getStock(p))}
              />

              <CompareRow
                label="Variants"
                values={products.map((p) => getVariantText(p))}
                longText
              />

              <CompareRow
                label="Features / Description"
                values={products.map((p) => getFeatureText(p))}
                longText
              />

              <CompareRow
                label="Delivery"
                values={products.map(() => 'Fast delivery support')}
              />

              <CompareRow
                label="Return Policy"
                values={products.map(() => 'Easy return support')}
              />

              <CompareRow
                label="Action"
                values={products.map((p) => (
                  <Link
                    to={`/product/${p?.slug || p?._id}`}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-2 text-xs font-black text-gray-950 hover:bg-yellow-500"
                  >
                    View Product
                  </Link>
                ))}
              />
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex gap-3">
            <Package className="text-yellow-700" size={22} />
            <p className="text-sm font-semibold leading-6 text-yellow-900">
              For best results, compare products from the same category and
              similar price range.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

const CompareRow = ({ label, values, highlight = false, longText = false }) => (
  <tr className="border-b border-gray-100 last:border-b-0">
    <td className="sticky left-0 z-10 w-52 bg-gray-50 p-4 align-top font-black text-gray-950">
      {label}
    </td>

    {values.map((value, index) => (
      <td
        key={index}
        className={`min-w-60 p-4 text-center align-top ${
          highlight
            ? 'bg-yellow-50 text-lg font-black text-gray-950'
            : 'font-semibold text-gray-700'
        }`}
      >
        <div className={longText ? 'mx-auto max-w-xs text-left text-sm leading-6' : ''}>
          {value}
        </div>
      </td>
    ))}
  </tr>
);

export default CompareProducts;