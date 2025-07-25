import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../features/OrderSlice';
import Breadcrumb from '../Components/Breadcrumb';

const UserDashboard = () => {
  const { order } = useSelector((state) => state.Order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, []);

  return (
    <>
      <div>
        <Breadcrumb />
        <div className="container mx-auto my-12 px-4 font-Work_sans">
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            {/* Sidebar */}
            <div className="md:w-72 bg-gray-50 border-r border-gray-100 p-6 space-y-8">
              {/* Customer Info */}
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Customer Info</h2>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Name:</span>{' '}
                  {order?.user?.firstName + ' ' + order?.user?.lastName || ''}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Email:</span> {order?.user?.email || ''}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Phone:</span> {order?.user?.phone || ''}
                </p>
              </div>

              {/* Shipping Info */}
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Shipping Address</h2>
                <p className="text-sm text-gray-700">{order?.shippingAddress?.address || ''}</p>
                <p className="text-sm text-gray-700">City: {order?.shippingAddress?.city || ''}</p>
                <p className="text-sm text-gray-700">Division: {order?.shippingAddress?.division || ''}</p>
                <p className="text-sm text-gray-700">Postal Code: {order?.shippingAddress?.postalCode || ''}</p>
              </div>

              {/* Order Status */}
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Order Status</h2>
                {order?.Delivery === 'pending' && (
                  <p className="text-sm font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 inline-block">
                    Pending
                  </p>
                )}
                {order?.Delivery === 'confirmed' && (
                  <p className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 inline-block">
                    Confirmed
                  </p>
                )}
                {order?.Delivery === 'shipped' && (
                  <p className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-800 inline-block">
                    Shipped
                  </p>
                )}
                {order?.Delivery === 'delivered' && (
                  <p className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800 inline-block">
                    Delivered
                  </p>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 space-y-10">
              {/* Ordered Items */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Ordered Items</h2>
                {order?.orderItems?.map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    {/* Each Item */}
                    <div className="flex items-center justify-between border border-gray-200 p-4 rounded-md ">
                      <div className="flex items-center gap-4">
                        <img src={item.image || ''} alt="Product" className="w-20 h-20 object-cover rounded-md" />
                        <div>
                          <Link to={`/product/${item.slug}`}>
                            <h3 className="font-medium text-base text-blue-700 hover:underline ">{item.name || ''}</h3>
                          </Link>
                          <p className="text-sm text-gray-600">Qty: {item.qty || ''}</p>
                        </div>
                      </div>
                      <div className="font-semibold text-gray-800">{item.price || ''}৳</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment & Summary */}
              <div className="grid md:grid-cols-2 gap-10">
                {/* Payment Info */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Info</h2>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Method:</span>{' '}
                    {order?.paymentMethod?.method === 'cod'
                      ? 'Cash On Delivery'
                      : order?.paymentMethod?.method === 'online'
                      ? 'Online'
                      : 'POS' || ''}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Status:</span>{' '}
                    {order?.isPaid ? (
                      <span className="text-green-600 font-semibold"> Paid </span>
                    ) : (
                      <span className="text-red-600 font-semibold"> Unpaid </span> || ''
                    )}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Transaction ID:</span> TXN12345 {'constant'}
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Summary</h2>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{order?.itemsPrice}৳</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{order?.shippingPrice}৳</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-base text-gray-900">
                      <span>Total</span>
                      <span>{order?.totalPrice}৳</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/invoice/${id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition shadow-sm"
                >
                  Download Invoice
                </Link>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md transition shadow-sm">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
