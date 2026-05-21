// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Loader from '../Components/Loader';
// import Breadcrumb from '../Components/Breadcrumb';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProduct } from '../features/productSlice';
// import { getProductReviews } from '../features/reviewSlice';
// import Details from '../Components/Product/ProductDetails/Details';
// import Reviews from '../Components/Product/ProductDetails/Reviews';
// import RelatedProducts from '../Components/Product/ProductDetails/RelatedProducts';

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

// const ProductView = () => {
//   const { product, loading, error } = useSelector((state) => state.product);
//   const dispatch = useDispatch();

//   // const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

//   const { slug } = useParams();
//   useEffect(() => {
//     if (slug) {
//       dispatch(getProduct(slug));
//     }
//     // dispatch(getProductReviews(slug));
//   }, [dispatch, slug]);

//   // if (loading || !product?._id) {
//   //   // Show loader until product is loaded
//   //   return <Loader />;
//   // }

//   if (loading) return <Loader />;
//   if (error) return <p className="text-center text-red-600">{error}</p>;
//   if (!product?._id) return <p className="text-center text-gray-500">Product not found</p>;

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Breadcrumb />
//       <div className="container mx-auto px-4 py-8">
//         <main className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
//             {/* Image Section */}

//             <Details product={product} />
//           </div>

//           {/* Reviews */}
//           <Reviews productID={product._id} />

//           {/* Related Products */}
//           <RelatedProducts />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProductView;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Components/Loader';
import Breadcrumb from '../Components/Breadcrumb';
import Details from '../Components/Product/ProductDetails/Details';
import Reviews from '../Components/Product/ProductDetails/Reviews';
import RelatedProducts from '../Components/Product/ProductDetails/RelatedProducts';
import EmptyState from '../Components/UI/EmptyState';
import { getProduct } from '../features/productSlice';
import usePageTitle from '../hooks/usePageTitle';

const ProductDetails = () => {
  const { product, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(getProduct(slug));
    }
  }, [dispatch, slug]);

  usePageTitle(
    product?.name ? `${product.name} | Alucard Shop` : 'Product Details | Alucard Shop',
    product?.description || 'View product details, price, reviews and related products.'
  );

  if (loading) return <Loader />;

  if (error) {
    return (
      <main className="bg-gray-100 px-4 py-12">
        <EmptyState
          title="Product could not be loaded"
          message={error}
          buttonText="Back to Products"
          buttonLink="/products"
        />
      </main>
    );
  }

  if (!product?._id) {
    return (
      <main className="bg-gray-100 px-4 py-12">
        <EmptyState
          title="Product not found"
          message="This product may have been removed or the link is incorrect."
          buttonText="Browse Products"
          buttonLink="/products"
        />
      </main>
    );
  }

  return (
    <main className="bg-gray-100 pb-20 lg:pb-0">
      <Breadcrumb />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Details product={product} />
        <Reviews productID={product._id} />
        <RelatedProducts product={product} />
      </div>
    </main>
  );
};

export default ProductDetails;