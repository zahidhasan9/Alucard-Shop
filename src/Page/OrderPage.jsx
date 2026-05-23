// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCart } from '../features/cartSlice.js';
// import { getAllAddresses } from '../features/addressSlice.js';
// import { createOrder } from '../features/OrderSlice.js';
// import { User } from 'lucide-react';

// const OrderPage = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   console.log(cartItems);
//   const { addresses } = useSelector((state) => state.addressReducer);
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   console.log(cartItems);
//   const [address, setAddress] = useState({
//     fullName: '',
//     phone: '',
//     division: '',
//     city: '',
//     postalCode: '',
//     street: '',
//     email: ''
//   });

//   useEffect(() => {
//     dispatch(fetchCart());
//     dispatch(getAllAddresses());
//   }, [dispatch]);
//   useEffect(() => {
//     const defaultAddress = addresses.find((addr) => addr.isDefault === true);
//     if (defaultAddress) {
//       setAddress({
//         fullName: defaultAddress.fullName || '',
//         phone: defaultAddress.phone || '',
//         division: defaultAddress.division || '',
//         city: defaultAddress.city || '',
//         postalCode: defaultAddress.postalCode || '',
//         street: defaultAddress.street || '',
//         email: user.email || ''
//       });
//     }
//   }, [addresses]);

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   //shippingMethod
//   const [shippingMethod, setShippingMethod] = useState('home'); // default 'home'
//   const getShippingFee = () => {
//     switch (shippingMethod) {
//       case 'home':
//         return 60;
//       case 'pickup':
//         return 0;
//       case 'express':
//         return 300;
//       default:
//         return 160;
//     }
//   };

//   const shippingFee = getShippingFee();
//   const subtotal = cartItems?.items?.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0) || 0;
//   // const shippingFee = 160;
//   const total = subtotal + shippingFee;

//   // -------------order---------

//   const [paymentMethod, setPaymentMethod] = useState('cod'); // default

//   const onSubmit = async () => {
//     if (!isTermsAccepted) {
//       alert('Please accept the terms and conditions.');
//       return;
//     }

//     const orderData = {
//       cartItems: cartItems?.items?.map((item) => ({
//         _id: item._id,
//         name: item.name,
//         qty: item.quantity,
//         price: item.price,
//         image: item.image,
//         slug: item.slug
//       })),
//       shippingAddress: {
//         address: address.street,
//         city: address.city,
//         postalCode: address.postalCode,
//         division: address.division // You can map division as country or rename key
//       },
//       paymentMethod: {
//         method: paymentMethod,
//         status: 'pending',
//         paidAt: null
//       },
//       itemsPrice: subtotal,
//       taxPrice: 0,
//       shippingPrice: shippingFee,
//       totalPrice: total
//     };
//     dispatch(createOrder(orderData));
//     setTimeout(() => {
//       navigate('/ordersucess');
//     }, 500);
//   };

//   // ---------------------------

//   // term and condition
//   const navigate = useNavigate();
//   const [isTermsAccepted, setIsTermsAccepted] = useState(false);

//   return (
//     <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 font-Work_sans min-h-screen px-4 py-12">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-12 text-black tracking-wider uppercase">Checkout</h1>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left: Customer Info */}

//           <div className="w-full lg:w-2/3 bg-white p-8 rounded-2xl shadow-md space-y-6 border border-yellow-300">
//             <h2 className="text-2xl font-semibold text-yellow-700"> Customer Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <input
//                 className="w-full  md:col-span-2 px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 placeholder="First Name"
//                 value={address.fullName}
//                 name="fullName"
//                 onChange={handleAddressChange}
//               />
//               <input
//                 className="w-full md:col-span-2 px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 placeholder="Address"
//                 name="street"
//                 value={address.street || ''}
//                 onChange={handleAddressChange}
//               />
//               <input
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 placeholder="Mobile"
//                 value={address.phone}
//                 onChange={handleAddressChange}
//               />
//               <input
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 type="email"
//                 placeholder="Email"
//                 onChange={handleAddressChange}
//                 value={address.email}
//                 name="email"
//               />
//               <input
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 placeholder="City"
//                 name="city"
//                 onChange={handleAddressChange}
//                 value={address.city}
//               />
//               <select
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 value={address.division}
//                 name="division"
//                 onChange={handleAddressChange}
//               >
//                 <option value="">Select Division</option>
//                 <option value="Dhaka">Dhaka</option>
//                 <option value="Chattogram">Chattogram</option>
//                 <option value="Rajshahi">Rajshahi</option>
//                 <option value="Khulna">Khulna</option>
//                 <option value="Barisal">Barisal</option>
//                 <option value="Sylhet">Sylhet</option>
//                 <option value="Rangpur">Rangpur</option>
//                 <option value="Mymensingh">Mymensingh</option>
//               </select>
//               <textarea
//                 className="w-full md:col-span-2 px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 placeholder="Comment"
//                 rows="3"
//               />
//             </div>
//           </div>

//           {/* Right: Payment & Delivery */}
//           <div className="w-full lg:w-1/3 flex flex-col gap-6">
//             <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-yellow-500 space-y-4">
//               <h2 className="text-xl font-semibold text-yellow-700"> Payment Method</h2>
//               <div className="space-y-2 text-gray-800">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={paymentMethod === 'cod'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="accent-yellow-500"
//                   />
//                   Cash on Delivery
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="online"
//                     checked={paymentMethod === 'online'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="accent-yellow-500"
//                   />
//                   Online Payment
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="pos"
//                     checked={paymentMethod === 'pos'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="accent-yellow-500"
//                   />
//                   POS on Delivery
//                 </label>
//               </div>
//               <div className="pt-3">
//                 <p className="text-sm font-medium text-gray-600">We Accept:</p>
//                 <img src="https://i.imgur.com/KHRaXIQ.png" alt="Payment" className="h-7 mt-2" />
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-yellow-700 space-y-4">
//               <h2 className="text-xl font-semibold text-yellow-800"> Delivery Method</h2>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="delivery"
//                   value="home"
//                   checked={shippingMethod === 'home'}
//                   onChange={(e) => setShippingMethod(e.target.value)}
//                   className="accent-yellow-600"
//                 />
//                 Home Delivery - 60৳
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="delivery"
//                   value="pickup"
//                   checked={shippingMethod === 'pickup'}
//                   onChange={(e) => setShippingMethod(e.target.value)}
//                   className="accent-yellow-600"
//                 />
//                 Store Pickup - 0৳
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="delivery"
//                   value="express"
//                   checked={shippingMethod === 'express'}
//                   onChange={(e) => setShippingMethod(e.target.value)}
//                   className="accent-yellow-600"
//                 />
//                 Express Delivery - 300৳
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Coupons and Star Points */}
//         <div className="grid md:grid-cols-2 gap-6 mt-10">
//           <div className="bg-white p-6 rounded-2xl shadow border border-yellow-300 space-y-4">
//             <div className="flex gap-2">
//               <input
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 placeholder="Gift Voucher"
//               />
//               <button className="bg-black text-white px-5 rounded-md hover:bg-gray-900 transition">Apply</button>
//             </div>
//             <div className="flex gap-2">
//               <input
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 placeholder="Promo / Coupon Code"
//               />
//               <button className="bg-black text-white px-5 rounded-md hover:bg-gray-900 transition">Apply</button>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow border border-yellow-300 space-y-4">
//             <p className="font-semibold text-gray-900 mb-2">Use Star Points</p>
//             <div className="flex gap-2">
//               <input
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 placeholder="Points to use (Max 25)"
//               />
//               <button className="bg-black text-white px-5 rounded-md hover:bg-gray-900 transition">Apply</button>
//             </div>
//           </div>
//         </div>

//         {/* Order Overview */}
//         <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-yellow-600 mt-10">
//           <h2 className=" text-md md:text-xl  font-semibold text-yellow-800 mb-4"> Order Overview</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-left">
//               <thead className="text-sm md:text-base bg-yellow-100 text-yellow-900">
//                 <tr>
//                   <th className="px-4 py-2">Product</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Total</th>
//                 </tr>
//               </thead>
//               <tbody className="text-yellow-900 text-xs md:text-sm">
//                 {cartItems?.items?.length > 0 ? (
//                   cartItems?.items?.map((item, idx) => (
//                     <tr key={idx} className="border-b border-yellow-300">
//                       <td className="px-4 py-3 flex items-center gap-2">
//                         {item.image && (
//                           <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
//                         )}
//                         {item.name}
//                       </td>
//                       {/* <td className="px-4 py-2">{item.name}</td> */}
//                       <td className="px-4 py-2">
//                         {item.price}৳ × {item.quantity}
//                       </td>
//                       <td className="px-4 py-2">{item.price * item.quantity}৳</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="py-6 text-center text-gray-500">
//                       Your cart is empty.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//             {/* total */}
//             <div className="mt-4 text-yellow-900 font-semibold text-sm max-w-md ml-auto">
//               <div className="flex justify-between py-1">
//                 <span>Subtotal:</span>
//                 <span>{subtotal}৳</span>
//               </div>
//               <div className="flex justify-between py-1">
//                 <span>Shipping:</span>
//                 <span>{shippingFee}৳</span>
//               </div>
//               <div className="flex justify-between py-2 border-t border-yellow-400 font-bold text-black text-xl">
//                 <span>Total:</span>
//                 <span>{total}৳</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Terms and Confirm Order */}
//         <div className="bg-white p-6 rounded-2xl shadow border border-yellow-300 mt-10 space-y-4">
//           <label className="flex items-start gap-3 text-gray-900 text-sm">
//             <input
//               type="checkbox"
//               className="mt-1 accent-yellow-500"
//               checked={isTermsAccepted}
//               onChange={(e) => setIsTermsAccepted(e.target.checked)}
//               required
//             />
//             <span>
//               I agree to the
//               <a href="/terms" className="text-yellow-600 underline mx-1">
//                 Terms
//               </a>
//               ,
//               <a href="/privacy" className="text-yellow-600 underline mx-1">
//                 Privacy
//               </a>{' '}
//               and
//               <a href="/refund" className="text-yellow-600 underline mx-1">
//                 Refund Policy
//               </a>
//               .
//             </span>
//           </label>
//           <button
//             onClick={onSubmit}
//             disabled={!isTermsAccepted}
//             className={`w-40 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition
//               ${!isTermsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             Confirm Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;

// // import { useState, useEffect, useMemo } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useForm } from 'react-hook-form';
// // import { fetchCart } from '../features/cartSlice.js';
// // import { getAllAddresses } from '../features/addressSlice.js';
// // import { User, Truck, CreditCard, MapPin } from 'lucide-react';

// // const CustomerInfo = ({ address, handleAddressChange, register, errors }) => (
// //   <form className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-md border border-gray-200">
// //     <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
// //       <User size={24} /> Customer Information
// //     </h2>
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //       <div>
// //         <input
// //           {...register('fullName', { required: 'Full Name is required' })}
// //           className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
// //             errors.fullName ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
// //           }`}
// //           placeholder="Full Name"
// //           name="fullName"
// //           value={address.fullName}
// //           onChange={handleAddressChange}
// //           aria-label="Full Name"
// //         />
// //         {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
// //       </div>
// //       <div>
// //         <input
// //           {...register('phone', {
// //             required: 'Phone number is required',
// //             pattern: { value: /^\+8801[0-9]{8}$/, message: 'Invalid phone number (e.g., +8801XXXXXXXXX)' }
// //           })}
// //           className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
// //             errors.phone ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
// //           }`}
// //           placeholder="+8801XXXXXXXXX"
// //           name="phone"
// //           value={address.phone}
// //           onChange={handleAddressChange}
// //           aria-label="Phone Number"
// //         />
// //         {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
// //       </div>
// //       <div>
// //         <input
// //           {...register('street', { required: 'Street address is required' })}
// //           className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
// //             errors.street ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
// //           }`}
// //           placeholder="Street Address"
// //           name="street"
// //           value={address.street}
// //           onChange={handleAddressChange}
// //           aria-label="Street Address"
// //         />
// //         {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
// //       </div>
// //       <div>
// //         <input
// //           {...register('city', { required: 'City is required' })}
// //           className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
// //             errors.city ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
// //           }`}
// //           placeholder="City"
// //           name="city"
// //           value={address.city}
// //           onChange={handleAddressChange}
// //           aria-label="City"
// //         />
// //         {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
// //       </div>
// //       <div>
// //         <select
// //           {...register('division', { required: 'Division is required' })}
// //           className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
// //             errors.division ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
// //           }`}
// //           name="division"
// //           value={address.division}
// //           onChange={handleAddressChange}
// //           aria-label="Division"
// //         >
// //           <option value="">Select Division</option>
// //           {['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'].map((div) => (
// //             <option key={div} value={div}>
// //               {div}
// //             </option>
// //           ))}
// //         </select>
// //         {errors.division && <p className="text-red-500 text-sm mt-1">{errors.division.message}</p>}
// //       </div>
// //       <div>
// //         <input
// //           {...register('postalCode', { required: 'Postal Code is required' })}
// //           className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
// //             errors.postalCode ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
// //           }`}
// //           placeholder="Postal Code"
// //           name="postalCode"
// //           value={address.postalCode}
// //           onChange={handleAddressChange}
// //           aria-label="Postal Code"
// //         />
// //         {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
// //       </div>
// //       <div className="md:col-span-2">
// //         <input
// //           {...register('email', {
// //             required: 'Email is required',
// //             pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' }
// //           })}
// //           className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
// //             errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
// //           }`}
// //           placeholder="Email Address"
// //           type="email"
// //           name="email"
// //           value={address.email}
// //           onChange={handleAddressChange}
// //           aria-label="Email Address"
// //         />
// //         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
// //       </div>
// //       <div className="md:col-span-2">
// //         <textarea
// //           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           placeholder="Additional Comments (Optional)"
// //           rows="3"
// //           aria-label="Additional Comments"
// //         />
// //       </div>
// //     </div>
// //   </form>
// // );

// // const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => (
// //   <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 space-y-4">
// //     <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
// //       <CreditCard size={20} /> Payment Method
// //     </h2>
// //     <div className="space-y-3 text-gray-800">
// //       {[
// //         { value: 'cash', label: 'Cash on Delivery' },
// //         { value: 'online', label: 'Online Payment' },
// //         { value: 'pos', label: 'POS on Delivery' }
// //       ].map((option) => (
// //         <label key={option.value} className="flex items-center gap-2 cursor-pointer">
// //           <input
// //             type="radio"
// //             name="payment"
// //             value={option.value}
// //             checked={paymentMethod === option.value}
// //             onChange={(e) => setPaymentMethod(e.target.value)}
// //             className="accent-blue-500"
// //             aria-checked={paymentMethod === option.value}
// //           />
// //           {option.label}
// //         </label>
// //       ))}
// //     </div>
// //     <div className="pt-3">
// //       <p className="text-sm font-medium text-gray-600">We Accept:</p>
// //       <img src="https://i.imgur.com/KHRaXIQ.png" alt="Accepted payment methods" className="h-8 mt-2" />
// //     </div>
// //   </div>
// // );

// // const DeliveryMethod = ({ deliveryMethod, setDeliveryMethod, setShippingFee }) => {
// //   const deliveryOptions = [
// //     { value: 'home', label: 'Home Delivery', cost: 60 },
// //     { value: 'pickup', label: 'Store Pickup', cost: 0 },
// //     { value: 'express', label: 'Express Delivery', cost: 300 }
// //   ];

// //   const handleDeliveryChange = (e) => {
// //     const selected = deliveryOptions.find((opt) => opt.value === e.target.value);
// //     setDeliveryMethod(e.target.value);
// //     setShippingFee(selected.cost);
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 space-y-4">
// //       <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
// //         <Truck size={20} /> Delivery Method
// //       </h2>
// //       <div className="space-y-3 text-gray-800">
// //         {deliveryOptions.map((option) => (
// //           <label key={option.value} className="flex items-center gap-2 cursor-pointer">
// //             <input
// //               type="radio"
// //               name="delivery"
// //               value={option.value}
// //               checked={deliveryMethod === option.value}
// //               onChange={handleDeliveryChange}
// //               className="accent-blue-500"
// //               aria-checked={deliveryMethod === option.value}
// //             />
// //             {option.label} - {option.cost}৳
// //           </label>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const OrderOverview = ({ cartItems, shippingFee }) => {
// //   const subtotal = useMemo(() => {
// //     return cartItems?.items?.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0) || 0;
// //   }, [cartItems]);

// //   const total = subtotal + shippingFee;

// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 mt-10">
// //       <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Overview</h2>
// //       <div className="overflow-x-auto">
// //         <table className="w-full border-collapse text-left">
// //           <thead className="bg-gray-100 text-gray-800">
// //             <tr>
// //               <th className="px-4 py-3">Product</th>
// //               <th className="px-4 py-3 text-right">Price</th>
// //               <th className="px-4 py-3 text-right">Total</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {cartItems?.items?.length > 0 ? (
// //               cartItems.items.map((item) => (
// //                 <tr key={item.id} className="border-b border-gray-200">
// //                   <td className="px-4 py-3 flex items-center gap-2">
// //                     {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />}
// //                     {item.name}
// //                   </td>
// //                   <td className="px-4 py-3 text-right">
// //                     {item.price} × {item.quantity}৳
// //                   </td>
// //                   <td className="px-4 py-3 text-right">{item.price * item.quantity}৳</td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="3" className="py-6 text-center text-gray-500">
// //                   Your cart is empty.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //         <div className="mt-6 text-gray-800 font-semibold text-sm max-w-md ml-auto">
// //           <div className="flex justify-between py-2">
// //             <span>Subtotal:</span>
// //             <span>{subtotal}৳</span>
// //           </div>
// //           <div className="flex justify-between py-2">
// //             <span>Shipping:</span>
// //             <span>{shippingFee}৳</span>
// //           </div>
// //           <div className="flex justify-between py-3 border-t border-gray-300 font-bold text-gray-900 text-lg">
// //             <span>Total:</span>
// //             <span>{total}৳</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const OrderPage = () => {
// //   const { cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
// //   const { addresses, loading: addressLoading, error: addressError } = useSelector((state) => state.addressReducer);
// //   const { user } = useSelector((state) => state.user);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const {
// //     register,
// //     formState: { errors },
// //     handleSubmit
// //   } = useForm();

// //   const [address, setAddress] = useState({
// //     fullName: '',
// //     phone: '',
// //     division: '',
// //     city: '',
// //     postalCode: '',
// //     street: '',
// //     email: ''
// //   });
// //   const [paymentMethod, setPaymentMethod] = useState('cash');
// //   const [deliveryMethod, setDeliveryMethod] = useState('home');
// //   const [shippingFee, setShippingFee] = useState(60);
// //   const [isTermsAccepted, setIsTermsAccepted] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     dispatch(fetchCart());
// //     dispatch(getAllAddresses());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     const defaultAddress = addresses?.find((addr) => addr.isDefault);
// //     if (defaultAddress) {
// //       setAddress({
// //         fullName: defaultAddress.fullName || '',
// //         phone: defaultAddress.phone || '',
// //         division: defaultAddress.division || '',
// //         city: defaultAddress.city || '',
// //         postalCode: defaultAddress.postalCode || '',
// //         street: defaultAddress.street || '',
// //         email: user?.email || ''
// //       });
// //     }
// //   }, [addresses, user?.email]);

// //   const handleAddressChange = (e) => {
// //     const { name, value } = e.target;
// //     setAddress((prev) => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const onSubmit = (data) => {
// //     if (!isTermsAccepted) {
// //       alert('Please accept the terms and conditions.');
// //       return;
// //     }
// //     setIsLoading(true);
// //     // Simulate order submission
// //     setTimeout(() => {
// //       setIsLoading(false);
// //       navigate('/order-confirmation');
// //     }, 1000);
// //   };

// //   if (cartLoading || addressLoading) return <div className="text-center py-12">Loading...</div>;
// //   if (cartError || addressError)
// //     return <div className="text-center py-12 text-red-500">Error: {cartError || addressError}</div>;

// //   return (
// //     <div className="bg-gray-50 min-h-screen px-4 py-12 font-sans">
// //       <div className="max-w-6xl mx-auto">
// //         <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 tracking-wide">Checkout</h1>

// //         <div className="flex flex-col lg:flex-row gap-12">
// //           {addresses?.length > 0 && (
// //             <CustomerInfo
// //               address={address}
// //               handleAddressChange={handleAddressChange}
// //               register={register}
// //               errors={errors}
// //             />
// //           )}
// //           <div className="w-full lg:w-1/3 flex flex-col gap-6">
// //             <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
// //             <DeliveryMethod
// //               deliveryMethod={deliveryMethod}
// //               setDeliveryMethod={setDeliveryMethod}
// //               setShippingFee={setShippingFee}
// //             />
// //           </div>
// //         </div>

// //         <div className="grid md:grid-cols-2 gap-6 mt-12">
// //           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
// //             <div className="flex gap-3">
// //               <input
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                 placeholder="Gift Voucher or Coupon Code"
// //                 aria-label="Gift Voucher or Coupon Code"
// //               />
// //               <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition">
// //                 Apply
// //               </button>
// //             </div>
// //           </div>
// //           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
// //             <p className="font-semibold text-gray-800 mb-3">Use Star Points</p>
// //             <div className="flex gap-3">
// //               <input
// //                 type="number"
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                 placeholder="Points to use (Max 25)"
// //                 max="25"
// //                 aria-label="Star Points"
// //               />
// //               <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition">
// //                 Apply
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <OrderOverview cartItems={cartItems} shippingFee={shippingFee} />

// //         <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-10 space-y-4">
// //           <label className="flex items-start gap-3 text-gray-800 text-sm">
// //             <input
// //               type="checkbox"
// //               checked={isTermsAccepted}
// //               onChange={(e) => setIsTermsAccepted(e.target.checked)}
// //               className="mt-1 accent-blue-500"
// //               aria-label="Accept Terms and Conditions"
// //               required
// //             />
// //             <span>
// //               I agree to the
// //               <a href="/terms" className="text-blue-600 underline mx-1">
// //                 Terms
// //               </a>
// //               ,
// //               <a href="/privacy" className="text-blue-600 underline mx-1">
// //                 Privacy
// //               </a>
// //               , and
// //               <a href="/refund" className="text-blue-600 underline mx-1">
// //                 Refund Policy
// //               </a>
// //               .
// //             </span>
// //           </label>
// //           <button
// //             onClick={handleSubmit(onSubmit)}
// //             disabled={isLoading || !isTermsAccepted}
// //             className={`w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${
// //               isLoading || !isTermsAccepted ? 'opacity-50 cursor-not-allowed' : ''
// //             }`}
// //           >
// //             {isLoading ? 'Processing...' : 'Confirm Order'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderPage;




import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Banknote,
  CheckCircle,
  CreditCard,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Truck,
  User,
} from 'lucide-react';

import { fetchCart } from '../features/cartSlice.js';
import { getAllAddresses } from '../features/addressSlice.js';
import { createOrder } from '../features/OrderSlice.js';
import BackendCouponBox from '../Components/Checkout/BackendCouponBox';

const divisions = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { addresses = [] } = useSelector((state) => state.addressReducer || {});
  const { user } = useSelector((state) => state.user);

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    division: '',
    city: '',
    postalCode: '',
    street: '',
    email: '',
  });

  const [shippingMethod, setShippingMethod] = useState('home');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [transactionId, setTransactionId] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const items = Array.isArray(cartItems?.items)
    ? cartItems.items
    : Array.isArray(cartItems)
      ? cartItems
      : [];

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(getAllAddresses());
  }, [dispatch]);

  useEffect(() => {
    const defaultAddress = addresses.find((addr) => addr.isDefault === true);

    if (defaultAddress) {
      setAddress({
        fullName:
          defaultAddress.fullName ||
          `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        phone: defaultAddress.phone || user?.phone || '',
        division: defaultAddress.division || '',
        city: defaultAddress.city || '',
        postalCode: defaultAddress.postalCode || '',
        street:
          defaultAddress.street ||
          defaultAddress.address ||
          defaultAddress.area ||
          '',
        email: user?.email || defaultAddress.email || '',
      });
    } else if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        phone: user?.phone || prev.phone,
        email: user?.email || prev.email,
      }));
    }
  }, [addresses, user]);

  const shippingFee = useMemo(() => {
    if (shippingMethod === 'pickup') return 0;
    if (shippingMethod === 'express') return 300;
    return 60;
  }, [shippingMethod]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price || 0);
      const qty = Number(item.quantity || item.qty || 1);
      return sum + price * qty;
    }, 0);
  }, [items]);

  const couponCartItems = useMemo(() => {
    return items.map((item) => ({
      productId: item.productId || item.product || item._id,
      _id: item.productId || item.product || item._id,
      name: item.name || item.title,
      qty: item.quantity || item.qty || 1,
      quantity: item.quantity || item.qty || 1,
      price: item.price || 0,
      image: item.image || item.thumbnail,
      slug: item.slug,
      selectedVariants: item.selectedVariants || {},
    }));
  }, [items]);

  const finalShippingPrice = couponData?.shippingPrice ?? shippingFee;
  const discountPrice = couponData?.discountPrice || 0;
  const totalPrice = couponData?.totalPrice ?? subtotal + shippingFee;

  useEffect(() => {
    setCouponData(null);
  }, [shippingMethod, items.length]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateOrder = () => {
    if (!items.length) {
      toast.error('Your cart is empty');
      return false;
    }

    if (!address.fullName.trim()) {
      toast.error('Full name is required');
      return false;
    }

    if (!address.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }

    if (!address.division.trim()) {
      toast.error('Division is required');
      return false;
    }

    if (!address.city.trim()) {
      toast.error('City is required');
      return false;
    }

    if (!address.street.trim()) {
      toast.error('Street address is required');
      return false;
    }

    if (paymentMethod === 'manual' && !transactionId.trim()) {
      toast.error('Transaction ID is required for manual payment');
      return false;
    }

    if (!isTermsAccepted) {
      toast.error('Please accept terms and conditions');
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!validateOrder()) return;

    const orderData = {
      cartItems: couponCartItems,

      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        email: address.email,
        address: address.street,
        city: address.city,
        postalCode: address.postalCode,
        division: address.division,
      },

      paymentMethod: {
        method: paymentMethod,
        status:
          paymentMethod === 'cod'
            ? 'pending'
            : paymentMethod === 'manual'
              ? 'submitted'
              : 'pending',
        transactionId: paymentMethod === 'manual' ? transactionId : null,
        paidAt: null,
      },

      couponCode: couponData?.couponCode || null,

      itemsPrice: subtotal,
      taxPrice: 0,
      shippingPrice: shippingFee,
      discountPrice,
      totalPrice,
    };

    try {
      setSubmitting(true);

      const result = await dispatch(createOrder(orderData));

      if (result?.error) {
        toast.error(result.error?.message || 'Order failed');
        return;
      }

      toast.success('Order placed successfully');

      setTimeout(() => {
        navigate('/ordersucess');
      }, 500);
    } catch (error) {
      toast.error('Something went wrong while placing order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-7 rounded-3xl bg-yellow-400 p-6 text-black shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-black/65">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-3xl font-black">Complete Your Order</h1>

          <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-black/70">
            Confirm your delivery address, apply coupon, choose payment method
            and place your order securely.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <User size={23} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
                    Customer
                  </p>
                  <h2 className="text-2xl font-black text-gray-950">
                    Customer Information
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="fullName"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  placeholder="Full Name"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <input
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  placeholder="Phone Number"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <input
                  name="email"
                  type="email"
                  value={address.email}
                  onChange={handleAddressChange}
                  placeholder="Email Address"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <select
                  name="division"
                  value={address.division}
                  onChange={handleAddressChange}
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>

                <input
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <input
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Postal Code"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <textarea
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  placeholder="Street Address"
                  className="min-h-28 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400 md:col-span-2"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Truck size={23} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
                    Delivery
                  </p>
                  <h2 className="text-2xl font-black text-gray-950">
                    Delivery Method
                  </h2>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    value: 'home',
                    title: 'Home Delivery',
                    price: 60,
                    text: '2-5 working days',
                  },
                  {
                    value: 'pickup',
                    title: 'Store Pickup',
                    price: 0,
                    text: 'Pick from store',
                  },
                  {
                    value: 'express',
                    title: 'Express Delivery',
                    price: 300,
                    text: 'Fast delivery',
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setShippingMethod(item.value)}
                    className={`rounded-3xl border p-4 text-left transition ${
                      shippingMethod === item.value
                        ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
                        : 'border-gray-200 bg-white hover:border-yellow-300'
                    }`}
                  >
                    <p className="font-black text-gray-950">{item.title}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-500">
                      {item.text}
                    </p>
                    <p className="mt-3 text-lg font-black text-green-600">
                      ৳{item.price}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <CreditCard size={23} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
                    Payment
                  </p>
                  <h2 className="text-2xl font-black text-gray-950">
                    Payment Method
                  </h2>
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  {
                    value: 'cod',
                    title: 'Cash on Delivery',
                    text: 'Pay when product arrives',
                    icon: Banknote,
                    active: true,
                  },
                  {
                    value: 'manual',
                    title: 'Manual bKash/Nagad',
                    text: 'Enter transaction ID after payment',
                    icon: Smartphone,
                    active: true,
                  },
                  {
                    value: 'online',
                    title: 'Online Gateway',
                    text: 'Merchant account required',
                    icon: CreditCard,
                    active: false,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      disabled={!item.active}
                      onClick={() => setPaymentMethod(item.value)}
                      className={`flex items-center gap-4 rounded-3xl border p-4 text-left transition ${
                        paymentMethod === item.value
                          ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
                          : 'border-gray-200 bg-white hover:border-yellow-300'
                      } ${!item.active ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                        <Icon size={23} />
                      </div>

                      <div className="flex-1">
                        <p className="font-black text-gray-950">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-gray-500">
                          {item.text}
                        </p>
                      </div>

                      <span
                        className={`h-4 w-4 rounded-full border ${
                          paymentMethod === item.value
                            ? 'border-black bg-black'
                            : 'border-gray-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'manual' && (
                <div className="mt-5 rounded-3xl bg-gray-50 p-4">
                  <p className="font-black text-gray-950">
                    Manual Payment Instruction
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Send payment to your business bKash/Nagad number and enter
                    the transaction ID below.
                  </p>

                  <input
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Transaction ID"
                    className="mt-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                  />
                </div>
              )}
            </div>
          </section>

          <aside className="h-fit space-y-5 lg:sticky lg:top-32">
            <BackendCouponBox
              cartItems={couponCartItems}
              shippingPrice={shippingFee}
              onCouponApplied={setCouponData}
            />

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="flex items-center gap-2 text-2xl font-black text-gray-950">
                <PackageCheck size={24} />
                Order Overview
              </h2>

              <div className="mt-5 max-h-80 space-y-4 overflow-auto pr-1">
                {items.length ? (
                  items.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex gap-3 rounded-2xl bg-gray-50 p-3"
                    >
                      <img
                        src={item.image || item.thumbnail}
                        alt={item.name || item.title || 'Product'}
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-16 rounded-2xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-black text-gray-950">
                          {item.name || item.title}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-gray-500">
                          ৳{item.price || 0} × {item.quantity || item.qty || 1}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl bg-gray-50 p-4 text-center text-sm font-bold text-gray-500">
                    Your cart is empty.
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3 text-sm font-bold text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳{finalShippingPrice}</span>
                </div>

                {discountPrice > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-৳{discountPrice}</span>
                  </div>
                )}

                {couponData?.couponCode && (
                  <div className="flex justify-between text-yellow-700">
                    <span>Coupon</span>
                    <span>{couponData.couponCode}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-gray-100 pt-4 text-xl font-black text-gray-950">
                  <span>Total</span>
                  <span>৳{totalPrice}</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-yellow-50 p-4">
                <div className="flex gap-2">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-yellow-700"
                  />

                  <p className="text-xs font-bold leading-5 text-gray-700">
                    Coupon and total price will be verified again by backend
                    before order is saved.
                  </p>
                </div>
              </div>

              <label className="mt-5 flex items-start gap-3 text-sm font-bold text-gray-700">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="mt-1 accent-yellow-500"
                />

                <span>
                  I agree to the{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-yellow-700 underline"
                  >
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/return-policy"
                    className="text-yellow-700 underline"
                  >
                    Return Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="button"
                onClick={onSubmit}
                disabled={!isTermsAccepted || submitting || !items.length}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Placing Order...' : 'Confirm Order'}
                <CheckCircle size={18} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default OrderPage;