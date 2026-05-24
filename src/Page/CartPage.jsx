// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCart, removeFromCart, updateCartItem } from '../features/cartSlice.js';
// import { Plus, Minus, Trash2 } from 'lucide-react';

// const CartTable = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate('/order');
//   };

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const updateQuantity = (id, type) => {
//     const item = cartItems?.items?.find((i) => i._id === id);
//     if (!item) return;

//     const newQuantity = type === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
//     dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
//     setTimeout(() => {
//       dispatch(fetchCart());
//     }, 500);
//   };

//   const deleteItem = (id) => {
//     dispatch(removeFromCart(id));
//     setTimeout(() => {
//       dispatch(fetchCart());
//     }, 500);
//   };

//   const subtotal = cartItems?.items?.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0) || 0;
//   const shippingFee = 0;
//   const total = subtotal + shippingFee;

//   return (
//     <div className="min-h-[80vh] bg-gray-50">
//       <div className="container mx-auto px-4 py-10">
//         <h1 className="text-3xl font-bold mb-8 text-gray-800">🛒 Your Shopping Cart</h1>
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Cart Items */}
//           <div className="flex-1 overflow-x-auto">
//             <div className="bg-white shadow-md rounded-xl p-4">
//               <table className="min-w-full">
//                 <thead className="text-left text-gray-600 border-b">
//                   <tr>
//                     <th className="py-3">Product</th>
//                     {/* <th className="py-3">Price</th> */}
//                     <th className="py-3">Quantity</th>
//                     <th className="py-3">Subtotal</th>
//                     <th className="py-3 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cartItems?.items?.length > 0 ? (
//                     cartItems?.items?.map((item) => (
//                       <tr key={item._id} className="border-b hover:bg-gray-50 transition">
//                         <td className="py-4 flex items-center gap-3">
//                           <img src={item.image} alt={item.title} className="w-14 h-14 rounded shadow-sm" />
//                           <div>
//                             <p className="font-medium text-gray-800">{item.title}</p>
//                             <p className="text-xs text-gray-500">Size: {item.size}</p>
//                             <p className="text-xs text-gray-500">
//                               Price: <span className="text-green-600"> ৳ {item.price}</span>
//                             </p>
//                           </div>
//                         </td>
//                         <td className="py-4 text-gray-700 font-medium whitespace-nowrap">৳ {item.price}</td>
//                         <td className="py-4">
//                           <div className="flex items-center gap-3">
//                             <button
//                               onClick={() => updateQuantity(item._id, 'decrease')}
//                               className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
//                             >
//                               <Minus size={16} />
//                             </button>
//                             <span className="px-2 font-semibold">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item._id, 'increase')}
//                               className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
//                             >
//                               <Plus size={16} />
//                             </button>
//                           </div>
//                         </td>
//                         <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">
//                           ৳ {item.price * item.quantity}
//                         </td>
//                         <td className="py-4 text-center">
//                           <button onClick={() => deleteItem(item._id)} className="text-red-500 hover:text-red-700">
//                             <Trash2 size={20} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="py-6 text-center text-gray-500">
//                         Your cart is empty.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="w-full md:w-80">
//             <div className="bg-white shadow-md rounded-xl p-6">
//               <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal ({cartItems?.items?.length || 0} items)</span>
//                   <span className="font-medium text-gray-800">৳ {subtotal}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping Fee</span>
//                   <span className="font-medium text-gray-800">৳ {shippingFee}</span>
//                 </div>
//                 <div>
//                   <label className="block text-gray-600 mb-1">Voucher Code</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Enter code"
//                       className="border rounded px-3 py-2 w-full text-sm focus:outline-none"
//                     />
//                     <button className="bg-black text-white px-4 rounded hover:bg-gray-800 text-sm">Apply</button>
//                   </div>
//                 </div>
//                 <div className="border-t pt-3 mt-3 flex justify-between items-center">
//                   <span className="text-lg font-semibold">Total:</span>
//                   <span className="text-xl font-bold text-green-600">৳ {total}</span>
//                 </div>
//                 <button
//                   onClick={handleNavigate}
//                   disabled={!cartItems?.items?.length}
//                   className={`w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium ${
//                     !cartItems?.items?.length && 'opacity-50 cursor-not-allowed'
//                   }`}
//                 >
//                   <Link> Checkout</Link>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartTable;









// import { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import {
//   fetchCart,
//   removeFromCart,
//   updateCartItem,
// } from '../features/cartSlice.js';
// import EmptyState from '../Components/UI/EmptyState';
// import usePageTitle from '../hooks/usePageTitle';

// const CartPage = () => {
//   const { cartItems, loading } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   usePageTitle(
//     'Shopping Cart | Alucard Shop',
//     'Review your shopping cart and proceed to checkout.'
//   );

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const items = cartItems?.items || [];

//   const updateQuantity = (id, type) => {
//     const item = items.find((cartItem) => cartItem._id === id);
//     if (!item) return;

//     const newQuantity =
//       type === 'increase'
//         ? item.quantity + 1
//         : Math.max(1, item.quantity - 1);

//     dispatch(updateCartItem({ productId: id, quantity: newQuantity }));

//     setTimeout(() => {
//       dispatch(fetchCart());
//     }, 300);
//   };

//   const deleteItem = (id) => {
//     dispatch(removeFromCart(id));

//     setTimeout(() => {
//       dispatch(fetchCart());
//     }, 300);
//   };

//   const subtotal = items.reduce(
//     (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
//     0
//   );

//   const shippingFee = subtotal > 0 ? 0 : 0;
//   const total = subtotal + shippingFee;

//   if (!loading && !items.length) {
//     return (
//       <main className="bg-gray-100 px-4 py-14">
//         <EmptyState
//           title="Your cart is empty"
//           message="Looks like you have not added any products yet."
//           buttonText="Start Shopping"
//           buttonLink="/products"
//         />
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-8 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-7 flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//             <ShoppingBag size={23} />
//           </div>

//           <div>
//             <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//               Checkout
//             </p>

//             <h1 className="text-3xl font-black text-gray-950">
//               Shopping Cart
//             </h1>
//           </div>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
//           <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 md:p-6">
//             <div className="hidden border-b border-gray-100 pb-4 text-sm font-black text-gray-500 md:grid md:grid-cols-[1fr_120px_160px_120px]">
//               <span>Product</span>
//               <span>Price</span>
//               <span>Quantity</span>
//               <span className="text-right">Action</span>
//             </div>

//             <div className="divide-y divide-gray-100">
//               {items.map((item) => (
//                 <div
//                   key={item._id}
//                   className="grid gap-4 py-5 md:grid-cols-[1fr_120px_160px_120px] md:items-center"
//                 >
//                   <div className="flex gap-4">
//                     <img
//                       src={item.image}
//                       alt={item.title || item.name || 'Cart item'}
//                       loading="lazy"
//                       decoding="async"
//                       className="h-20 w-20 rounded-2xl bg-gray-100 object-cover"
//                     />

//                     <div>
//                       <Link
//                         to={item.slug ? `/product/${item.slug}` : '/products'}
//                         className="font-black text-gray-950 hover:text-yellow-600"
//                       >
//                         {item.title || item.name}
//                       </Link>

//                       {item.size && (
//                         <p className="mt-1 text-sm font-semibold text-gray-500">
//                           Size: {item.size}
//                         </p>
//                       )}

//                       <p className="mt-1 text-sm font-black text-green-600 md:hidden">
//                         ৳{item.price || 0}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="hidden font-black text-gray-900 md:block">
//                     ৳{item.price || 0}
//                   </p>

//                   <div className="flex w-fit items-center rounded-2xl bg-gray-100 p-1">
//                     <button
//                       type="button"
//                       onClick={() => updateQuantity(item._id, 'decrease')}
//                       className="flex h-9 w-9 items-center justify-center rounded-xl bg-white"
//                     >
//                       <Minus size={16} />
//                     </button>

//                     <span className="w-12 text-center text-sm font-black">
//                       {item.quantity}
//                     </span>

//                     <button
//                       type="button"
//                       onClick={() => updateQuantity(item._id, 'increase')}
//                       className="flex h-9 w-9 items-center justify-center rounded-xl bg-white"
//                     >
//                       <Plus size={16} />
//                     </button>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => deleteItem(item._id)}
//                     className="flex items-center justify-end gap-2 text-sm font-black text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={18} />
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//             <h2 className="text-2xl font-black text-gray-950">
//               Order Summary
//             </h2>

//             <div className="mt-6 space-y-4 text-sm font-bold text-gray-600">
//               <div className="flex justify-between">
//                 <span>Subtotal ({items.length} items)</span>
//                 <span>৳{subtotal}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Shipping Fee</span>
//                 <span>৳{shippingFee}</span>
//               </div>

//               <div className="border-t border-gray-100 pt-4">
//                 <label className="mb-2 block text-sm font-black text-gray-900">
//                   Voucher Code
//                 </label>

//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     placeholder="Enter code"
//                     className="min-w-0 flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-400"
//                   />

//                   <button
//                     type="button"
//                     className="rounded-2xl bg-yellow-400 px-4 text-sm font-black text-black"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-between border-t border-gray-100 pt-4 text-lg font-black text-gray-950">
//                 <span>Total</span>
//                 <span>৳{total}</span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => navigate('/order')}
//               className="mt-6 w-full rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
//             >
//               Proceed to Checkout
//             </button>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CartPage;




import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
  Tag,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCart,
  removeFromCart,
  updateCartItem,
} from '../features/cartSlice.js';
import EmptyState from '../Components/UI/EmptyState';
import usePageTitle from '../hooks/usePageTitle';
import * as API from '../features/API';

const CartPage = () => {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

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
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [items]
  );

  const shippingFee = subtotal > 0 ? 0 : 0;
  const total = Math.max(0, subtotal + shippingFee - discount);

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

  const applyCoupon = async () => {
    if (!coupon.trim()) {
      setCouponMessage('Enter a coupon code first.');
      return;
    }

    try {
      setCouponLoading(true);
      const res = await API.applyCoupon({
        code: coupon.trim(),
        subtotal,
      });

      const couponDiscount =
        res.data?.discountAmount || res.data?.discount || 0;

      setDiscount(Number(couponDiscount));
      setCouponMessage(res.data?.message || 'Coupon applied successfully.');
    } catch (error) {
      setDiscount(0);
      setCouponMessage(
        error.response?.data?.message || 'Invalid or expired coupon.'
      );
    } finally {
      setCouponLoading(false);
    }
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
            Checkout
          </p>
          <h1 className="mt-2 text-3xl font-black text-gray-950">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review your products before placing the order.
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
                    to={`/product/${item?.slug || item?.product?.slug || item._id}`}
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
                      className="h-32 w-full object-cover transition hover:scale-105"
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
                      {formatPrice(Number(item.price || 0) * Number(item.quantity || 1))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <aside className="h-max rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-black text-gray-950">Order Summary</h2>

            <div className="mt-5 space-y-3 border-b border-gray-200 pb-5">
              <SummaryRow label={`Subtotal (${items.length} items)`} value={formatPrice(subtotal)} />
              <SummaryRow label="Shipping Fee" value={formatPrice(shippingFee)} />
              <SummaryRow label="Discount" value={`- ${formatPrice(discount)}`} />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-gray-800">
                Voucher Code
              </label>
              <div className="flex overflow-hidden rounded-full border border-gray-300 bg-gray-50">
                <div className="grid w-11 place-items-center text-gray-400">
                  <Tag size={17} />
                </div>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon"
                  className="w-full bg-transparent px-1 py-2.5 text-sm outline-none"
                />
                <button
                  onClick={applyCoupon}
                  disabled={couponLoading}
                  className="bg-gray-950 px-5 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-950 disabled:opacity-60"
                >
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </div>

              {couponMessage && (
                <p className="mt-2 text-xs font-semibold text-gray-600">
                  {couponMessage}
                </p>
              )}
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