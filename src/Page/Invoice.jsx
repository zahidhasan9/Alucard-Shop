// import { useEffect, useRef } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useParams } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrderById } from '../features/OrderSlice';

// const InvoicePage = () => {
//   const { order } = useSelector((state) => state.Order);
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(fetchOrderById(id));
//   }, []);

//   const invoiceRef = useRef();
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const input = invoiceRef.current;
//       html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('invoice.pdf');
//       });
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div
//       ref={invoiceRef}
//       className="max-w-[210mm] min-h-[297mm] p-8 mx-auto bg-white shadow-lg font-sans text-gray-900"
//       style={{ width: '210mm', minHeight: '297mm' }}
//     >
//       {/* Header */}
//       <header className="mb-10 text-center">
//         <h1 className="text-4xl font-extrabold tracking-tight mb-2">Invoice</h1>
//         <p className="text-gray-600 text-sm">Thank you for your purchase!</p>
//       </header>

//       {/* Customer & Shipping Info */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//         <div>
//           <h2 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-2">Customer Info</h2>
//           <p>
//             <span className="font-medium">Name:</span> {order?.user?.firstName + ' ' + order?.user?.lastName || ''}
//           </p>
//           <p>
//             <span className="font-medium">Email:</span> {order?.user?.email || ''}
//           </p>
//           <p>
//             <span className="font-medium">Phone:</span> {order?.user?.phone || ''}
//           </p>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-2">Shipping Address</h2>
//           <p>{order?.shippingAddress?.address || ''}t</p>
//           <p>City: {order?.shippingAddress?.city || ''}</p>
//           <p>Division: {order?.shippingAddress?.division || ''}</p>
//           <p>Postal Code: {order?.shippingAddress?.postalCode || ''}</p>
//         </div>
//       </section>

//       {/* Order Status */}
//       <section className="mb-10">
//         <h2 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-2">Order Status</h2>
//         <p className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 font-semibold rounded-full w-max">
//           {order?.isDelivered ? 'Delivered' : 'Processing'}
//         </p>
//       </section>

//       {/* Ordered Items */}
//       <section className="mb-10">
//         <h2 className="text-lg font-semibold mb-5 border-b border-gray-300 pb-2">Ordered Items</h2>
//         <table className="w-full border-collapse text-sm">
//           <thead>
//             <tr>
//               <th className="border-b border-gray-300 text-left py-2 px-4 font-medium">Product</th>
//               <th className="border-b border-gray-300 text-center py-2 px-4 font-medium">Qty</th>
//               <th className="border-b border-gray-300 text-right py-2 px-4 font-medium">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {order?.orderItems?.map((item, idx) => (
//               <tr className="hover:bg-gray-50 transition">
//                 <td className="py-3 px-4">{item.name || ''}</td>
//                 <td className="py-3 px-4 text-center">{item.qty || ''}</td>
//                 <td className="py-3 px-4 text-right">৳{item.price || ''}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Payment Info & Summary */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
//         <div>
//           <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Payment Info</h3>
//           <p>
//             <span className="font-medium">Method:</span>{' '}
//             {order?.paymentMethod?.method === 'cod'
//               ? 'Cash On Delivery'
//               : order?.paymentMethod?.method === 'online'
//               ? 'Online'
//               : 'POS' || ''}
//           </p>
//           <p>
//             <span className="font-medium">Status:</span>{' '}
//             {order?.isPaid ? (
//               <span className="text-green-600 font-semibold"> Paid </span>
//             ) : (
//               <span className="text-red-600 font-semibold"> Unpaid </span> || ''
//             )}
//           </p>
//           <p>
//             <span className="font-medium">Transaction ID:</span> TXN12345
//           </p>
//         </div>
//         <div className="text-right">
//           <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Summary</h3>
//           <p className="flex justify-between">
//             <span>Subtotal</span> <span>{order?.itemsPrice}৳</span>
//           </p>
//           <p className="flex justify-between">
//             <span>Shipping</span> <span>{order?.shippingPrice}৳</span>
//           </p>
//           <p className="flex justify-between font-bold text-lg border-t border-gray-400 pt-3 mt-3">
//             <span>Total</span> <span>{order?.totalPrice}৳</span>
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="text-center text-xs text-gray-500 mt-20">
//         <p>© 2025 Your Company. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default InvoicePage;

// //this is other designed invoice
// // import { useEffect, useRef } from 'react';
// // import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';

// // const InvoicePage = () => {
// //   const invoiceRef = useRef();

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       const input = invoiceRef.current;
// //       html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
// //         const imgData = canvas.toDataURL('image/png');
// //         const pdf = new jsPDF('p', 'mm', 'a4');
// //         const imgProps = pdf.getImageProperties(imgData);
// //         const pdfWidth = pdf.internal.pageSize.getWidth();
// //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
// //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
// //         // pdf.save('invoice.pdf');
// //       });
// //     }, 1000);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div
// //       ref={invoiceRef}
// //       className="max-w-[210mm] min-h-[297mm] p-10 mx-auto bg-white shadow-lg rounded-md font-sans text-gray-900"
// //       style={{ width: '210mm', minHeight: '297mm' }}
// //     >
// //       {/* Header */}
// //       <header className="mb-12 text-center border-b border-gray-300 pb-6">
// //         <h1 className="text-5xl font-extrabold tracking-tight text-indigo-700 mb-1">Invoice</h1>
// //         <p className="text-gray-500 text-sm italic">Thank you for your purchase!</p>
// //       </header>

// //       {/* Customer & Shipping Info */}
// //       <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">Customer Information</h2>
// //           <p className="text-gray-700 mb-2">
// //             <span className="font-semibold">Name:</span> Faraz
// //           </p>
// //           <p className="text-gray-700 mb-2">
// //             <span className="font-semibold">Email:</span> faraz@email.com
// //           </p>
// //           <p className="text-gray-700">
// //             <span className="font-semibold">Phone:</span> +880123456789
// //           </p>
// //         </div>
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">Shipping Address</h2>
// //           <p className="text-gray-700 mb-1">123, Main Street</p>
// //           <p className="text-gray-700 mb-1">City: Dhaka</p>
// //           <p className="text-gray-700 mb-1">Division: Dhaka</p>
// //           <p className="text-gray-700">Postal Code: 1207</p>
// //         </div>
// //       </section>

// //       {/* Order Status */}
// //       <section className="mb-12">
// //         <h2 className="text-xl font-semibold mb-5 border-b border-gray-300 pb-2 inline-block">Order Status</h2>
// //         <p className="inline-block px-5 py-2 text-yellow-800 bg-yellow-100 rounded-full font-semibold text-lg shadow-sm">
// //           Processing
// //         </p>
// //       </section>

// //       {/* Ordered Items */}
// //       <section className="mb-12">
// //         <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">Ordered Items</h2>
// //         <table className="w-full border-collapse text-base">
// //           <thead>
// //             <tr>
// //               <th className="border-b-2 border-indigo-600 text-left py-3 px-5 font-semibold text-indigo-700">
// //                 Product
// //               </th>
// //               <th className="border-b-2 border-indigo-600 text-center py-3 px-5 font-semibold text-indigo-700">
// //                 Quantity
// //               </th>
// //               <th className="border-b-2 border-indigo-600 text-right py-3 px-5 font-semibold text-indigo-700">Price</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             <tr className="hover:bg-indigo-50 transition">
// //               <td className="py-4 px-5">Gaming Headset</td>
// //               <td className="py-4 px-5 text-center">2</td>
// //               <td className="py-4 px-5 text-right font-semibold">৳2500</td>
// //             </tr>
// //             {/* অন্য আইটেম যোগ করতে পারেন */}
// //           </tbody>
// //         </table>
// //       </section>

// //       {/* Payment Info & Summary */}
// //       <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
// //         <div>
// //           <h3 className="text-xl font-semibold mb-5 border-b border-gray-300 pb-3">Payment Information</h3>
// //           <p className="mb-3 text-gray-700 text-base">
// //             <span className="font-semibold">Method:</span> Online (Bkash)
// //           </p>
// //           <p className="mb-3 text-gray-700 text-base">
// //             <span className="font-semibold">Status:</span> <span className="text-green-700 font-semibold">Paid</span>
// //           </p>
// //           <p className="text-gray-700 text-base">
// //             <span className="font-semibold">Transaction ID:</span> TXN12345
// //           </p>
// //         </div>
// //         <div className="text-right">
// //           <h3 className="text-xl font-semibold mb-5 border-b border-gray-300 pb-3">Order Summary</h3>
// //           <p className="flex justify-between text-gray-800 text-lg font-medium mb-2">
// //             <span>Subtotal</span> <span>৳5000</span>
// //           </p>
// //           <p className="flex justify-between text-gray-800 text-lg font-medium mb-5">
// //             <span>Shipping</span> <span>৳100</span>
// //           </p>
// //           <p className="flex justify-between font-bold text-2xl border-t border-gray-400 pt-4">
// //             <span>Total</span> <span>৳5100</span>
// //           </p>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="text-center text-sm text-gray-500 mt-24 italic select-none">
// //         <p>© 2025 TechCorp Ltd. All rights reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default InvoicePage;



// import { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrderById } from '../features/OrderSlice';
// import Loader from '../Components/Loader';

// const InvoicePage = () => {
//   const invoiceRef = useRef(null);
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const { order, loading } = useSelector((state) => state.Order);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchOrderById(id));
//     }
//   }, [dispatch, id]);

//   const handleDownloadInvoice = async () => {
//     if (!invoiceRef.current || downloading) return;

//     try {
//       setDownloading(true);

//       const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
//         import('jspdf'),
//         import('html2canvas'),
//       ]);

//       const canvas = await html2canvas(invoiceRef.current, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: '#ffffff',
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`invoice-${order?._id || id}.pdf`);
//     } catch (error) {
//       console.error('Invoice download failed:', error);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   if (loading && !order) {
//     return <Loader />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <div className="mx-auto mb-4 flex max-w-4xl justify-end">
//         <button
//           type="button"
//           onClick={handleDownloadInvoice}
//           disabled={downloading}
//           className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {downloading ? 'Preparing PDF...' : 'Download Invoice'}
//         </button>
//       </div>

//       <div
//         ref={invoiceRef}
//         id="invoice"
//         className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow"
//       >
//         <div className="mb-8 flex items-start justify-between border-b pb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Thank you for your purchase!
//             </p>
//           </div>

//           <div className="text-right text-sm text-gray-600">
//             <p>
//               <span className="font-semibold">Order ID:</span>{' '}
//               {order?._id || id}
//             </p>
//             <p>
//               <span className="font-semibold">Status:</span>{' '}
//               {order?.isDelivered ? 'Delivered' : 'Processing'}
//             </p>
//           </div>
//         </div>

//         <div className="mb-8 grid gap-6 md:grid-cols-2">
//           <div>
//             <h2 className="mb-3 text-lg font-semibold text-gray-900">
//               Customer Info
//             </h2>
//             <p className="text-sm text-gray-700">
//               Name:{' '}
//               {`${order?.user?.firstName || ''} ${
//                 order?.user?.lastName || ''
//               }`.trim() || 'N/A'}
//             </p>
//             <p className="text-sm text-gray-700">
//               Email: {order?.user?.email || 'N/A'}
//             </p>
//             <p className="text-sm text-gray-700">
//               Phone: {order?.user?.phone || 'N/A'}
//             </p>
//           </div>

//           <div>
//             <h2 className="mb-3 text-lg font-semibold text-gray-900">
//               Shipping Address
//             </h2>
//             <p className="text-sm text-gray-700">
//               {order?.shippingAddress?.address || 'N/A'}
//             </p>
//             <p className="text-sm text-gray-700">
//               City: {order?.shippingAddress?.city || 'N/A'}
//             </p>
//             <p className="text-sm text-gray-700">
//               Division: {order?.shippingAddress?.division || 'N/A'}
//             </p>
//             <p className="text-sm text-gray-700">
//               Postal Code: {order?.shippingAddress?.postalCode || 'N/A'}
//             </p>
//           </div>
//         </div>

//         <div className="mb-8">
//           <h2 className="mb-4 text-lg font-semibold text-gray-900">
//             Ordered Items
//           </h2>

//           <div className="overflow-hidden rounded-lg border">
//             <table className="w-full border-collapse text-left text-sm">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="px-4 py-3">Product</th>
//                   <th className="px-4 py-3 text-center">Qty</th>
//                   <th className="px-4 py-3 text-right">Price</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {order?.orderItems?.length ? (
//                   order.orderItems.map((item, index) => (
//                     <tr key={item?._id || index} className="border-t">
//                       <td className="px-4 py-3">{item?.name || 'N/A'}</td>
//                       <td className="px-4 py-3 text-center">
//                         {item?.qty || 0}
//                       </td>
//                       <td className="px-4 py-3 text-right">
//                         ৳{item?.price || 0}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="3"
//                       className="px-4 py-6 text-center text-gray-500"
//                     >
//                       No items found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2">
//           <div>
//             <h3 className="mb-3 text-lg font-semibold text-gray-900">
//               Payment Info
//             </h3>

//             <p className="text-sm text-gray-700">
//               Method:{' '}
//               {order?.paymentMethod?.method === 'cod'
//                 ? 'Cash On Delivery'
//                 : order?.paymentMethod?.method === 'online'
//                   ? 'Online'
//                   : order?.paymentMethod?.method || 'N/A'}
//             </p>

//             <p className="text-sm text-gray-700">
//               Status:{' '}
//               <span
//                 className={
//                   order?.isPaid
//                     ? 'font-semibold text-green-600'
//                     : 'font-semibold text-red-600'
//                 }
//               >
//                 {order?.isPaid ? 'Paid' : 'Unpaid'}
//               </span>
//             </p>
//           </div>

//           <div className="rounded-lg bg-gray-50 p-4">
//             <h3 className="mb-3 text-lg font-semibold text-gray-900">
//               Summary
//             </h3>

//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>৳{order?.itemsPrice || 0}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>৳{order?.shippingPrice || 0}</span>
//               </div>

//               <div className="flex justify-between border-t pt-2 text-base font-bold">
//                 <span>Total</span>
//                 <span>৳{order?.totalPrice || 0}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 border-t pt-4 text-center text-xs text-gray-500">
//           © 2026 Alucard Shop. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoicePage;




import { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../features/OrderSlice';

const InvoicePage = () => {
  const { order } = useSelector((state) => state.Order);
  const dispatch = useDispatch();
  const { id } = useParams();
  const invoiceRef = useRef();

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

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

  const downloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
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
    pdf.save(`invoice-${order?.orderId || id}.pdf`);
  };

  const paymentLabel =
    order?.manualPayment?.provider?.toUpperCase() ||
    (order?.paymentMethod?.method === 'cod'
      ? 'Cash on Delivery'
      : order?.paymentMethod?.method || 'Payment');

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 font-Work_sans">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex items-center justify-between">
          <Link
            to={`/view-order/${order?.orderId || id}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-yellow-700"
          >
            <ArrowLeft size={17} />
            Back to Order
          </Link>

          <button
            onClick={downloadPDF}
            className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-black text-yellow-400 hover:bg-yellow-400 hover:text-gray-950"
          >
            <Download size={17} />
            Download PDF
          </button>
        </div>

        <div
          ref={invoiceRef}
          className="overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <div className="bg-gray-950 p-8 text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-black text-yellow-400">
                  ALUCARD SHOP
                </h1>
                <p className="mt-1 text-sm text-gray-300">
                  Professional eCommerce Invoice
                </p>
              </div>

              <div className="text-left sm:text-right">
                <h2 className="text-2xl font-black">Invoice</h2>
                <p className="mt-1 text-sm text-gray-300">
                  #{order?.orderId || id}
                </p>
                <p className="text-sm text-gray-300">
                  {formatDate(order?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 border-b border-gray-200 p-6 md:grid-cols-2">
            <InfoBox title="Customer Info">
              <p>
                <strong>Name:</strong>{' '}
                {order?.shippingAddress?.fullName ||
                  `${order?.user?.firstName || ''} ${
                    order?.user?.lastName || ''
                  }`}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                {order?.shippingAddress?.email || order?.user?.email || 'N/A'}
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                {order?.shippingAddress?.phone || order?.user?.phone || 'N/A'}
              </p>
            </InfoBox>

            <InfoBox title="Shipping Address">
              <p>{order?.shippingAddress?.address || 'N/A'}</p>
              <p>
                {order?.shippingAddress?.city || ''},{' '}
                {order?.shippingAddress?.division || ''}
              </p>
              <p>Postal Code: {order?.shippingAddress?.postalCode || 'N/A'}</p>
            </InfoBox>
          </div>

          <div className="p-6">
            <h3 className="mb-3 text-lg font-black text-gray-950">
              Ordered Items
            </h3>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {order?.orderItems?.map((item) => (
                    <tr key={item._id}>
                      <td className="p-3 font-bold text-gray-900">
                        {item.name}
                      </td>
                      <td className="p-3 text-center">{item.qty}</td>
                      <td className="p-3 text-right">
                        {formatPrice(item.price)}
                      </td>
                      <td className="p-3 text-right font-bold">
                        {formatPrice(item.price * item.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <InfoBox title="Payment Information">
                <p>
                  <strong>Method:</strong> {paymentLabel}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {order?.isPaid
                    ? 'Paid'
                    : order?.paymentMethod?.status ||
                      order?.manualPayment?.status ||
                      'Pending'}
                </p>

                {order?.manualPayment?.senderNumber && (
                  <p>
                    <strong>Sender Number:</strong>{' '}
                    {order.manualPayment.senderNumber}
                  </p>
                )}

                {(order?.manualPayment?.transactionId ||
                  order?.paymentMethod?.transactionId) && (
                  <p>
                    <strong>Transaction ID:</strong>{' '}
                    {order?.manualPayment?.transactionId ||
                      order?.paymentMethod?.transactionId}
                  </p>
                )}
              </InfoBox>

              <InfoBox title="Coupon Information">
                <p>
                  <strong>Coupon:</strong> {order?.coupon?.code || 'Not used'}
                </p>
                <p>
                  <strong>Discount:</strong>{' '}
                  {formatPrice(order?.discountPrice || 0)}
                </p>
                <p>
                  <strong>Shipping Discount:</strong>{' '}
                  {formatPrice(order?.coupon?.shippingDiscount || 0)}
                </p>
              </InfoBox>
            </div>

            <div className="mt-6 ml-auto max-w-sm rounded-xl bg-gray-50 p-5">
              <Summary label="Subtotal" value={formatPrice(order?.itemsPrice)} />
              <Summary
                label="Shipping"
                value={formatPrice(order?.shippingPrice)}
              />
              <Summary
                label="Discount"
                value={`- ${formatPrice(order?.discountPrice || 0)}`}
              />
              <Summary label="Tax" value={formatPrice(order?.taxPrice)} />

              <div className="mt-3 border-t border-gray-200 pt-3">
                <Summary
                  label="Grand Total"
                  value={formatPrice(order?.totalPrice)}
                  strong
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 p-5 text-center text-xs font-semibold text-gray-500">
            © 2026 Alucard Shop. Thank you for your purchase.
          </div>
        </div>
      </div>
    </main>
  );
};

const InfoBox = ({ title, children }) => (
  <div className="rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-700">
    <h3 className="mb-2 font-black text-gray-950">{title}</h3>
    {children}
  </div>
);

const Summary = ({ label, value, strong }) => (
  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
    <span className="text-gray-500">{label}</span>
    <span
      className={
        strong ? 'text-xl font-black text-gray-950' : 'font-bold text-gray-900'
      }
    >
      {value}
    </span>
  </div>
);

export default InvoicePage;