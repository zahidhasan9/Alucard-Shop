



// import { useEffect, useRef } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
// import { Download, ArrowLeft } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrderById } from '../features/OrderSlice';

// const InvoicePage = () => {
//   const { order } = useSelector((state) => state.Order);
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const invoiceRef = useRef();

//   useEffect(() => {
//     dispatch(fetchOrderById(id));
//   }, [dispatch, id]);

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

//   const downloadPDF = async () => {
//     const input = invoiceRef.current;
//     if (!input) return;

//     const canvas = await html2canvas(input, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: '#ffffff',
//     });

//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`invoice-${order?.orderId || id}.pdf`);
//   };

//   const paymentLabel =
//     order?.manualPayment?.provider?.toUpperCase() ||
//     (order?.paymentMethod?.method === 'cod'
//       ? 'Cash on Delivery'
//       : order?.paymentMethod?.method || 'Payment');

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-8 font-Work_sans">
//       <div className="mx-auto max-w-4xl">
//         <div className="mb-5 flex items-center justify-between">
//           <Link
//             to={`/view-order/${order?.orderId || id}`}
//             className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-yellow-700"
//           >
//             <ArrowLeft size={17} />
//             Back to Order
//           </Link>

//           <button
//             onClick={downloadPDF}
//             className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-black text-yellow-400 hover:bg-yellow-400 hover:text-gray-950"
//           >
//             <Download size={17} />
//             Download PDF
//           </button>
//         </div>

//         <div
//           ref={invoiceRef}
//           className="overflow-hidden rounded-2xl bg-white shadow-sm"
//         >
//           <div className="bg-gray-950 p-8 text-white">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//               <div>
//                 <h1 className="text-3xl font-black text-yellow-400">
//                   ALUCARD SHOP
//                 </h1>
//                 <p className="mt-1 text-sm text-gray-300">
//                   Professional eCommerce Invoice
//                 </p>
//               </div>

//               <div className="text-left sm:text-right">
//                 <h2 className="text-2xl font-black">Invoice</h2>
//                 <p className="mt-1 text-sm text-gray-300">
//                   #{order?.orderId || id}
//                 </p>
//                 <p className="text-sm text-gray-300">
//                   {formatDate(order?.createdAt)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid gap-5 border-b border-gray-200 p-6 md:grid-cols-2">
//             <InfoBox title="Customer Info">
//               <p>
//                 <strong>Name:</strong>{' '}
//                 {order?.shippingAddress?.fullName ||
//                   `${order?.user?.firstName || ''} ${
//                     order?.user?.lastName || ''
//                   }`}
//               </p>
//               <p>
//                 <strong>Email:</strong>{' '}
//                 {order?.shippingAddress?.email || order?.user?.email || 'N/A'}
//               </p>
//               <p>
//                 <strong>Phone:</strong>{' '}
//                 {order?.shippingAddress?.phone || order?.user?.phone || 'N/A'}
//               </p>
//             </InfoBox>

//             <InfoBox title="Shipping Address">
//               <p>{order?.shippingAddress?.address || 'N/A'}</p>
//               <p>
//                 {order?.shippingAddress?.city || ''},{' '}
//                 {order?.shippingAddress?.division || ''}
//               </p>
//               <p>Postal Code: {order?.shippingAddress?.postalCode || 'N/A'}</p>
//             </InfoBox>
//           </div>

//           <div className="p-6">
//             <h3 className="mb-3 text-lg font-black text-gray-950">
//               Ordered Items
//             </h3>

//             <div className="overflow-hidden rounded-xl border border-gray-200">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <th className="p-3">Product</th>
//                     <th className="p-3 text-center">Qty</th>
//                     <th className="p-3 text-right">Price</th>
//                     <th className="p-3 text-right">Total</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100">
//                   {order?.orderItems?.map((item) => (
//                     <tr key={item._id}>
//                       <td className="p-3 font-bold text-gray-900">
//                         {item.name}
//                       </td>
//                       <td className="p-3 text-center">{item.qty}</td>
//                       <td className="p-3 text-right">
//                         {formatPrice(item.price)}
//                       </td>
//                       <td className="p-3 text-right font-bold">
//                         {formatPrice(item.price * item.qty)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="mt-6 grid gap-5 md:grid-cols-2">
//               <InfoBox title="Payment Information">
//                 <p>
//                   <strong>Method:</strong> {paymentLabel}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{' '}
//                   {order?.isPaid
//                     ? 'Paid'
//                     : order?.paymentMethod?.status ||
//                       order?.manualPayment?.status ||
//                       'Pending'}
//                 </p>

//                 {order?.manualPayment?.senderNumber && (
//                   <p>
//                     <strong>Sender Number:</strong>{' '}
//                     {order.manualPayment.senderNumber}
//                   </p>
//                 )}

//                 {(order?.manualPayment?.transactionId ||
//                   order?.paymentMethod?.transactionId) && (
//                   <p>
//                     <strong>Transaction ID:</strong>{' '}
//                     {order?.manualPayment?.transactionId ||
//                       order?.paymentMethod?.transactionId}
//                   </p>
//                 )}
//               </InfoBox>

//               <InfoBox title="Coupon Information">
//                 <p>
//                   <strong>Coupon:</strong> {order?.coupon?.code || 'Not used'}
//                 </p>
//                 <p>
//                   <strong>Discount:</strong>{' '}
//                   {formatPrice(order?.discountPrice || 0)}
//                 </p>
//                 <p>
//                   <strong>Shipping Discount:</strong>{' '}
//                   {formatPrice(order?.coupon?.shippingDiscount || 0)}
//                 </p>
//               </InfoBox>
//             </div>

//             <div className="mt-6 ml-auto max-w-sm rounded-xl bg-gray-50 p-5">
//               <Summary label="Subtotal" value={formatPrice(order?.itemsPrice)} />
//               <Summary
//                 label="Shipping"
//                 value={formatPrice(order?.shippingPrice)}
//               />
//               <Summary
//                 label="Discount"
//                 value={`- ${formatPrice(order?.discountPrice || 0)}`}
//               />
//               <Summary label="Tax" value={formatPrice(order?.taxPrice)} />

//               <div className="mt-3 border-t border-gray-200 pt-3">
//                 <Summary
//                   label="Grand Total"
//                   value={formatPrice(order?.totalPrice)}
//                   strong
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 bg-gray-50 p-5 text-center text-xs font-semibold text-gray-500">
//             © 2026 Alucard Shop. Thank you for your purchase.
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// const InfoBox = ({ title, children }) => (
//   <div className="rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-700">
//     <h3 className="mb-2 font-black text-gray-950">{title}</h3>
//     {children}
//   </div>
// );

// const Summary = ({ label, value, strong }) => (
//   <div className="mb-2 flex items-center justify-between gap-4 text-sm">
//     <span className="text-gray-500">{label}</span>
//     <span
//       className={
//         strong ? 'text-xl font-black text-gray-950' : 'font-bold text-gray-900'
//       }
//     >
//       {value}
//     </span>
//   </div>
// );

// export default InvoicePage;









import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrderById } from '../features/OrderSlice';
import Loader from '../Components/Loader';

const formatPrice = value => {
  const amount = Number(value || 0);
  return `৳${amount.toLocaleString('en-BD')}`;
};

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

  if (order?.paymentMethod?.method === 'cod') return 'Cash On Delivery';
  if (order?.paymentMethod?.method === 'manual') return 'Manual Payment';
  if (order?.paymentMethod?.method === 'online') return 'Online';

  return order?.paymentMethod?.method || 'N/A';
};

const InvoicePage = () => {
  const invoiceRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, loading } = useSelector(state => state.Order);

  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current || downloading) return;

    try {
      setDownloading(true);

      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${order?.orderId || order?._id || id}.pdf`);
    } catch (error) {
      console.error('Invoice download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading && !order) {
    return <Loader />;
  }

  const orderItems = order?.orderItems || [];
  const address = order?.shippingAddress || {};
  const user = order?.user || {};
  const orderNumber = order?.orderId || order?._id || id;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 font-Work_sans">
      <div className="mx-auto mb-5 flex max-w-4xl justify-end">
        <button
          type="button"
          onClick={handleDownloadInvoice}
          disabled={downloading}
          className="rounded-2xl bg-black px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading ? 'Preparing PDF...' : 'Download Invoice'}
        </button>
      </div>

      <section
        ref={invoiceRef}
        className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm"
      >
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-950">Invoice</h1>

            <p className="mt-2 text-sm font-semibold text-gray-500">
              Thank you for your purchase!
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-2xl font-black text-gray-950">
              Alucard Shop
            </h2>

            <p className="mt-1 text-sm font-bold text-gray-500">
              Bangladesh
            </p>
          </div>
        </header>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <h2 className="text-lg font-black text-gray-950">
              Invoice Details
            </h2>

            <div className="mt-4 space-y-2 text-sm font-bold text-gray-600">
              <p>
                <span className="text-gray-950">Order ID:</span> {orderNumber}
              </p>

              <p>
                <span className="text-gray-950">Date:</span>{' '}
                {formatDate(order?.createdAt)}
              </p>

              <p>
                <span className="text-gray-950">Status:</span>{' '}
                {order?.isDelivered ? 'Delivered' : order?.Delivery || 'Processing'}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <h2 className="text-lg font-black text-gray-950">
              Customer Info
            </h2>

            <div className="mt-4 space-y-2 text-sm font-bold text-gray-600">
              <p>
                <span className="text-gray-950">Name:</span>{' '}
                {address?.fullName ||
                  `${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
                  'N/A'}
              </p>

              <p>
                <span className="text-gray-950">Email:</span>{' '}
                {address?.email || user?.email || 'N/A'}
              </p>

              <p>
                <span className="text-gray-950">Phone:</span>{' '}
                {address?.phone || user?.phone || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-gray-50 p-5">
          <h2 className="text-lg font-black text-gray-950">
            Shipping Address
          </h2>

          <p className="mt-3 text-sm font-bold leading-6 text-gray-600">
            {address?.address || 'N/A'}
            <br />
            City: {address?.city || 'N/A'}
            <br />
            Division: {address?.division || 'N/A'}
            <br />
            Postal Code: {address?.postalCode || 'N/A'}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-lg font-black text-gray-950">
            Ordered Items
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-xs font-black uppercase tracking-wide text-gray-500">
                    Product
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wide text-gray-500">
                    Qty
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Price
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {orderItems.length ? (
                  orderItems.map((item, index) => {
                    const qty = Number(item?.qty || item?.quantity || 1);
                    const price = Number(item?.price || 0);

                    return (
                      <tr key={item?._id || index}>
                        <td className="px-4 py-4">
                          <p className="text-sm font-black text-gray-950">
                            {item?.name || 'N/A'}
                          </p>

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
                        </td>

                        <td className="px-4 py-4 text-center text-sm font-bold text-gray-600">
                          {qty}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-bold text-gray-600">
                          {formatPrice(price)}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-black text-gray-950">
                          {formatPrice(price * qty)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center text-sm font-bold text-gray-500"
                    >
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <h3 className="text-lg font-black text-gray-950">
              Payment Info
            </h3>

            <div className="mt-4 space-y-2 text-sm font-bold text-gray-600">
              <p>
                <span className="text-gray-950">Method:</span>{' '}
                {getPaymentLabel(order)}
              </p>

              <p>
                <span className="text-gray-950">Status:</span>{' '}
                {order?.isPaid ? 'Paid' : order?.paymentMethod?.status || 'Unpaid'}
              </p>

              {order?.paymentMethod?.transactionId && (
                <p>
                  <span className="text-gray-950">Transaction ID:</span>{' '}
                  {order.paymentMethod.transactionId}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <h3 className="text-lg font-black text-gray-950">
              Summary
            </h3>

            <div className="mt-4 space-y-3 text-sm font-bold text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order?.itemsPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(order?.shippingPrice)}</span>
              </div>

              {Number(order?.discountPrice || 0) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order?.discountPrice)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-black text-gray-950">
                <span>Total</span>
                <span>{formatPrice(order?.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 border-t border-gray-200 pt-5 text-center text-xs font-bold text-gray-500">
          © 2026 Alucard Shop. All rights reserved.
        </footer>
      </section>
    </main>
  );
};

export default InvoicePage;