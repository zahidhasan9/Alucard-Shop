const OrderList = () => {
  const orders = [
    {
      orderNumber: '#SF-10000059',
      createdAt: '29 Apr 2025 07:23:03',
      total: '$620.40 for 1 item(s)',
      paymentMethod: 'Cash on delivery (COD)',
      status: 'Pending'
    }
    // আরও order চাইলে এখানে add করতে পারো
  ];

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600 border-b">
            <tr>
              <th scope="col" className="px-6 py-4">
                Order Number
              </th>
              <th scope="col" className="px-6 py-4">
                Created At
              </th>
              <th scope="col" className="px-6 py-4">
                Total
              </th>
              <th scope="col" className="px-6 py-4">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{order.orderNumber}</td>
                <td className="px-6 py-4">{order.createdAt}</td>
                <td className="px-6 py-4">{order.total}</td>
                <td className="px-6 py-4">{order.paymentMethod}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
