// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMyOrders } from '../../features/OrderSlice';
// import { getUserAllReviews } from '../../features/reviewSlice';
// const Overview = () => {
//   const { user } = useSelector((state) => state.user);
//   const { myOrders, delivered } = useSelector((state) => state.Order);
//   const { userallreviews } = useSelector((state) => state.review);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchMyOrders());
//     dispatch(getUserAllReviews());
//   }, [dispatch]);
//   return (
//     <div className="space-y-6">
//       {/* Welcome Text */}
//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Welcome back,{`${user?.firstName} ${user?.lastName}`}👋
//         </h2>
//         <p className="text-sm text-gray-600 mt-1">Here's what's happening with your account.</p>
//       </div>

//       {/* Summary Cards */}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
//           <p className="text-sm text-gray-500">Total Orders</p>
//           <h3 className="text-2xl font-bold text-blue-600 mt-1">{myOrders?.length}</h3>
//         </div>
//         <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
//           <p className="text-sm text-gray-500">Delivered Orders</p>
//           <h3 className="text-2xl font-bold text-yellow-500 mt-1">{delivered?.deliveredOrders}</h3>
//         </div>
//         <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
//           <p className="text-sm text-gray-500">Total Reviews</p>
//           <h3 className="text-2xl font-bold text-green-600 mt-1">{userallreviews?.length}</h3>
//         </div>
//       </div>

//       {/* Recent Orders */}

//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
//         <h1 className="text-red-500 font-Oswald">under developing </h1>
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
//         <ul className="divide-y divide-gray-200 text-sm">
//           <li className="py-3 flex justify-between">
//             <span>#SF-10000059</span>
//             <span className="text-gray-500">29 Apr 2025</span>
//             <span className="text-gray-700 font-medium">$620.40</span>
//             <span className="text-sm text-yellow-600">Pending</span>
//           </li>
//           <li className="py-3 flex justify-between">
//             <span>#SF-10000058</span>
//             <span className="text-gray-500">27 Apr 2025</span>
//             <span className="text-gray-700 font-medium">$210.99</span>
//             <span className="text-sm text-green-600">Delivered</span>
//           </li>
//           <li className="py-3 flex justify-between">
//             <span>#SF-10000057</span>
//             <span className="text-gray-500">25 Apr 2025</span>
//             <span className="text-gray-700 font-medium">$120.00</span>
//             <span className="text-sm text-red-500">Cancelled</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Overview;



import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  Package,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';

import { fetchMyOrders } from '../../features/OrderSlice';
import { getUserAllReviews } from '../../features/reviewSlice';

const Overview = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { myOrders = [], delivered, loading } = useSelector(
    (state) => state.Order
  );
  const { userallreviews = [] } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchMyOrders());
    dispatch(getUserAllReviews());
  }, [dispatch]);

  const recentOrders = [...myOrders].slice(0, 3);

  const totalSpent = myOrders.reduce(
    (sum, order) => sum + Number(order?.totalPrice || 0),
    0
  );

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

  const stats = [
    {
      label: 'Total Orders',
      value: myOrders.length,
      icon: <ShoppingBag size={22} />,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Delivered Orders',
      value: delivered?.deliveredOrders || 0,
      icon: <CheckCircle size={22} />,
      color: 'bg-green-50 text-green-700',
    },
    {
      label: 'Total Reviews',
      value: userallreviews.length,
      icon: <Star size={22} />,
      color: 'bg-yellow-50 text-yellow-700',
    },
    {
      label: 'Total Spent',
      value: formatPrice(totalSpent),
      icon: <Package size={22} />,
      color: 'bg-orange-50 text-orange-700',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl bg-gradient-to-r from-gray-950 to-gray-800 p-6 text-white">
        <p className="text-sm font-semibold text-yellow-400">
          Welcome back
        </p>
        <h2 className="mt-1 text-2xl font-bold">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-300">
          Here is a quick summary of your shopping activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item.label}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {item.value}
                </h3>
              </div>

              <div className={`grid h-12 w-12 place-items-center rounded-full ${item.color}`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-500">
              Your latest 3 orders.
            </p>
          </div>

          <Link
            to="/user-dashboard"
            className="text-sm font-semibold text-yellow-700 hover:text-orange-600"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-gray-500">Loading orders...</div>
        ) : recentOrders.length ? (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div
                key={order?._id || order?.orderId}
                className="grid gap-3 p-5 sm:grid-cols-4 sm:items-center"
              >
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {order?.orderId || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(order?.createdAt)}
                  </p>
                </div>

                <div className="text-sm font-semibold text-gray-800">
                  {formatPrice(order?.totalPrice)}
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                    <Clock size={13} />
                    {order?.paymentMethod?.status || 'Pending'}
                  </span>
                </div>

                <div className="sm:text-right">
                  <Link
                    to={`/view-order/${order?.orderId}`}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-950 px-4 py-2 text-xs font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-950"
                  >
                    <Truck size={14} />
                    Track Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Package className="mx-auto text-gray-400" size={42} />
            <h4 className="mt-3 text-lg font-bold text-gray-900">
              No orders yet
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              Your recent orders will appear here.
            </p>
            <Link
              to="/products"
              className="mt-4 inline-block rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-gray-950 hover:bg-yellow-500"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;