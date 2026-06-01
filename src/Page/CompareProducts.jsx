// import { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   ArrowLeft,
//   CheckCircle,
//   GitCompare,
//   Package,
//   Star,
//   Trash2,
//   XCircle,
// } from 'lucide-react';

// import {
//   clearCompareProducts,
//   getCompareProducts,
//   toggleCompareProduct,
// } from '../utils/compareProducts';
// import EmptyState from '../Components/UI/EmptyState';
// import usePageTitle from '../hooks/usePageTitle';

// const CompareProducts = () => {
//   const [products, setProducts] = useState([]);

//   usePageTitle(
//     'Compare Products | Alucard Shop',
//     'Compare products by price, brand, rating, stock, features and specifications.'
//   );

//   useEffect(() => {
//     const load = () => setProducts(getCompareProducts());
//     load();

//     window.addEventListener('compare-updated', load);
//     return () => window.removeEventListener('compare-updated', load);
//   }, []);

//   const categories = useMemo(
//     () => [...new Set(products.map((p) => p?.category?.name).filter(Boolean))],
//     [products]
//   );

//   const formatPrice = (amount) =>
//     `৳${Number(amount || 0).toLocaleString('en-BD')}`;

//   const getImage = (product) =>
//     product?.thumbnail?.url ||
//     product?.thumbnail ||
//     product?.images?.[0]?.url ||
//     product?.images?.[0] ||
//     '/placeholder.png';

//   const getStock = (product) =>
//     Number(product?.countInStock ?? product?.stock ?? 0);

//   const getBrand = (product) =>
//     product?.brand?.name || product?.brand || 'N/A';

//   const getVariantText = (product) => {
//     if (Array.isArray(product?.variants) && product.variants.length) {
//       return product.variants
//         .map((item) => {
//           if (typeof item === 'string') return item;
//           return `${item?.name || item?.type || 'Variant'}: ${
//             Array.isArray(item?.options)
//               ? item.options.join(', ')
//               : item?.value || 'Available'
//           }`;
//         })
//         .join(' | ');
//     }

//     if (product?.selectedVariants) {
//       return Object.entries(product.selectedVariants)
//         .map(([key, value]) => `${key}: ${value}`)
//         .join(' | ');
//     }

//     return 'N/A';
//   };

//   const getFeatureText = (product) => {
//     if (Array.isArray(product?.features) && product.features.length) {
//       return product.features
//         .map((feature) =>
//           typeof feature === 'string'
//             ? feature
//             : `${feature?.title || feature?.name || 'Feature'}: ${
//                 feature?.value || ''
//               }`
//         )
//         .join(' | ');
//     }

//     return product?.shortDescription || product?.description || 'N/A';
//   };

//   if (!products.length) {
//     return (
//       <EmptyState
//         icon={GitCompare}
//         title="No products to compare"
//         message="Add products to compare from the product listing page."
//         actionLabel="Explore Products"
//         actionTo="/products"
//       />
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-8 font-Work_sans">
//       <div className="container mx-auto max-w-7xl">
//         <div className="mb-5 flex items-center justify-between gap-3">
//           <Link
//             to="/products"
//             className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-yellow-700"
//           >
//             <ArrowLeft size={17} />
//             Back to Products
//           </Link>

//           <button
//             onClick={() => {
//               clearCompareProducts();
//               setProducts([]);
//             }}
//             className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
//           >
//             <Trash2 size={16} />
//             Clear All
//           </button>
//         </div>

//         <div className="mb-6 rounded-2xl bg-gray-950 p-6 text-white">
//           <p className="text-sm font-bold uppercase tracking-wide text-yellow-400">
//             Product Compare
//           </p>
//           <h1 className="mt-2 text-3xl font-black">Compare Products</h1>
//           <p className="mt-2 text-sm text-gray-300">
//             Compare {products.length} product{products.length > 1 ? 's' : ''}{' '}
//             side by side. Maximum 4 products.
//           </p>

//           {categories.length > 1 && (
//             <div className="mt-4 rounded-xl bg-yellow-400/15 p-3 text-sm font-semibold text-yellow-200">
//               Tip: You are comparing products from different categories. Some
//               specifications may not match.
//             </div>
//           )}
//         </div>

//         <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <table className="w-full min-w-[980px] text-sm">
//             <tbody>
//               <CompareRow
//                 label="Product"
//                 values={products.map((product) => (
//                   <div className="text-center">
//                     <img
//                       src={getImage(product)}
//                       alt={product?.name}
//                       className="mx-auto h-36 w-36 object-contain"
//                     />

//                     <Link
//                       to={`/product/${product?.slug || product?._id}`}
//                       className="mt-3 line-clamp-2 block font-black text-gray-950 hover:text-yellow-700"
//                     >
//                       {product?.name}
//                     </Link>

//                     <button
//                       onClick={() => {
//                         const updated = toggleCompareProduct(product);
//                         setProducts(updated);
//                       }}
//                       className="mt-3 rounded-full border border-red-200 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-50"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               />

//               <CompareRow
//                 label="Current Price"
//                 highlight
//                 values={products.map((p) => formatPrice(p?.price))}
//               />

//               <CompareRow
//                 label="Old Price"
//                 values={products.map((p) =>
//                   Number(p?.oldPrice || 0) > 0 ? formatPrice(p.oldPrice) : 'N/A'
//                 )}
//               />

//               <CompareRow
//                 label="Discount"
//                 values={products.map((p) =>
//                   Number(p?.discount || 0) > 0 ? `${p.discount}% OFF` : 'No discount'
//                 )}
//               />

//               <CompareRow
//                 label="Brand"
//                 values={products.map((p) => getBrand(p))}
//               />

//               <CompareRow
//                 label="Category"
//                 values={products.map((p) => p?.category?.name || 'N/A')}
//               />

//               <CompareRow
//                 label="Rating"
//                 values={products.map((p) => (
//                   <span className="inline-flex items-center justify-center gap-1 font-black text-yellow-600">
//                     <Star size={15} className="fill-yellow-400 text-yellow-400" />
//                     {Number(p?.rating || 0).toFixed(1)}
//                   </span>
//                 ))}
//               />

//               <CompareRow
//                 label="Reviews"
//                 values={products.map((p) =>
//                   p?.numReviews ?? p?.reviews?.length ?? 0
//                 )}
//               />

//               <CompareRow
//                 label="Stock Status"
//                 values={products.map((p) =>
//                   getStock(p) > 0 ? (
//                     <span className="inline-flex items-center justify-center gap-1 font-bold text-green-600">
//                       <CheckCircle size={15} />
//                       In Stock
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center justify-center gap-1 font-bold text-red-600">
//                       <XCircle size={15} />
//                       Out of Stock
//                     </span>
//                   )
//                 )}
//               />

//               <CompareRow
//                 label="Stock Quantity"
//                 values={products.map((p) => getStock(p))}
//               />

//               <CompareRow
//                 label="Variants"
//                 values={products.map((p) => getVariantText(p))}
//                 longText
//               />

//               <CompareRow
//                 label="Features / Description"
//                 values={products.map((p) => getFeatureText(p))}
//                 longText
//               />

//               <CompareRow
//                 label="Delivery"
//                 values={products.map(() => 'Fast delivery support')}
//               />

//               <CompareRow
//                 label="Return Policy"
//                 values={products.map(() => 'Easy return support')}
//               />

//               <CompareRow
//                 label="Action"
//                 values={products.map((p) => (
//                   <Link
//                     to={`/product/${p?.slug || p?._id}`}
//                     className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-2 text-xs font-black text-gray-950 hover:bg-yellow-500"
//                   >
//                     View Product
//                   </Link>
//                 ))}
//               />
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
//           <div className="flex gap-3">
//             <Package className="text-yellow-700" size={22} />
//             <p className="text-sm font-semibold leading-6 text-yellow-900">
//               For best results, compare products from the same category and
//               similar price range.
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// const CompareRow = ({ label, values, highlight = false, longText = false }) => (
//   <tr className="border-b border-gray-100 last:border-b-0">
//     <td className="sticky left-0 z-10 w-52 bg-gray-50 p-4 align-top font-black text-gray-950">
//       {label}
//     </td>

//     {values.map((value, index) => (
//       <td
//         key={index}
//         className={`min-w-60 p-4 text-center align-top ${
//           highlight
//             ? 'bg-yellow-50 text-lg font-black text-gray-950'
//             : 'font-semibold text-gray-700'
//         }`}
//       >
//         <div className={longText ? 'mx-auto max-w-xs text-left text-sm leading-6' : ''}>
//           {value}
//         </div>
//       </td>
//     ))}
//   </tr>
// );

// export default CompareProducts;




import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  GitCompare,
  Package,
  ShoppingBag,
  Star,
  Trash2,
  XCircle,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {
  clearCompareProducts,
  getCompareProducts,
  toggleCompareProduct,
} from '../utils/compareProducts';
import { addToCart, fetchCart } from '../features/cartSlice';
import usePageTitle from '../hooks/usePageTitle';

const formatPrice = amount => `৳${Number(amount || 0).toLocaleString('en-BD')}`;

const getImage = product => {
  return (
    product?.thumbnail?.url ||
    product?.thumbnail ||
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    product?.image?.url ||
    product?.image ||
    '/placeholder.png'
  );
};

const getStock = product => Number(product?.countInStock ?? product?.stock ?? 0);

const getBrand = product => {
  return product?.brand?.name || product?.brand || 'N/A';
};

const getCategory = product => {
  return product?.category?.name || product?.category || 'N/A';
};

const getSlug = product => {
  return product?.slug || product?._id;
};

const getProductId = product => {
  return product?._id || product?.productId || product?.id;
};

const getVariantText = product => {
  if (Array.isArray(product?.variants) && product.variants.length) {
    return product.variants
      .map(item => {
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

const getFeatureText = product => {
  if (Array.isArray(product?.features) && product.features.length) {
    return product.features
      .map(feature =>
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

const CompareProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.user);
  const { loading: cartLoading } = useSelector(state => state.cart);

  const [products, setProducts] = useState([]);

  usePageTitle(
    'Compare Products | Alucard Shop',
    'Compare products by price, brand, rating, stock, features and specifications.'
  );

  useEffect(() => {
    const loadCompareProducts = () => {
      setProducts(getCompareProducts());
    };

    loadCompareProducts();

    window.addEventListener('compare-updated', loadCompareProducts);

    return () => {
      window.removeEventListener('compare-updated', loadCompareProducts);
    };
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map(item => getCategory(item)).filter(Boolean))];
  }, [products]);

  const handleRemove = product => {
    const updated = toggleCompareProduct(product);
    setProducts(updated);
    toast.success('Product removed from compare');
  };

  const handleClearAll = () => {
    clearCompareProducts();
    setProducts([]);
    toast.success('Compare list cleared');
  };

  const handleAddToCart = async product => {
    if (!isAuthenticated) {
      toast.error('Please login to add product to cart');
      navigate('/login');
      return;
    }

    const productId = getProductId(product);
    const slug = getSlug(product);
    const image = getImage(product);

    if (!productId || !product?.name || !slug) {
      toast.error('Invalid product data');
      return;
    }

    try {
      await dispatch(
        addToCart({
          productId,
          name: product.name || product.title,
          price: Number(product.price || 0),
          image,
          quantity: 1,
          slug,
          variantId: product?.selectedVariant?._id || product?.variantId || '',
          variantLabel:
            product?.selectedVariant?.label || product?.variantLabel || '',
        })
      ).unwrap();

      dispatch(fetchCart());
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Failed to add product to cart'
      );
    }
  };

  if (!products.length) {
    return (
      <main className="min-h-screen bg-gray-100 font-Work_sans">
        <section className="container mx-auto max-w-6xl px-4 py-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-gray-700 shadow-sm ring-1 ring-black/5 hover:bg-yellow-50"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
              <GitCompare size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-black text-gray-950">
              No products to compare
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-gray-500">
              Add products to compare from product cards or product details page.
              You can compare up to 4 products side by side.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              Browse Products
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 font-Work_sans">
      <section className="container mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-gray-700 shadow-sm ring-1 ring-black/5 hover:bg-yellow-50"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
          >
            <Trash2 size={17} />
            Clear All
          </button>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-700">
                <GitCompare size={16} />
                Product Compare
              </p>

              <h1 className="mt-4 text-3xl font-black text-gray-950">
                Compare Products
              </h1>

              <p className="mt-2 text-sm font-semibold text-gray-500">
                Compare {products.length} product
                {products.length > 1 ? 's' : ''} side by side. Maximum 4
                products.
              </p>
            </div>

            {categories.length > 1 && (
              <div className="rounded-2xl bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-700">
                Tip: You are comparing products from different categories.
              </div>
            )}
          </div>

          {/* Product card view */}
          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map(product => {
              const stock = getStock(product);
              const price = Number(product?.price || 0);
              const oldPrice = Number(product?.oldPrice || 0);
              const rating = Number(product?.rating || product?.ratings || 0);

              return (
                <div
                  key={getProductId(product)}
                  className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    to={`/product/${getSlug(product)}`}
                    className="block h-52 overflow-hidden bg-gray-50"
                  >
                    <img
                      src={getImage(product)}
                      alt={product?.name || product?.title || 'Product'}
                      className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-yellow-600">
                      {getBrand(product)}
                    </p>

                    <Link to={`/product/${getSlug(product)}`}>
                      <h3 className="mt-2 line-clamp-2 min-h-[44px] text-base font-black text-gray-950 hover:text-yellow-700">
                        {product?.name || product?.title || 'Product'}
                      </h3>
                    </Link>

                    <div className="mt-3 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(item => (
                        <Star
                          key={item}
                          size={15}
                          className={
                            item <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}

                      <span className="ml-1 text-xs font-bold text-gray-500">
                        ({product?.numReviews || product?.reviews?.length || 0})
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xl font-black text-gray-950">
                        {formatPrice(price)}
                      </span>

                      {oldPrice > price && (
                        <span className="text-sm font-bold text-gray-400 line-through">
                          {formatPrice(oldPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-3">
                      {stock > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
                          <CheckCircle size={14} />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700">
                          <XCircle size={14} />
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        disabled={cartLoading || stock <= 0}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-3 py-2.5 text-xs font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ShoppingBag size={15} />
                        Cart
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemove(product)}
                        className="rounded-full border border-red-200 px-3 py-2.5 text-xs font-black text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compare table */}
          <div className="overflow-x-auto rounded-3xl border border-gray-100">
            <div className="min-w-[900px]">
              <CompareRow
                label="Product"
                values={products.map(product => (
                  <div
                    key={getProductId(product)}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={getImage(product)}
                      alt={product?.name || 'Product'}
                      className="h-14 w-14 rounded-2xl object-contain bg-gray-50"
                    />

                    <div>
                      <p className="line-clamp-2 font-black text-gray-950">
                        {product?.name || product?.title || 'Product'}
                      </p>

                      <Link
                        to={`/product/${getSlug(product)}`}
                        className="text-xs font-bold text-yellow-700 hover:underline"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                ))}
              />

              <CompareRow
                label="Price"
                highlight
                values={products.map(product => formatPrice(product?.price))}
              />

              <CompareRow
                label="Old Price"
                values={products.map(product =>
                  Number(product?.oldPrice || 0) > 0
                    ? formatPrice(product.oldPrice)
                    : 'N/A'
                )}
              />

              <CompareRow
                label="Discount"
                values={products.map(product =>
                  Number(product?.discount || 0) > 0
                    ? `${product.discount}% OFF`
                    : 'No discount'
                )}
              />

              <CompareRow label="Brand" values={products.map(getBrand)} />

              <CompareRow label="Category" values={products.map(getCategory)} />

              <CompareRow
                label="Rating"
                values={products.map(product => (
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span>
                      {Number(product?.rating || product?.ratings || 0).toFixed(
                        1
                      )}
                    </span>
                  </div>
                ))}
              />

              <CompareRow
                label="Reviews"
                values={products.map(
                  product => product?.numReviews ?? product?.reviews?.length ?? 0
                )}
              />

              <CompareRow
                label="Stock Status"
                values={products.map(product =>
                  getStock(product) > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
                      <CheckCircle size={14} />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700">
                      <XCircle size={14} />
                      Out of Stock
                    </span>
                  )
                )}
              />

              <CompareRow
                label="Stock Quantity"
                values={products.map(product => getStock(product))}
              />

              <CompareRow
                label="Variants"
                values={products.map(product => getVariantText(product))}
                longText
              />

              <CompareRow
                label="Features"
                values={products.map(product => getFeatureText(product))}
                longText
              />

              <CompareRow
                label="Delivery"
                values={products.map(() => 'Fast delivery support')}
              />

              <CompareRow
                label="Return"
                values={products.map(() => 'Easy return support')}
              />
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm font-semibold text-gray-600">
            <Package className="mr-2 inline-block text-yellow-700" size={18} />
            For best results, compare products from the same category and similar
            price range.
          </div>
        </div>
      </section>
    </main>
  );
};

const CompareRow = ({ label, values, highlight = false, longText = false }) => {
  return (
    <div
      className={`grid border-b border-gray-100 last:border-b-0`}
      style={{
        gridTemplateColumns: `180px repeat(${values.length}, minmax(180px, 1fr))`,
      }}
    >
      <div className="bg-gray-50 p-4 text-sm font-black text-gray-700">
        {label}
      </div>

      {values.map((value, index) => (
        <div
          key={index}
          className={`p-4 text-sm font-bold ${
            highlight ? 'bg-yellow-50 text-yellow-800' : 'bg-white text-gray-700'
          } ${longText ? 'leading-6' : ''}`}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default CompareProducts;