import { useEffect, useState } from 'react';
import { BadgePercent, X } from 'lucide-react';
import { applyCouponToTotal, STORAGE_KEYS } from '../../utils/shopHelpers';

const CouponBox = ({ subtotal = 0, shipping = 0, onApply }) => {
  const [code, setCode] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.coupon) || '';
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!code) {
      onApply?.({
        valid: false,
        discount: 0,
        shipping,
        total: subtotal + shipping,
        coupon: null,
      });
      return;
    }

    const result = applyCouponToTotal({
      subtotal,
      shipping,
      couponCode: code,
    });

    onApply?.(result);

    if (result.valid) {
      setMessage(result.message);
    }
  }, [subtotal, shipping]);

  const handleApply = () => {
    const result = applyCouponToTotal({
      subtotal,
      shipping,
      couponCode: code,
    });

    if (result.valid) {
      localStorage.setItem(STORAGE_KEYS.coupon, code.trim().toUpperCase());
    }

    setMessage(result.message);
    onApply?.(result);
  };

  const handleClear = () => {
    setCode('');
    setMessage('');
    localStorage.removeItem(STORAGE_KEYS.coupon);

    onApply?.({
      valid: false,
      discount: 0,
      shipping,
      total: subtotal + shipping,
      coupon: null,
    });
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
            Try: SAVE10, FREESHIP, NEWUSER
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon"
          className="min-w-0 flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-yellow-400"
        />

        {code && (
          <button
            type="button"
            onClick={handleClear}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="button"
          onClick={handleApply}
          className="rounded-2xl bg-black px-5 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
        >
          Apply
        </button>
      </div>

      {message && (
        <p
          className={`mt-3 text-sm font-bold ${
            message.includes('applied') ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CouponBox;