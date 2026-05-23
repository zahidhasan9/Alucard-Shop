import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toggleWishlistItem } from '../features/wishlistSlice';

const WishlistButton = ({
  productId,
  size = 18,
  className = '',
  iconClassName = '',
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { productIds = [], toggling } = useSelector((state) => state.wishlist);

  const isWishlisted = productIds.includes(String(productId));

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!productId || toggling) return;

    dispatch(toggleWishlistItem(productId));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={toggling}
      className={
        className ||
        'flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm transition hover:bg-yellow-400 disabled:opacity-60'
      }
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        size={size}
        className={
          isWishlisted
            ? `fill-red-500 text-red-500 ${iconClassName}`
            : iconClassName
        }
      />
    </button>
  );
};

export default WishlistButton;