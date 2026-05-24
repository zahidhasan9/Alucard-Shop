

// import { useEffect, useMemo, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShoppingCart, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import Loader from '../Components/Loader';
// import Breadcrumb from '../Components/Breadcrumb';
// import Reviews from '../Components/Product/ProductDetails/Reviews';
// import { getProduct } from '../features/productSlice';
// import { getProductReviews } from '../features/reviewSlice';
// import { addToCart, fetchCart } from '../features/cartSlice';
// import { fetchWishlist } from '../features/wishlistSlice';
// import ProductGalleryZoom from '../Components/Product/Upgrade/ProductGalleryZoom';
// import VariantSelector from '../Components/Product/Upgrade/VariantSelector';
// import WishlistButton from '../Components/Product/Upgrade/WishlistButton';
// import RelatedProductsModern from '../Components/Product/Upgrade/RelatedProductsModern';
// import RecentlyViewedProducts from '../Components/Product/Upgrade/RecentlyViewedProducts';
// import ProductQuestions from '../Components/Product/Upgrade/ProductQuestions';
// import ProductSEO from '../Components/Product/Upgrade/ProductSEO';
// import { saveRecentlyViewed } from '../utils/recentlyViewed';

// const formatPrice = (value) => {
//   const amount = Number(value || 0);
//   return `৳${amount.toLocaleString('en-BD')}`;
// };

// const cleanValue = (value) => {
//   if (value === undefined || value === null || value === '') return 'N/A';
//   return value;
// };

// const InfoRow = ({ label, value }) => (
//   <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0">
//     <span className="text-sm font-semibold text-gray-500">{label}</span>
//     <span className="text-right text-sm font-bold text-gray-900">{cleanValue(value)}</span>
//   </div>
// );

// const SpecGroup = ({ title, children }) => (
//   <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//     <h3 className="mb-2 text-base font-black text-gray-950">{title}</h3>
//     <div>{children}</div>
//   </div>
// );

// const ProductDetails = () => {
//   const { slug } = useParams();
//   const dispatch = useDispatch();

//   const { product, loading, error } = useSelector((state) => state.product);

//   const [qty, setQty] = useState(1);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   useEffect(() => {
//     if (slug) {
//       dispatch(getProduct(slug));
//       setQty(1);
//       setSelectedVariant(null);
//     }
//   }, [dispatch, slug]);

//   useEffect(() => {
//     if (product?._id) {
//       dispatch(getProductReviews(product._id));
//       dispatch(fetchWishlist());
//       saveRecentlyViewed(product);

//       if (product.variants?.length) {
//         const availableVariant =
//           product.variants.find((variant) => Number(variant.stock || 0) > 0) ||
//           product.variants[0];

//         setSelectedVariant(availableVariant);
//       }
//     }
//   }, [dispatch, product?._id]);

//   const activePrice = Number(selectedVariant?.price || product?.price || 0);
//   const activeOldPrice = Number(selectedVariant?.oldPrice || product?.oldPrice || 0);
//   const activeStock = selectedVariant
//     ? Number(selectedVariant.stock || 0)
//     : Number(product?.countInStock || 0);

//   const discount =
//     activeOldPrice > activePrice
//       ? Math.round(((activeOldPrice - activePrice) / activeOldPrice) * 100)
//       : Number(product?.discount || 0);

//   const stockText = useMemo(() => {
//     if (activeStock <= 0) return 'Out of stock';
//     if (activeStock <= 3) return `Only ${activeStock} left`;
//     return 'In stock';
//   }, [activeStock]);

//   const stockClass = activeStock > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';

//   const handleAddToCart = async () => {
//     if (product?.variants?.length && !selectedVariant) {
//       toast.error('Please select a variant');
//       return;
//     }

//     if (activeStock <= 0) {
//       toast.error('This item is out of stock');
//       return;
//     }

//     if (qty > activeStock) {
//       toast.error(`Only ${activeStock} item available`);
//       return;
//     }

//     await dispatch(
//       addToCart({
//         productId: product._id,
//         name: product.name,
//         price: activePrice,
//         image: selectedVariant?.image || product.thumbnail || product.images?.[0],
//         quantity: qty,
//         slug: product.slug,
//         variantId: selectedVariant?._id,
//         variantLabel:
//           selectedVariant?.label ||
//           [selectedVariant?.color, selectedVariant?.size, selectedVariant?.storage]
//             .filter(Boolean)
//             .join(' / '),
//       })
//     );

//     dispatch(fetchCart());
//   };

//   const productSpecs = useMemo(() => {
//     if (!Array.isArray(product?.details)) return [];

//     return product.details
//       .filter((item) => item?.key || item?.name || item?.label)
//       .map((item) => ({
//         label: item.key || item.name || item.label,
//         value: item.value || item.description || 'N/A',
//       }));
//   }, [product?.details]);

//   if (loading) return <Loader />;

//   if (error) {
//     return (
//       <div className="mx-auto max-w-7xl px-4 py-20 text-red-600">
//         {error}
//       </div>
//     );
//   }

//   if (!product?._id) {
//     return (
//       <div className="mx-auto max-w-7xl px-4 py-20 text-gray-700">
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <main className="bg-gray-50 pb-16">
//       <ProductSEO product={product} />

//       <div className="mx-auto max-w-7xl px-4 py-6">
//         <Breadcrumb />

//         {/* Main Product Area */}
//         <section className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
//           <div className="grid gap-8 p-4 md:p-6 lg:grid-cols-2 lg:p-8">
//             {/* Left Gallery */}
//             <div className="lg:sticky lg:top-24 lg:self-start">
//               <ProductGalleryZoom product={product} selectedVariant={selectedVariant} />
//             </div>

//             {/* Right Info */}
//             <div className="flex flex-col">
//               <div className="border-b border-gray-100 pb-5">
//                 <div className="mb-3 flex flex-wrap items-center gap-2">
//                   <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-700">
//                     {product.category?.name || 'Product'}
//                   </span>

//                   {discount > 0 && (
//                     <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">
//                       {discount}% OFF
//                     </span>
//                   )}

//                   <span className={`rounded-full px-3 py-1 text-xs font-black ${stockClass}`}>
//                     {stockText}
//                   </span>
//                 </div>

//                 <h1 className="text-2xl font-black leading-tight text-gray-950 md:text-3xl">
//                   {product.name}
//                 </h1>

//                 <div className="mt-3 flex flex-wrap items-center gap-3">
//                   <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-bold text-yellow-700">
//                     <Star size={15} fill="currentColor" />
//                     {Number(product.rating || 0).toFixed(1)}
//                   </div>
//                   <span className="text-sm font-medium text-gray-500">
//                     {product.numReviews || 0} reviews
//                   </span>
//                 </div>
//               </div>

//               <div className="border-b border-gray-100 py-5">
//                 <div className="flex flex-wrap items-end gap-3">
//                   <span className="text-4xl font-black text-gray-950">
//                     {formatPrice(activePrice)}
//                   </span>

//                   {activeOldPrice > activePrice && (
//                     <span className="pb-1 text-lg font-semibold text-gray-400 line-through">
//                       {formatPrice(activeOldPrice)}
//                     </span>
//                   )}
//                 </div>

//                 {product.shortDescription && (
//                   <p className="mt-4 text-sm leading-7 text-gray-600">
//                     {product.shortDescription}
//                   </p>
//                 )}
//               </div>

//               {/* Variant */}
//               <div className="border-b border-gray-100 py-5">
//                 <VariantSelector
//                   product={product}
//                   selectedVariant={selectedVariant}
//                   onChange={setSelectedVariant}
//                 />
//               </div>

//               {/* Quantity + Cart */}
//               <div className="py-5">
//                 <div className="flex flex-col gap-3 sm:flex-row">
//                   <div className="flex h-14 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 sm:w-36">
//                     <button
//                       type="button"
//                       onClick={() => setQty(Math.max(1, qty - 1))}
//                       className="text-2xl font-black text-gray-700 hover:text-black"
//                     >
//                       −
//                     </button>

//                     <span className="text-base font-black text-gray-950">{qty}</span>

//                     <button
//                       type="button"
//                       onClick={() => setQty(Math.min(activeStock || 1, qty + 1))}
//                       className="text-2xl font-black text-gray-700 hover:text-black"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleAddToCart}
//                     disabled={activeStock <= 0}
//                     className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
//                   >
//                     <ShoppingCart size={19} />
//                     Add to Cart
//                   </button>

//                   <WishlistButton productId={product._id} />
//                 </div>
//               </div>

//               {/* Trust Items */}
//               <div className="grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-3">
//                 <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
//                   <Truck className="mb-2 text-gray-900" size={22} />
//                   <p className="text-sm font-black text-gray-950">Fast Delivery</p>
//                   <p className="mt-1 text-xs text-gray-500">Dhaka 1-2 days</p>
//                 </div>

//                 <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
//                   <RotateCcw className="mb-2 text-gray-900" size={22} />
//                   <p className="text-sm font-black text-gray-950">Easy Return</p>
//                   <p className="mt-1 text-xs text-gray-500">7 days return</p>
//                 </div>

//                 <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
//                   <ShieldCheck className="mb-2 text-gray-900" size={22} />
//                   <p className="text-sm font-black text-gray-950">Secure Order</p>
//                   <p className="mt-1 text-xs text-gray-500">COD & manual pay</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Description + Organized Specifications */}
//         <section className="mt-8 grid gap-6 lg:grid-cols-3">
//           <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
//             <h2 className="text-xl font-black text-gray-950">Product Description</h2>

//             <div className="mt-4 text-sm leading-7 text-gray-700">
//               {product.description ? (
//                 <p>{product.description}</p>
//               ) : (
//                 <p>No description available for this product.</p>
//               )}
//             </div>
//           </div>

//           <SpecGroup title="Basic Information">
//             <InfoRow label="Brand" value={product.brand?.name || product.brand} />
//             <InfoRow label="Category" value={product.category?.name || product.category} />
//             <InfoRow label="Product Code" value={product.sku || product._id?.slice(-8)?.toUpperCase()} />
//             <InfoRow label="Rating" value={`${Number(product.rating || 0).toFixed(1)} / 5`} />
//           </SpecGroup>
//         </section>

//         <section className="mt-6 grid gap-6 lg:grid-cols-3">
//           <SpecGroup title="Price & Stock">
//             <InfoRow label="Price" value={formatPrice(activePrice)} />
//             {activeOldPrice > activePrice && (
//               <InfoRow label="Regular Price" value={formatPrice(activeOldPrice)} />
//             )}
//             <InfoRow label="Discount" value={discount > 0 ? `${discount}%` : 'No discount'} />
//             <InfoRow label="Availability" value={stockText} />
//           </SpecGroup>

//           <SpecGroup title="Selected Option">
//             <InfoRow
//               label="Variant"
//               value={
//                 selectedVariant?.label ||
//                 [selectedVariant?.color, selectedVariant?.size, selectedVariant?.storage]
//                   .filter(Boolean)
//                   .join(' / ') ||
//                 'Default'
//               }
//             />
//             <InfoRow label="Color" value={selectedVariant?.color || 'N/A'} />
//             <InfoRow label="Size" value={selectedVariant?.size || 'N/A'} />
//             <InfoRow label="Storage" value={selectedVariant?.storage || 'N/A'} />
//             <InfoRow label="Variant Stock" value={selectedVariant ? activeStock : 'N/A'} />
//           </SpecGroup>

//           <SpecGroup title="Service">
//             <InfoRow label="Delivery" value="Dhaka 1-2 days" />
//             <InfoRow label="Return" value="7 days return" />
//             <InfoRow label="Payment" value="COD / Manual payment" />
//             <InfoRow label="Support" value="Available" />
//           </SpecGroup>
//         </section>

//         {productSpecs.length > 0 && (
//           <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
//             <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//               <div>
//                 <h2 className="text-xl font-black text-gray-950">Specifications</h2>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Organized product specification details.
//                 </p>
//               </div>
//             </div>

//             <div className="grid gap-x-8 md:grid-cols-2">
//               {productSpecs.map((spec, index) => (
//                 <InfoRow key={`${spec.label}-${index}`} label={spec.label} value={spec.value} />
//               ))}
//             </div>
//           </section>
//         )}

//         <ProductQuestions productId={product._id} />
//         <Reviews product={product} />

//         <RelatedProductsModern product={product} />

//         <RecentlyViewedProducts currentId={product._id} />
//       </div>
//     </main>
//   );
// };

// export default ProductDetails;




// import { useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

// import Loader from '../Components/Loader';
// import PageSkeleton from '../Components/UI/PageSkeleton';
// import Breadcrumb from '../Components/Breadcrumb';
// import Details from '../Components/Product/ProductDetails/Details';
// import Reviews from '../Components/Product/ProductDetails/Reviews';
// import RelatedProducts from '../Components/Product/ProductDetails/RelatedProducts';
// import EmptyState from '../Components/UI/EmptyState';
// import { getProduct } from '../features/productSlice';
// import usePageTitle from '../hooks/usePageTitle';

// const ProductDetails = () => {
//   const { product, loading, error } = useSelector((state) => state.product);
//   const dispatch = useDispatch();
//   const { slug } = useParams();

//   useEffect(() => {
//     if (slug) dispatch(getProduct(slug));
//   }, [dispatch, slug]);

//   usePageTitle(
//     product?.name ? `${product.name} | Alucard Shop` : 'Product Details | Alucard Shop',
//     product?.description || 'View product details, price, reviews and related products.'
//   );

//   // if (loading) return <Loader />;
//   if (loading) return <PageSkeleton type="details" />;

//   if (error) {
//     return (
//       <EmptyState
//         title="Product unavailable"
//         message={error}
//         actionLabel="Back to Products"
//         actionTo="/products"
//       />
//     );
//   }

//   if (!product?._id) {
//     return (
//       <EmptyState
//         title="Product not found"
//         message="The product you are looking for does not exist."
//         actionLabel="Back to Products"
//         actionTo="/products"
//       />
//     );
//   }

//   return (
//     <main className="bg-gray-100 font-Work_sans">
//       <Breadcrumb />

//       <div className="container mx-auto px-4 py-6">
//         <Link
//           to="/products"
//           className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-yellow-700"
//         >
//           <ArrowLeft size={17} />
//           Back to Products
//         </Link>

//         <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <Details product={product} />
//         </div>

//         <div className="mt-5 grid gap-3 md:grid-cols-3">
//           <TrustCard icon={<Truck size={20} />} title="Fast Delivery" desc="Inside Bangladesh" />
//           <TrustCard icon={<RotateCcw size={20} />} title="Easy Return" desc="Simple return support" />
//           <TrustCard icon={<ShieldCheck size={20} />} title="Secure Shopping" desc="Protected checkout" />
//         </div>

//         <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
//           <Reviews productId={product._id} />
//         </div>

//         <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
//           <RelatedProducts product={product} />
//         </div>
//       </div>
//     </main>
//   );
// };

// const TrustCard = ({ icon, title, desc }) => (
//   <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//     <div className="grid h-11 w-11 place-items-center rounded-full bg-yellow-100 text-yellow-700">
//       {icon}
//     </div>
//     <div>
//       <h3 className="text-sm font-black text-gray-950">{title}</h3>
//       <p className="text-xs text-gray-500">{desc}</p>
//     </div>
//   </div>
// );

// export default ProductDetails;









import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  GitCompare,
  RotateCcw,
  ShieldCheck,
  Truck,
} from 'lucide-react';

import Breadcrumb from '../Components/Breadcrumb';
import Details from '../Components/Product/ProductDetails/Details';
import Reviews from '../Components/Product/ProductDetails/Reviews';
import RelatedProducts from '../Components/Product/ProductDetails/RelatedProducts';
import EmptyState from '../Components/UI/EmptyState';
import PageSkeleton from '../Components/UI/PageSkeleton';
import { getProduct } from '../features/productSlice';
import usePageTitle from '../hooks/usePageTitle';
import { isCompared, toggleCompareProduct } from '../utils/compareProducts';

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);
  const [compared, setCompared] = useState(false);

  usePageTitle(
    product?.name
      ? `${product.name} | Alucard Shop`
      : 'Product Details | Alucard Shop',
    product?.description || 'View product details.'
  );

  useEffect(() => {
    if (slug) dispatch(getProduct(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (product?._id) {
      setCompared(isCompared(product._id));
    }
  }, [product?._id]);

  const handleCompare = () => {
    toggleCompareProduct(product);
    setCompared(isCompared(product?._id));
  };

  if (loading) return <PageSkeleton type="details" />;

  if (error) {
    return (
      <EmptyState
        title="Product unavailable"
        message={error}
        actionLabel="Back to Products"
        actionTo="/products"
      />
    );
  }

  if (!product?._id) {
    return (
      <EmptyState
        title="Product not found"
        message="The product you are looking for does not exist."
        actionLabel="Back to Products"
        actionTo="/products"
      />
    );
  }

  return (
    <main className="bg-gray-100 font-Work_sans">
      <Breadcrumb />

      <div className="container mx-auto max-w-6xl px-4 py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-yellow-700"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCompare}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition ${
                compared
                  ? 'bg-gray-950 text-yellow-400'
                  : 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
              }`}
            >
              <GitCompare size={17} />
              {compared ? 'Added to Compare' : 'Add to Compare'}
            </button>

            <Link
              to="/compare"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-black text-gray-950 hover:bg-yellow-500"
            >
              Compare List
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="[&_.product-image]:max-h-[420px] [&_img]:max-h-[420px] [&_img]:object-contain">
            <Details product={product} />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <TrustCard
            icon={<Truck size={18} />}
            title="Fast Delivery"
            desc="Inside Bangladesh"
          />
          <TrustCard
            icon={<RotateCcw size={18} />}
            title="Easy Return"
            desc="Simple return support"
          />
          <TrustCard
            icon={<ShieldCheck size={18} />}
            title="Secure Shopping"
            desc="Protected checkout"
          />
        </div>

        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <Reviews productID={product._id} />
        </div>

        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <RelatedProducts product={product} />
        </div>
      </div>
    </main>
  );
};

const TrustCard = ({ icon, title, desc }) => (
  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
    <div className="grid h-10 w-10 place-items-center rounded-full bg-yellow-100 text-yellow-700">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-black text-gray-950">{title}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </div>
);

export default ProductDetails;