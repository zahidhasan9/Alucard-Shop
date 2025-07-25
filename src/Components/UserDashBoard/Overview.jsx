import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../../features/OrderSlice';
import { getUserAllReviews } from '../../features/reviewSlice';
const Overview = () => {
  const { user } = useSelector((state) => state.user);
  const { myOrders, delivered } = useSelector((state) => state.Order);
  const { userallreviews } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyOrders());
    dispatch(getUserAllReviews());
  }, [dispatch]);
  return (
    <div className="space-y-6">
      {/* Welcome Text */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome back,{`${user?.firstName} ${user?.lastName}`}👋
        </h2>
        <p className="text-sm text-gray-600 mt-1">Here's what's happening with your account.</p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">{myOrders?.length}</h3>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Delivered Orders</p>
          <h3 className="text-2xl font-bold text-yellow-500 mt-1">{delivered?.deliveredOrders}</h3>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <h3 className="text-2xl font-bold text-green-600 mt-1">{userallreviews?.length}</h3>
        </div>
      </div>

      {/* Recent Orders */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h1 className="text-red-500 font-Oswald">under developing </h1>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <ul className="divide-y divide-gray-200 text-sm">
          <li className="py-3 flex justify-between">
            <span>#SF-10000059</span>
            <span className="text-gray-500">29 Apr 2025</span>
            <span className="text-gray-700 font-medium">$620.40</span>
            <span className="text-sm text-yellow-600">Pending</span>
          </li>
          <li className="py-3 flex justify-between">
            <span>#SF-10000058</span>
            <span className="text-gray-500">27 Apr 2025</span>
            <span className="text-gray-700 font-medium">$210.99</span>
            <span className="text-sm text-green-600">Delivered</span>
          </li>
          <li className="py-3 flex justify-between">
            <span>#SF-10000057</span>
            <span className="text-gray-500">25 Apr 2025</span>
            <span className="text-gray-700 font-medium">$120.00</span>
            <span className="text-sm text-red-500">Cancelled</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
