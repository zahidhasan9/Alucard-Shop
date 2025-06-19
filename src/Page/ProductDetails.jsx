import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import Breadcrumb from '../Components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../features/productSlice';
import { getProductReviews } from '../features/reviewSlice';
import Details from '../Components/Product/ProductDetails/Details';
import Reviews from '../Components/Product/ProductDetails/Reviews';
import RelatedProducts from '../Components/Product/ProductDetails/RelatedProducts';

const productData = {
  id: 73240,
  title: 'Premium Elegant Polo - Ripple',
  price: 1140.0,
  originalPrice: 1490.0,
  images: [
    'https://fabrilife.com/products/67b730e7d4749-square.jpg?v=20',
    'https://fabrilife.com/products/67b730e7ddca4-square.jpg',
    'https://fabrilife.com/products/67b730e7cf913-square.jpg',
    'https://fabrilife.com/products/67b730e7d77ec-square.jpg'
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  description: 'Elevate your wardrobe with the Premium Elegant Polo - Ripple, designed for both comfort and style.',
  details: {
    fabric: 'Double PK (80% Cotton, 20% Polyester)',
    yarnCount: '26/1',
    gsm: '210-220',
    fit: 'Regular',
    collar: 'Shirt Collar',
    dye: 'Reactive Dye, Enzyme & Silicon Washed'
  },
  stock: 'In Stock'
};

const ProductView = () => {
  const { product, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      dispatch(getProduct(slug));
    }
    // dispatch(getProductReviews(slug));
  }, [dispatch, slug]);

  // if (loading || !product?._id) {
  //   // Show loader until product is loaded
  //   return <Loader />;
  // }

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!product?._id) return <p className="text-center text-gray-500">Product not found</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumb />
      <div className="container mx-auto px-4 py-8">
        <main className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
            {/* Image Section */}

            <Details product={product} />
          </div>

          {/* Reviews */}
          <Reviews productID={product._id} />

          {/* Related Products */}
          <RelatedProducts />
        </main>
      </div>
    </div>
  );
};

export default ProductView;

// backup code

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Breadcrumb from '../Components/Breadcrumb';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProduct } from '../features/productSlice';
// import Details from '../Components/Product/ProductDetails/Details';

// const productData = {
//   id: 73240,
//   title: 'Premium Elegant Polo - Ripple',
//   price: 1140.0,
//   originalPrice: 1490.0,
//   images: [
//     'https://fabrilife.com/products/67b730e7d4749-square.jpg?v=20',
//     'https://fabrilife.com/products/67b730e7ddca4-square.jpg',
//     'https://fabrilife.com/products/67b730e7cf913-square.jpg',
//     'https://fabrilife.com/products/67b730e7d77ec-square.jpg'
//   ],
//   sizes: ['S', 'M', 'L', 'XL', 'XXL'],
//   description: 'Elevate your wardrobe with the Premium Elegant Polo - Ripple, designed for both comfort and style.',
//   details: {
//     fabric: 'Double PK (80% Cotton, 20% Polyester)',
//     yarnCount: '26/1',
//     gsm: '210-220',
//     fit: 'Regular',
//     collar: 'Shirt Collar',
//     dye: 'Reactive Dye, Enzyme & Silicon Washed'
//   },
//   stock: 'In Stock'
// };

// const reviewsData = [
//   { id: 1, name: 'John Doe', rating: 5, comment: 'Amazing!', date: 'April 10, 2025' },
//   { id: 2, name: 'Sarah Smith', rating: 4, comment: 'Great quality!', date: 'April 5, 2025' },
//   { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Highly recommend!', date: 'March 28, 2025' }
// ];

// const relatedProducts = [
//   { id: 101, title: 'Classic Polo', price: 990, image: 'https://fabrilife.com/products/67b730e7cf913-square.jpg' },
//   { id: 102, title: 'Modern Fit Tee', price: 750, image: 'https://fabrilife.com/products/67b730e7d77ec-square.jpg' }
// ];

// const ProductView = () => {
//   // const product = productData;
//   const { product, loading } = useSelector((state) => state.product);
//   const dispatch = useDispatch();
//   // console.log('✅ first image:', product1?.images?.[0]);

//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
//   const [activeTab, setActiveTab] = useState('description');
//   const [userRating, setUserRating] = useState(0);
//   const [userComment, setUserComment] = useState('');

//   const handleAddToCart = () => {
//     if (!selectedSize) return alert('Please select a size');
//     alert(`Added ${quantity} ${selectedSize} size ${product.title} to cart!`);
//   };

//   const avgRating = (reviewsData.reduce((a, r) => a + r.rating, 0) / reviewsData.length).toFixed(1);
//   // const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

//   const handleReviewSubmit = () => {
//     if (!userRating || !userComment) return alert('Fill out both fields.');
//     alert(`Thanks for rating ${userRating}★`);
//     setUserRating(0);
//     setUserComment('');
//   };
//   const { id } = useParams();
//   useEffect(() => {
//     dispatch(getProduct(id));
//   }, [dispatch]);

//   if (loading) {
//     return <h1>loadin</h1>;
//   }
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Breadcrumb />
//       <div className="container mx-auto px-4 py-8">
//         <main className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
//             {/* Image Section */}

//             <Details product={product} />
//             <div className="space-y-4">
//               <div className="overflow-hidden rounded-lg border border-gray-200">
//                 <img
//                   src={selectedImage}
//                   alt={product.name}
//                   className="w-full h-auto object-contain transform transition-transform duration-300 hover:scale-110"
//                 />
//               </div>
//               <div className="flex gap-2 justify-center">
//                 {product.images.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={`Thumbnail ${idx}`}
//                     className={`w-20 h-20 object-contain cursor-pointer rounded-lg border ${
//                       selectedImage === img ? 'border-blue-600' : 'border-gray-200'
//                     } hover:scale-105`}
//                     onClick={() => setSelectedImage(img)}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Details Section */}
//             <div className="space-y-5">
//               <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl font-semibold text-gray-800">TK {product.price.toFixed(2)}</span>
//                 <span className="text-lg line-through text-gray-400">TK {'product.originalPrice.toFixed(2)'}</span>
//                 <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">{'discount'}% OFF</span>
//               </div>
//               <div className="text-yellow-500 text-sm">
//                 ★ {avgRating} ({reviewsData.length} reviews)
//               </div>

//               {/* Size Selector */}
//               {/* <div>
//                 <h3 className="font-semibold mb-2">Select Size</h3>
//                 <div className="flex gap-3">
//                   {product.sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-4 py-2 border rounded-lg text-sm ${
//                         selectedSize === size
//                           ? 'bg-blue-600 text-white border-blue-600'
//                           : 'bg-white border-gray-300 text-gray-900'
//                       }`}
//                     >
//                       {size} {selectedSize === size && <span className="ml-1 text-white">✓</span>}
//                     </button>
//                   ))}
//                 </div>
//               </div> */}

//               {/* Quantity & Add to Cart */}
//               <div>
//                 <h3 className="font-semibold mb-2">Quantity</h3>
//                 <input
//                   type="number"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                   className="w-20 px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               <button
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90"
//                 onClick={handleAddToCart}
//               >
//                 Add to Cart
//               </button>

//               {/* Tabs */}
//               {/* <div>
//                 <div className="flex border-b">
//                   {['description', 'details'].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`px-5 py-2 font-medium text-sm ${
//                         activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
//                       }`}
//                     >
//                       {tab === 'description' ? 'Description' : 'Product Details'}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="mt-4 text-gray-700 text-sm leading-relaxed">
//                   {activeTab === 'description' ? (
//                     <p>{product.description}</p>
//                   ) : (
//                     <ul className="list-disc pl-5 space-y-1">
//                       {Object.entries(product.details).map(([key, val]) => (
//                         <li key={key}>
//                           <strong>{key[0].toUpperCase() + key.slice(1)}:</strong> {val}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div> */}
//             </div>
//           </div>

//           {/* Reviews */}
//           <section className="mt-10 bg-white rounded-xl shadow p-6">
//             <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
//             <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//               {reviewsData.map((review) => (
//                 <div key={review.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                   <div className="text-sm font-semibold">{review.name}</div>
//                   <div className="text-yellow-400 text-sm">
//                     {'★'.repeat(review.rating)}
//                     {'☆'.repeat(5 - review.rating)}
//                   </div>
//                   <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Submit Review */}
//             <div className="mt-6 border-t pt-4">
//               <h3 className="font-semibold mb-2">Add your rating</h3>
//               <div className="flex gap-1 mb-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     onClick={() => setUserRating(star)}
//                     className={`cursor-pointer text-xl ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <textarea
//                 rows="3"
//                 value={userComment}
//                 onChange={(e) => setUserComment(e.target.value)}
//                 placeholder="Write your review..."
//                 className="w-full p-3 border rounded-lg text-sm mb-2"
//               ></textarea>
//               <button
//                 onClick={handleReviewSubmit}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Submit Review
//               </button>
//             </div>
//           </section>

//           {/* Related Products */}
//           <section className="mt-10">
//             <h2 className="text-xl font-bold mb-4">Related Products</h2>
//             <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
//               {relatedProducts.map((item) => (
//                 <div key={item.id} className="bg-white p-4 border rounded-lg shadow hover:shadow-md">
//                   <img src={item.image} alt={item.title} className="w-full h-40 object-contain mb-2" />
//                   <h4 className="text-sm font-semibold">{item.title}</h4>
//                   <p className="text-blue-600 font-bold">TK {item.price}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProductView;
