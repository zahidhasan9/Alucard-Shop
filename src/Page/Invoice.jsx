import { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../features/OrderSlice';

const InvoicePage = () => {
  const { order } = useSelector((state) => state.Order);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, []);

  const invoiceRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = invoiceRef.current;
      html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={invoiceRef}
      className="max-w-[210mm] min-h-[297mm] p-8 mx-auto bg-white shadow-lg font-sans text-gray-900"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Invoice</h1>
        <p className="text-gray-600 text-sm">Thank you for your purchase!</p>
      </header>

      {/* Customer & Shipping Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-2">Customer Info</h2>
          <p>
            <span className="font-medium">Name:</span> {order?.user?.firstName + ' ' + order?.user?.lastName || ''}
          </p>
          <p>
            <span className="font-medium">Email:</span> {order?.user?.email || ''}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {order?.user?.phone || ''}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-2">Shipping Address</h2>
          <p>{order?.shippingAddress?.address || ''}t</p>
          <p>City: {order?.shippingAddress?.city || ''}</p>
          <p>Division: {order?.shippingAddress?.division || ''}</p>
          <p>Postal Code: {order?.shippingAddress?.postalCode || ''}</p>
        </div>
      </section>

      {/* Order Status */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-2">Order Status</h2>
        <p className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 font-semibold rounded-full w-max">
          {order?.isDelivered ? 'Delivered' : 'Processing'}
        </p>
      </section>

      {/* Ordered Items */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-5 border-b border-gray-300 pb-2">Ordered Items</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b border-gray-300 text-left py-2 px-4 font-medium">Product</th>
              <th className="border-b border-gray-300 text-center py-2 px-4 font-medium">Qty</th>
              <th className="border-b border-gray-300 text-right py-2 px-4 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((item, idx) => (
              <tr className="hover:bg-gray-50 transition">
                <td className="py-3 px-4">{item.name || ''}</td>
                <td className="py-3 px-4 text-center">{item.qty || ''}</td>
                <td className="py-3 px-4 text-right">৳{item.price || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Payment Info & Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Payment Info</h3>
          <p>
            <span className="font-medium">Method:</span>{' '}
            {order?.paymentMethod?.method === 'cod'
              ? 'Cash On Delivery'
              : order?.paymentMethod?.method === 'online'
              ? 'Online'
              : 'POS' || ''}
          </p>
          <p>
            <span className="font-medium">Status:</span>{' '}
            {order?.isPaid ? (
              <span className="text-green-600 font-semibold"> Paid </span>
            ) : (
              <span className="text-red-600 font-semibold"> Unpaid </span> || ''
            )}
          </p>
          <p>
            <span className="font-medium">Transaction ID:</span> TXN12345
          </p>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Summary</h3>
          <p className="flex justify-between">
            <span>Subtotal</span> <span>{order?.itemsPrice}৳</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span> <span>{order?.shippingPrice}৳</span>
          </p>
          <p className="flex justify-between font-bold text-lg border-t border-gray-400 pt-3 mt-3">
            <span>Total</span> <span>{order?.totalPrice}৳</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 mt-20">
        <p>© 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InvoicePage;

//this is other designed invoice
// import { useEffect, useRef } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const InvoicePage = () => {
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
//         // pdf.save('invoice.pdf');
//       });
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div
//       ref={invoiceRef}
//       className="max-w-[210mm] min-h-[297mm] p-10 mx-auto bg-white shadow-lg rounded-md font-sans text-gray-900"
//       style={{ width: '210mm', minHeight: '297mm' }}
//     >
//       {/* Header */}
//       <header className="mb-12 text-center border-b border-gray-300 pb-6">
//         <h1 className="text-5xl font-extrabold tracking-tight text-indigo-700 mb-1">Invoice</h1>
//         <p className="text-gray-500 text-sm italic">Thank you for your purchase!</p>
//       </header>

//       {/* Customer & Shipping Info */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
//         <div>
//           <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">Customer Information</h2>
//           <p className="text-gray-700 mb-2">
//             <span className="font-semibold">Name:</span> Faraz
//           </p>
//           <p className="text-gray-700 mb-2">
//             <span className="font-semibold">Email:</span> faraz@email.com
//           </p>
//           <p className="text-gray-700">
//             <span className="font-semibold">Phone:</span> +880123456789
//           </p>
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">Shipping Address</h2>
//           <p className="text-gray-700 mb-1">123, Main Street</p>
//           <p className="text-gray-700 mb-1">City: Dhaka</p>
//           <p className="text-gray-700 mb-1">Division: Dhaka</p>
//           <p className="text-gray-700">Postal Code: 1207</p>
//         </div>
//       </section>

//       {/* Order Status */}
//       <section className="mb-12">
//         <h2 className="text-xl font-semibold mb-5 border-b border-gray-300 pb-2 inline-block">Order Status</h2>
//         <p className="inline-block px-5 py-2 text-yellow-800 bg-yellow-100 rounded-full font-semibold text-lg shadow-sm">
//           Processing
//         </p>
//       </section>

//       {/* Ordered Items */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">Ordered Items</h2>
//         <table className="w-full border-collapse text-base">
//           <thead>
//             <tr>
//               <th className="border-b-2 border-indigo-600 text-left py-3 px-5 font-semibold text-indigo-700">
//                 Product
//               </th>
//               <th className="border-b-2 border-indigo-600 text-center py-3 px-5 font-semibold text-indigo-700">
//                 Quantity
//               </th>
//               <th className="border-b-2 border-indigo-600 text-right py-3 px-5 font-semibold text-indigo-700">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="hover:bg-indigo-50 transition">
//               <td className="py-4 px-5">Gaming Headset</td>
//               <td className="py-4 px-5 text-center">2</td>
//               <td className="py-4 px-5 text-right font-semibold">৳2500</td>
//             </tr>
//             {/* অন্য আইটেম যোগ করতে পারেন */}
//           </tbody>
//         </table>
//       </section>

//       {/* Payment Info & Summary */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//         <div>
//           <h3 className="text-xl font-semibold mb-5 border-b border-gray-300 pb-3">Payment Information</h3>
//           <p className="mb-3 text-gray-700 text-base">
//             <span className="font-semibold">Method:</span> Online (Bkash)
//           </p>
//           <p className="mb-3 text-gray-700 text-base">
//             <span className="font-semibold">Status:</span> <span className="text-green-700 font-semibold">Paid</span>
//           </p>
//           <p className="text-gray-700 text-base">
//             <span className="font-semibold">Transaction ID:</span> TXN12345
//           </p>
//         </div>
//         <div className="text-right">
//           <h3 className="text-xl font-semibold mb-5 border-b border-gray-300 pb-3">Order Summary</h3>
//           <p className="flex justify-between text-gray-800 text-lg font-medium mb-2">
//             <span>Subtotal</span> <span>৳5000</span>
//           </p>
//           <p className="flex justify-between text-gray-800 text-lg font-medium mb-5">
//             <span>Shipping</span> <span>৳100</span>
//           </p>
//           <p className="flex justify-between font-bold text-2xl border-t border-gray-400 pt-4">
//             <span>Total</span> <span>৳5100</span>
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="text-center text-sm text-gray-500 mt-24 italic select-none">
//         <p>© 2025 TechCorp Ltd. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default InvoicePage;
