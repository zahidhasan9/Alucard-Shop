


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
//   Smartphone,
//   Tag,
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
//     order?.orderStatus ||
//     order?.Delivery ||
//     order?.deliveryStatus ||
//     'Processing';

//   const paymentLabel =
//     order?.manualPayment?.provider?.toUpperCase() ||
//     (order?.paymentMethod?.method === 'cod'
//       ? 'Cash on Delivery'
//       : order?.paymentMethod?.method || 'Payment');

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
//                       className="h-16 w-16 rounded-lg bg-gray-100 object-contain p-1"
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
//                     address?.fullName ||
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

//             {order?.manualPayment && (
//               <Card title="Manual Payment Details" icon={<Smartphone size={18} />}>
//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <SmallInfo
//                     label="Provider"
//                     value={order.manualPayment.provider?.toUpperCase() || 'N/A'}
//                   />
//                   <SmallInfo
//                     label="Status"
//                     value={order.manualPayment.status || 'Submitted'}
//                   />
//                   <SmallInfo
//                     label="Sender Number"
//                     value={order.manualPayment.senderNumber || 'N/A'}
//                   />
//                   <SmallInfo
//                     label="Transaction ID"
//                     value={order.manualPayment.transactionId || 'N/A'}
//                   />
//                 </div>
//               </Card>
//             )}

//             {order?.coupon && (
//               <Card title="Coupon Applied" icon={<Tag size={18} />}>
//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <SmallInfo label="Code" value={order.coupon.code || 'N/A'} />
//                   <SmallInfo
//                     label="Discount"
//                     value={formatPrice(
//                       order.discountPrice || order.coupon.discountPrice || 0
//                     )}
//                   />
//                   <SmallInfo
//                     label="Shipping Discount"
//                     value={formatPrice(order.coupon.shippingDiscount || 0)}
//                   />
//                   <SmallInfo
//                     label="Type"
//                     value={order.coupon.type || 'N/A'}
//                   />
//                 </div>
//               </Card>
//             )}
//           </section>

//           <aside className="space-y-4">
//             <Card title="Payment" icon={<CreditCard size={18} />}>
//               <div className="space-y-2">
//                 <SummaryRow label="Method" value={paymentLabel} />
//                 <SummaryRow
//                   label="Status"
//                   value={
//                     order?.isPaid
//                       ? 'Paid'
//                       : order?.paymentMethod?.status ||
//                         order?.manualPayment?.status ||
//                         'Unpaid'
//                   }
//                 />
//                 <SummaryRow
//                   label="Transaction"
//                   value={
//                     order?.paymentMethod?.transactionId ||
//                     order?.manualPayment?.transactionId ||
//                     'N/A'
//                   }
//                 />
//               </div>
//             </Card>

//             <Card title="Summary" icon={<ReceiptText size={18} />}>
//               <div className="space-y-2">
//                 <SummaryRow
//                   label="Items"
//                   value={formatPrice(order?.itemsPrice)}
//                 />
//                 <SummaryRow
//                   label="Shipping"
//                   value={formatPrice(order?.shippingPrice)}
//                 />
//                 <SummaryRow
//                   label="Discount"
//                   value={`- ${formatPrice(order?.discountPrice || 0)}`}
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
//           : 'break-all text-right font-bold text-gray-900'
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
//     <p className="mt-1 break-all text-sm font-bold text-gray-950">{value}</p>
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

const formatPrice = amount =>
  Number(amount || 0).toLocaleString('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  });

const formatDate = date => {
  if (!date) return 'N/A';

  return new Date(date).toLocaleDateString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getPaymentLabel = order => {
  if (order?.manualPayment?.provider) {
    return order.manualPayment.provider.toUpperCase();
  }

  if (order?.paymentMethod?.method === 'cod') return 'Cash on Delivery';
  if (order?.paymentMethod?.method === 'manual') return 'Manual Payment';
  if (order?.paymentMethod?.method === 'online') return 'Online Payment';

  return order?.paymentMethod?.method || 'Payment';
};

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
        setError('');
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
      <main className="bg-gray-100 px-4 py-14 font-Work_sans">
        <EmptyState
          title="Order not found"
          message={error || 'This order could not be loaded.'}
          buttonText="Back to Account"
          buttonLink="/account"
        />
      </main>
    );
  }

  const items = order?.orderItems || order?.items || [];
  const address = order?.shippingAddress || {};
  const user = order?.user || {};
  const status = order?.orderStatus || order?.Delivery || order?.deliveryStatus || 'Processing';
  const orderNumber = order?.orderId || order?._id || id;
  const paymentLabel = getPaymentLabel(order);

  return (
    <main className="bg-gray-100 font-Work_sans">
      <section className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/account"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-gray-800 shadow-sm transition hover:bg-yellow-400 hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Account
          </Link>

          <Link
            to={`/invoice/${orderNumber}`}
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
          >
            <Download size={17} />
            Invoice
          </Link>
        </div>

        <div className="mb-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-700">
            Order Details
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black text-gray-950">
                #{orderNumber}
              </h1>

              <p className="mt-1 text-sm font-bold text-gray-500">
                Placed on {formatDate(order?.createdAt)}
              </p>
            </div>

            <StatusPill status={status} />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <Card title="Ordered Items" icon={<Package size={22} />}>
              <div className="space-y-3">
                {items.map((item, index) => {
                  const qty = Number(item?.qty || item?.quantity || 1);
                  const price = Number(item?.price || 0);

                  return (
                    <div
                      key={item?._id || index}
                      className="flex gap-4 rounded-2xl bg-gray-50 p-4"
                    >
                      {item?.image ? (
                        <img
                          src={item.image}
                          alt={item?.name || item?.title || 'Product'}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-200 text-xs font-bold text-gray-400">
                          No Image
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-black text-gray-950">
                          {item?.name || item?.title || 'Product'}
                        </h3>

                        {item?.variantLabel && (
                          <p className="mt-1 text-xs font-bold text-gray-500">
                            Variant: {item.variantLabel}
                          </p>
                        )}

                        {item?.variantSku && (
                          <p className="mt-1 text-xs font-bold text-gray-400">
                            SKU: {item.variantSku}
                          </p>
                        )}

                        <p className="mt-2 text-xs font-bold text-gray-500">
                          Qty: {qty}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-black text-gray-950">
                          {formatPrice(price)}
                        </p>

                        <p className="mt-1 text-xs font-bold text-gray-500">
                          Total: {formatPrice(price * qty)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <OrderTimeline order={order} />
          </div>

          <aside className="space-y-5">
            <Card title="Customer" icon={<User size={22} />}>
              <InfoRow
                icon={<User size={17} />}
                label="Name"
                value={
                  address?.fullName ||
                  `${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
                  'N/A'
                }
              />

              <InfoRow
                icon={<Phone size={17} />}
                label="Phone"
                value={address?.phone || user?.phone || 'N/A'}
              />
            </Card>

            <Card title="Shipping Address" icon={<MapPin size={22} />}>
              <p className="text-sm font-bold leading-6 text-gray-600">
                {address?.address || 'N/A'}
                <br />
                {address?.city || ''} {address?.postalCode || ''}
                <br />
                {address?.division || ''}
              </p>
            </Card>

            <Card title="Payment" icon={<CreditCard size={22} />}>
              <InfoRow
                icon={<CreditCard size={17} />}
                label="Method"
                value={paymentLabel}
              />

              <InfoRow
                icon={<ReceiptText size={17} />}
                label="Status"
                value={order?.isPaid ? 'Paid' : order?.paymentMethod?.status || 'Unpaid'}
              />

              {order?.paymentMethod?.transactionId && (
                <InfoRow
                  icon={<Smartphone size={17} />}
                  label="Transaction ID"
                  value={order.paymentMethod.transactionId}
                />
              )}
            </Card>

            {order?.coupon && (
              <Card title="Coupon" icon={<Tag size={22} />}>
                <InfoRow
                  icon={<Tag size={17} />}
                  label="Code"
                  value={order.coupon.code || 'N/A'}
                />

                <InfoRow
                  icon={<Tag size={17} />}
                  label="Discount"
                  value={formatPrice(order.discountPrice || 0)}
                />
              </Card>
            )}

            <Card title="Summary" icon={<ReceiptText size={22} />}>
              <SummaryRow label="Items Price" value={formatPrice(order?.itemsPrice)} />

              <SummaryRow label="Shipping" value={formatPrice(order?.shippingPrice)} />

              {Number(order?.discountPrice || 0) > 0 && (
                <SummaryRow
                  label="Discount"
                  value={`-${formatPrice(order?.discountPrice)}`}
                />
              )}

              <SummaryRow
                label="Total"
                value={formatPrice(order?.totalPrice)}
                strong
              />
            </Card>

            <div className="rounded-3xl bg-black p-5 text-center text-yellow-400">
              <p className="text-sm font-black">Need help with this order?</p>

              <p className="mt-1 text-xs font-semibold text-yellow-200">
                Contact support with your order number.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

const Card = ({ title, icon, children }) => (
  <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-black">
        {icon}
      </div>

      <h2 className="text-xl font-black text-gray-950">{title}</h2>
    </div>

    {children}
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="mb-3 flex items-start gap-3 last:mb-0">
    <div className="mt-0.5 text-yellow-700">{icon}</div>

    <div>
      <p className="text-xs font-black uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="text-sm font-bold text-gray-700">{value}</p>
    </div>
  </div>
);

const SummaryRow = ({ label, value, strong }) => (
  <div
    className={`flex justify-between py-2 text-sm ${
      strong
        ? 'border-t border-gray-100 pt-4 text-xl font-black text-gray-950'
        : 'font-bold text-gray-600'
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const StatusPill = ({ status }) => (
  <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-yellow-700">
    {status}
  </span>
);

export default OrderDetails;