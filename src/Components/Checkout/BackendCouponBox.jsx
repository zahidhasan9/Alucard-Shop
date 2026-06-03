import { useEffect, useState } from 'react';
import { BadgePercent, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import * as API from '../../features/API';

const normalizeCartItemsForCoupon = cartItems => {
  return (cartItems || []).map(item => {
    const productId =
      item.productId || item.product?._id || item.product || item._id;

    return {
      product: productId,
      productId,
      _id: productId,
      name: item.name || item.title || item.product?.name || '',
      qty: Number(item.qty || item.quantity || 1),
      quantity: Number(item.quantity || item.qty || 1),
      price: Number(item.price || 0),
      image: item.image || item.thumbnail || item.product?.image || '',
      slug: item.slug || item.product?.slug || '',
      variantId: item.variantId || '',
      variantLabel: item.variantLabel || '',
      variantSku: item.variantSku || '',
      selectedVariants: item.selectedVariants || {},
    };
  });
};

const BackendCouponBox = ({
  cartItems = [],
  shippingPrice = 0,
  onCouponApplied,
  resetKey = '',
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCouponCode('');
    setAppliedCoupon(null);
    setMessage('');
    onCouponApplied?.(null);
  }, [resetKey]);

  const handleApplyCoupon = async () => {
    const cleanCode = couponCode.trim().toUpperCase();

    if (!cleanCode) {
      toast.error('Enter a coupon code');
      return;
    }

    if (!cartItems.length) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const res = await API.applyCoupon({
        couponCode: cleanCode,
        cartItems: normalizeCartItemsForCoupon(cartItems),
        shippingPrice: Number(shippingPrice || 0),
      });

      const data = res.data || {};

      const couponPayload = {
        couponCode: cleanCode,
        coupon: data.coupon || null,
        itemsPrice: Number(data.itemsPrice || 0),
        originalShippingPrice: Number(
          data.originalShippingPrice ?? shippingPrice
        ),
        shippingPrice: Number(data.shippingPrice ?? shippingPrice),
        discountPrice: Number(data.discountPrice || 0),
        shippingDiscount: Number(data.shippingDiscount || 0),
        totalPrice: Number(data.totalPrice || 0),
      };

      setAppliedCoupon(couponPayload);
      setMessage(data.message || 'Coupon applied successfully');
      onCouponApplied?.(couponPayload);

      toast.success(data.message || 'Coupon applied successfully');
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Coupon apply failed. Please login and try again.';

      setAppliedCoupon(null);
      setMessage(msg);
      onCouponApplied?.(null);

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setMessage('');
    onCouponApplied?.(null);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-100 text-yellow-700">
          <BadgePercent size={20} />
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-950">Promo Code</h3>
          <p className="text-xs font-semibold text-gray-500">
            Coupon will be verified from backend.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          disabled={loading || !!appliedCoupon}
          onChange={event => setCouponCode(event.target.value.toUpperCase())}
          placeholder="Enter coupon"
          className="min-w-0 flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-black uppercase outline-none focus:border-yellow-400 disabled:bg-gray-100 disabled:text-gray-400"
        />

        {appliedCoupon ? (
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600 hover:bg-red-100"
            title="Remove coupon"
          >
            <X size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={loading}
            className="rounded-2xl bg-black px-5 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Apply'}
          </button>
        )}
      </div>

      {message && (
        <p
          className={`mt-3 text-xs font-bold ${
            appliedCoupon ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      {appliedCoupon && (
        <div className="mt-4 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">
          <div className="flex justify-between">
            <span>Coupon</span>
            <span>{appliedCoupon.couponCode}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Discount</span>
            <span>-৳{appliedCoupon.discountPrice}</span>
          </div>

          {appliedCoupon.shippingDiscount > 0 && (
            <div className="mt-2 flex justify-between">
              <span>Shipping Discount</span>
              <span>-৳{appliedCoupon.shippingDiscount}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BackendCouponBox;