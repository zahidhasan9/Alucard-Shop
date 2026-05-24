

// import { useEffect, useMemo, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import {
//   Banknote,
//   CheckCircle,
//   CreditCard,
//   PackageCheck,
//   ShieldCheck,
//   Smartphone,
//   Truck,
//   User,
// } from 'lucide-react';

// import { fetchCart } from '../features/cartSlice.js';
// import { getAllAddresses } from '../features/addressSlice.js';
// import { createOrder } from '../features/OrderSlice.js';
// import BackendCouponBox from '../Components/Checkout/BackendCouponBox';

// const divisions = [
//   'Dhaka',
//   'Chattogram',
//   'Rajshahi',
//   'Khulna',
//   'Barisal',
//   'Sylhet',
//   'Rangpur',
//   'Mymensingh',
// ];

// const OrderPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { cartItems } = useSelector((state) => state.cart);
//   const { addresses = [] } = useSelector((state) => state.addressReducer || {});
//   const { user } = useSelector((state) => state.user);

//   const [address, setAddress] = useState({
//     fullName: '',
//     phone: '',
//     division: '',
//     city: '',
//     postalCode: '',
//     street: '',
//     email: '',
//   });

//   const [shippingMethod, setShippingMethod] = useState('home');
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [transactionId, setTransactionId] = useState('');
//   const [couponData, setCouponData] = useState(null);
//   const [isTermsAccepted, setIsTermsAccepted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const items = Array.isArray(cartItems?.items)
//     ? cartItems.items
//     : Array.isArray(cartItems)
//       ? cartItems
//       : [];

//   useEffect(() => {
//     dispatch(fetchCart());
//     dispatch(getAllAddresses());
//   }, [dispatch]);

//   useEffect(() => {
//     const defaultAddress = addresses.find((addr) => addr.isDefault === true);

//     if (defaultAddress) {
//       setAddress({
//         fullName:
//           defaultAddress.fullName ||
//           `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
//         phone: defaultAddress.phone || user?.phone || '',
//         division: defaultAddress.division || '',
//         city: defaultAddress.city || '',
//         postalCode: defaultAddress.postalCode || '',
//         street:
//           defaultAddress.street ||
//           defaultAddress.address ||
//           defaultAddress.area ||
//           '',
//         email: user?.email || defaultAddress.email || '',
//       });
//     } else if (user) {
//       setAddress((prev) => ({
//         ...prev,
//         fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
//         phone: user?.phone || prev.phone,
//         email: user?.email || prev.email,
//       }));
//     }
//   }, [addresses, user]);

//   const shippingFee = useMemo(() => {
//     if (shippingMethod === 'pickup') return 0;
//     if (shippingMethod === 'express') return 300;
//     return 60;
//   }, [shippingMethod]);

//   const subtotal = useMemo(() => {
//     return items.reduce((sum, item) => {
//       const price = Number(item.price || 0);
//       const qty = Number(item.quantity || item.qty || 1);
//       return sum + price * qty;
//     }, 0);
//   }, [items]);

//   const couponCartItems = useMemo(() => {
//     return items.map((item) => ({
//       productId: item.productId || item.product || item._id,
//       _id: item.productId || item.product || item._id,
//       name: item.name || item.title,
//       qty: item.quantity || item.qty || 1,
//       quantity: item.quantity || item.qty || 1,
//       price: item.price || 0,
//       image: item.image || item.thumbnail,
//       slug: item.slug,
//       selectedVariants: item.selectedVariants || {},
//     }));
//   }, [items]);

//   const finalShippingPrice = couponData?.shippingPrice ?? shippingFee;
//   const discountPrice = couponData?.discountPrice || 0;
//   const totalPrice = couponData?.totalPrice ?? subtotal + shippingFee;

//   useEffect(() => {
//     setCouponData(null);
//   }, [shippingMethod, items.length]);

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;

//     setAddress((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateOrder = () => {
//     if (!items.length) {
//       toast.error('Your cart is empty');
//       return false;
//     }

//     if (!address.fullName.trim()) {
//       toast.error('Full name is required');
//       return false;
//     }

//     if (!address.phone.trim()) {
//       toast.error('Phone number is required');
//       return false;
//     }

//     if (!address.division.trim()) {
//       toast.error('Division is required');
//       return false;
//     }

//     if (!address.city.trim()) {
//       toast.error('City is required');
//       return false;
//     }

//     if (!address.street.trim()) {
//       toast.error('Street address is required');
//       return false;
//     }

//     if (paymentMethod === 'manual' && !transactionId.trim()) {
//       toast.error('Transaction ID is required for manual payment');
//       return false;
//     }

//     if (!isTermsAccepted) {
//       toast.error('Please accept terms and conditions');
//       return false;
//     }

//     return true;
//   };

//   const onSubmit = async () => {
//     if (!validateOrder()) return;

//     const orderData = {
//       cartItems: couponCartItems,

//       shippingAddress: {
//         fullName: address.fullName,
//         phone: address.phone,
//         email: address.email,
//         address: address.street,
//         city: address.city,
//         postalCode: address.postalCode,
//         division: address.division,
//       },

//       paymentMethod: {
//         method: paymentMethod,
//         status:
//           paymentMethod === 'cod'
//             ? 'pending'
//             : paymentMethod === 'manual'
//               ? 'submitted'
//               : 'pending',
//         transactionId: paymentMethod === 'manual' ? transactionId : null,
//         paidAt: null,
//       },

//       couponCode: couponData?.couponCode || null,

//       itemsPrice: subtotal,
//       taxPrice: 0,
//       shippingPrice: shippingFee,
//       discountPrice,
//       totalPrice,
//     };

//     try {
//       setSubmitting(true);

//       const result = await dispatch(createOrder(orderData));

//       if (result?.error) {
//         toast.error(result.error?.message || 'Order failed');
//         return;
//       }

//       toast.success('Order placed successfully');

//       setTimeout(() => {
//         navigate('/ordersucess');
//       }, 500);
//     } catch (error) {
//       toast.error('Something went wrong while placing order');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-8 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <section className="mb-7 rounded-3xl bg-yellow-400 p-6 text-black shadow-sm">
//           <p className="text-sm font-black uppercase tracking-[0.25em] text-black/65">
//             Secure Checkout
//           </p>

//           <h1 className="mt-2 text-3xl font-black">Complete Your Order</h1>

//           <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-black/70">
//             Confirm your delivery address, apply coupon, choose payment method
//             and place your order securely.
//           </p>
//         </section>

//         <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
//           <section className="space-y-6">
//             <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//               <div className="mb-5 flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//                   <User size={23} />
//                 </div>

//                 <div>
//                   <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//                     Customer
//                   </p>
//                   <h2 className="text-2xl font-black text-gray-950">
//                     Customer Information
//                   </h2>
//                 </div>
//               </div>

//               <div className="grid gap-4 md:grid-cols-2">
//                 <input
//                   name="fullName"
//                   value={address.fullName}
//                   onChange={handleAddressChange}
//                   placeholder="Full Name"
//                   className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
//                 />

//                 <input
//                   name="phone"
//                   value={address.phone}
//                   onChange={handleAddressChange}
//                   placeholder="Phone Number"
//                   className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
//                 />

//                 <input
//                   name="email"
//                   type="email"
//                   value={address.email}
//                   onChange={handleAddressChange}
//                   placeholder="Email Address"
//                   className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
//                 />

//                 <select
//                   name="division"
//                   value={address.division}
//                   onChange={handleAddressChange}
//                   className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
//                 >
//                   <option value="">Select Division</option>
//                   {divisions.map((division) => (
//                     <option key={division} value={division}>
//                       {division}
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   name="city"
//                   value={address.city}
//                   onChange={handleAddressChange}
//                   placeholder="City"
//                   className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
//                 />

//                 <input
//                   name="postalCode"
//                   value={address.postalCode}
//                   onChange={handleAddressChange}
//                   placeholder="Postal Code"
//                   className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
//                 />

//                 <textarea
//                   name="street"
//                   value={address.street}
//                   onChange={handleAddressChange}
//                   placeholder="Street Address"
//                   className="min-h-28 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400 md:col-span-2"
//                 />
//               </div>
//             </div>

//             <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//               <div className="mb-5 flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//                   <Truck size={23} />
//                 </div>

//                 <div>
//                   <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//                     Delivery
//                   </p>
//                   <h2 className="text-2xl font-black text-gray-950">
//                     Delivery Method
//                   </h2>
//                 </div>
//               </div>

//               <div className="grid gap-3 md:grid-cols-3">
//                 {[
//                   {
//                     value: 'home',
//                     title: 'Home Delivery',
//                     price: 60,
//                     text: '2-5 working days',
//                   },
//                   {
//                     value: 'pickup',
//                     title: 'Store Pickup',
//                     price: 0,
//                     text: 'Pick from store',
//                   },
//                   {
//                     value: 'express',
//                     title: 'Express Delivery',
//                     price: 300,
//                     text: 'Fast delivery',
//                   },
//                 ].map((item) => (
//                   <button
//                     key={item.value}
//                     type="button"
//                     onClick={() => setShippingMethod(item.value)}
//                     className={`rounded-3xl border p-4 text-left transition ${
//                       shippingMethod === item.value
//                         ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
//                         : 'border-gray-200 bg-white hover:border-yellow-300'
//                     }`}
//                   >
//                     <p className="font-black text-gray-950">{item.title}</p>
//                     <p className="mt-1 text-xs font-semibold text-gray-500">
//                       {item.text}
//                     </p>
//                     <p className="mt-3 text-lg font-black text-green-600">
//                       ৳{item.price}
//                     </p>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//               <div className="mb-5 flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//                   <CreditCard size={23} />
//                 </div>

//                 <div>
//                   <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//                     Payment
//                   </p>
//                   <h2 className="text-2xl font-black text-gray-950">
//                     Payment Method
//                   </h2>
//                 </div>
//               </div>

//               <div className="grid gap-3">
//                 {[
//                   {
//                     value: 'cod',
//                     title: 'Cash on Delivery',
//                     text: 'Pay when product arrives',
//                     icon: Banknote,
//                     active: true,
//                   },
//                   {
//                     value: 'manual',
//                     title: 'Manual bKash/Nagad',
//                     text: 'Enter transaction ID after payment',
//                     icon: Smartphone,
//                     active: true,
//                   },
//                   {
//                     value: 'online',
//                     title: 'Online Gateway',
//                     text: 'Merchant account required',
//                     icon: CreditCard,
//                     active: false,
//                   },
//                 ].map((item) => {
//                   const Icon = item.icon;

//                   return (
//                     <button
//                       key={item.value}
//                       type="button"
//                       disabled={!item.active}
//                       onClick={() => setPaymentMethod(item.value)}
//                       className={`flex items-center gap-4 rounded-3xl border p-4 text-left transition ${
//                         paymentMethod === item.value
//                           ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
//                           : 'border-gray-200 bg-white hover:border-yellow-300'
//                       } ${!item.active ? 'cursor-not-allowed opacity-60' : ''}`}
//                     >
//                       <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//                         <Icon size={23} />
//                       </div>

//                       <div className="flex-1">
//                         <p className="font-black text-gray-950">
//                           {item.title}
//                         </p>
//                         <p className="mt-1 text-xs font-semibold text-gray-500">
//                           {item.text}
//                         </p>
//                       </div>

//                       <span
//                         className={`h-4 w-4 rounded-full border ${
//                           paymentMethod === item.value
//                             ? 'border-black bg-black'
//                             : 'border-gray-300'
//                         }`}
//                       />
//                     </button>
//                   );
//                 })}
//               </div>

//               {paymentMethod === 'manual' && (
//                 <div className="mt-5 rounded-3xl bg-gray-50 p-4">
//                   <p className="font-black text-gray-950">
//                     Manual Payment Instruction
//                   </p>

//                   <p className="mt-2 text-sm leading-6 text-gray-600">
//                     Send payment to your business bKash/Nagad number and enter
//                     the transaction ID below.
//                   </p>

//                   <input
//                     value={transactionId}
//                     onChange={(e) => setTransactionId(e.target.value)}
//                     placeholder="Transaction ID"
//                     className="mt-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
//                   />
//                 </div>
//               )}
//             </div>
//           </section>

//           <aside className="h-fit space-y-5 lg:sticky lg:top-32">
//             <BackendCouponBox
//               cartItems={couponCartItems}
//               shippingPrice={shippingFee}
//               onCouponApplied={setCouponData}
//             />

//             <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//               <h2 className="flex items-center gap-2 text-2xl font-black text-gray-950">
//                 <PackageCheck size={24} />
//                 Order Overview
//               </h2>

//               <div className="mt-5 max-h-80 space-y-4 overflow-auto pr-1">
//                 {items.length ? (
//                   items.map((item, index) => (
//                     <div
//                       key={item._id || index}
//                       className="flex gap-3 rounded-2xl bg-gray-50 p-3"
//                     >
//                       <img
//                         src={item.image || item.thumbnail}
//                         alt={item.name || item.title || 'Product'}
//                         loading="lazy"
//                         decoding="async"
//                         className="h-16 w-16 rounded-2xl object-cover"
//                       />

//                       <div className="min-w-0 flex-1">
//                         <p className="line-clamp-2 text-sm font-black text-gray-950">
//                           {item.name || item.title}
//                         </p>

//                         <p className="mt-1 text-xs font-semibold text-gray-500">
//                           ৳{item.price || 0} × {item.quantity || item.qty || 1}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="rounded-2xl bg-gray-50 p-4 text-center text-sm font-bold text-gray-500">
//                     Your cart is empty.
//                   </div>
//                 )}
//               </div>

//               <div className="mt-6 space-y-3 text-sm font-bold text-gray-600">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>৳{subtotal}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>৳{finalShippingPrice}</span>
//                 </div>

//                 {discountPrice > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-৳{discountPrice}</span>
//                   </div>
//                 )}

//                 {couponData?.couponCode && (
//                   <div className="flex justify-between text-yellow-700">
//                     <span>Coupon</span>
//                     <span>{couponData.couponCode}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between border-t border-gray-100 pt-4 text-xl font-black text-gray-950">
//                   <span>Total</span>
//                   <span>৳{totalPrice}</span>
//                 </div>
//               </div>

//               <div className="mt-5 rounded-2xl bg-yellow-50 p-4">
//                 <div className="flex gap-2">
//                   <ShieldCheck
//                     size={18}
//                     className="mt-0.5 shrink-0 text-yellow-700"
//                   />

//                   <p className="text-xs font-bold leading-5 text-gray-700">
//                     Coupon and total price will be verified again by backend
//                     before order is saved.
//                   </p>
//                 </div>
//               </div>

//               <label className="mt-5 flex items-start gap-3 text-sm font-bold text-gray-700">
//                 <input
//                   type="checkbox"
//                   checked={isTermsAccepted}
//                   onChange={(e) => setIsTermsAccepted(e.target.checked)}
//                   className="mt-1 accent-yellow-500"
//                 />

//                 <span>
//                   I agree to the{' '}
//                   <Link
//                     to="/privacy-policy"
//                     className="text-yellow-700 underline"
//                   >
//                     Privacy Policy
//                   </Link>{' '}
//                   and{' '}
//                   <Link
//                     to="/return-policy"
//                     className="text-yellow-700 underline"
//                   >
//                     Return Policy
//                   </Link>
//                   .
//                 </span>
//               </label>

//               <button
//                 type="button"
//                 onClick={onSubmit}
//                 disabled={!isTermsAccepted || submitting || !items.length}
//                 className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {submitting ? 'Placing Order...' : 'Confirm Order'}
//                 <CheckCircle size={18} />
//               </button>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default OrderPage;



import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Home,
  MapPin,
  Package,
  ShieldCheck,
  Smartphone,
  Tag,
  Truck,
  User,
} from 'lucide-react';

import { fetchCart } from '../features/cartSlice';
import { getAllAddresses } from '../features/addressSlice';
import { createOrder } from '../features/OrderSlice';
import usePageTitle from '../hooks/usePageTitle';
import * as API from '../features/API';

const defaultAddress = {
  fullName: '',
  phone: '',
  email: '',
  division: '',
  city: '',
  postalCode: '',
  street: '',
};

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { addresses = [] } = useSelector((state) => state.addressReducer);
  const { user } = useSelector((state) => state.user);

  const [shippingMethod, setShippingMethod] = useState('home');
  const [paymentType, setPaymentType] = useState('cod');
  const [address, setAddress] = useState(defaultAddress);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');

  const [manualPayment, setManualPayment] = useState({
    provider: '',
    senderNumber: '',
    transactionId: '',
  });

  usePageTitle(
    'Checkout | Alucard Shop',
    'Confirm shipping, payment and place your order.'
  );

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(getAllAddresses());
  }, [dispatch]);

  useEffect(() => {
    const savedAddress = addresses.find((addr) => addr.isDefault) || addresses[0];

    if (savedAddress) {
      setAddress({
        fullName:
          savedAddress.fullName ||
          `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        phone: savedAddress.phone || '',
        email: user?.email || '',
        division: savedAddress.division || '',
        city: savedAddress.city || '',
        postalCode: savedAddress.postalCode || '',
        street: savedAddress.street || savedAddress.address || '',
      });
    } else {
      setAddress((prev) => ({
        ...prev,
        fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        email: user?.email || '',
      }));
    }
  }, [addresses, user]);

  useEffect(() => {
    if (['bkash', 'nagad', 'rocket'].includes(paymentType)) {
      setManualPayment((prev) => ({
        ...prev,
        provider: paymentType,
      }));
    } else {
      setManualPayment({
        provider: '',
        senderNumber: '',
        transactionId: '',
      });
    }
  }, [paymentType]);

  const items = cartItems?.items || [];

  const itemsPrice = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [items]
  );

  const originalShippingPrice =
    shippingMethod === 'pickup' ? 0 : shippingMethod === 'express' ? 300 : 60;

  const discountPrice = Number(couponData?.discountPrice || 0);
  const shippingDiscount = Number(couponData?.shippingDiscount || 0);
  const shippingPrice = Math.max(0, originalShippingPrice - shippingDiscount);
  const taxPrice = 0;
  const totalPrice = Math.max(0, itemsPrice + taxPrice + shippingPrice - discountPrice);

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage('Enter a coupon code first.');
      return;
    }

    try {
      setCouponLoading(true);
      setCouponMessage('');

      const res = await API.applyCoupon({
        couponCode: couponCode.trim(),
        cartItems: items.map((item) => ({
          productId: item.productId || item.product || item._id,
          _id: item.productId || item.product || item._id,
          slug: item.slug || item.product?.slug,
          name: item.name || item.title,
          quantity: item.quantity || 1,
          qty: item.quantity || 1,
          price: item.price,
          image: item.image,
        })),
        shippingPrice: originalShippingPrice,
      });

      const data = res.data || {};

      setCouponData({
        code: data.coupon?.code || couponCode.trim().toUpperCase(),
        type: data.coupon?.type,
        value: data.coupon?.value,
        discountPrice: Number(data.discountPrice || 0),
        shippingDiscount: Number(data.shippingDiscount || 0),
      });

      setCouponMessage(data.message || 'Coupon applied successfully.');
    } catch (error) {
      setCouponData(null);
      setCouponMessage(
        error.response?.data?.message || 'Invalid or expired coupon.'
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponData(null);
    setCouponMessage('');
  };

  const validateOrder = () => {
    if (!items.length) {
      alert('Your cart is empty.');
      return false;
    }

    if (!address.fullName || !address.phone || !address.street || !address.city || !address.postalCode || !address.division) {
      alert('Please fill all shipping address fields.');
      return false;
    }

    if (['bkash', 'nagad', 'rocket'].includes(paymentType)) {
      if (!manualPayment.senderNumber || !manualPayment.transactionId) {
        alert('Please enter payment number and transaction ID.');
        return false;
      }
    }

    if (!isTermsAccepted) {
      alert('Please accept terms and conditions.');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateOrder()) return;

    const isManual = ['bkash', 'nagad', 'rocket'].includes(paymentType);

    const orderData = {
      cartItems: items.map((item) => ({
        product: item.productId || item.product || item._id,
        name: item.name || item.title,
        qty: item.quantity || 1,
        price: Number(item.price || 0),
        image: item.image || item.images?.[0]?.url || '/placeholder.png',
        slug: item.slug || item.product?.slug || String(item._id),
        selectedVariants: item.selectedVariants || {},
      })),

      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        email: address.email || user?.email,
        address: address.street,
        city: address.city,
        postalCode: address.postalCode,
        division: address.division,
      },

      paymentMethod: {
        method: isManual ? 'manual' : 'cod',
        status: isManual ? 'submitted' : 'pending',
        transactionId: isManual ? manualPayment.transactionId : '',
        paidAt: null,
      },

      manualPayment: isManual
        ? {
            provider: manualPayment.provider,
            senderNumber: manualPayment.senderNumber,
            transactionId: manualPayment.transactionId,
            amount: totalPrice,
          }
        : undefined,

      coupon: couponData
        ? {
            code: couponData.code,
            type: couponData.type,
            value: couponData.value,
            discountPrice,
            shippingDiscount,
          }
        : undefined,

      itemsPrice,
      taxPrice,
      shippingPrice,
      originalShippingPrice,
      discountPrice,
      totalPrice,
    };

    const result = await dispatch(createOrder(orderData));

    if (!result.error) {
      navigate('/ordersucess');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 font-Work_sans">
      <div className="container mx-auto max-w-6xl">
        <Link
          to="/cart"
          className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-yellow-700"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        <div className="mb-5 rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-700">
            Secure Checkout
          </p>
          <h1 className="mt-1 text-2xl font-black text-gray-950">
            Place Your Order
          </h1>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <section className="space-y-5">
            <CheckoutCard title="Shipping Information" icon={<User size={19} />}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="Full Name" name="fullName" value={address.fullName} onChange={handleAddressChange} />
                <Input label="Phone" name="phone" value={address.phone} onChange={handleAddressChange} />
                <Input label="Email" name="email" value={address.email} onChange={handleAddressChange} />
                <Input label="City" name="city" value={address.city} onChange={handleAddressChange} />
                <Input label="Postal Code" name="postalCode" value={address.postalCode} onChange={handleAddressChange} />

                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-800">
                    Division
                  </label>
                  <select
                    name="division"
                    value={address.division}
                    onChange={handleAddressChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                  >
                    <option value="">Select Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-sm font-bold text-gray-800">
                  Street Address
                </label>
                <textarea
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  rows="3"
                  placeholder="House, road, area"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                />
              </div>
            </CheckoutCard>

            <CheckoutCard title="Delivery Method" icon={<Truck size={19} />}>
              <div className="grid gap-3 sm:grid-cols-3">
                <Option
                  value="home"
                  checked={shippingMethod === 'home'}
                  onChange={setShippingMethod}
                  title="Home Delivery"
                  desc="৳60"
                  icon={<Home size={20} />}
                />
                <Option
                  value="pickup"
                  checked={shippingMethod === 'pickup'}
                  onChange={setShippingMethod}
                  title="Store Pickup"
                  desc="Free"
                  icon={<MapPin size={20} />}
                />
                <Option
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={setShippingMethod}
                  title="Express"
                  desc="৳300"
                  icon={<Truck size={20} />}
                />
              </div>
            </CheckoutCard>

            <CheckoutCard title="Payment Method" icon={<CreditCard size={19} />}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Option
                  value="cod"
                  checked={paymentType === 'cod'}
                  onChange={setPaymentType}
                  title="Cash"
                  desc="On delivery"
                  icon={<CreditCard size={20} />}
                />
                <Option
                  value="bkash"
                  checked={paymentType === 'bkash'}
                  onChange={setPaymentType}
                  title="bKash"
                  desc="Manual"
                  icon={<Smartphone size={20} />}
                />
                <Option
                  value="nagad"
                  checked={paymentType === 'nagad'}
                  onChange={setPaymentType}
                  title="Nagad"
                  desc="Manual"
                  icon={<Smartphone size={20} />}
                />
                <Option
                  value="rocket"
                  checked={paymentType === 'rocket'}
                  onChange={setPaymentType}
                  title="Rocket"
                  desc="Manual"
                  icon={<Smartphone size={20} />}
                />
              </div>

              {['bkash', 'nagad', 'rocket'].includes(paymentType) && (
                <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm font-bold text-gray-950">
                    Send payment to merchant number:
                  </p>
                  <p className="mt-1 text-xl font-black text-yellow-700">
                    01728817812
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Input
                      label="Sender Phone Number"
                      name="senderNumber"
                      value={manualPayment.senderNumber}
                      onChange={(e) =>
                        setManualPayment((prev) => ({
                          ...prev,
                          senderNumber: e.target.value,
                        }))
                      }
                    />

                    <Input
                      label="Transaction ID"
                      name="transactionId"
                      value={manualPayment.transactionId}
                      onChange={(e) =>
                        setManualPayment((prev) => ({
                          ...prev,
                          transactionId: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </CheckoutCard>

            <CheckoutCard title="Order Items" icon={<Package size={19} />}>
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3 py-3">
                    <img
                      src={item.image || item.images?.[0]?.url || '/placeholder.png'}
                      alt={item.name || item.title}
                      className="h-16 w-16 rounded-lg bg-gray-100 object-contain p-1"
                    />
                    <div className="flex-1">
                      <h3 className="line-clamp-1 text-sm font-bold text-gray-950">
                        {item.name || item.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-black text-gray-950">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </CheckoutCard>
          </section>

          <aside className="h-max rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-black text-gray-950">Order Summary</h2>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-bold text-gray-800">
                Coupon Code
              </label>
              <div className="flex overflow-hidden rounded-full border border-gray-300 bg-gray-50">
                <div className="grid w-11 place-items-center text-gray-400">
                  <Tag size={17} />
                </div>
                <input
                  value={couponCode}
                  disabled={!!couponData}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon"
                  className="w-full bg-transparent px-1 py-2.5 text-sm outline-none disabled:text-gray-400"
                />
                {couponData ? (
                  <button
                    onClick={removeCoupon}
                    className="bg-red-600 px-5 text-sm font-bold text-white"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={applyCoupon}
                    disabled={couponLoading}
                    className="bg-gray-950 px-5 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-950 disabled:opacity-60"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                )}
              </div>
              {couponMessage && (
                <p className="mt-2 text-xs font-semibold text-gray-600">
                  {couponMessage}
                </p>
              )}
            </div>

            <div className="mt-4 space-y-3 border-b border-gray-200 pb-4">
              <Summary label="Items" value={formatPrice(itemsPrice)} />
              <Summary
                label="Shipping"
                value={
                  shippingDiscount > 0
                    ? `${formatPrice(shippingPrice)}`
                    : formatPrice(shippingPrice)
                }
              />
              <Summary label="Discount" value={`- ${formatPrice(discountPrice)}`} />
              {shippingDiscount > 0 && (
                <Summary
                  label="Shipping Discount"
                  value={`- ${formatPrice(shippingDiscount)}`}
                />
              )}
              <Summary label="Tax" value={formatPrice(taxPrice)} />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-yellow-50 p-4">
              <span className="font-black text-gray-950">Total</span>
              <span className="text-xl font-black text-gray-950">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="mt-1 accent-yellow-500"
              />
              <span>I agree to the Terms and Privacy Policy.</span>
            </label>

            <button
              onClick={handlePlaceOrder}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-gray-950 hover:bg-yellow-500"
            >
              <CheckCircle size={18} />
              Confirm Order
            </button>

            <div className="mt-4 flex gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
              <ShieldCheck size={18} />
              Secure and protected checkout.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

const CheckoutCard = ({ title, icon, children }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-yellow-100 text-yellow-700">
        {icon}
      </span>
      <h2 className="font-black text-gray-950">{title}</h2>
    </div>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-bold text-gray-800">{label}</label>
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
    />
  </div>
);

const Option = ({ value, checked, onChange, title, desc, icon }) => (
  <label
    className={`cursor-pointer rounded-xl border p-4 transition ${
      checked
        ? 'border-yellow-400 bg-yellow-50'
        : 'border-gray-200 bg-white hover:border-yellow-300'
    }`}
  >
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={(e) => onChange(e.target.value)}
      className="hidden"
    />
    <div className="text-yellow-700">{icon}</div>
    <h3 className="mt-2 text-sm font-black text-gray-950">{title}</h3>
    <p className="text-xs text-gray-500">{desc}</p>
  </label>
);

const Summary = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);

export default OrderPage;