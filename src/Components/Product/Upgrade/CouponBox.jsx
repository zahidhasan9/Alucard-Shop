import { useState } from 'react';
import { Tag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { applyCouponCode, clearCoupon } from '../../../features/couponSlice';

const CouponBox = ({ subtotal, shippingPrice }) => {
  const dispatch = useDispatch();
  const { applied, loading } = useSelector(state => state.coupon || {});
  const [code, setCode] = useState('');

  const apply = () => {
    if (!code.trim()) return;
    dispatch(applyCouponCode({ code, subtotal, shippingPrice }));
  };

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-black text-gray-950"><Tag size={18} /> Coupon / Promo</h3>
      <div className="mt-4 flex gap-2">
        <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="EID20" className="flex-1 rounded-2xl border px-4 py-3 uppercase outline-none focus:border-black" />
        <button onClick={apply} disabled={loading} className="rounded-2xl bg-black px-5 py-3 font-bold text-white disabled:opacity-60">Apply</button>
      </div>
      {applied && (
        <div className="mt-4 rounded-2xl bg-green-50 p-4 text-sm text-green-700">
          <div className="flex justify-between"><span>{applied.code}</span><span>-৳{applied.discount + applied.shippingDiscount}</span></div>
          <button onClick={() => dispatch(clearCoupon())} className="mt-2 text-xs font-bold underline">Remove coupon</button>
        </div>
      )}
    </div>
  );
};

export default CouponBox;
