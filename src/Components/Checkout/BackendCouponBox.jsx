import { useState } from 'react';
import { BadgePercent, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';

import * as API from '../../features/API';

const BackendCouponBox = ({
  cartItems = [],
  shippingPrice = 0,
  onCouponApplied,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [message, setMessage] = useState('');

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

      const res = await API.applyCoupon({
        couponCode: cleanCode,
        cartItems,
        shippingPrice,
      });

      const data = res.data;

      const couponPayload = {
        couponCode: cleanCode,
        coupon: data?.coupon || null,
        itemsPrice: data?.itemsPrice || 0,
        originalShippingPrice:
          data?.originalShippingPrice ?? shippingPrice,
        shippingPrice: data?.shippingPrice ?? shippingPrice,
        discountPrice: data?.discountPrice || 0,
        shippingDiscount: data?.shippingDiscount || 0,
        totalPrice: data?.totalPrice || 0,
      };

      setAppliedCoupon(couponPayload);
      setMessage(data?.message || 'Coupon applied successfully');

      onCouponApplied?.(couponPayload);
      toast.success(data?.message || 'Coupon applied');
    } catch (error) {
      const msg = error.response?.data?.message || 'Coupon apply failed';

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
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-400 text-black">
          <BadgePercent size={20} />
        </div>

        <div>
          <h3 className="font-black text-gray-950">Promo Code</h3>
          <p className="text-xs font-semibold text-gray-500">
            Try: SAVE10, NEWUSER, FREESHIP
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon"
          className="min-w-0 flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-black uppercase outline-none focus:border-yellow-400"
        />

        {appliedCoupon && (
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-100"
            aria-label="Remove coupon"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="button"
          onClick={handleApplyCoupon}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Apply
        </button>
      </div>

      {message && (
        <p
          className={`mt-3 text-sm font-bold ${
            appliedCoupon ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}

      {appliedCoupon && (
        <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm font-bold text-gray-700">
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-৳{appliedCoupon.discountPrice || 0}</span>
          </div>

          {appliedCoupon.shippingDiscount > 0 && (
            <div className="mt-1 flex justify-between">
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