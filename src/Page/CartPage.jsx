import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem } from '../features/cartSlice.js';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartTable = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const updateQuantity = (id, type) => {
    const item = cartItems?.items?.find((i) => i._id === id);
    if (!item) return;

    const newQuantity = type === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
    setTimeout(() => {
      dispatch(fetchCart());
    }, 100);
  };

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
    setTimeout(() => {
      dispatch(fetchCart());
    }, 100);
  };

  const subtotal = cartItems?.items?.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0) || 0;
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-[80vh] bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">🛒 Your Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 overflow-x-auto">
            <div className="bg-white shadow-md rounded-xl p-4">
              <table className="min-w-full">
                <thead className="text-left text-gray-600 border-b">
                  <tr>
                    <th className="py-3">Product</th>
                    {/* <th className="py-3">Price</th> */}
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Subtotal</th>
                    <th className="py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.items?.length > 0 ? (
                    cartItems?.items?.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-4 flex items-center gap-3">
                          <img src={item.image} alt={item.title} className="w-14 h-14 rounded shadow-sm" />
                          <div>
                            <p className="font-medium text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-500">Size: {item.size}</p>
                            <p className="text-xs text-gray-500">
                              Price: <span className="text-green-600"> ৳ {item.price}</span>
                            </p>
                          </div>
                        </td>
                        <td className="py-4 text-gray-700 font-medium whitespace-nowrap">৳ {item.price}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item._id, 'decrease')}
                              className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, 'increase')}
                              className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">
                          ৳ {item.price * item.quantity}
                        </td>
                        <td className="py-4 text-center">
                          <button onClick={() => deleteItem(item._id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-gray-500">
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full md:w-80">
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems?.items?.length || 0} items)</span>
                  <span className="font-medium text-gray-800">৳ {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-gray-800">৳ {shippingFee}</span>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Voucher Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="border rounded px-3 py-2 w-full text-sm focus:outline-none"
                    />
                    <button className="bg-black text-white px-4 rounded hover:bg-gray-800 text-sm">Apply</button>
                  </div>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-green-600">৳ {total}</span>
                </div>
                <button
                  disabled={!cartItems?.items?.length}
                  className={`w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium ${
                    !cartItems?.items?.length && 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
