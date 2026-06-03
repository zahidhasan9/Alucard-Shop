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



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Eye, Package, ReceiptText, Truck } from 'lucide-react';

// import { fetchMyOrders } from '../../features/OrderSlice';

// const OrderList = () => {
//   const dispatch = useDispatch();
//   const { myOrders = [], loading } = useSelector((state) => state.Order);

//   useEffect(() => {
//     dispatch(fetchMyOrders());
//   }, [dispatch]);

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

//   const getPaymentMethod = (method) => {
//     if (method === 'cod') return 'Cash on Delivery';
//     if (method === 'online') return 'Online Payment';
//     if (method === 'pos') return 'POS on Delivery';
//     return 'N/A';
//   };

//   if (loading) {
//     return <p className="text-sm text-gray-500">Loading your orders...</p>;
//   }

//   return (
//     <div>
//       <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-950">Your Orders</h2>
//           <p className="text-sm text-gray-500">
//             Track your orders and view order details.
//           </p>
//         </div>

//         <Link
//           to="/products"
//           className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-gray-950 hover:bg-yellow-500"
//         >
//           Continue Shopping
//         </Link>
//       </div>

//       {myOrders.length ? (
//         <div className="space-y-4">
//           {myOrders.map((order) => (
//             <div
//               key={order?._id || order?.orderId}
//               className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
//             >
//               <div className="grid gap-3 bg-gray-50 p-4 text-sm md:grid-cols-4">
//                 <div>
//                   <p className="text-xs uppercase text-gray-500">Order ID</p>
//                   <p className="font-bold text-gray-900">{order?.orderId}</p>
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase text-gray-500">Date</p>
//                   <p className="font-semibold text-gray-800">
//                     {formatDate(order?.createdAt)}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase text-gray-500">Total</p>
//                   <p className="font-semibold text-gray-800">
//                     {formatPrice(order?.totalPrice)}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase text-gray-500">Payment</p>
//                   <p className="font-semibold text-gray-800">
//                     {getPaymentMethod(order?.paymentMethod?.method)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="grid h-11 w-11 place-items-center rounded-full bg-yellow-100 text-yellow-700">
//                     <Truck size={22} />
//                   </div>

//                   <div>
//                     <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
//                       {order?.orderStatus || order?.paymentMethod?.status || 'Processing'}
//                     </span>
//                     <p className="mt-1 text-sm text-gray-500">
//                       Your order is being processed.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   <Link
//                     to={`/view-order/${order?.orderId}`}
//                     className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-950"
//                   >
//                     <Eye size={16} />
//                     View Details
//                   </Link>

//                   <Link
//                     to={`/view-order/${order?.orderId}`}
//                     className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
//                   >
//                     <ReceiptText size={16} />
//                     Invoice
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
//           <Package className="mx-auto text-gray-400" size={48} />
//           <h3 className="mt-3 text-lg font-bold text-gray-900">
//             No orders found
//           </h3>
//           <p className="mt-1 text-sm text-gray-500">
//             You have not placed any order yet.
//           </p>
//           <Link
//             to="/products"
//             className="mt-5 inline-block rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-gray-950 hover:bg-yellow-500"
//           >
//             Start Shopping
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderList;



import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Eye,
  Package,
  Search,
  ShoppingBag,
  Truck,
  X,
} from 'lucide-react';

import { fetchMyOrders } from '../../features/OrderSlice';

const deliveryConfig = {
  pending: {
    label: 'Pending',
    text: 'Waiting for confirmation',
    badge: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    dot: 'bg-yellow-500',
    icon: Clock3,
  },
  confirmed: {
    label: 'Confirmed',
    text: 'Order confirmed',
    badge: 'bg-black text-yellow-300 border-black',
    dot: 'bg-black',
    icon: CheckCircle2,
  },
  shipped: {
    label: 'Shipped',
    text: 'On the way',
    badge: 'bg-yellow-200 text-black border-yellow-300',
    dot: 'bg-yellow-600',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    text: 'Completed',
    badge: 'bg-black text-yellow-300 border-black',
    dot: 'bg-black',
    icon: CheckCircle2,
  },
};

const paymentConfig = {
  pending: {
    label: 'Payment Pending',
    badge: 'bg-yellow-50 text-yellow-900 border-yellow-200',
  },
  submitted: {
    label: 'Payment Submitted',
    badge: 'bg-yellow-100 text-yellow-900 border-yellow-300',
  },
  paid: {
    label: 'Paid',
    badge: 'bg-black text-yellow-300 border-black',
  },
  failed: {
    label: 'Payment Failed',
    badge: 'bg-red-50 text-red-700 border-red-200',
  },
};

const deliverySteps = ['pending', 'confirmed', 'shipped', 'delivered'];

const formatDate = (date) => {
  if (!date) return 'Not available';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Not available';
  }

  return parsedDate.toLocaleDateString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatCurrency = (amount) => {
  const value = Number(amount || 0);
  return `৳ ${value.toLocaleString('en-BD')}`;
};

const getDeliveryStatus = (order) => {
  return order?.Delivery || 'pending';
};

const getPaymentStatus = (order) => {
  if (order?.paymentMethod?.status) {
    return order.paymentMethod.status;
  }

  if (order?.isPaid) {
    return 'paid';
  }

  return 'pending';
};

const getPaymentMethod = (method) => {
  const methods = {
    cod: 'COD',
    manual: 'Manual',
    online: 'Online',
    stripe: 'Stripe',
    sslcommerz: 'SSLCommerz',
    pos: 'POS',
  };

  return methods[method] || 'N/A';
};

const getOrderItemsCount = (order) => {
  if (!Array.isArray(order?.orderItems)) {
    return 0;
  }

  return order.orderItems.reduce((total, item) => {
    return total + Number(item?.qty || item?.quantity || 0);
  }, 0);
};

const getOrderLinkId = (order) => {
  return order?.orderId || order?._id;
};

const getDeliveryProgress = (status) => {
  const currentIndex = deliverySteps.indexOf(status);

  if (currentIndex < 0) return 25;

  return ((currentIndex + 1) / deliverySteps.length) * 100;
};

const getSearchText = (order) => {
  const deliveryStatus = getDeliveryStatus(order);
  const paymentStatus = getPaymentStatus(order);

  return [
    order?.orderId,
    order?._id,
    order?.totalPrice,
    deliveryStatus,
    paymentStatus,
    order?.paymentMethod?.method,
    order?.shippingAddress?.fullName,
    order?.shippingAddress?.phone,
    order?.shippingAddress?.city,
    order?.shippingAddress?.division,
    formatDate(order?.createdAt),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
};

const StatusBadge = ({ type, value }) => {
  const config =
    type === 'delivery'
      ? deliveryConfig[value] || deliveryConfig.pending
      : paymentConfig[value] || paymentConfig.pending;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${config.badge}`}
    >
      {config.label}
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-normal uppercase tracking-[0.14em] text-gray-500">
            {label}
          </p>
          <h3 className="mt-1 text-2xl font-medium tracking-tight text-black">
            {value}
          </h3>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-yellow-300 text-black">
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
};

const OrderProgress = ({ status }) => {
  return (
    <div className="mt-3">
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-yellow-300 transition-all duration-500"
          style={{ width: `${getDeliveryProgress(status)}%` }}
        />
      </div>

      <div className="mt-2 grid grid-cols-4 gap-1">
        {deliverySteps.map((step) => {
          const stepIndex = deliverySteps.indexOf(step);
          const activeIndex = deliverySteps.indexOf(status);
          const isActive = stepIndex <= activeIndex;

          return (
            <span
              key={step}
              className={`text-center text-[10px] font-normal ${
                isActive ? 'text-black' : 'text-gray-400'
              }`}
            >
              {deliveryConfig[step].label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => {
  const deliveryStatus = getDeliveryStatus(order);
  const paymentStatus = getPaymentStatus(order);
  const delivery = deliveryConfig[deliveryStatus] || deliveryConfig.pending;
  const DeliveryIcon = delivery.icon;
  const orderLinkId = getOrderLinkId(order);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:border-yellow-300 hover:shadow-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[11px] font-medium text-yellow-300">
              #{order?.orderId || order?._id || 'N/A'}
            </span>

            <StatusBadge type="delivery" value={deliveryStatus} />
            <StatusBadge type="payment" value={paymentStatus} />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
            <div>
              <p className="text-[11px] font-normal uppercase tracking-[0.12em] text-gray-400">
                Date
              </p>
              <p className="mt-1 font-medium text-black">
                {formatDate(order?.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-normal uppercase tracking-[0.12em] text-gray-400">
                Total
              </p>
              <p className="mt-1 font-medium text-black">
                {formatCurrency(order?.totalPrice)}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-normal uppercase tracking-[0.12em] text-gray-400">
                Payment
              </p>
              <p className="mt-1 font-medium text-black">
                {getPaymentMethod(order?.paymentMethod?.method)}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-normal uppercase tracking-[0.12em] text-gray-400">
                Items
              </p>
              <p className="mt-1 font-medium text-black">
                {getOrderItemsCount(order)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 lg:w-[230px] lg:justify-end">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-300 text-black">
              <DeliveryIcon size={19} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-medium text-black">{delivery.label}</p>
              <p className="text-xs font-normal text-gray-500">
                {delivery.text}
              </p>
            </div>
          </div>

          <Link
            to={`/view-order/${orderLinkId}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-yellow-300 transition duration-300 hover:bg-yellow-300 hover:text-black"
            title="View order details"
          >
            <Eye size={17} strokeWidth={1.8} />
          </Link>
        </div>
      </div>

      <OrderProgress status={deliveryStatus} />
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const visiblePages = pages.filter((page) => {
    return (
      page === 1 ||
      page === totalPages ||
      Math.abs(page - currentPage) <= 1
    );
  });

  return (
    <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-normal text-gray-600">
        Showing{' '}
        <span className="font-medium text-black">
          {startIndex + 1}-{endIndex}
        </span>{' '}
        of <span className="font-medium text-black">{totalItems}</span> orders
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-200 bg-white text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} strokeWidth={1.8} />
        </button>

        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const showDots = previousPage && page - previousPage > 1;

          return (
            <div key={page} className="flex items-center gap-2">
              {showDots && (
                <span className="text-sm font-normal text-gray-400">...</span>
              )}

              <button
                type="button"
                onClick={() => onPageChange(page)}
                className={`h-9 min-w-9 rounded-full px-3 text-sm font-medium transition ${
                  currentPage === page
                    ? 'bg-black text-yellow-300'
                    : 'border border-yellow-200 bg-white text-black hover:bg-yellow-300'
                }`}
              >
                {page}
              </button>
            </div>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-200 bg-white text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
};

const OrderList = () => {
  const dispatch = useDispatch();

  const { myOrders, delivered, loading, error } = useSelector(
    (state) => state.Order
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const orders = Array.isArray(myOrders) ? myOrders : [];

  const summary = useMemo(() => {
    const apiSummary =
      delivered && typeof delivered === 'object' && !Array.isArray(delivered)
        ? delivered
        : {};

    return {
      totalOrders: Number(apiSummary.totalOrders ?? orders.length),
      pendingOrders: Number(
        apiSummary.pendingOrders ??
          orders.filter((order) => getDeliveryStatus(order) === 'pending').length
      ),
      confirmedOrders: Number(
        apiSummary.confirmedOrders ??
          orders.filter((order) => getDeliveryStatus(order) === 'confirmed')
            .length
      ),
      shippedOrders: Number(
        apiSummary.shippedOrders ??
          orders.filter((order) => getDeliveryStatus(order) === 'shipped').length
      ),
      deliveredOrders: Number(
        apiSummary.deliveredOrders ??
          orders.filter((order) => getDeliveryStatus(order) === 'delivered')
            .length
      ),
    };
  }, [delivered, orders]);

  const filteredOrders = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return orders.filter((order) => {
      const deliveryStatus = getDeliveryStatus(order);
      const paymentStatus = getPaymentStatus(order);

      const matchSearch = cleanSearch
        ? getSearchText(order).includes(cleanSearch)
        : true;

      const matchDelivery =
        deliveryFilter === 'all' || deliveryStatus === deliveryFilter;

      const matchPayment =
        paymentFilter === 'all' || paymentStatus === paymentFilter;

      return matchSearch && matchDelivery && matchPayment;
    });
  }, [orders, searchTerm, deliveryFilter, paymentFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredOrders.length);

  const paginatedOrders = useMemo(() => {
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, startIndex, endIndex]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deliveryFilter, paymentFilter, pageSize]);

  const clearFilters = () => {
    setSearchTerm('');
    setDeliveryFilter('all');
    setPaymentFilter('all');
    setPageSize(10);
    setCurrentPage(1);
  };

  const hasActiveFilter =
    searchTerm || deliveryFilter !== 'all' || paymentFilter !== 'all';

  if (loading && orders.length === 0) {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-9 w-48 rounded-full bg-yellow-100" />
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-24 rounded-2xl bg-yellow-50" />
            ))}
          </div>
          <div className="h-32 rounded-2xl bg-gray-100" />
          <div className="h-32 rounded-2xl bg-gray-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="font-Work_sans text-black">
      <div className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-200 via-yellow-100 to-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-medium text-yellow-300">
              <Package size={14} strokeWidth={1.8} />
              Order Dashboard
            </div>

            <h2 className="text-2xl font-medium tracking-tight text-black md:text-4xl">
              My Orders
            </h2>

            <p className="mt-2 max-w-2xl text-sm font-normal leading-6 text-gray-700">
              Delivery status and payment status are separated for clearer order
              tracking.
            </p>
          </div>

          <div className="rounded-2xl bg-black px-4 py-3 text-yellow-300">
            <p className="text-[11px] font-normal uppercase tracking-[0.16em] text-yellow-200">
              Total Orders
            </p>
            <p className="mt-1 text-2xl font-medium tracking-tight">
              {summary.totalOrders}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={18} strokeWidth={1.8} className="mt-0.5" />
          <div>
            <p className="text-sm font-medium">Order loading failed</p>
            <p className="text-sm font-normal">{error}</p>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard icon={Clock3} label="Pending" value={summary.pendingOrders} />
        <StatCard
          icon={CheckCircle2}
          label="Confirmed"
          value={summary.confirmedOrders}
        />
        <StatCard icon={Truck} label="Shipped" value={summary.shippedOrders} />
        <StatCard
          icon={ShoppingBag}
          label="Delivered"
          value={summary.deliveredOrders}
        />
      </div>

      <div className="mt-5 rounded-3xl border border-yellow-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_170px_170px_120px_auto]">
          <div className="relative">
            <Search
              size={17}
              strokeWidth={1.8}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by order ID, status, phone, city, amount..."
              className="h-11 w-full rounded-full border border-yellow-200 bg-yellow-50 pl-10 pr-4 text-sm font-normal text-black outline-none transition placeholder:text-gray-400 focus:border-yellow-300 focus:bg-white"
            />
          </div>

          <select
            value={deliveryFilter}
            onChange={(event) => setDeliveryFilter(event.target.value)}
            className="h-11 rounded-full border border-yellow-200 bg-yellow-50 px-4 text-sm font-normal text-black outline-none focus:border-yellow-300 focus:bg-white"
          >
            <option value="all">All Delivery</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(event) => setPaymentFilter(event.target.value)}
            className="h-11 rounded-full border border-yellow-200 bg-yellow-50 px-4 text-sm font-normal text-black outline-none focus:border-yellow-300 focus:bg-white"
          >
            <option value="all">All Payment</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
            className="h-11 rounded-full border border-yellow-200 bg-yellow-50 px-4 text-sm font-normal text-black outline-none focus:border-yellow-300 focus:bg-white"
          >
            <option value={10}>10/page</option>
            <option value={20}>20/page</option>
            <option value={50}>50/page</option>
          </select>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-yellow-200 bg-black px-4 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
            >
              <X size={16} strokeWidth={1.8} />
              Clear
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-2 text-sm font-normal text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Found{' '}
            <span className="font-medium text-black">
              {filteredOrders.length}
            </span>{' '}
            order{filteredOrders.length > 1 ? 's' : ''}
          </p>

          <p>
            Page{' '}
            <span className="font-medium text-black">{safeCurrentPage}</span> of{' '}
            <span className="font-medium text-black">{totalPages}</span>
          </p>
        </div>
      </div>

      <div className="mt-5">
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-yellow-300 bg-yellow-50 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-300 text-black">
              <ShoppingBag size={24} strokeWidth={1.8} />
            </div>

            <h4 className="mt-4 text-lg font-medium tracking-tight text-black">
              No orders found
            </h4>

            <p className="mx-auto mt-2 max-w-md text-sm font-normal leading-6 text-gray-600">
              After checkout, your order delivery progress will appear here.
            </p>

            <Link
              to="/products"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-yellow-300 transition duration-300 hover:bg-yellow-300 hover:text-black"
            >
              Continue Shopping
            </Link>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8 text-center">
            <Search
              size={26}
              strokeWidth={1.8}
              className="mx-auto text-black"
            />

            <h4 className="mt-4 text-lg font-medium tracking-tight text-black">
              No matching order
            </h4>

            <p className="mx-auto mt-2 max-w-md text-sm font-normal leading-6 text-gray-600">
              Try a different order ID, payment status, delivery status, phone,
              city or amount.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedOrders.map((order) => (
                <OrderCard key={order?._id || order?.orderId} order={order} />
              ))}
            </div>

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredOrders.length}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderList;