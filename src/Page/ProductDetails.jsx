




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
    product?.metaDescription ||
      product?.shortDescription ||
      product?.description ||
      'View product details.'
  );

  useEffect(() => {
    if (slug) {
      dispatch(getProduct(slug));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (product?._id) {
      setCompared(isCompared(product._id));
    } else {
      setCompared(false);
    }
  }, [product?._id]);

  const handleCompare = () => {
    if (!product?._id) return;

    toggleCompareProduct(product);
    setCompared(isCompared(product._id));
  };

  if (loading) return <PageSkeleton type="details" />;

  if (error) {
    return (
      <main className="bg-gray-100 font-Work_sans">
        <EmptyState
          title="Product unavailable"
          message={typeof error === 'string' ? error : 'Something went wrong.'}
          actionLabel="Back to Products"
          actionTo="/products"
        />
      </main>
    );
  }

  if (!product?._id) {
    return (
      <main className="bg-gray-100 font-Work_sans">
        <EmptyState
          title="Product not found"
          message="The product you are looking for does not exist."
          actionLabel="Back to Products"
          actionTo="/products"
        />
      </main>
    );
  }

  return (
    <main className="bg-gray-100 font-Work_sans">
      <Breadcrumb />

      <div className="container mx-auto max-w-6xl px-4 py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 transition hover:text-yellow-700"
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
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-black text-gray-950 transition hover:bg-yellow-500"
            >
              Compare List
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="[&_.product-image]:max-h-[420px] [&_img]:max-h-[420px] [&_img]:object-contain">
            <Details key={product._id} product={product} />
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