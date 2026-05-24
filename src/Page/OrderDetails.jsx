// import { useEffect } from 'react';
// import { useNavigate, useParams, Link } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrderById } from '../features/OrderSlice';
// import Breadcrumb from '../Components/Breadcrumb';

// const UserDashboard = () => {
//   const { order } = useSelector((state) => state.Order);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(fetchOrderById(id));
//   }, []);

//   return (
//     <>
//       <div>
//         <Breadcrumb />
//         <div className="container mx-auto my-12 px-4 font-Work_sans">
//           <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
//             {/* Sidebar */}
//             <div className="md:w-72 bg-gray-50 border-r border-gray-100 p-6 space-y-8">
//               {/* Customer Info */}
//               <div>
//                 <h2 className="text-lg font-semibold mb-3 text-gray-800">Customer Info</h2>
//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Name:</span>{' '}
//                   {order?.user?.firstName + ' ' + order?.user?.lastName || ''}
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Email:</span> {order?.user?.email || ''}
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Phone:</span> {order?.user?.phone || ''}
//                 </p>
//               </div>

//               {/* Shipping Info */}
//               <div>
//                 <h2 className="text-lg font-semibold mb-3 text-gray-800">Shipping Address</h2>
//                 <p className="text-sm text-gray-700">{order?.shippingAddress?.address || ''}</p>
//                 <p className="text-sm text-gray-700">City: {order?.shippingAddress?.city || ''}</p>
//                 <p className="text-sm text-gray-700">Division: {order?.shippingAddress?.division || ''}</p>
//                 <p className="text-sm text-gray-700">Postal Code: {order?.shippingAddress?.postalCode || ''}</p>
//               </div>

//               {/* Order Status */}
//               <div>
//                 <h2 className="text-lg font-semibold mb-3 text-gray-800">Order Status</h2>
//                 {order?.Delivery === 'pending' && (
//                   <p className="text-sm font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 inline-block">
//                     Pending
//                   </p>
//                 )}
//                 {order?.Delivery === 'confirmed' && (
//                   <p className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 inline-block">
//                     Confirmed
//                   </p>
//                 )}
//                 {order?.Delivery === 'shipped' && (
//                   <p className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-800 inline-block">
//                     Shipped
//                   </p>
//                 )}
//                 {order?.Delivery === 'delivered' && (
//                   <p className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800 inline-block">
//                     Delivered
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-8 space-y-10">
//               {/* Ordered Items */}
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6">Ordered Items</h2>
//                 {order?.orderItems?.map((item, idx) => (
//                   <div key={idx} className="space-y-4">
//                     {/* Each Item */}
//                     <div className="flex items-center justify-between border border-gray-200 p-4 rounded-md ">
//                       <div className="flex items-center gap-4">
//                         <img src={item.image || ''} alt="Product" className="w-20 h-20 object-cover rounded-md" />
//                         <div>
//                           <Link to={`/product/${item.slug}`}>
//                             <h3 className="font-medium text-base text-blue-700 hover:underline ">{item.name || ''}</h3>
//                           </Link>
//                           <p className="text-sm text-gray-600">Qty: {item.qty || ''}</p>
//                         </div>
//                       </div>
//                       <div className="font-semibold text-gray-800">{item.price || ''}৳</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Payment & Summary */}
//               <div className="grid md:grid-cols-2 gap-10">
//                 {/* Payment Info */}
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Info</h2>
//                   <p className="text-sm text-gray-700">
//                     <span className="font-medium">Method:</span>{' '}
//                     {order?.paymentMethod?.method === 'cod'
//                       ? 'Cash On Delivery'
//                       : order?.paymentMethod?.method === 'online'
//                       ? 'Online'
//                       : 'POS' || ''}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <span className="font-medium">Status:</span>{' '}
//                     {order?.isPaid ? (
//                       <span className="text-green-600 font-semibold"> Paid </span>
//                     ) : (
//                       <span className="text-red-600 font-semibold"> Unpaid </span> || ''
//                     )}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <span className="font-medium">Transaction ID:</span> TXN12345 {'constant'}
//                   </p>
//                 </div>

//                 {/* Summary */}
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800 mb-6">Summary</h2>
//                   <div className="space-y-3 text-sm text-gray-700">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>{order?.itemsPrice}৳</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Shipping</span>
//                       <span>{order?.shippingPrice}৳</span>
//                     </div>
//                     <div className="border-t pt-3 flex justify-between font-semibold text-base text-gray-900">
//                       <span>Total</span>
//                       <span>{order?.totalPrice}৳</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-wrap gap-4">
//                 <Link
//                   to={`/invoice/${id}`}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition shadow-sm"
//                 >
//                   Download Invoice
//                 </Link>
//                 <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md transition shadow-sm">
//                   Contact Support
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserDashboard;

// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { ArrowLeft, CreditCard, MapPin, Package } from 'lucide-react';

// import * as API from '../features/API';
// import Loader from '../Components/Loader';
// import EmptyState from '../Components/UI/EmptyState';
// import OrderTimeline from '../Components/OrderTimeline';
// import usePageTitle from '../hooks/usePageTitle';

// const OrderDetails = () => {
//   const { id } = useParams();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   usePageTitle(
//     'Order Details | Alucard Shop',
//     'Track your order status and view order details.'
//   );

//   useEffect(() => {
//     let mounted = true;

//     const loadOrder = async () => {
//       try {
//         setLoading(true);
//         const res = await API.getOrderById(id);

//         if (mounted) {
//           setOrder(res.data?.order || res.data);
//           setError('');
//         }
//       } catch (err) {
//         if (mounted) {
//           setError(err.response?.data?.message || 'Order could not be loaded');
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     if (id) loadOrder();

//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   if (loading) return <Loader />;

//   if (error || !order) {
//     return (
//       <main className="bg-gray-100 px-4 py-14">
//         <EmptyState
//           title="Order not found"
//           message={error || 'This order could not be found.'}
//           buttonText="Back to Orders"
//           buttonLink="/order"
//         />
//       </main>
//     );
//   }

//   const items = order?.orderItems || order?.items || [];
//   const address = order?.shippingAddress || {};

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-8 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <Link
//           to="/order"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-black text-gray-700 hover:text-yellow-700"
//         >
//           <ArrowLeft size={18} />
//           Back to Orders
//         </Link>

//         <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//           <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//             Order
//           </p>

//           <h1 className="mt-2 break-all text-2xl font-black text-gray-950">
//             #{order?._id || id}
//           </h1>

//           <p className="mt-2 text-sm font-semibold text-gray-500">
//             Placed on:{' '}
//             {order?.createdAt
//               ? new Date(order.createdAt).toLocaleString()
//               : 'N/A'}
//           </p>
//         </div>

//         <OrderTimeline order={order} />

//         <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
//           <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//             <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-gray-950">
//               <Package size={22} />
//               Ordered Items
//             </h2>

//             <div className="divide-y divide-gray-100">
//               {items.map((item, index) => (
//                 <div key={item?._id || index} className="flex gap-4 py-4">
//                   <img
//                     src={item?.image || item?.thumbnail}
//                     alt={item?.name || 'Order item'}
//                     loading="lazy"
//                     decoding="async"
//                     className="h-20 w-20 rounded-2xl bg-gray-100 object-cover"
//                   />

//                   <div className="min-w-0 flex-1">
//                     <h3 className="font-black text-gray-950">
//                       {item?.name || item?.title}
//                     </h3>

//                     <p className="mt-1 text-sm font-semibold text-gray-500">
//                       Qty: {item?.qty || item?.quantity || 1}
//                     </p>

//                     <p className="mt-1 text-sm font-black text-green-600">
//                       ৳{item?.price || 0}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <aside className="space-y-6">
//             <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//               <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-gray-950">
//                 <MapPin size={22} />
//                 Shipping Address
//               </h2>

//               <p className="text-sm font-semibold leading-6 text-gray-600">
//                 {address?.address || 'N/A'}
//                 <br />
//                 {address?.city || ''} {address?.postalCode || ''}
//                 <br />
//                 {address?.division || ''}
//               </p>
//             </div>

//             <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//               <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-gray-950">
//                 <CreditCard size={22} />
//                 Payment Summary
//               </h2>

//               <div className="space-y-3 text-sm font-bold text-gray-600">
//                 <div className="flex justify-between">
//                   <span>Items Price</span>
//                   <span>৳{order?.itemsPrice || 0}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>৳{order?.shippingPrice || 0}</span>
//                 </div>

//                 <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-black text-gray-950">
//                   <span>Total</span>
//                   <span>৳{order?.totalPrice || 0}</span>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default OrderDetails;











// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import {
//   ArrowLeft,
//   CreditCard,
//   Download,
//   MapPin,
//   Package,
//   Phone,
//   ReceiptText,
//   Truck,
//   User,
// } from 'lucide-react';

// import * as API from '../features/API';
// import Loader from '../Components/Loader';
// import EmptyState from '../Components/UI/EmptyState';
// import OrderTimeline from '../Components/OrderTimeline';
// import usePageTitle from '../hooks/usePageTitle';

// const OrderDetails = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   usePageTitle('Order Details | Alucard Shop', 'View order details.');

//   useEffect(() => {
//     const loadOrder = async () => {
//       try {
//         setLoading(true);
//         const res = await API.getOrderById(id);
//         setOrder(res.data?.order || res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Order could not be loaded');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) loadOrder();
//   }, [id]);

//   if (loading) return <Loader />;

//   if (error || !order) {
//     return (
//       <EmptyState
//         icon={Package}
//         title="Order not found"
//         message={error || 'We could not find this order.'}
//         actionLabel="Back to Orders"
//         actionTo="/dashboard"
//       />
//     );
//   }

//   const items = order?.orderItems || order?.items || [];
//   const address = order?.shippingAddress || {};
//   const user = order?.user || {};
//   const status =
//     order?.orderStatus || order?.Delivery || order?.deliveryStatus || 'Processing';

//   const formatPrice = (amount) =>
//     Number(amount || 0).toLocaleString('en-BD', {
//       style: 'currency',
//       currency: 'BDT',
//       minimumFractionDigits: 0,
//     });

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   const paymentMethod =
//     order?.paymentMethod?.method === 'cod'
//       ? 'Cash on Delivery'
//       : order?.paymentMethod?.method === 'online'
//       ? 'Online Payment'
//       : order?.paymentMethod?.method === 'pos'
//       ? 'POS on Delivery'
//       : 'N/A';

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-6 font-Work_sans">
//       <div className="container mx-auto max-w-6xl">
//         <div className="mb-4 flex items-center justify-between">
//           <Link
//             to="/dashboard"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-yellow-700"
//           >
//             <ArrowLeft size={17} />
//             Back to Account
//           </Link>

//           <Link
//             to={`/invoice/${order?.orderId || order?._id || id}`}
//             className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-xs font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-950"
//           >
//             <Download size={15} />
//             Invoice
//           </Link>
//         </div>

//         <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div>
//               <p className="text-xs font-bold uppercase tracking-wider text-yellow-700">
//                 Order Details
//               </p>
//               <h1 className="mt-1 text-xl font-black text-gray-950">
//                 #{order?.orderId || order?._id || id}
//               </h1>
//               <p className="mt-1 text-sm text-gray-500">
//                 Placed on {formatDate(order?.createdAt)}
//               </p>
//             </div>

//             <span className="inline-flex w-max items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-xs font-black text-yellow-800">
//               <Truck size={15} />
//               {status}
//             </span>
//           </div>

//           <div className="mt-4 border-t border-gray-100 pt-4">
//             <OrderTimeline status={status} />
//           </div>
//         </div>

//         <div className="grid gap-4 lg:grid-cols-[1fr_330px]">
//           <section className="space-y-4">
//             <Card title="Items" icon={<Package size={18} />}>
//               <div className="divide-y divide-gray-100">
//                 {items.map((item, index) => (
//                   <div
//                     key={item?._id || index}
//                     className="grid grid-cols-[70px_1fr_auto] gap-3 py-3"
//                   >
//                     <img
//                       src={
//                         item?.image ||
//                         item?.images?.[0]?.url ||
//                         item?.product?.images?.[0]?.url ||
//                         '/placeholder.png'
//                       }
//                       alt={item?.name || item?.title || 'Product'}
//                       className="h-16 w-16 rounded-lg object-cover"
//                     />

//                     <div>
//                       <h3 className="line-clamp-1 text-sm font-bold text-gray-950">
//                         {item?.name || item?.title || 'Product'}
//                       </h3>
//                       <p className="mt-1 text-xs text-gray-500">
//                         Qty: {item?.qty || item?.quantity || 1}
//                       </p>
//                     </div>

//                     <p className="text-sm font-black text-gray-950">
//                       {formatPrice(item?.price)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </Card>

//             <Card title="Shipping Address" icon={<MapPin size={18} />}>
//               <div className="grid gap-3 sm:grid-cols-2">
//                 <SmallInfo
//                   icon={<User size={16} />}
//                   label="Customer"
//                   value={
//                     `${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
//                     'N/A'
//                   }
//                 />
//                 <SmallInfo
//                   icon={<Phone size={16} />}
//                   label="Phone"
//                   value={address?.phone || user?.phone || 'N/A'}
//                 />
//               </div>

//               <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm leading-6 text-gray-700">
//                 {address?.address || 'N/A'}
//                 <br />
//                 {address?.city || ''} {address?.postalCode || ''}
//                 <br />
//                 {address?.division || ''}
//               </p>
//             </Card>
//           </section>

//           <aside className="space-y-4">
//             <Card title="Summary" icon={<ReceiptText size={18} />}>
//               <div className="space-y-2">
//                 <SummaryRow label="Items" value={formatPrice(order?.itemsPrice)} />
//                 <SummaryRow
//                   label="Shipping"
//                   value={formatPrice(order?.shippingPrice)}
//                 />
//                 <SummaryRow label="Tax" value={formatPrice(order?.taxPrice)} />
//                 <div className="border-t border-gray-200 pt-2">
//                   <SummaryRow
//                     label="Total"
//                     value={formatPrice(order?.totalPrice)}
//                     strong
//                   />
//                 </div>
//               </div>
//             </Card>

//             <Card title="Payment" icon={<CreditCard size={18} />}>
//               <div className="space-y-2">
//                 <SummaryRow label="Method" value={paymentMethod} />
//                 <SummaryRow
//                   label="Status"
//                   value={
//                     order?.isPaid
//                       ? 'Paid'
//                       : order?.paymentMethod?.status || 'Unpaid'
//                   }
//                 />
//               </div>
//             </Card>

//             <Link
//               to="/contact"
//               className="block rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm font-semibold text-yellow-900 hover:bg-yellow-100"
//             >
//               Need help with this order?
//             </Link>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// };

// const Card = ({ title, icon, children }) => (
//   <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//     <div className="mb-3 flex items-center gap-2">
//       <span className="grid h-9 w-9 place-items-center rounded-full bg-yellow-100 text-yellow-700">
//         {icon}
//       </span>
//       <h2 className="text-base font-black text-gray-950">{title}</h2>
//     </div>
//     {children}
//   </div>
// );

// const SummaryRow = ({ label, value, strong }) => (
//   <div className="flex items-center justify-between gap-3 text-sm">
//     <span className="text-gray-500">{label}</span>
//     <span
//       className={
//         strong
//           ? 'text-lg font-black text-gray-950'
//           : 'font-bold text-gray-900'
//       }
//     >
//       {value}
//     </span>
//   </div>
// );

// const SmallInfo = ({ icon, label, value }) => (
//   <div className="rounded-lg bg-gray-50 p-3">
//     <div className="flex items-center gap-2 text-xs text-gray-500">
//       {icon}
//       {label}
//     </div>
//     <p className="mt-1 text-sm font-bold text-gray-950">{value}</p>
//   </div>
// );

// export default OrderDetails;





import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  Download,
  MapPin,
  Package,
  Phone,
  ReceiptText,
  Smartphone,
  Tag,
  User,
} from 'lucide-react';

import * as API from '../features/API';
import Loader from '../Components/Loader';
import EmptyState from '../Components/UI/EmptyState';
import OrderTimeline from '../Components/OrderTimeline';
import usePageTitle from '../hooks/usePageTitle';

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  usePageTitle('Order Details | Alucard Shop', 'View order details.');

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const res = await API.getOrderById(id);
        setOrder(res.data?.order || res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Order could not be loaded');
      } finally {
        setLoading(false);
      }
    };

    if (id) loadOrder();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !order) {
    return (
      <EmptyState
        icon={Package}
        title="Order not found"
        message={error || 'We could not find this order.'}
        actionLabel="Back to Orders"
        actionTo="/dashboard"
      />
    );
  }

  const items = order?.orderItems || order?.items || [];
  const address = order?.shippingAddress || {};
  const user = order?.user || {};
  const status =
    order?.orderStatus ||
    order?.Delivery ||
    order?.deliveryStatus ||
    'Processing';

  const paymentLabel =
    order?.manualPayment?.provider?.toUpperCase() ||
    (order?.paymentMethod?.method === 'cod'
      ? 'Cash on Delivery'
      : order?.paymentMethod?.method || 'Payment');

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    });

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 font-Work_sans">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-yellow-700"
          >
            <ArrowLeft size={17} />
            Back to Account
          </Link>

          <Link
            to={`/invoice/${order?.orderId || order?._id || id}`}
            className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-xs font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-950"
          >
            <Download size={15} />
            Invoice
          </Link>
        </div>

        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-yellow-700">
                Order Details
              </p>
              <h1 className="mt-1 text-xl font-black text-gray-950">
                #{order?.orderId || order?._id || id}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Placed on {formatDate(order?.createdAt)}
              </p>
            </div>

            <span className="inline-flex w-max items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-xs font-black text-yellow-800">
              {status}
            </span>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <OrderTimeline status={status} />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_330px]">
          <section className="space-y-4">
            <Card title="Items" icon={<Package size={18} />}>
              <div className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <div
                    key={item?._id || index}
                    className="grid grid-cols-[70px_1fr_auto] gap-3 py-3"
                  >
                    <img
                      src={
                        item?.image ||
                        item?.images?.[0]?.url ||
                        item?.product?.images?.[0]?.url ||
                        '/placeholder.png'
                      }
                      alt={item?.name || item?.title || 'Product'}
                      className="h-16 w-16 rounded-lg bg-gray-100 object-contain p-1"
                    />

                    <div>
                      <h3 className="line-clamp-1 text-sm font-bold text-gray-950">
                        {item?.name || item?.title || 'Product'}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {item?.qty || item?.quantity || 1}
                      </p>
                    </div>

                    <p className="text-sm font-black text-gray-950">
                      {formatPrice(item?.price)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Shipping Address" icon={<MapPin size={18} />}>
              <div className="grid gap-3 sm:grid-cols-2">
                <SmallInfo
                  icon={<User size={16} />}
                  label="Customer"
                  value={
                    address?.fullName ||
                    `${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
                    'N/A'
                  }
                />
                <SmallInfo
                  icon={<Phone size={16} />}
                  label="Phone"
                  value={address?.phone || user?.phone || 'N/A'}
                />
              </div>

              <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm leading-6 text-gray-700">
                {address?.address || 'N/A'}
                <br />
                {address?.city || ''} {address?.postalCode || ''}
                <br />
                {address?.division || ''}
              </p>
            </Card>

            {order?.manualPayment && (
              <Card title="Manual Payment Details" icon={<Smartphone size={18} />}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <SmallInfo
                    label="Provider"
                    value={order.manualPayment.provider?.toUpperCase() || 'N/A'}
                  />
                  <SmallInfo
                    label="Status"
                    value={order.manualPayment.status || 'Submitted'}
                  />
                  <SmallInfo
                    label="Sender Number"
                    value={order.manualPayment.senderNumber || 'N/A'}
                  />
                  <SmallInfo
                    label="Transaction ID"
                    value={order.manualPayment.transactionId || 'N/A'}
                  />
                </div>
              </Card>
            )}

            {order?.coupon && (
              <Card title="Coupon Applied" icon={<Tag size={18} />}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <SmallInfo label="Code" value={order.coupon.code || 'N/A'} />
                  <SmallInfo
                    label="Discount"
                    value={formatPrice(
                      order.discountPrice || order.coupon.discountPrice || 0
                    )}
                  />
                  <SmallInfo
                    label="Shipping Discount"
                    value={formatPrice(order.coupon.shippingDiscount || 0)}
                  />
                  <SmallInfo
                    label="Type"
                    value={order.coupon.type || 'N/A'}
                  />
                </div>
              </Card>
            )}
          </section>

          <aside className="space-y-4">
            <Card title="Payment" icon={<CreditCard size={18} />}>
              <div className="space-y-2">
                <SummaryRow label="Method" value={paymentLabel} />
                <SummaryRow
                  label="Status"
                  value={
                    order?.isPaid
                      ? 'Paid'
                      : order?.paymentMethod?.status ||
                        order?.manualPayment?.status ||
                        'Unpaid'
                  }
                />
                <SummaryRow
                  label="Transaction"
                  value={
                    order?.paymentMethod?.transactionId ||
                    order?.manualPayment?.transactionId ||
                    'N/A'
                  }
                />
              </div>
            </Card>

            <Card title="Summary" icon={<ReceiptText size={18} />}>
              <div className="space-y-2">
                <SummaryRow
                  label="Items"
                  value={formatPrice(order?.itemsPrice)}
                />
                <SummaryRow
                  label="Shipping"
                  value={formatPrice(order?.shippingPrice)}
                />
                <SummaryRow
                  label="Discount"
                  value={`- ${formatPrice(order?.discountPrice || 0)}`}
                />
                <SummaryRow label="Tax" value={formatPrice(order?.taxPrice)} />
                <div className="border-t border-gray-200 pt-2">
                  <SummaryRow
                    label="Total"
                    value={formatPrice(order?.totalPrice)}
                    strong
                  />
                </div>
              </div>
            </Card>

            <Link
              to="/contact"
              className="block rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm font-semibold text-yellow-900 hover:bg-yellow-100"
            >
              Need help with this order?
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

const Card = ({ title, icon, children }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-yellow-100 text-yellow-700">
        {icon}
      </span>
      <h2 className="text-base font-black text-gray-950">{title}</h2>
    </div>
    {children}
  </div>
);

const SummaryRow = ({ label, value, strong }) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <span className="text-gray-500">{label}</span>
    <span
      className={
        strong
          ? 'text-lg font-black text-gray-950'
          : 'break-all text-right font-bold text-gray-900'
      }
    >
      {value}
    </span>
  </div>
);

const SmallInfo = ({ icon, label, value }) => (
  <div className="rounded-lg bg-gray-50 p-3">
    <div className="flex items-center gap-2 text-xs text-gray-500">
      {icon}
      {label}
    </div>
    <p className="mt-1 break-all text-sm font-bold text-gray-950">{value}</p>
  </div>
);

export default OrderDetails;