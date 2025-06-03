// CartSidebar.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../features/cartSlice';
import { X } from 'lucide-react';

export default function CartSidebar({ isOpen = true, onClose = () => {} }) {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = cartItems?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setTimeout(() => {
      dispatch(fetchCart());
    }, 100);
  };
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b bg-yellow-500 text-white">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[60vh] custom-scrollbar">
        {!cartItems || !cartItems.items || cartItems.items.length === 0 ? (
          <div className="text-orange-500">No items in cart</div>
        ) : (
          cartItems.items.map((item) => (
            <div key={item._id} className="flex items-center gap-3 border-b pb-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.quantity} × {item.price.toLocaleString()}৳
                </p>
              </div>
              <button className="text-red-500 hover:text-red-700" onClick={() => handleRemove(item._id)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Promo Code */}
      <div className="px-4 mt-4">
        <input
          type="text"
          placeholder="Promo Code"
          className="w-full border px-3 py-2 rounded text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black text-sm transition">Apply</button>
      </div>

      {/* Summary */}
      <div className="p-4 border-t mt-4">
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Subtotal</span>
          <span>{total.toLocaleString()}৳</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{total.toLocaleString()}৳</span>
        </div>
        <button
          disabled={!cartItems?.items?.length}
          className={`w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium ${
            !cartItems?.items?.length && 'opacity-50 cursor-not-allowed'
          }`}
        >
          <Link to="/cart"> Checkout</Link>
        </button>
      </div>
    </div>
  );
}
