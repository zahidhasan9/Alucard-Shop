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

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, fetchCart } from '../../../features/cartSlice';
import { saveRecentlyViewed } from '../ProductCard';

const WISHLIST_KEY = 'wishlistProducts';

const Details = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const images = useMemo(() => {
    const productImages = product?.images?.length
      ? product.images
      : [product?.thumbnail || product?.image].filter(Boolean);

    return productImages;
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  });

  useEffect(() => {
    setSelectedImage(images?.[0]);
  }, [images]);

  useEffect(() => {
    saveRecentlyViewed(product);
  }, [product]);

  const isWishlisted = wishlist.some((item) => item._id === product?._id);

  const discount =
    product?.discount ||
    (product?.oldPrice && product?.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0);

  const inStock =
    product?.stock === undefined ||
    product?.countInStock > 0 ||
    product?.stock === 'In Stock' ||
    product?.status === 'In Stock';

  const toggleWishlist = () => {
    if (!product?._id) return;

    const updated = isWishlisted
      ? wishlist.filter((item) => item._id !== product._id)
      : [product, ...wishlist];

    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  const handleAddToCart = () => {
    if (!user && !isAuthenticated) {
      navigate('/login');
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: images?.[0],
      slug: product?.slug,
    };

    dispatch(addToCart(cartItem));

    setTimeout(() => {
      dispatch(fetchCart());
    }, 200);
  };

  const specs = Array.isArray(product?.details)
    ? product.details
    : Object.entries(product?.details || {}).map(([key, value]) => ({
        key,
        value,
      }));

  return (
    <>
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="aspect-square bg-gray-100">
              <img
                src={selectedImage}
                alt={product?.name || 'Product image'}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
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
                inStock
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {inStock ? 'In Stock' : 'Out of Stock'}
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
                  fill={index < Math.round(product?.rating || 0) ? 'currentColor' : 'none'}
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
                Hassle-free return
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4">
              <ShieldCheck size={22} className="text-yellow-700" />
              <p className="mt-2 text-sm font-black text-gray-950">
                Secure Buy
              </p>
              <p className="text-xs font-medium text-gray-500">
                Trusted checkout
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
                onClick={() => setQuantity((prev) => prev + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white"
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
            disabled={!inStock}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShoppingBag size={19} />
            {user || isAuthenticated ? 'Add to Cart' : 'Login to Add'}
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
                  {item.value}
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

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-white p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] lg:hidden">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 disabled:opacity-60"
        >
          <ShoppingBag size={19} />
          Add to Cart · ৳{product?.price || 0}
        </button>
      </div>
    </>
  );
};

export default Details;