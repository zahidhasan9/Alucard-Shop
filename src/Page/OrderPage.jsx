

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Banknote,
  CheckCircle,
  CreditCard,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Truck,
  User,
} from 'lucide-react';

import { fetchCart } from '../features/cartSlice.js';
import { getAllAddresses } from '../features/addressSlice.js';
import { createOrder } from '../features/OrderSlice.js';
import BackendCouponBox from '../Components/Checkout/BackendCouponBox';

const divisions = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { addresses = [] } = useSelector((state) => state.addressReducer || {});
  const { user } = useSelector((state) => state.user);

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    division: '',
    city: '',
    postalCode: '',
    street: '',
    email: '',
  });

  const [shippingMethod, setShippingMethod] = useState('home');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [transactionId, setTransactionId] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const items = Array.isArray(cartItems?.items)
    ? cartItems.items
    : Array.isArray(cartItems)
      ? cartItems
      : [];

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(getAllAddresses());
  }, [dispatch]);

  useEffect(() => {
    const defaultAddress = addresses.find((addr) => addr.isDefault === true);

    if (defaultAddress) {
      setAddress({
        fullName:
          defaultAddress.fullName ||
          `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        phone: defaultAddress.phone || user?.phone || '',
        division: defaultAddress.division || '',
        city: defaultAddress.city || '',
        postalCode: defaultAddress.postalCode || '',
        street:
          defaultAddress.street ||
          defaultAddress.address ||
          defaultAddress.area ||
          '',
        email: user?.email || defaultAddress.email || '',
      });
    } else if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        phone: user?.phone || prev.phone,
        email: user?.email || prev.email,
      }));
    }
  }, [addresses, user]);

  const shippingFee = useMemo(() => {
    if (shippingMethod === 'pickup') return 0;
    if (shippingMethod === 'express') return 300;
    return 60;
  }, [shippingMethod]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price || 0);
      const qty = Number(item.quantity || item.qty || 1);
      return sum + price * qty;
    }, 0);
  }, [items]);

  const couponCartItems = useMemo(() => {
    return items.map((item) => ({
      productId: item.productId || item.product || item._id,
      _id: item.productId || item.product || item._id,
      name: item.name || item.title,
      qty: item.quantity || item.qty || 1,
      quantity: item.quantity || item.qty || 1,
      price: item.price || 0,
      image: item.image || item.thumbnail,
      slug: item.slug,
      selectedVariants: item.selectedVariants || {},
    }));
  }, [items]);

  const finalShippingPrice = couponData?.shippingPrice ?? shippingFee;
  const discountPrice = couponData?.discountPrice || 0;
  const totalPrice = couponData?.totalPrice ?? subtotal + shippingFee;

  useEffect(() => {
    setCouponData(null);
  }, [shippingMethod, items.length]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateOrder = () => {
    if (!items.length) {
      toast.error('Your cart is empty');
      return false;
    }

    if (!address.fullName.trim()) {
      toast.error('Full name is required');
      return false;
    }

    if (!address.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }

    if (!address.division.trim()) {
      toast.error('Division is required');
      return false;
    }

    if (!address.city.trim()) {
      toast.error('City is required');
      return false;
    }

    if (!address.street.trim()) {
      toast.error('Street address is required');
      return false;
    }

    if (paymentMethod === 'manual' && !transactionId.trim()) {
      toast.error('Transaction ID is required for manual payment');
      return false;
    }

    if (!isTermsAccepted) {
      toast.error('Please accept terms and conditions');
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!validateOrder()) return;

    const orderData = {
      cartItems: couponCartItems,

      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        email: address.email,
        address: address.street,
        city: address.city,
        postalCode: address.postalCode,
        division: address.division,
      },

      paymentMethod: {
        method: paymentMethod,
        status:
          paymentMethod === 'cod'
            ? 'pending'
            : paymentMethod === 'manual'
              ? 'submitted'
              : 'pending',
        transactionId: paymentMethod === 'manual' ? transactionId : null,
        paidAt: null,
      },

      couponCode: couponData?.couponCode || null,

      itemsPrice: subtotal,
      taxPrice: 0,
      shippingPrice: shippingFee,
      discountPrice,
      totalPrice,
    };

    try {
      setSubmitting(true);

      const result = await dispatch(createOrder(orderData));

      if (result?.error) {
        toast.error(result.error?.message || 'Order failed');
        return;
      }

      toast.success('Order placed successfully');

      setTimeout(() => {
        navigate('/ordersucess');
      }, 500);
    } catch (error) {
      toast.error('Something went wrong while placing order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-7 rounded-3xl bg-yellow-400 p-6 text-black shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-black/65">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-3xl font-black">Complete Your Order</h1>

          <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-black/70">
            Confirm your delivery address, apply coupon, choose payment method
            and place your order securely.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <User size={23} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
                    Customer
                  </p>
                  <h2 className="text-2xl font-black text-gray-950">
                    Customer Information
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="fullName"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  placeholder="Full Name"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <input
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  placeholder="Phone Number"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <input
                  name="email"
                  type="email"
                  value={address.email}
                  onChange={handleAddressChange}
                  placeholder="Email Address"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <select
                  name="division"
                  value={address.division}
                  onChange={handleAddressChange}
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>

                <input
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <input
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Postal Code"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />

                <textarea
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  placeholder="Street Address"
                  className="min-h-28 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400 md:col-span-2"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Truck size={23} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
                    Delivery
                  </p>
                  <h2 className="text-2xl font-black text-gray-950">
                    Delivery Method
                  </h2>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    value: 'home',
                    title: 'Home Delivery',
                    price: 60,
                    text: '2-5 working days',
                  },
                  {
                    value: 'pickup',
                    title: 'Store Pickup',
                    price: 0,
                    text: 'Pick from store',
                  },
                  {
                    value: 'express',
                    title: 'Express Delivery',
                    price: 300,
                    text: 'Fast delivery',
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setShippingMethod(item.value)}
                    className={`rounded-3xl border p-4 text-left transition ${
                      shippingMethod === item.value
                        ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
                        : 'border-gray-200 bg-white hover:border-yellow-300'
                    }`}
                  >
                    <p className="font-black text-gray-950">{item.title}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-500">
                      {item.text}
                    </p>
                    <p className="mt-3 text-lg font-black text-green-600">
                      ৳{item.price}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <CreditCard size={23} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
                    Payment
                  </p>
                  <h2 className="text-2xl font-black text-gray-950">
                    Payment Method
                  </h2>
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  {
                    value: 'cod',
                    title: 'Cash on Delivery',
                    text: 'Pay when product arrives',
                    icon: Banknote,
                    active: true,
                  },
                  {
                    value: 'manual',
                    title: 'Manual bKash/Nagad',
                    text: 'Enter transaction ID after payment',
                    icon: Smartphone,
                    active: true,
                  },
                  {
                    value: 'online',
                    title: 'Online Gateway',
                    text: 'Merchant account required',
                    icon: CreditCard,
                    active: false,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      disabled={!item.active}
                      onClick={() => setPaymentMethod(item.value)}
                      className={`flex items-center gap-4 rounded-3xl border p-4 text-left transition ${
                        paymentMethod === item.value
                          ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
                          : 'border-gray-200 bg-white hover:border-yellow-300'
                      } ${!item.active ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                        <Icon size={23} />
                      </div>

                      <div className="flex-1">
                        <p className="font-black text-gray-950">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-gray-500">
                          {item.text}
                        </p>
                      </div>

                      <span
                        className={`h-4 w-4 rounded-full border ${
                          paymentMethod === item.value
                            ? 'border-black bg-black'
                            : 'border-gray-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'manual' && (
                <div className="mt-5 rounded-3xl bg-gray-50 p-4">
                  <p className="font-black text-gray-950">
                    Manual Payment Instruction
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Send payment to your business bKash/Nagad number and enter
                    the transaction ID below.
                  </p>

                  <input
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Transaction ID"
                    className="mt-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                  />
                </div>
              )}
            </div>
          </section>

          <aside className="h-fit space-y-5 lg:sticky lg:top-32">
            <BackendCouponBox
              cartItems={couponCartItems}
              shippingPrice={shippingFee}
              onCouponApplied={setCouponData}
            />

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="flex items-center gap-2 text-2xl font-black text-gray-950">
                <PackageCheck size={24} />
                Order Overview
              </h2>

              <div className="mt-5 max-h-80 space-y-4 overflow-auto pr-1">
                {items.length ? (
                  items.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex gap-3 rounded-2xl bg-gray-50 p-3"
                    >
                      <img
                        src={item.image || item.thumbnail}
                        alt={item.name || item.title || 'Product'}
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-16 rounded-2xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-black text-gray-950">
                          {item.name || item.title}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-gray-500">
                          ৳{item.price || 0} × {item.quantity || item.qty || 1}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl bg-gray-50 p-4 text-center text-sm font-bold text-gray-500">
                    Your cart is empty.
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3 text-sm font-bold text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳{finalShippingPrice}</span>
                </div>

                {discountPrice > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-৳{discountPrice}</span>
                  </div>
                )}

                {couponData?.couponCode && (
                  <div className="flex justify-between text-yellow-700">
                    <span>Coupon</span>
                    <span>{couponData.couponCode}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-gray-100 pt-4 text-xl font-black text-gray-950">
                  <span>Total</span>
                  <span>৳{totalPrice}</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-yellow-50 p-4">
                <div className="flex gap-2">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-yellow-700"
                  />

                  <p className="text-xs font-bold leading-5 text-gray-700">
                    Coupon and total price will be verified again by backend
                    before order is saved.
                  </p>
                </div>
              </div>

              <label className="mt-5 flex items-start gap-3 text-sm font-bold text-gray-700">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="mt-1 accent-yellow-500"
                />

                <span>
                  I agree to the{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-yellow-700 underline"
                  >
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/return-policy"
                    className="text-yellow-700 underline"
                  >
                    Return Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="button"
                onClick={onSubmit}
                disabled={!isTermsAccepted || submitting || !items.length}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Placing Order...' : 'Confirm Order'}
                <CheckCircle size={18} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default OrderPage;