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
import usePageTitle from '../hooks/usePageTitle';

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

const manualProviders = [
  { value: 'bkash', label: 'bKash' },
  { value: 'nagad', label: 'Nagad' },
  { value: 'rocket', label: 'Rocket' },
];

const formatPrice = (value) => {
  const amount = Number(value || 0);

  return `৳${amount.toLocaleString('en-BD')}`;
};

const getCartItems = (cartItems) => {
  if (Array.isArray(cartItems?.items)) return cartItems.items;
  if (Array.isArray(cartItems)) return cartItems;

  return [];
};

const getProductId = (item) => {
  if (item?.productId?._id) return item.productId._id;
  if (item?.product?._id) return item.product._id;
  if (item?.productId) return item.productId;
  if (item?.product) return item.product;

  return item?._id;
};

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
  const [manualProvider, setManualProvider] = useState('bkash');
  const [transactionId, setTransactionId] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  usePageTitle(
    'Secure Checkout | Alucard Shop',
    'Confirm your delivery address and place your order securely.'
  );

  const items = getCartItems(cartItems);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(getAllAddresses());
  }, [dispatch]);

  useEffect(() => {
    const defaultAddress = addresses.find((item) => item.isDefault === true);

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

      return;
    }

    if (user) {
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
    return items.map((item) => {
      const productId = getProductId(item);
      const qty = Number(item.quantity || item.qty || 1);

      return {
        product: productId,
        productId,
        _id: productId,
        name: item.name || item.title || item.product?.name || '',
        qty,
        quantity: qty,
        price: Number(item.price || 0),
        image: item.image || item.thumbnail || item.product?.image || '',
        slug: item.slug || item.product?.slug || '',
        variantId: item.variantId || '',
        variantLabel: item.variantLabel || '',
        variantSku: item.variantSku || '',
        selectedVariants: item.selectedVariants || {},
      };
    });
  }, [items]);

  const cartSignature = useMemo(() => {
    return couponCartItems
      .map((item) =>
        [
          item.productId,
          item.variantId || item.variantLabel || '',
          item.quantity,
          item.price,
        ].join(':')
      )
      .join('|');
  }, [couponCartItems]);

  const couponResetKey = `${shippingMethod}-${shippingFee}-${cartSignature}`;

  useEffect(() => {
    setCouponData(null);
  }, [couponResetKey]);

 const originalShippingPrice = Number(
  couponData?.originalShippingPrice ?? shippingFee
);

const finalShippingPrice = Number(couponData?.shippingPrice ?? shippingFee);

const discountPrice = Number(couponData?.discountPrice || 0);

const shippingDiscount = Number(
  couponData?.shippingDiscount ||
    Math.max(0, originalShippingPrice - finalShippingPrice)
);

const totalPrice = Number(
  couponData?.totalPrice ?? subtotal - discountPrice + finalShippingPrice
);
  const handleAddressChange = (event) => {
    const { name, value } = event.target;

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

    if (!address.postalCode.trim()) {
      toast.error('Postal code is required');
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

    const appliedCouponCode =
      couponData?.couponCode || couponData?.coupon?.code || '';

    const orderData = {
      cartItems: couponCartItems,

      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        email: address.email || user?.email || '',
        address: address.street,
        city: address.city,
        postalCode: address.postalCode,
        division: address.division,
      },

      paymentMethod: {
        method: paymentMethod,
        status: paymentMethod === 'manual' ? 'submitted' : 'pending',
        transactionId: paymentMethod === 'manual' ? transactionId : null,
        paidAt: null,
      },

      manualPayment:
        paymentMethod === 'manual'
          ? {
              provider: manualProvider,
              senderNumber: address.phone,
              transactionId,
              amount: totalPrice,
            }
          : undefined,

      // Backend primarily needs this code.
      couponCode: appliedCouponCode,

      // Extra coupon object is added as fallback because backend also supports coupon?.code.
      coupon: appliedCouponCode
        ? {
            code: appliedCouponCode,
            type: couponData?.coupon?.type,
            value: couponData?.coupon?.value,
            discountPrice,
            shippingDiscount,
          }
        : undefined,

      itemsPrice: subtotal,
      taxPrice: 0,

      // Important:
      // Send original selected shipping fee.
      // Backend will recalculate final shipping/discount again.
      shippingPrice: shippingFee,
      originalShippingPrice: shippingFee,

      // Frontend calculated values are sent for trace/debug only.
      // Backend recalculates and saves final trusted values.
      discountPrice,
      totalPrice,
    };

    try {
      setSubmitting(true);

      const result = await dispatch(createOrder(orderData));

      if (result?.error) {
        toast.error(result.payload || result.error?.message || 'Order failed');
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
    <main className="bg-gray-100 font-Work_sans">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-yellow-700">
            Secure Checkout
          </p>

          <h1 className="text-3xl font-medium tracking-tight text-gray-950">
            Complete Your Order
          </h1>

          <p className="mt-2 max-w-2xl text-sm font-normal leading-6 text-gray-500">
            Confirm your delivery address, apply coupon, choose payment method
            and place your order securely.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="space-y-5">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <User size={23} />
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-yellow-600">
                    Customer
                  </p>

                  <h2 className="text-2xl font-medium tracking-tight text-gray-950">
                    Customer Information
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  placeholder="Your full name"
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  placeholder="01XXXXXXXXX"
                />

                <Input
                  label="Email"
                  name="email"
                  value={address.email}
                  onChange={handleAddressChange}
                  placeholder="email@example.com"
                />

                <Select
                  label="Division"
                  name="division"
                  value={address.division}
                  onChange={handleAddressChange}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </Select>

                <Input
                  label="City"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                />

                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Postal code"
                />

                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="House, road, area"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Truck size={23} />
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-yellow-600">
                    Delivery
                  </p>

                  <h2 className="text-2xl font-medium tracking-tight text-gray-950">
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
                    <p className="font-medium text-gray-950">{item.title}</p>

                    <p className="mt-1 text-xs font-normal text-gray-500">
                      {item.text}
                    </p>

                    <p className="mt-3 text-lg font-medium text-green-600">
                      {formatPrice(item.price)}
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
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-yellow-600">
                    Payment
                  </p>

                  <h2 className="text-2xl font-medium tracking-tight text-gray-950">
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
                    title: 'Manual bKash/Nagad/Rocket',
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
                        <p className="font-medium text-gray-950">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs font-normal text-gray-500">
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
                  <p className="font-medium text-gray-950">
                    Manual Payment Instruction
                  </p>

                  <p className="mt-2 text-sm font-normal leading-6 text-gray-600">
                    Send payment to your business bKash/Nagad/Rocket number and
                    enter the transaction ID below.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {manualProviders.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setManualProvider(item.value)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                          manualProvider === item.value
                            ? 'border-black bg-black text-yellow-400'
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <input
                    value={transactionId}
                    onChange={(event) => setTransactionId(event.target.value)}
                    placeholder="Transaction ID"
                    className="mt-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-yellow-400"
                  />
                </div>
              )}
            </div>
          </section>

          <aside className="h-fit space-y-5 lg:sticky lg:top-32">
            <BackendCouponBox
              cartItems={couponCartItems}
              shippingPrice={shippingFee}
              resetKey={couponResetKey}
              onCouponApplied={setCouponData}
            />

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="flex items-center gap-2 text-2xl font-medium tracking-tight text-gray-950">
                <PackageCheck size={24} />
                Order Overview
              </h2>

              <div className="mt-5 max-h-80 space-y-4 overflow-auto pr-1">
                {items.length ? (
                  items.map((item, index) => {
                    const qty = Number(item.quantity || item.qty || 1);
                    const price = Number(item.price || 0);

                    return (
                      <div
                        key={item._id || `${item.slug}-${index}`}
                        className="flex gap-3 rounded-2xl bg-gray-50 p-3"
                      >
                        {item.image || item.thumbnail ? (
                          <img
                            src={item.image || item.thumbnail}
                            alt={item.name || item.title || 'Product'}
                            loading="lazy"
                            decoding="async"
                            className="h-16 w-16 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 text-xs font-medium text-gray-400">
                            No Image
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-medium text-gray-950">
                            {item.name || item.title}
                          </p>

                          {item.variantLabel && (
                            <p className="mt-1 text-xs font-normal text-gray-500">
                              Variant: {item.variantLabel}
                            </p>
                          )}

                          <p className="mt-1 text-xs font-normal text-gray-500">
                            {formatPrice(price)} × {qty}
                          </p>
                        </div>

                        <p className="text-sm font-medium text-gray-950">
                          {formatPrice(price * qty)}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-2xl bg-gray-50 p-4 text-center text-sm font-medium text-gray-500">
                    Your cart is empty.
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3 text-sm font-normal text-gray-600">
                <Summary label="Subtotal" value={formatPrice(subtotal)} />

               <Summary
  label="Shipping"
  value={formatPrice(originalShippingPrice)}
/>

{shippingDiscount > 0 && (
  <Summary
    label="Shipping Discount"
    value={`-${formatPrice(shippingDiscount)}`}
    highlight
  />
)}

{shippingDiscount > 0 && (
  <Summary
    label="Payable Shipping"
    value={formatPrice(finalShippingPrice)}
  />
)}

                {discountPrice > 0 && (
                  <Summary
                    label="Discount"
                    value={`-${formatPrice(discountPrice)}`}
                    highlight
                  />
                )}

                {couponData?.couponCode && (
                  <Summary label="Coupon" value={couponData.couponCode} />
                )}

                <div className="flex justify-between border-t border-gray-100 pt-4 text-xl font-medium text-gray-950">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="mt-5 flex gap-2 rounded-2xl bg-yellow-50 p-3 text-sm font-normal leading-6 text-yellow-800">
                <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                <span>
                  Coupon, variant price, stock and total price will be verified
                  again by backend before order is saved.
                </span>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-2 text-sm font-normal text-gray-700">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(event) => setIsTermsAccepted(event.target.checked)}
                  className="mt-1 accent-yellow-500"
                />

                <span>
                  I agree to the{' '}
                  <Link to="/privacy-policy" className="text-yellow-700 underline">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/return-policy" className="text-yellow-700 underline">
                    Return Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="button"
                onClick={onSubmit}
                disabled={!isTermsAccepted || submitting || !items.length}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-medium text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
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

const Input = ({ label, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
      {label}
    </span>

    <input
      {...props}
      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-yellow-400"
    />
  </label>
);

const Select = ({ label, children, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
      {label}
    </span>

    <select
      {...props}
      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-yellow-400"
    >
      {children}
    </select>
  </label>
);

const Summary = ({ label, value, highlight = false }) => (
  <div
    className={`flex items-center justify-between ${
      highlight ? 'text-green-600' : ''
    }`}
  >
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default OrderPage;