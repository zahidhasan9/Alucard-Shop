// src/pages/OrderSuccessPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';
import { getLastOrder } from '../features/OrderSlice';

const OrderSuccessPage = () => {
  const dispatch = useDispatch();

  const { lastOrder } = useSelector((state) => state.Order);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLastOrder());
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-xl border border-green-300 rounded-xl p-10 max-w-xl w-full text-center animate-fade-in">
        <div className="text-green-600 mb-4 flex justify-center">
          <PartyPopper className="w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Order Confirmed</h1>
        <p className="text-gray-700 mb-4">
          Thank you, <span className="font-semibold">{user?.firstName + ' ' + user?.lastName || 'Customer'}</span>!
          <br />
          Your order has been successfully placed.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left text-sm md:text-base mb-6">
          <p>
            <span className="font-semibold text-green-800">Order ID:</span> {lastOrder?.orderId || ''}
          </p>
          <p>
            <span className="font-semibold text-green-800">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold text-green-800">Total:</span> {lastOrder?.totalPrice}৳
          </p>
        </div>

        <Link
          to="/"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
