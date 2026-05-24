// src/pages/OrderSuccessPage.jsx

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { PartyPopper } from 'lucide-react';
// import { getLastOrder } from '../features/OrderSlice';

// const OrderSuccessPage = () => {
//   const dispatch = useDispatch();

//   const { lastOrder } = useSelector((state) => state.Order);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getLastOrder());
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
//       <div className="bg-white shadow-xl border border-green-300 rounded-xl p-10 max-w-xl w-full text-center animate-fade-in">
//         <div className="text-green-600 mb-4 flex justify-center">
//           <PartyPopper className="w-16 h-16" />
//         </div>
//         <h1 className="text-3xl font-bold text-green-700 mb-2">Order Confirmed</h1>
//         <p className="text-gray-700 mb-4">
//           Thank you, <span className="font-semibold">{user?.firstName + ' ' + user?.lastName || 'Customer'}</span>!
//           <br />
//           Your order has been successfully placed.
//         </p>

//         <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left text-sm md:text-base mb-6">
//           <p>
//             <span className="font-semibold text-green-800">Order ID:</span> {lastOrder?.orderId || ''}
//           </p>
//           <p>
//             <span className="font-semibold text-green-800">Email:</span> {user?.email}
//           </p>
//           <p>
//             <span className="font-semibold text-green-800">Total:</span> {lastOrder?.totalPrice}৳
//           </p>
//         </div>

//         <Link
//           to="/"
//           className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
//         >
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccessPage;






// import { Link } from 'react-router-dom';
// import {
//   CheckCircle,
//   Home,
//   PackageCheck,
//   ReceiptText,
//   ShoppingBag,
//   Truck,
// } from 'lucide-react';
// import usePageTitle from '../hooks/usePageTitle';

// const OderSuccessPage = () => {
//   usePageTitle(
//     'Order Successful | Alucard Shop',
//     'Your order has been placed successfully.'
//   );

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
//       <div className="container mx-auto max-w-3xl">
//         <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-yellow-600 p-8 text-center text-white">
//             <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-yellow-400 text-gray-950">
//               <CheckCircle size={46} />
//             </div>

//             <h1 className="mt-5 text-3xl font-black">
//               Order Placed Successfully!
//             </h1>

//             <p className="mt-2 text-sm text-gray-200">
//               Thank you for shopping with Alucard Shop. We’ll start processing
//               your order soon.
//             </p>
//           </div>

//           <div className="grid gap-4 p-5 sm:grid-cols-3">
//             <InfoCard
//               icon={<PackageCheck size={24} />}
//               title="Confirmed"
//               desc="Order received"
//             />
//             <InfoCard
//               icon={<Truck size={24} />}
//               title="Processing"
//               desc="Preparing delivery"
//             />
//             <InfoCard
//               icon={<ReceiptText size={24} />}
//               title="Invoice"
//               desc="Available in orders"
//             />
//           </div>

//           <div className="border-t border-gray-100 p-6">
//             <div className="rounded-xl bg-yellow-50 p-4 text-center">
//               <p className="text-sm font-semibold leading-6 text-yellow-900">
//                 You can track your order status anytime from your account
//                 dashboard.
//               </p>
//             </div>

//             <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
//               <Link
//                 to="/dashboard"
//                 className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-950"
//               >
//                 <PackageCheck size={18} />
//                 View My Orders
//               </Link>

//               <Link
//                 to="/products"
//                 className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
//               >
//                 <ShoppingBag size={18} />
//                 Continue Shopping
//               </Link>

//               <Link
//                 to="/"
//                 className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
//               >
//                 <Home size={18} />
//                 Home
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// const InfoCard = ({ icon, title, desc }) => (
//   <div className="rounded-xl bg-gray-50 p-4 text-center">
//     <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-yellow-100 text-yellow-700">
//       {icon}
//     </div>
//     <h3 className="mt-3 text-sm font-black text-gray-950">{title}</h3>
//     <p className="text-xs text-gray-500">{desc}</p>
//   </div>
// );

// export default OderSuccessPage;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckCircle,
  Home,
  Mail,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Truck,
} from 'lucide-react';

import usePageTitle from '../hooks/usePageTitle';
import { getLastOrder } from '../features/OrderSlice';

const OderSuccessPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { lastOrder } = useSelector((state) => state.Order);

  usePageTitle(
    'Order Successful | Alucard Shop',
    'Your order has been placed successfully.'
  );

  useEffect(() => {
    dispatch(getLastOrder());
  }, [dispatch]);

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    });

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
      <div className="container mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-yellow-600 p-8 text-center text-white">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-yellow-400 text-gray-950">
              <CheckCircle size={46} />
            </div>

            <h1 className="mt-5 text-3xl font-black">
              Order Placed Successfully!
            </h1>

            <p className="mt-2 text-sm text-gray-200">
              Thank you for shopping with Alucard Shop. We’ll send order updates
              to {user?.email || 'your email'}.
            </p>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-3">
            <InfoCard
              icon={<PackageCheck size={24} />}
              title="Order ID"
              desc={lastOrder?.orderId || 'Processing'}
            />
            <InfoCard
              icon={<ReceiptText size={24} />}
              title="Total Amount"
              desc={formatPrice(lastOrder?.totalPrice)}
            />
            <InfoCard
              icon={<Mail size={24} />}
              title="Email"
              desc={user?.email || 'Not available'}
            />
          </div>

          <div className="border-t border-gray-100 p-6">
            <div className="rounded-xl bg-yellow-50 p-4 text-center">
              <div className="flex justify-center gap-2 text-yellow-800">
                <Truck size={20} />
                <p className="text-sm font-semibold leading-6">
                  Your order is now being processed. You can track it anytime
                  from your account dashboard.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-950"
              >
                <PackageCheck size={18} />
                View My Orders
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                <Home size={18} />
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const InfoCard = ({ icon, title, desc }) => (
  <div className="rounded-xl bg-gray-50 p-4 text-center">
    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-yellow-100 text-yellow-700">
      {icon}
    </div>
    <h3 className="mt-3 text-sm font-black text-gray-950">{title}</h3>
    <p className="mt-1 break-words text-xs font-semibold text-gray-500">
      {desc}
    </p>
  </div>
);

export default OderSuccessPage;