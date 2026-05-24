

// import { useEffect, useMemo, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Minus,
//   Plus,
//   ShoppingBag,
//   Trash2,
//   ShieldCheck,
//   Truck,
//   Tag,
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import {
//   fetchCart,
//   removeFromCart,
//   updateCartItem,
// } from '../features/cartSlice.js';
// import EmptyState from '../Components/UI/EmptyState';
// import usePageTitle from '../hooks/usePageTitle';
// import * as API from '../features/API';

// const CartPage = () => {
//   const { cartItems, loading } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [coupon, setCoupon] = useState('');
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [discount, setDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState('');

//   usePageTitle(
//     'Shopping Cart | Alucard Shop',
//     'Review your shopping cart and proceed to checkout.'
//   );

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const items = cartItems?.items || [];

//   const subtotal = useMemo(
//     () =>
//       items.reduce(
//         (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
//         0
//       ),
//     [items]
//   );

//   const shippingFee = subtotal > 0 ? 0 : 0;
//   const total = Math.max(0, subtotal + shippingFee - discount);

//   const formatPrice = (amount) =>
//     Number(amount || 0).toLocaleString('en-BD', {
//       style: 'currency',
//       currency: 'BDT',
//       minimumFractionDigits: 0,
//     });

//   const updateQuantity = async (id, type) => {
//     const item = items.find((cartItem) => cartItem._id === id);
//     if (!item) return;

//     const newQuantity =
//       type === 'increase'
//         ? Number(item.quantity || 1) + 1
//         : Math.max(1, Number(item.quantity || 1) - 1);

//     await dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
//     dispatch(fetchCart());
//   };

//   const deleteItem = async (id) => {
//     await dispatch(removeFromCart(id));
//     dispatch(fetchCart());
//   };

//   const applyCoupon = async () => {
//     if (!coupon.trim()) {
//       setCouponMessage('Enter a coupon code first.');
//       return;
//     }

//     try {
//       setCouponLoading(true);
//       const res = await API.applyCoupon({
//         code: coupon.trim(),
//         subtotal,
//       });

//       const couponDiscount =
//         res.data?.discountAmount || res.data?.discount || 0;

//       setDiscount(Number(couponDiscount));
//       setCouponMessage(res.data?.message || 'Coupon applied successfully.');
//     } catch (error) {
//       setDiscount(0);
//       setCouponMessage(
//         error.response?.data?.message || 'Invalid or expired coupon.'
//       );
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   if (!loading && !items.length) {
//     return (
//       <EmptyState
//         icon={ShoppingBag}
//         title="Your cart is empty"
//         message="Looks like you have not added anything to your cart yet."
//         actionLabel="Start Shopping"
//         actionTo="/products"
//       />
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
//       <div className="container mx-auto">
//         <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
//           <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-700">
//             Checkout
//           </p>
//           <h1 className="mt-2 text-3xl font-black text-gray-950">
//             Shopping Cart
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Review your products before placing the order.
//           </p>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
//           <section className="space-y-4">
//             {loading && (
//               <div className="rounded-2xl bg-white p-6 text-sm text-gray-500">
//                 Loading cart...
//               </div>
//             )}

//             {items.map((item) => (
//               <div
//                 key={item._id}
//                 className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
//               >
//                 <div className="grid gap-4 md:grid-cols-[120px_1fr_auto] md:items-center">
//                   <Link
//                     to={`/product/${item?.slug || item?.product?.slug || item._id}`}
//                     className="overflow-hidden rounded-xl bg-gray-100"
//                   >
//                     <img
//                       src={
//                         item?.image ||
//                         item?.images?.[0]?.url ||
//                         item?.product?.images?.[0]?.url ||
//                         '/placeholder.png'
//                       }
//                       alt={item.title || item.name}
//                       className="h-32 w-full object-cover transition hover:scale-105"
//                     />
//                   </Link>

//                   <div>
//                     <h3 className="text-lg font-bold text-gray-950">
//                       {item.title || item.name}
//                     </h3>

//                     {item.size && (
//                       <p className="mt-1 text-sm text-gray-500">
//                         Size: {item.size}
//                       </p>
//                     )}

//                     <p className="mt-2 text-lg font-black text-gray-950">
//                       {formatPrice(item.price)}
//                     </p>

//                     <button
//                       onClick={() => deleteItem(item._id)}
//                       className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 size={17} />
//                       Remove
//                     </button>
//                   </div>

//                   <div className="flex flex-col gap-3 md:items-end">
//                     <div className="flex w-max items-center overflow-hidden rounded-full border border-gray-300 bg-gray-50">
//                       <button
//                         onClick={() => updateQuantity(item._id, 'decrease')}
//                         className="grid h-10 w-10 place-items-center hover:bg-gray-200"
//                       >
//                         <Minus size={16} />
//                       </button>

//                       <span className="grid h-10 min-w-12 place-items-center bg-white px-4 text-sm font-black">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() => updateQuantity(item._id, 'increase')}
//                         className="grid h-10 w-10 place-items-center hover:bg-gray-200"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>

//                     <p className="text-sm text-gray-500">Subtotal</p>
//                     <p className="text-xl font-black text-gray-950">
//                       {formatPrice(Number(item.price || 0) * Number(item.quantity || 1))}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </section>

//           <aside className="h-max rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
//             <h2 className="text-xl font-black text-gray-950">Order Summary</h2>

//             <div className="mt-5 space-y-3 border-b border-gray-200 pb-5">
//               <SummaryRow label={`Subtotal (${items.length} items)`} value={formatPrice(subtotal)} />
//               <SummaryRow label="Shipping Fee" value={formatPrice(shippingFee)} />
//               <SummaryRow label="Discount" value={`- ${formatPrice(discount)}`} />
//             </div>

//             <div className="mt-5">
//               <label className="mb-2 block text-sm font-bold text-gray-800">
//                 Voucher Code
//               </label>
//               <div className="flex overflow-hidden rounded-full border border-gray-300 bg-gray-50">
//                 <div className="grid w-11 place-items-center text-gray-400">
//                   <Tag size={17} />
//                 </div>
//                 <input
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                   placeholder="Enter coupon"
//                   className="w-full bg-transparent px-1 py-2.5 text-sm outline-none"
//                 />
//                 <button
//                   onClick={applyCoupon}
//                   disabled={couponLoading}
//                   className="bg-gray-950 px-5 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-950 disabled:opacity-60"
//                 >
//                   {couponLoading ? '...' : 'Apply'}
//                 </button>
//               </div>

//               {couponMessage && (
//                 <p className="mt-2 text-xs font-semibold text-gray-600">
//                   {couponMessage}
//                 </p>
//               )}
//             </div>

//             <div className="mt-5 flex items-center justify-between rounded-xl bg-yellow-50 p-4">
//               <span className="font-bold text-gray-900">Total</span>
//               <span className="text-2xl font-black text-gray-950">
//                 {formatPrice(total)}
//               </span>
//             </div>

//             <button
//               onClick={() => navigate('/order')}
//               className="mt-5 w-full rounded-full bg-yellow-400 px-6 py-3.5 text-sm font-black text-gray-950 transition hover:bg-yellow-500"
//             >
//               Proceed to Checkout
//             </button>

//             <div className="mt-5 space-y-3 text-sm text-gray-600">
//               <InfoLine icon={<ShieldCheck size={18} />} text="Secure checkout" />
//               <InfoLine icon={<Truck size={18} />} text="Fast delivery support" />
//             </div>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// };

// const SummaryRow = ({ label, value }) => (
//   <div className="flex items-center justify-between text-sm">
//     <span className="text-gray-500">{label}</span>
//     <span className="font-bold text-gray-900">{value}</span>
//   </div>
// );

// const InfoLine = ({ icon, text }) => (
//   <div className="flex items-center gap-2">
//     <span className="text-green-600">{icon}</span>
//     <span>{text}</span>
//   </div>
// );

// export default CartPage;


// import { useEffect, useMemo, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Minus,
//   Plus,
//   ShoppingBag,
//   Trash2,
//   ShieldCheck,
//   Truck,
//   Tag,
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import {
//   fetchCart,
//   removeFromCart,
//   updateCartItem,
// } from '../features/cartSlice.js';
// import EmptyState from '../Components/UI/EmptyState';
// import usePageTitle from '../hooks/usePageTitle';
// import * as API from '../features/API';

// const COUPON_KEY = 'cartCoupon';

// const CartPage = () => {
//   const { cartItems, loading } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [coupon, setCoupon] = useState('');
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponMessage, setCouponMessage] = useState('');

//   usePageTitle(
//     'Shopping Cart | Alucard Shop',
//     'Review your shopping cart and proceed to checkout.'
//   );

//   useEffect(() => {
//     dispatch(fetchCart());

//     const savedCoupon = localStorage.getItem(COUPON_KEY);
//     if (savedCoupon) {
//       try {
//         const parsed = JSON.parse(savedCoupon);
//         setAppliedCoupon(parsed);
//         setCoupon(parsed?.code || '');
//       } catch {
//         localStorage.removeItem(COUPON_KEY);
//       }
//     }
//   }, [dispatch]);

//   const items = cartItems?.items || [];

//   const subtotal = useMemo(
//     () =>
//       items.reduce(
//         (sum, item) =>
//           sum + Number(item.price || 0) * Number(item.quantity || 1),
//         0
//       ),
//     [items]
//   );

//   const shippingFee = subtotal > 0 ? 0 : 0;
//   const discount = Number(appliedCoupon?.discountAmount || 0);
//   const total = Math.max(0, subtotal + shippingFee - discount);

//   const formatPrice = (amount) =>
//     Number(amount || 0).toLocaleString('en-BD', {
//       style: 'currency',
//       currency: 'BDT',
//       minimumFractionDigits: 0,
//     });

//   const updateQuantity = async (id, type) => {
//     const item = items.find((cartItem) => cartItem._id === id);
//     if (!item) return;

//     const newQuantity =
//       type === 'increase'
//         ? Number(item.quantity || 1) + 1
//         : Math.max(1, Number(item.quantity || 1) - 1);

//     await dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
//     dispatch(fetchCart());
//   };

//   const deleteItem = async (id) => {
//     await dispatch(removeFromCart(id));
//     dispatch(fetchCart());
//   };

//   const applyCoupon = async () => {
//     if (!coupon.trim()) {
//       setCouponMessage('Enter a coupon code first.');
//       return;
//     }

//     try {
//       setCouponLoading(true);
//       setCouponMessage('');

//       const res = await API.applyCoupon({
//         code: coupon.trim(),
//         subtotal,
//         cartTotal: subtotal,
//       });

//       const data = res.data || {};

//       const discountAmount =
//         data.discountAmount ||
//         data.discount ||
//         data.coupon?.discountAmount ||
//         0;

//       const couponData = {
//         code: data.code || data.coupon?.code || coupon.trim(),
//         discountAmount: Number(discountAmount),
//         message: data.message || 'Coupon applied successfully.',
//       };

//       setAppliedCoupon(couponData);
//       localStorage.setItem(COUPON_KEY, JSON.stringify(couponData));
//       setCouponMessage(couponData.message);
//     } catch (error) {
//       setAppliedCoupon(null);
//       localStorage.removeItem(COUPON_KEY);
//       setCouponMessage(
//         error.response?.data?.message || 'Invalid or expired coupon.'
//       );
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const removeCoupon = () => {
//     setCoupon('');
//     setAppliedCoupon(null);
//     setCouponMessage('');
//     localStorage.removeItem(COUPON_KEY);
//   };

//   const goCheckout = () => {
//     navigate('/order');
//   };

//   if (!loading && !items.length) {
//     return (
//       <EmptyState
//         icon={ShoppingBag}
//         title="Your cart is empty"
//         message="Looks like you have not added anything to your cart yet."
//         actionLabel="Start Shopping"
//         actionTo="/products"
//       />
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
//       <div className="container mx-auto">
//         <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
//           <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-700">
//             Checkout
//           </p>
//           <h1 className="mt-2 text-3xl font-black text-gray-950">
//             Shopping Cart
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Apply coupon here before checkout.
//           </p>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
//           <section className="space-y-4">
//             {loading && (
//               <div className="rounded-2xl bg-white p-6 text-sm text-gray-500">
//                 Loading cart...
//               </div>
//             )}

//             {items.map((item) => (
//               <div
//                 key={item._id}
//                 className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
//               >
//                 <div className="grid gap-4 md:grid-cols-[120px_1fr_auto] md:items-center">
//                   <Link
//                     to={`/product/${
//                       item?.slug || item?.product?.slug || item._id
//                     }`}
//                     className="overflow-hidden rounded-xl bg-gray-100"
//                   >
//                     <img
//                       src={
//                         item?.image ||
//                         item?.images?.[0]?.url ||
//                         item?.product?.images?.[0]?.url ||
//                         '/placeholder.png'
//                       }
//                       alt={item.title || item.name}
//                       className="h-32 w-full object-contain p-2"
//                     />
//                   </Link>

//                   <div>
//                     <h3 className="text-lg font-bold text-gray-950">
//                       {item.title || item.name}
//                     </h3>

//                     {item.size && (
//                       <p className="mt-1 text-sm text-gray-500">
//                         Size: {item.size}
//                       </p>
//                     )}

//                     <p className="mt-2 text-lg font-black text-gray-950">
//                       {formatPrice(item.price)}
//                     </p>

//                     <button
//                       onClick={() => deleteItem(item._id)}
//                       className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 size={17} />
//                       Remove
//                     </button>
//                   </div>

//                   <div className="flex flex-col gap-3 md:items-end">
//                     <div className="flex w-max items-center overflow-hidden rounded-full border border-gray-300 bg-gray-50">
//                       <button
//                         onClick={() => updateQuantity(item._id, 'decrease')}
//                         className="grid h-10 w-10 place-items-center hover:bg-gray-200"
//                       >
//                         <Minus size={16} />
//                       </button>

//                       <span className="grid h-10 min-w-12 place-items-center bg-white px-4 text-sm font-black">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() => updateQuantity(item._id, 'increase')}
//                         className="grid h-10 w-10 place-items-center hover:bg-gray-200"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>

//                     <p className="text-sm text-gray-500">Subtotal</p>
//                     <p className="text-xl font-black text-gray-950">
//                       {formatPrice(
//                         Number(item.price || 0) * Number(item.quantity || 1)
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </section>

//           <aside className="h-max rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
//             <h2 className="text-xl font-black text-gray-950">Order Summary</h2>

//             <div className="mt-5">
//               <label className="mb-2 block text-sm font-bold text-gray-800">
//                 Coupon Code
//               </label>

//               <div className="flex overflow-hidden rounded-full border border-gray-300 bg-gray-50">
//                 <div className="grid w-11 place-items-center text-gray-400">
//                   <Tag size={17} />
//                 </div>

//                 <input
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                   placeholder="Enter coupon"
//                   disabled={!!appliedCoupon}
//                   className="w-full bg-transparent px-1 py-2.5 text-sm outline-none disabled:text-gray-400"
//                 />

//                 {appliedCoupon ? (
//                   <button
//                     onClick={removeCoupon}
//                     className="bg-red-600 px-5 text-sm font-bold text-white hover:bg-red-700"
//                   >
//                     Remove
//                   </button>
//                 ) : (
//                   <button
//                     onClick={applyCoupon}
//                     disabled={couponLoading}
//                     className="bg-gray-950 px-5 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-950 disabled:opacity-60"
//                   >
//                     {couponLoading ? '...' : 'Apply'}
//                   </button>
//                 )}
//               </div>

//               {couponMessage && (
//                 <p className="mt-2 text-xs font-semibold text-gray-600">
//                   {couponMessage}
//                 </p>
//               )}
//             </div>

//             <div className="mt-5 space-y-3 border-b border-gray-200 pb-5">
//               <SummaryRow
//                 label={`Subtotal (${items.length} items)`}
//                 value={formatPrice(subtotal)}
//               />
//               <SummaryRow label="Shipping Fee" value={formatPrice(shippingFee)} />
//               <SummaryRow label="Discount" value={`- ${formatPrice(discount)}`} />
//             </div>

//             <div className="mt-5 flex items-center justify-between rounded-xl bg-yellow-50 p-4">
//               <span className="font-bold text-gray-900">Total</span>
//               <span className="text-2xl font-black text-gray-950">
//                 {formatPrice(total)}
//               </span>
//             </div>

//             <button
//               onClick={goCheckout}
//               className="mt-5 w-full rounded-full bg-yellow-400 px-6 py-3.5 text-sm font-black text-gray-950 transition hover:bg-yellow-500"
//             >
//               Proceed to Checkout
//             </button>

//             <div className="mt-5 space-y-3 text-sm text-gray-600">
//               <InfoLine icon={<ShieldCheck size={18} />} text="Secure checkout" />
//               <InfoLine icon={<Truck size={18} />} text="Fast delivery support" />
//             </div>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// };

// const SummaryRow = ({ label, value }) => (
//   <div className="flex items-center justify-between text-sm">
//     <span className="text-gray-500">{label}</span>
//     <span className="font-bold text-gray-900">{value}</span>
//   </div>
// );

// const InfoLine = ({ icon, text }) => (
//   <div className="flex items-center gap-2">
//     <span className="text-green-600">{icon}</span>
//     <span>{text}</span>
//   </div>
// );

// export default CartPage;




import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCart,
  removeFromCart,
  updateCartItem,
} from '../features/cartSlice.js';
import EmptyState from '../Components/UI/EmptyState';
import usePageTitle from '../hooks/usePageTitle';

const CartPage = () => {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  usePageTitle(
    'Shopping Cart | Alucard Shop',
    'Review your shopping cart and proceed to checkout.'
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const items = cartItems?.items || [];

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [items]
  );

  const shippingFee = subtotal > 0 ? 0 : 0;
  const total = subtotal + shippingFee;

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    });

  const updateQuantity = async (id, type) => {
    const item = items.find((cartItem) => cartItem._id === id);
    if (!item) return;

    const newQuantity =
      type === 'increase'
        ? Number(item.quantity || 1) + 1
        : Math.max(1, Number(item.quantity || 1) - 1);

    await dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
    dispatch(fetchCart());
  };

  const deleteItem = async (id) => {
    await dispatch(removeFromCart(id));
    dispatch(fetchCart());
  };

  if (!loading && !items.length) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        message="Looks like you have not added anything to your cart yet."
        actionLabel="Start Shopping"
        actionTo="/products"
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
      <div className="container mx-auto">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-700">
            Cart
          </p>
          <h1 className="mt-2 text-3xl font-black text-gray-950">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review your products before checkout.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="space-y-4">
            {loading && (
              <div className="rounded-2xl bg-white p-6 text-sm text-gray-500">
                Loading cart...
              </div>
            )}

            {items.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="grid gap-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                  <Link
                    to={`/product/${
                      item?.slug || item?.product?.slug || item._id
                    }`}
                    className="overflow-hidden rounded-xl bg-gray-100"
                  >
                    <img
                      src={
                        item?.image ||
                        item?.images?.[0]?.url ||
                        item?.product?.images?.[0]?.url ||
                        '/placeholder.png'
                      }
                      alt={item.title || item.name}
                      className="h-32 w-full object-contain p-2"
                    />
                  </Link>

                  <div>
                    <h3 className="text-lg font-bold text-gray-950">
                      {item.title || item.name}
                    </h3>

                    {item.size && (
                      <p className="mt-1 text-sm text-gray-500">
                        Size: {item.size}
                      </p>
                    )}

                    <p className="mt-2 text-lg font-black text-gray-950">
                      {formatPrice(item.price)}
                    </p>

                    <button
                      onClick={() => deleteItem(item._id)}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={17} />
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 md:items-end">
                    <div className="flex w-max items-center overflow-hidden rounded-full border border-gray-300 bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item._id, 'decrease')}
                        className="grid h-10 w-10 place-items-center hover:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="grid h-10 min-w-12 place-items-center bg-white px-4 text-sm font-black">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item._id, 'increase')}
                        className="grid h-10 w-10 place-items-center hover:bg-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-xl font-black text-gray-950">
                      {formatPrice(
                        Number(item.price || 0) * Number(item.quantity || 1)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <aside className="h-max rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-black text-gray-950">Order Summary</h2>

            <div className="mt-5 space-y-3 border-b border-gray-200 pb-5">
              <SummaryRow
                label={`Subtotal (${items.length} items)`}
                value={formatPrice(subtotal)}
              />
              <SummaryRow label="Shipping Fee" value={formatPrice(shippingFee)} />
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-yellow-50 p-4">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-gray-950">
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={() => navigate('/order')}
              className="mt-5 w-full rounded-full bg-yellow-400 px-6 py-3.5 text-sm font-black text-gray-950 transition hover:bg-yellow-500"
            >
              Proceed to Checkout
            </button>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <InfoLine icon={<ShieldCheck size={18} />} text="Secure checkout" />
              <InfoLine icon={<Truck size={18} />} text="Fast delivery support" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);

const InfoLine = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="text-green-600">{icon}</span>
    <span>{text}</span>
  </div>
);

export default CartPage;