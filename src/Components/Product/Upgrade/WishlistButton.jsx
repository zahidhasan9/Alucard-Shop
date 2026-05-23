import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '../../../features/wishlistSlice';

const WishlistButton = ({ productId, className = '' }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.wishlist?.products || []);
  const active = products.some(product => product._id === productId || product === productId);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleWishlistItem(productId))}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 font-semibold transition ${
        active ? 'border-red-200 bg-red-50 text-red-600' : 'border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:text-red-600'
      } ${className}`}
    >
      <Heart size={18} fill={active ? 'currentColor' : 'none'} />
      {active ? 'Wishlisted' : 'Wishlist'}
    </button>
  );
};

export default WishlistButton;
