// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { fetchMyOrders } from '../../features/OrderSlice';

// const OrderList = () => {
//   const { myOrders } = useSelector((state) => state.Order);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchMyOrders());
//   }, [navigate]);

//   return (
//     <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">My Orders</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 text-sm text-left text-gray-700">
//           <thead className="bg-gray-50 text-xs uppercase text-gray-600 border-b">
//             <tr>
//               <th scope="col" className="px-6 py-4">
//                 Order Number
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Created At
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 {'    '}Total{'     '}
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Payment Method
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Status
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {myOrders?.map((order, index) => (
//               <tr key={index} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 md:text-sm text-xs  font-medium text-gray-900">{order?.orderId || ''}</td>
//                 <td className="px-6 py-4"> {new Date(order?.createdAt).toLocaleDateString() || ''}</td>
//                 <td className="px-6 py-4">
//                   {order?.totalPrice?.toLocaleString('en-BD', {
//                     style: 'currency',
//                     currency: 'BDT',
//                     minimumFractionDigits: 0
//                   })}
//                   ৳
//                 </td>
//                 {/* <td className="px-6 py-4">{order?.paymentMethod?.method=='cod' || ''}</td> */}
//                 <td className="px-6 py-4">
//                   {order?.paymentMethod?.method === 'cod'
//                     ? 'COD'
//                     : order?.paymentMethod?.method === 'online'
//                     ? 'Online Payment'
//                     : order?.paymentMethod?.method === 'pos'
//                     ? 'POS on Delivery'
//                     : ''}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
//                     {order?.paymentMethod?.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <Link
//                     to={`/view-order/${order.orderId}`}
//                     className="text-blue-600 hover:underline text-sm font-medium"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderList;



import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Eye, Package, ReceiptText, Truck } from 'lucide-react';

import { fetchMyOrders } from '../../features/OrderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const { myOrders = [], loading } = useSelector((state) => state.Order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

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

  const getPaymentMethod = (method) => {
    if (method === 'cod') return 'Cash on Delivery';
    if (method === 'online') return 'Online Payment';
    if (method === 'pos') return 'POS on Delivery';
    return 'N/A';
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading your orders...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-950">Your Orders</h2>
          <p className="text-sm text-gray-500">
            Track your orders and view order details.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-gray-950 hover:bg-yellow-500"
        >
          Continue Shopping
        </Link>
      </div>

      {myOrders.length ? (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div
              key={order?._id || order?.orderId}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="grid gap-3 bg-gray-50 p-4 text-sm md:grid-cols-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Order ID</p>
                  <p className="font-bold text-gray-900">{order?.orderId}</p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(order?.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-500">Total</p>
                  <p className="font-semibold text-gray-800">
                    {formatPrice(order?.totalPrice)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-500">Payment</p>
                  <p className="font-semibold text-gray-800">
                    {getPaymentMethod(order?.paymentMethod?.method)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-yellow-100 text-yellow-700">
                    <Truck size={22} />
                  </div>

                  <div>
                    <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                      {order?.orderStatus || order?.paymentMethod?.status || 'Processing'}
                    </span>
                    <p className="mt-1 text-sm text-gray-500">
                      Your order is being processed.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/view-order/${order?.orderId}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-950"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>

                  <Link
                    to={`/view-order/${order?.orderId}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <ReceiptText size={16} />
                    Invoice
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <Package className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-3 text-lg font-bold text-gray-900">
            No orders found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            You have not placed any order yet.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-block rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-gray-950 hover:bg-yellow-500"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderList;