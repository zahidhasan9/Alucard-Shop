import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCart,
  removeFromCart,
  updateCartItem,
} from '../features/cartSlice.js';
import EmptyState from '../Components/UI/EmptyState';
import usePageTitle from '../hooks/usePageTitle';

const formatPrice = value => {
  const amount = Number(value || 0);
  return `৳${amount.toLocaleString('en-BD')}`;
};

const getCartItems = cartItems => {
  if (Array.isArray(cartItems?.items)) return cartItems.items;
  if (Array.isArray(cartItems)) return cartItems;
  return [];
};

const CartPage = () => {
  const { cartItems, loading } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  usePageTitle(
    'Shopping Cart | Alucard Shop',
    'Review your shopping cart and proceed to checkout.'
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const items = getCartItems(cartItems);

  const updateQuantity = (id, type) => {
    const item = items.find(cartItem => cartItem._id === id);

    if (!item) return;

    const currentQty = Number(item.quantity || item.qty || 1);
    const newQuantity =
      type === 'increase' ? currentQty + 1 : Math.max(1, currentQty - 1);

    dispatch(updateCartItem({ productId: id, quantity: newQuantity }));

    setTimeout(() => {
      dispatch(fetchCart());
    }, 300);
  };

  const deleteItem = id => {
    dispatch(removeFromCart(id));

    setTimeout(() => {
      dispatch(fetchCart());
    }, 300);
  };

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.quantity || item.qty || 1);

    return sum + price * qty;
  }, 0);

  const shippingFee = subtotal > 0 ? 0 : 0;
  const total = subtotal + shippingFee;

  if (!loading && !items.length) {
    return (
      <main className="bg-gray-100 px-4 py-14 font-Work_sans">
        <EmptyState
          title="Your cart is empty"
          message="Add products to your cart and continue shopping."
          buttonText="Continue Shopping"
          buttonLink="/products"
        />
      </main>
    );
  }

  return (
    <main className="bg-gray-100 font-Work_sans">
      <section className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-700">
              Checkout
            </p>

            <h1 className="text-3xl font-black text-gray-950">
              Shopping Cart
            </h1>
          </div>

          <Link
            to="/products"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-gray-800 shadow-sm transition hover:bg-yellow-400 hover:text-black"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="hidden grid-cols-[1fr_120px_160px_120px_100px] gap-4 border-b border-gray-100 px-5 py-4 text-xs font-black uppercase tracking-wide text-gray-500 md:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map(item => {
                const qty = Number(item.quantity || item.qty || 1);
                const price = Number(item.price || 0);
                const itemTotal = price * qty;

                return (
                  <div
                    key={item._id}
                    className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_120px_160px_120px_100px] md:items-center"
                  >
                    <div className="flex gap-4">
                      <Link
                        to={item.slug ? `/product/${item.slug}` : '/products'}
                        className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-100"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || item.title || 'Product'}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-400">
                            No Image
                          </div>
                        )}
                      </Link>

                      <div className="min-w-0">
                        <Link
                          to={item.slug ? `/product/${item.slug}` : '/products'}
                          className="line-clamp-2 text-sm font-black text-gray-950 hover:text-yellow-700"
                        >
                          {item.name || item.title || 'Product'}
                        </Link>

                        {item.variantLabel && (
                          <p className="mt-1 text-xs font-bold text-gray-500">
                            Variant: {item.variantLabel}
                          </p>
                        )}

                        {item.variantSku && (
                          <p className="mt-1 text-xs font-bold text-gray-400">
                            SKU: {item.variantSku}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-sm font-black text-gray-950">
                      {formatPrice(price)}
                    </div>

                    <div className="flex w-fit items-center rounded-2xl bg-gray-100 p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, 'decrease')}
                        disabled={qty <= 1}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-10 text-center text-sm font-black">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, 'increase')}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-800"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-sm font-black text-gray-950">
                      {formatPrice(itemTotal)}
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteItem(item._id)}
                      className="flex items-center justify-start gap-2 text-sm font-black text-red-500 hover:text-red-700 md:justify-end"
                    >
                      <Trash2 size={17} />
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="flex items-center gap-2 text-2xl font-black text-gray-950">
              <ShoppingBag size={24} />
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm font-bold text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4 text-xl font-black text-gray-950">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/order')}
              disabled={!items.length}
              className="mt-6 w-full rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CartPage;