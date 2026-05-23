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


import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
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

  const updateQuantity = (id, type) => {
    const item = items.find((cartItem) => cartItem._id === id);
    if (!item) return;

    const newQuantity =
      type === 'increase'
        ? item.quantity + 1
        : Math.max(1, item.quantity - 1);

    dispatch(updateCartItem({ productId: id, quantity: newQuantity }));

    setTimeout(() => {
      dispatch(fetchCart());
    }, 300);
  };

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));

    setTimeout(() => {
      dispatch(fetchCart());
    }, 300);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const shippingFee = subtotal > 0 ? 0 : 0;
  const total = subtotal + shippingFee;

  if (!loading && !items.length) {
    return (
      <main className="bg-gray-100 px-4 py-14">
        <EmptyState
          title="Your cart is empty"
          message="Looks like you have not added any products yet."
          buttonText="Start Shopping"
          buttonLink="/products"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
            <ShoppingBag size={23} />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
              Checkout
            </p>

            <h1 className="text-3xl font-black text-gray-950">
              Shopping Cart
            </h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 md:p-6">
            <div className="hidden border-b border-gray-100 pb-4 text-sm font-black text-gray-500 md:grid md:grid-cols-[1fr_120px_160px_120px]">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="grid gap-4 py-5 md:grid-cols-[1fr_120px_160px_120px] md:items-center"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title || item.name || 'Cart item'}
                      loading="lazy"
                      decoding="async"
                      className="h-20 w-20 rounded-2xl bg-gray-100 object-cover"
                    />

                    <div>
                      <Link
                        to={item.slug ? `/product/${item.slug}` : '/products'}
                        className="font-black text-gray-950 hover:text-yellow-600"
                      >
                        {item.title || item.name}
                      </Link>

                      {item.size && (
                        <p className="mt-1 text-sm font-semibold text-gray-500">
                          Size: {item.size}
                        </p>
                      )}

                      <p className="mt-1 text-sm font-black text-green-600 md:hidden">
                        ৳{item.price || 0}
                      </p>
                    </div>
                  </div>

                  <p className="hidden font-black text-gray-900 md:block">
                    ৳{item.price || 0}
                  </p>

                  <div className="flex w-fit items-center rounded-2xl bg-gray-100 p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, 'decrease')}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-12 text-center text-sm font-black">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, 'increase')}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteItem(item._id)}
                    className="flex items-center justify-end gap-2 text-sm font-black text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-black text-gray-950">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm font-bold text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span>৳{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>৳{shippingFee}</span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <label className="mb-2 block text-sm font-black text-gray-900">
                  Voucher Code
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="min-w-0 flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-400"
                  />

                  <button
                    type="button"
                    className="rounded-2xl bg-yellow-400 px-4 text-sm font-black text-black"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4 text-lg font-black text-gray-950">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/order')}
              className="mt-6 w-full rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;



// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import {
//   fetchCart,
//   removeFromCart,
//   updateCartItem,
// } from '../features/cartSlice.js';
// import EmptyState from '../Components/UI/EmptyState';
// import CouponBox from '../Components/Checkout/CouponBox';
// import PaymentMethodSelector from '../Components/Checkout/PaymentMethodSelector';
// import usePageTitle from '../hooks/usePageTitle';

// const CartPage = () => {
//   const { cartItems, loading } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [couponResult, setCouponResult] = useState(null);
//   const [paymentInfo, setPaymentInfo] = useState({ method: 'cod' });

//   usePageTitle(
//     'Shopping Cart | Alucard Shop',
//     'Review your shopping cart, apply coupon and choose payment method.'
//   );

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const items = cartItems?.items || cartItems || [];

//   const updateQuantity = (id, type) => {
//     const item = items.find((cartItem) => cartItem._id === id);
//     if (!item) return;

//     const newQuantity =
//       type === 'increase'
//         ? (item.quantity || 1) + 1
//         : Math.max(1, (item.quantity || 1) - 1);

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
//     (sum, item) => sum + (item.price || 0) * (item.quantity || item.qty || 1),
//     0
//   );

//   const shippingFee = subtotal > 0 ? 80 : 0;
//   const discount = couponResult?.discount || 0;
//   const finalShipping =
//     couponResult?.shipping !== undefined ? couponResult.shipping : shippingFee;
//   const total =
//     couponResult?.total !== undefined
//       ? couponResult.total
//       : subtotal + shippingFee;

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

//         <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
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
//                       src={item.image || item.thumbnail}
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

//                       {item.selectedVariants && (
//                         <p className="mt-1 text-xs font-semibold text-gray-500">
//                           {Object.entries(item.selectedVariants)
//                             .map(([key, value]) => `${key}: ${value}`)
//                             .join(' | ')}
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
//                       {item.quantity || item.qty || 1}
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

//           <aside className="space-y-5">
//             <CouponBox
//               subtotal={subtotal}
//               shipping={shippingFee}
//               onApply={setCouponResult}
//             />

//             <PaymentMethodSelector onChange={setPaymentInfo} />

//             <div className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//               <h2 className="text-2xl font-black text-gray-950">
//                 Order Summary
//               </h2>

//               <div className="mt-6 space-y-4 text-sm font-bold text-gray-600">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({items.length} items)</span>
//                   <span>৳{subtotal}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span>Shipping Fee</span>
//                   <span>৳{finalShipping}</span>
//                 </div>

//                 {discount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-৳{discount}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between border-t border-gray-100 pt-4 text-lg font-black text-gray-950">
//                   <span>Total</span>
//                   <span>৳{total}</span>
//                 </div>

//                 <div className="rounded-2xl bg-yellow-50 p-4 text-xs font-bold text-gray-700">
//                   Selected payment: {paymentInfo?.method || 'cod'}
//                   {paymentInfo?.transactionId
//                     ? ` · TXN: ${paymentInfo.transactionId}`
//                     : ''}
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => navigate('/order')}
//                 className="mt-6 w-full rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CartPage;