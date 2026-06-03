import { X, ShoppingBag, Star, Truck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, fetchCart } from '../../features/cartSlice';
import WishlistButton from '../WishlistButton';

const QuickViewModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  if (!product) return null;

  const image = product?.thumbnail || product?.images?.[0] || product?.image;

  const inStock =
    product?.stock === undefined ||
    product?.countInStock > 0 ||
    product?.status === 'In Stock' ||
    product?.stock === 'In Stock';

  const handleAddToCart = () => {
    if (!user && !isAuthenticated) {
      onClose();
      navigate('/login');
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image,
        slug: product.slug,
      })
    );

    setTimeout(() => {
      dispatch(fetchCart());
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
      <div className="relative grid max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black text-yellow-400"
          aria-label="Close quick view"
        >
          <X size={20} />
        </button>

        <div className="bg-gray-100">
          <img
            src={image}
            alt={product?.name || 'Product image'}
            loading="eager"
            decoding="async"
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${
              inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight text-gray-950">
            {product?.name}
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={17}
                  fill={
                    index < Math.round(product?.rating || 0)
                      ? 'currentColor'
                      : 'none'
                  }
                />
              ))}
            </div>

            <span className="text-sm font-bold text-gray-500">
              {product?.rating || 0} ({product?.numReviews || 0})
            </span>
          </div>

          <p className="mt-4 text-3xl font-black text-green-600">
            ৳{product?.price || 0}
          </p>

          <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-600">
            {product?.description ||
              'Premium quality product from Alucard Shop.'}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-yellow-50 p-4">
              <Truck size={22} className="text-yellow-700" />
              <p className="mt-2 text-sm font-black">Fast Delivery</p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4">
              <ShieldCheck size={22} className="text-yellow-700" />
              <p className="mt-2 text-sm font-black">Secure Checkout</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-5 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:opacity-60"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <WishlistButton
              productId={product?._id}
              size={21}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 text-gray-800 transition hover:bg-yellow-100"
            />
          </div>

          <Link
            to={`/product/${product?.slug}`}
            onClick={onClose}
            className="mt-4 inline-flex text-sm font-black text-yellow-700 hover:text-black"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;