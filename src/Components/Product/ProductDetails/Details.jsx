// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../../../Components/Loader';
// import { addToCart, fetchCart } from '../../../features/cartSlice';

// const reviewsData = [
//   { id: 1, name: 'John Doe', rating: 5, comment: 'Amazing!', date: 'April 10, 2025' },
//   { id: 2, name: 'Sarah Smith', rating: 4, comment: 'Great quality!', date: 'April 5, 2025' },
//   { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Highly recommend!', date: 'March 28, 2025' }
// ];
// // const size = ['S', 'M', 'L', 'XL', 'XXL'];

// const Details = ({ product }) => {
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [activeTab, setActiveTab] = useState('description');
//   const avgRating = (reviewsData.reduce((a, r) => a + r.rating, 0) / reviewsData.length).toFixed(1);

//   // const handleAddToCart = () => {
//   //   if (!selectedSize) return alert('Please select a size');
//   //   alert(`Added ${quantity} ${selectedSize} size ${product.title} to cart!`);
//   // };

//   const handleAddToCart = () => {
//     const cartItem = {
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       image: product?.images?.[0],
//       slug: product?.slug
//     };

//     dispatch(addToCart(cartItem));
//     setTimeout(() => {
//       dispatch(fetchCart());
//     }, 100);
//   };

//   return (
//     <>
//       {/* Image Section */}
//       <div className="space-y-4">
//         <div className="overflow-hidden rounded-lg border border-gray-200">
//           <img
//             src={selectedImage}
//             alt={product.name}
//             className="w-full h-auto object-contain transform transition-transform duration-300 hover:scale-110"
//           />
//         </div>
//         <div className="flex gap-2 justify-center">
//           {product.images.map((img, idx) => (
//             <img
//               key={idx}
//               src={img}
//               alt={`Thumbnail ${idx}`}
//               className={`w-20 h-20 object-contain cursor-pointer rounded-lg border ${
//                 selectedImage === img ? 'border-blue-600' : 'border-gray-200'
//               } hover:scale-105`}
//               onClick={() => setSelectedImage(img)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className="space-y-5">
//         <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//         <div className="flex items-center gap-3">
//           <span className="text-2xl font-semibold text-gray-800">TK {product.price.toFixed(2)}</span>
//           <span className="text-lg line-through text-gray-400">TK {product.oldPrice.toFixed(2)}</span>
//           <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">{product.discount}% OFF</span>
//         </div>
//         <div className="text-yellow-500 text-sm">
//           ★ {product.rating} ({product.numReviews} reviews)
//         </div>

//         {/* Size Selector */}
//         {/* <div>
//           <h3 className="font-semibold mb-2">Select Size</h3>
//           <div className="flex gap-3">
//             {size?.map((size) => (
//               <button
//                 key={size}
//                 onClick={() => setSelectedSize(size)}
//                 className={`px-4 py-2 border rounded-lg text-sm ${
//                   selectedSize === size
//                     ? 'bg-blue-600 text-white border-blue-600'
//                     : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//               >
//                 {size} {selectedSize === size && <span className="ml-1 text-white">✓</span>}
//               </button>
//             ))}
//           </div>
//         </div> */}
//         {/* Quantity & Add to Cart */}
//         <div>
//           <h3 className="font-semibold mb-2">Quantity</h3>
//           <input
//             type="number"
//             min="1"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="w-20 px-3 py-2 border rounded-lg"
//           />
//         </div>

//         {/* Add to Cart */}

//         {/* <button
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button> */}

//         {!user ? (
//           <button
//             onClick={() => navigate('/login')}
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90"
//           >
//             Login to Add
//           </button>
//         ) : (
//           <button
//             onClick={() => handleAddToCart(product)}
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90"
//           >
//             Add to Cart
//           </button>
//         )}

//         {/* Tabs */}
//         <div>
//           <div className="flex border-b">
//             {['description', 'details'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-5 py-2 font-medium text-sm ${
//                   activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
//                 }`}
//               >
//                 {tab === 'description' ? 'Description' : 'Product Details'}
//               </button>
//             ))}
//           </div>
//           <div className="mt-4 text-gray-700 text-sm leading-relaxed">
//             {activeTab === 'details' ? (
//               <p>{product.description}</p>
//             ) : (
//               <ul className="list-disc pl-5 space-y-1">
//                 {product.details.map((item, idx) => (
//                   <li key={idx}>
//                     <strong>{item.key.toUpperCase()}:</strong> {item.value}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Details;

// import { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   CheckCircle,
//   Heart,
//   Minus,
//   Plus,
//   RotateCcw,
//   ShieldCheck,
//   ShoppingBag,
//   Star,
//   Truck,
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, fetchCart } from '../../../features/cartSlice';
// import { saveRecentlyViewed } from '../ProductCard';

// const WISHLIST_KEY = 'wishlistProducts';

// const formatPrice = (value) => {
//   const number = Number(value || 0);
//   return `৳${number.toLocaleString('en-BD')}`;
// };

// const labelize = (value = '') =>
//   String(value)
//     .replace(/_/g, ' ')
//     .replace(/([a-z])([A-Z])/g, '$1 $2')
//     .replace(/\b\w/g, (char) => char.toUpperCase());

// const getProductImage = (product) =>
//   product?.thumbnail || product?.images?.[0] || product?.image || '';

// const getBrandName = (product) =>
//   product?.brand?.name || product?.brand || 'Alucard';

// const getCategoryName = (product) =>
//   product?.category?.name || product?.category?.slug || product?.category || 'General';

// const normalizeDetails = (product) => {
//   const details = product?.details;

//   if (Array.isArray(details)) {
//     return details
//       .filter((item) => item?.key && item?.value)
//       .map((item) => ({ label: labelize(item.key), value: item.value }));
//   }

//   if (details && typeof details === 'object') {
//     return Object.entries(details)
//       .filter(([, value]) => value !== undefined && value !== null && value !== '')
//       .map(([key, value]) => ({ label: labelize(key), value }));
//   }

//   return [];
// };

// const buildSpecGroups = (product) => {
//   const baseInfo = [
//     { label: 'Brand', value: getBrandName(product) },
//     { label: 'Category', value: getCategoryName(product) },
//     { label: 'Product Type', value: product?.product_type },
//     { label: 'SKU', value: product?.sku },
//   ].filter((item) => item.value);

//   const stockInfo = [
//     { label: 'Price', value: formatPrice(product?.price) },
//     product?.oldPrice ? { label: 'Old Price', value: formatPrice(product.oldPrice) } : null,
//     product?.discount ? { label: 'Discount', value: `${product.discount}%` } : null,
//     { label: 'Stock', value: product?.countInStock > 0 ? `${product.countInStock} pcs available` : 'Out of stock' },
//   ].filter(Boolean);

//   const details = normalizeDetails(product);

//   const variants = Array.isArray(product?.variants)
//     ? product.variants
//         .filter((item) => item?.name || item?.value)
//         .map((item) => ({ label: labelize(item.name || 'Variant'), value: item.value }))
//     : [];

//   return [
//     { title: 'Product Information', items: baseInfo },
//     { title: 'Price & Stock', items: stockInfo },
//     { title: 'Specifications', items: details },
//     { title: 'Available Options', items: variants },
//   ].filter((group) => group.items.length);
// };

// const Details = ({ product }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector((state) => state.user);

//   const images = useMemo(() => {
//     const allImages = [
//       product?.thumbnail,
//       ...(Array.isArray(product?.images) ? product.images : []),
//       product?.image,
//     ].filter(Boolean);

//     return [...new Set(allImages)];
//   }, [product]);

//   const [selectedImage, setSelectedImage] = useState(images?.[0] || getProductImage(product));
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState('description');
//   const [wishlist, setWishlist] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     setSelectedImage(images?.[0] || getProductImage(product));
//   }, [images, product]);

//   useEffect(() => {
//     if (product?._id) saveRecentlyViewed(product);
//   }, [product]);

//   const isLoggedIn = Boolean(user || isAuthenticated);
//   const isWishlisted = wishlist.some((item) => item?._id === product?._id);
//   const inStock = Number(product?.countInStock || 0) > 0 || product?.stock === 'In Stock' || product?.status === 'In Stock';
//   const discount =
//     product?.discount ||
//     (product?.oldPrice && product?.price
//       ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//       : 0);
//   const specGroups = buildSpecGroups(product);

//   const toggleWishlist = () => {
//     if (!product?._id) return;

//     const updated = isWishlisted
//       ? wishlist.filter((item) => item?._id !== product._id)
//       : [product, ...wishlist];

//     setWishlist(updated);
//     localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
//     window.dispatchEvent(new Event('wishlistUpdated'));
//   };

//   const handleAddToCart = () => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }

//     if (!inStock) return;

//     const cartItem = {
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       image: selectedImage || getProductImage(product),
//       slug: product?.slug,
//     };

//     dispatch(addToCart(cartItem));
//     setTimeout(() => dispatch(fetchCart()), 200);
//   };

//   return (
//     <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
//       <div className="space-y-4">
//         <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
//           <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50">
//             {selectedImage ? (
//               <img
//                 src={selectedImage}
//                 alt={product?.name}
//                 className="h-full w-full object-contain transition duration-300 hover:scale-105"
//               />
//             ) : (
//               <div className="text-sm text-gray-400">No image available</div>
//             )}
//           </div>
//         </div>

//         {images.length > 1 && (
//           <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-7">
//             {images.map((img, index) => (
//               <button
//                 key={`${img}-${index}`}
//                 type="button"
//                 onClick={() => setSelectedImage(img)}
//                 className={`aspect-square overflow-hidden rounded-xl border bg-white p-1 transition hover:border-blue-500 ${
//                   selectedImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200'
//                 }`}
//               >
//                 <img src={img} alt={`${product?.name} ${index + 1}`} className="h-full w-full object-contain" />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="space-y-5">
//         <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
//           <div className="mb-3 flex flex-wrap items-center gap-2">
//             <span
//               className={`rounded-full px-3 py-1 text-xs font-bold ${
//                 inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
//               }`}
//             >
//               {inStock ? 'In Stock' : 'Out of Stock'}
//             </span>
//             {discount > 0 && (
//               <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
//                 Save {discount}%
//               </span>
//             )}
//             <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
//               {getBrandName(product)}
//             </span>
//           </div>

//           <h1 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl">{product?.name}</h1>

//           <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
//             <div className="flex items-center gap-1">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <Star
//                   key={index}
//                   size={17}
//                   className={index < Math.round(product?.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
//                 />
//               ))}
//             </div>
//             <span className="font-semibold text-gray-800">{product?.rating || 0}</span>
//             <span>({product?.numReviews || 0} reviews)</span>
//           </div>

//           <div className="mt-5 flex flex-wrap items-end gap-3">
//             <span className="text-3xl font-black text-gray-950 md:text-4xl">{formatPrice(product?.price)}</span>
//             {product?.oldPrice && (
//               <span className="pb-1 text-lg font-semibold text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
//             )}
//           </div>

//           <div className="mt-5 grid gap-3 sm:grid-cols-3">
//             <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-semibold text-gray-700">
//               <Truck size={18} className="text-blue-600" /> Fast Delivery
//             </div>
//             <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-semibold text-gray-700">
//               <RotateCcw size={18} className="text-blue-600" /> Easy Return
//             </div>
//             <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-semibold text-gray-700">
//               <ShieldCheck size={18} className="text-blue-600" /> Secure Buy
//             </div>
//           </div>

//           {Array.isArray(product?.variants) && product.variants.length > 0 && (
//             <div className="mt-5">
//               <p className="mb-2 text-sm font-bold text-gray-900">Available Options</p>
//               <div className="flex flex-wrap gap-2">
//                 {product.variants.map((item, index) => (
//                   <span key={index} className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700">
//                     {item?.name ? `${labelize(item.name)}: ` : ''}{item?.value}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
//             <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
//               <button
//                 type="button"
//                 onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                 className="flex h-12 w-12 items-center justify-center bg-white text-gray-700 hover:bg-gray-100"
//               >
//                 <Minus size={17} />
//               </button>
//               <span className="flex h-12 w-14 items-center justify-center text-base font-bold">{quantity}</span>
//               <button
//                 type="button"
//                 onClick={() => setQuantity((prev) => prev + 1)}
//                 className="flex h-12 w-12 items-center justify-center bg-white text-gray-700 hover:bg-gray-100"
//               >
//                 <Plus size={17} />
//               </button>
//             </div>

//             <button
//               type="button"
//               onClick={handleAddToCart}
//               disabled={!inStock}
//               className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
//             >
//               <ShoppingBag size={18} />
//               {isLoggedIn ? 'Add to Cart' : 'Login to Add'}
//             </button>

//             <button
//               type="button"
//               onClick={toggleWishlist}
//               className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
//                 isWishlisted
//                   ? 'border-red-200 bg-red-50 text-red-600'
//                   : 'border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:text-red-600'
//               }`}
//               aria-label="Toggle wishlist"
//             >
//               <Heart size={19} className={isWishlisted ? 'fill-red-500' : ''} />
//             </button>
//           </div>
//         </div>

//         <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <div className="flex border-b border-gray-200 px-5">
//             {[
//               { id: 'description', label: 'Description' },
//               { id: 'specifications', label: 'Specifications' },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`mr-6 border-b-2 py-4 text-sm font-bold transition ${
//                   activeTab === tab.id
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-900'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           <div className="p-5 md:p-6">
//             {activeTab === 'description' ? (
//               <div className="space-y-4 text-sm leading-7 text-gray-700">
//                 <p>{product?.description || 'No description available.'}</p>
//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-green-700">
//                     <CheckCircle size={18} /> Quality checked product
//                   </div>
//                   <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-blue-700">
//                     <Truck size={18} /> Delivery within 2-5 working days
//                   </div>
//                 </div>
//               </div>
//             ) : specGroups.length ? (
//               <div className="space-y-5">
//                 {specGroups.map((group) => (
//                   <div key={group.title}>
//                     <h3 className="mb-3 text-base font-black text-gray-900">{group.title}</h3>
//                     <div className="overflow-hidden rounded-xl border border-gray-200">
//                       {group.items.map((item, index) => (
//                         <div
//                           key={`${group.title}-${item.label}-${index}`}
//                           className={`grid grid-cols-[42%_58%] gap-3 px-4 py-3 text-sm ${
//                             index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
//                           }`}
//                         >
//                           <span className="font-bold text-gray-600">{item.label}</span>
//                           <span className="break-words text-gray-900">{String(item.value)}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">Specifications will be updated soon.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Details;


import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Heart,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, fetchCart } from '../../../features/cartSlice';
import {
  calculateDiscount,
  getImage,
  getStock,
  isInStock,
} from '../../../utils/shopHelpers';
import ProductQA from './ProductQA';

const WISHLIST_KEY = 'wishlistProducts';

const normalizeVariants = (variants) => {
  if (!variants) return [];

  if (Array.isArray(variants)) {
    return variants;
  }

  return Object.entries(variants).map(([name, options]) => ({
    name,
    options: Array.isArray(options) ? options : [options],
  }));
};

const Details = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const images = useMemo(() => {
    const list = product?.images?.length
      ? product.images
      : [getImage(product)].filter(Boolean);

    return list;
  }, [product]);

  const variantGroups = useMemo(
    () => normalizeVariants(product?.variants),
    [product?.variants]
  );

  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeTab, setActiveTab] = useState('description');

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  });

  useEffect(() => {
    setSelectedImage(images?.[0]);
  }, [images]);

  const selectedVariantObject = useMemo(() => {
    if (!Array.isArray(product?.variants)) return {};

    return (
      product.variants.find((variant) => {
        return Object.entries(selectedVariants).every(([key, value]) => {
          return (
            String(variant?.[key] || variant?.name || '').toLowerCase() ===
              String(value).toLowerCase() ||
            String(variant?.value || '').toLowerCase() ===
              String(value).toLowerCase()
          );
        });
      }) || {}
    );
  }, [product?.variants, selectedVariants]);

  const stock = getStock(product, selectedVariantObject);
  const available = isInStock(product, selectedVariantObject);
  const isWishlisted = wishlist.some((item) => item._id === product?._id);

  const discount =
    product?.discount || calculateDiscount(product?.oldPrice, product?.price);

  const specs = Array.isArray(product?.details)
    ? product.details
    : Object.entries(product?.details || {}).map(([key, value]) => ({
        key,
        value,
      }));

  const toggleWishlist = () => {
    if (!product?._id) return;

    const updated = isWishlisted
      ? wishlist.filter((item) => item._id !== product._id)
      : [product, ...wishlist];

    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleVariantChange = (groupName, value) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [groupName]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!user && !isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!available) return;

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: selectedImage || getImage(product),
      slug: product?.slug,
      selectedVariants,
    };

    dispatch(addToCart(cartItem));

    setTimeout(() => {
      dispatch(fetchCart());
    }, 250);
  };

  return (
    <>
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="aspect-square bg-gray-100">
              <img
                src={selectedImage}
                alt={product?.name || 'Product image'}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black text-yellow-400 shadow-lg"
            >
              <Maximize2 size={20} />
            </button>
          </div>

          {images?.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, index) => (
                <button
                  key={img || index}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`overflow-hidden rounded-2xl border bg-white ${
                    selectedImage === img
                      ? 'border-yellow-500 ring-2 ring-yellow-300'
                      : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product?.name || 'Product'} ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${
                available
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {available ? `In Stock (${stock} left)` : 'Out of Stock'}
            </span>

            {discount > 0 && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white">
                Save {discount}%
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black leading-tight text-gray-950">
            {product?.name}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  fill={
                    index < Math.round(product?.rating || 0)
                      ? 'currentColor'
                      : 'none'
                  }
                />
              ))}
            </div>

            <span className="text-sm font-bold text-gray-600">
              {product?.rating || 0} ({product?.numReviews || 0} reviews)
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <p className="text-4xl font-black text-green-600">
              ৳{product?.price || 0}
            </p>

            {product?.oldPrice && (
              <p className="mb-1 text-lg font-bold text-gray-400 line-through">
                ৳{product.oldPrice}
              </p>
            )}
          </div>

          {variantGroups?.length > 0 && (
            <div className="mt-6 space-y-4">
              {variantGroups.map((group, index) => {
                const groupName = group?.name || group?.type || `Option ${index + 1}`;
                const options =
                  group?.options ||
                  group?.values ||
                  group?.value ||
                  [];

                const finalOptions = Array.isArray(options)
                  ? options
                  : [options];

                return (
                  <div key={groupName}>
                    <p className="mb-2 text-sm font-black text-gray-900">
                      {groupName}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {finalOptions.map((option) => {
                        const value =
                          option?.value ||
                          option?.name ||
                          option?.label ||
                          option;

                        const active =
                          selectedVariants[groupName] === String(value);

                        return (
                          <button
                            key={String(value)}
                            type="button"
                            onClick={() =>
                              handleVariantChange(groupName, String(value))
                            }
                            className={`rounded-full px-4 py-2 text-sm font-black ${
                              active
                                ? 'bg-black text-yellow-400'
                                : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                            }`}
                          >
                            {String(value)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-yellow-50 p-4">
              <Truck size={22} className="text-yellow-700" />
              <p className="mt-2 text-sm font-black text-gray-950">
                Fast Delivery
              </p>
              <p className="text-xs font-medium text-gray-500">
                2-5 working days
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4">
              <RotateCcw size={22} className="text-yellow-700" />
              <p className="mt-2 text-sm font-black text-gray-950">
                Easy Return
              </p>
              <p className="text-xs font-medium text-gray-500">
                Request return online
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4">
              <ShieldCheck size={22} className="text-yellow-700" />
              <p className="mt-2 text-sm font-black text-gray-950">
                Secure Buy
              </p>
              <p className="text-xs font-medium text-gray-500">
                COD/manual payment
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white"
              >
                <Minus size={17} />
              </button>

              <span className="w-12 text-center text-sm font-black">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) => Math.min(stock || prev + 1, prev + 1))
                }
                disabled={!available}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white disabled:opacity-40"
              >
                <Plus size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={toggleWishlist}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 transition hover:bg-yellow-100"
            >
              <Heart
                size={21}
                className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!available}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShoppingBag size={19} />
            {available
              ? user || isAuthenticated
                ? 'Add to Cart'
                : 'Login to Add'
              : 'Out of Stock'}
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="mb-5 flex gap-3 border-b border-gray-100">
          {[
            { id: 'description', label: 'Description' },
            { id: 'details', label: 'Specifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-black ${
                activeTab === tab.id
                  ? 'border-b-4 border-yellow-400 text-black'
                  : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'description' ? (
          <p className="text-sm leading-7 text-gray-600">
            {product?.description || 'No description available.'}
          </p>
        ) : specs?.length ? (
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            {specs.map((item, index) => (
              <div
                key={`${item.key}-${index}`}
                className="grid grid-cols-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="bg-gray-50 px-4 py-3 text-sm font-black text-gray-800">
                  {String(item.key || '').toUpperCase()}
                </div>

                <div className="px-4 py-3 text-sm font-semibold text-gray-600">
                  {String(item.value || '')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-2xl bg-yellow-50 p-4 text-sm font-bold text-gray-700">
            <CheckCircle size={18} />
            Specifications will be updated soon.
          </div>
        )}
      </section>

      <ProductQA productId={product?._id} />

      {zoomOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
          >
            <X size={24} />
          </button>

          <img
            src={selectedImage}
            alt={product?.name || 'Product zoom'}
            className="max-h-[90vh] max-w-[95vw] rounded-3xl object-contain"
          />
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-white p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] lg:hidden">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!available}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 disabled:opacity-60"
        >
          <ShoppingBag size={19} />
          {available ? `Add to Cart · ৳${product?.price || 0}` : 'Out of Stock'}
        </button>
      </div>
    </>
  );
};

export default Details;