import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  Eye,
  Home,
  MapPin,
  Package,
  Phone,
  ReceiptText,
  Smartphone,
  Tag,
  Truck,
  User,
} from 'lucide-react';

import * as API from '../features/API';
import Loader from '../Components/Loader';
import usePageTitle from '../hooks/usePageTitle';

const DELIVERY_STEPS = ['pending', 'confirmed', 'shipped', 'delivered'];

const deliveryConfig = {
  pending: {
    label: 'Pending',
    title: 'Order placed',
    description: 'Your order has been placed and is waiting for confirmation.',
    icon: Clock3,
  },
  confirmed: {
    label: 'Confirmed',
    title: 'Order confirmed',
    description: 'Your order has been confirmed and is being prepared.',
    icon: CheckCircle2,
  },
  shipped: {
    label: 'Shipped',
    title: 'Order shipped',
    description: 'Your order is now on the way.',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    title: 'Order delivered',
    description: 'Your order has been delivered successfully.',
    icon: CheckCircle2,
  },
};

const paymentConfig = {
  pending: 'Payment Pending',
  submitted: 'Payment Submitted',
  paid: 'Paid',
  failed: 'Payment Failed',
  verified: 'Payment Verified',
  rejected: 'Payment Rejected',
};

const formatPrice = (amount) => {
  const value = Number(amount || 0);

  return `BDT ${value.toLocaleString('en-BD')}`;
};

const formatDateTime = (date) => {
  if (!date) return 'N/A';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'N/A';
  }

  return parsedDate.toLocaleString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getDeliveryStatus = (order) => {
  return String(
    order?.Delivery || order?.deliveryStatus || 'pending'
  ).toLowerCase();
};

const getDeliveryIndex = (status) => {
  const index = DELIVERY_STEPS.indexOf(status);

  return index >= 0 ? index : 0;
};

const getPaymentStatus = (order) => {
  if (order?.paymentMethod?.status) {
    return String(order.paymentMethod.status).toLowerCase();
  }

  if (order?.manualPayment?.status === 'verified') {
    return 'paid';
  }

  if (order?.isPaid) {
    return 'paid';
  }

  return 'pending';
};

const getPaymentLabel = (order) => {
  if (order?.manualPayment?.provider) {
    return order.manualPayment.provider.toUpperCase();
  }

  const method = order?.paymentMethod?.method;

  if (method === 'cod') return 'Cash on Delivery';
  if (method === 'manual') return 'Manual Payment';
  if (method === 'online') return 'Online Payment';
  if (method === 'stripe') return 'Stripe';
  if (method === 'sslcommerz') return 'SSLCommerz';

  return method || 'Payment';
};

const getCouponSavings = (order) => {
  const coupon = order?.coupon || {};

  const productDiscount = Number(
    order?.discountPrice || coupon?.discountPrice || 0
  );

  const originalShippingPrice = Number(
    order?.originalShippingPrice ??
      coupon?.originalShippingPrice ??
      order?.shippingPrice ??
      0
  );

  const finalShippingPrice = Number(order?.shippingPrice || 0);

  const shippingDiscount = Number(
    coupon?.shippingDiscount ||
      Math.max(0, originalShippingPrice - finalShippingPrice)
  );

  const totalSavings = productDiscount + shippingDiscount;

  const couponCode =
    coupon?.code || order?.couponCode || order?.appliedCouponCode || '';

  const couponType =
    coupon?.type === 'shipping' || shippingDiscount > 0
      ? 'Free Shipping'
      : coupon?.type || 'Discount';

  return {
    couponCode,
    couponType,
    productDiscount,
    originalShippingPrice,
    finalShippingPrice,
    shippingDiscount,
    totalSavings,
    hasCoupon: Boolean(couponCode) || productDiscount > 0 || shippingDiscount > 0,
  };
};

const getProductSlug = (item) => {
  return item?.slug || item?.product?.slug || item?.productSlug || '';
};

const getProductImage = (item) => {
  if (item?.image) return item.image;
  if (item?.product?.image) return item.product.image;

  if (Array.isArray(item?.images) && item.images.length > 0) {
    return item.images[0]?.url || item.images[0];
  }

  if (Array.isArray(item?.product?.images) && item.product.images.length > 0) {
    return item.product.images[0]?.url || item.product.images[0];
  }

  return '';
};

const getSelectedVariants = (item) => {
  const selectedVariants = item?.selectedVariants;

  if (!selectedVariants) {
    return [];
  }

  if (Array.isArray(selectedVariants)) {
    return selectedVariants;
  }

  if (typeof selectedVariants === 'object') {
    return Object.entries(selectedVariants).map(([key, value]) => ({
      key,
      value,
    }));
  }

  return [];
};

const buildTrackingSteps = (order) => {
  const currentStatus = getDeliveryStatus(order);
  const currentIndex = getDeliveryIndex(currentStatus);
  const trackingList = Array.isArray(order?.tracking) ? order.tracking : [];

  return DELIVERY_STEPS.map((step, index) => {
    const config = deliveryConfig[step];
    const trackingEvent = trackingList.find(
      (item) => String(item?.status || '').toLowerCase() === step
    );

    const isActive = index <= currentIndex;

    let fallbackDate = null;

    if (step === 'pending') {
      fallbackDate = order?.createdAt;
    }

    if (step === 'delivered') {
      fallbackDate = order?.deliveredAt;
    }

    if (step === currentStatus) {
      fallbackDate = fallbackDate || order?.updatedAt || order?.createdAt;
    }

    return {
      key: step,
      title: config.title,
      description: trackingEvent?.message || config.description,
      date: trackingEvent?.date || fallbackDate,
      icon: config.icon,
      isActive,
    };
  });
};

const getLatestTrackingMessage = (order) => {
  const trackingList = Array.isArray(order?.tracking) ? order.tracking : [];

  if (trackingList.length > 0) {
    return trackingList[trackingList.length - 1]?.message;
  }

  const status = getDeliveryStatus(order);

  return (
    deliveryConfig[status]?.description || 'Your order status is being updated.'
  );
};

const StatusBadge = ({ type = 'delivery', value }) => {
  const isPayment = type === 'payment';

  const paymentStatus = String(value || 'pending').toLowerCase();
  const deliveryStatus = String(value || 'pending').toLowerCase();

  const text = isPayment
    ? paymentConfig[paymentStatus] || 'Payment Pending'
    : deliveryConfig[deliveryStatus]?.label || 'Pending';

  const paidStyle =
    paymentStatus === 'paid' || paymentStatus === 'verified'
      ? 'bg-black text-yellow-300 border-black'
      : paymentStatus === 'failed' || paymentStatus === 'rejected'
        ? 'bg-red-50 text-red-700 border-red-200'
        : 'bg-yellow-100 text-yellow-900 border-yellow-200';

  const deliveryStyle =
    deliveryStatus === 'delivered' || deliveryStatus === 'confirmed'
      ? 'bg-black text-yellow-300 border-black'
      : 'bg-yellow-100 text-yellow-900 border-yellow-200';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
        isPayment ? paidStyle : deliveryStyle
      }`}
    >
      {text}
    </span>
  );
};

const InfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-yellow-300 text-black">
        <Icon size={17} strokeWidth={1.8} />
      </div>

      <p className="text-[11px] font-normal uppercase tracking-[0.14em] text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-black">{value}</p>
    </div>
  );
};

const SectionCard = ({ title, icon: Icon, children, right }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-300 text-black">
            <Icon size={19} strokeWidth={1.8} />
          </div>

          <h2 className="text-lg font-medium tracking-tight text-black">
            {title}
          </h2>
        </div>

        {right}
      </div>

      {children}
    </div>
  );
};

const SummaryRow = ({ label, value, strong = false, success = false }) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0 ${
        strong ? 'text-lg' : 'text-sm'
      }`}
    >
      <span
        className={
          strong ? 'font-medium text-black' : 'font-normal text-gray-500'
        }
      >
        {label}
      </span>

      <span
        className={`font-medium ${
          strong ? 'text-black' : success ? 'text-green-600' : 'text-black'
        }`}
      >
        {value}
      </span>
    </div>
  );
};

const InfoLine = ({ label, value, success = false }) => {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-yellow-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-[11px] font-normal uppercase tracking-[0.14em] text-gray-500">
        {label}
      </span>

      <span
        className={`break-all text-sm font-medium ${
          success ? 'text-green-600' : 'text-black'
        }`}
      >
        {value || 'N/A'}
      </span>
    </div>
  );
};

const TrackingSection = ({ order }) => {
  const status = getDeliveryStatus(order);
  const currentIndex = getDeliveryIndex(status);
  const progressWidth = ((currentIndex + 1) / DELIVERY_STEPS.length) * 100;
  const steps = buildTrackingSteps(order);

  return (
    <SectionCard
      title="Order Tracking"
      icon={Truck}
      right={<StatusBadge value={status} />}
    >
      <div className="rounded-3xl bg-gradient-to-br from-yellow-100 via-yellow-50 to-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-black">
              {deliveryConfig[status]?.title || 'Order update'}
            </p>

            <p className="mt-1 text-sm font-normal leading-6 text-gray-600">
              {getLatestTrackingMessage(order)}
            </p>
          </div>

          <div className="rounded-full bg-black px-4 py-2 text-xs font-medium text-yellow-300">
            {deliveryConfig[status]?.label || 'Pending'}
          </div>
        </div>

        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-yellow-300 transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            {DELIVERY_STEPS.map((step, index) => {
              const isActive = index <= currentIndex;

              return (
                <div key={step} className="text-center">
                  <span
                    className={`mx-auto block h-2.5 w-2.5 rounded-full ${
                      isActive ? 'bg-black' : 'bg-gray-200'
                    }`}
                  />

                  <p
                    className={`mt-1 text-[10px] font-normal ${
                      isActive ? 'text-black' : 'text-gray-400'
                    }`}
                  >
                    {deliveryConfig[step].label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className={`flex gap-3 rounded-2xl border p-4 ${
                step.isActive
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-100 bg-gray-50'
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                  step.isActive
                    ? 'bg-black text-yellow-300'
                    : 'bg-white text-gray-400'
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3
                    className={`text-sm font-medium ${
                      step.isActive ? 'text-black' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-xs font-normal text-gray-500">
                    {step.date ? formatDateTime(step.date) : 'Not updated yet'}
                  </p>
                </div>

                <p
                  className={`mt-1 text-sm font-normal leading-6 ${
                    step.isActive ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

const ProductItem = ({ item }) => {
  const qty = Number(item?.qty || item?.quantity || 1);
  const price = Number(item?.price || 0);
  const slug = getProductSlug(item);
  const image = getProductImage(item);
  const selectedVariants = getSelectedVariants(item);

  const content = (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 transition duration-300 hover:border-yellow-300 hover:shadow-md">
      <div className="flex gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-yellow-50">
          {image ? (
            <img
              src={image}
              alt={item?.name || item?.title || 'Product'}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] font-normal text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-medium leading-5 text-black transition group-hover:text-yellow-700">
                {item?.name || item?.title || 'Product'}
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                {item?.variantLabel && (
                  <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-[11px] font-normal text-yellow-900">
                    {item.variantLabel}
                  </span>
                )}

                {item?.variantSku && (
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-normal text-gray-600">
                    SKU: {item.variantSku}
                  </span>
                )}

                {selectedVariants.map((variant) => (
                  <span
                    key={`${variant.key}-${variant.value}`}
                    className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-normal text-gray-600"
                  >
                    {variant.key}: {variant.value}
                  </span>
                ))}
              </div>
            </div>

            {slug && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-black px-3 py-1 text-xs font-medium text-yellow-300">
                <Eye size={13} strokeWidth={1.8} />
                View
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-yellow-50 p-3">
            <div>
              <p className="text-[10px] font-normal uppercase tracking-[0.12em] text-gray-400">
                Qty
              </p>
              <p className="mt-1 text-sm font-medium text-black">{qty}</p>
            </div>

            <div>
              <p className="text-[10px] font-normal uppercase tracking-[0.12em] text-gray-400">
                Price
              </p>
              <p className="mt-1 text-sm font-medium text-black">
                {formatPrice(price)}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-normal uppercase tracking-[0.12em] text-gray-400">
                Total
              </p>
              <p className="mt-1 text-sm font-medium text-black">
                {formatPrice(price * qty)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!slug) {
    return content;
  }

  return (
    <Link to={`/product/${slug}`} className="block">
      {content}
    </Link>
  );
};

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  usePageTitle('Order Details | Alucard Shop', 'View order details.');

  useEffect(() => {
    let mounted = true;

    const loadOrder = async () => {
      try {
        setLoading(true);

        const res = await API.getOrderById(id);

        if (mounted) {
          setOrder(res.data?.order || res.data);
          setError('');
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.message || 'Order could not be loaded');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadOrder();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  const items = useMemo(() => {
    return order?.orderItems || order?.items || [];
  }, [order]);

  if (loading) {
    return <Loader />;
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-2xl font-medium tracking-tight text-red-700">
            Order could not be loaded
          </h2>

          <p className="mt-2 text-sm font-normal text-red-600">
            {error || 'Please try again later.'}
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
            Back to Account
          </Link>
        </div>
      </div>
    );
  }

  const address = order?.shippingAddress || {};
  const user = order?.user || {};
  const orderNumber = order?.orderId || order?._id || id;
  const deliveryStatus = getDeliveryStatus(order);
  const paymentStatus = getPaymentStatus(order);
  const paymentLabel = getPaymentLabel(order);
  const couponSavings = getCouponSavings(order);

  const customerName =
    address?.fullName ||
    `${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
    'N/A';

  return (
    <div className="container mx-auto px-4 py-6 font-Work_sans text-black md:py-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/dashboard"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-200 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-300"
        >
          <ArrowLeft size={16} strokeWidth={1.8} />
          Back to Account
        </Link>

        <Link
          to={`/invoice/${orderNumber}`}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
        >
          <Download size={16} strokeWidth={1.8} />
          Invoice
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-yellow-200 bg-gradient-to-br from-yellow-200 via-yellow-100 to-white p-5 shadow-sm md:p-7">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yellow-300/60 blur-2xl" />
        <div className="absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-yellow-200/60 blur-2xl" />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-medium text-yellow-300">
              <ReceiptText size={14} strokeWidth={1.8} />
              Order Details
            </div>

            <h1 className="text-2xl font-medium tracking-tight text-black md:text-4xl">
              #{orderNumber}
            </h1>

            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-normal text-gray-700">
              <CalendarDays size={16} strokeWidth={1.8} />
              Placed on {formatDateTime(order?.createdAt)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge value={deliveryStatus} />
            <StatusBadge type="payment" value={paymentStatus} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard icon={User} label="Customer" value={customerName} />
        <InfoCard
          icon={Phone}
          label="Phone"
          value={address?.phone || user?.phone || 'N/A'}
        />
        <InfoCard icon={CreditCard} label="Payment" value={paymentLabel} />
        <InfoCard
          icon={Package}
          label="Items"
          value={`${items.length} product${items.length > 1 ? 's' : ''}`}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-5">
          <TrackingSection order={order} />

          <SectionCard
            title="Ordered Products"
            icon={Package}
            right={
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-900">
                Click product to view
              </span>
            }
          >
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-yellow-300 bg-yellow-50 p-8 text-center">
                <Package
                  size={28}
                  strokeWidth={1.8}
                  className="mx-auto text-black"
                />

                <h3 className="mt-3 text-lg font-medium text-black">
                  No product found
                </h3>

                <p className="mt-1 text-sm font-normal text-gray-500">
                  This order has no visible product item.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, index) => (
                  <ProductItem
                    key={
                      item?._id ||
                      item?.product?._id ||
                      item?.product ||
                      item?.slug ||
                      index
                    }
                    item={item}
                  />
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Shipping Address" icon={MapPin}>
            <div className="space-y-3">
              <div className="rounded-2xl bg-yellow-50 p-4">
                <p className="text-[11px] font-normal uppercase tracking-[0.14em] text-gray-500">
                  Address
                </p>

                <p className="mt-1 text-sm font-medium leading-6 text-black">
                  {address?.address || 'N/A'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[11px] font-normal uppercase tracking-[0.14em] text-gray-500">
                    City
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">
                    {address?.city || 'N/A'}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[11px] font-normal uppercase tracking-[0.14em] text-gray-500">
                    Postal Code
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">
                    {address?.postalCode || 'N/A'}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4 sm:col-span-2">
                  <p className="text-[11px] font-normal uppercase tracking-[0.14em] text-gray-500">
                    Division
                  </p>
                  <p className="mt-1 text-sm font-medium text-black">
                    {address?.division || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Payment Information" icon={CreditCard}>
            <div className="space-y-3">
              <InfoLine label="Method" value={paymentLabel} />
              <InfoLine
                label="Status"
                value={paymentConfig[paymentStatus] || paymentStatus}
              />

              {order?.paymentMethod?.transactionId && (
                <InfoLine
                  label="Transaction ID"
                  value={order.paymentMethod.transactionId}
                />
              )}

              {order?.manualPayment?.senderNumber && (
                <InfoLine
                  label="Sender Number"
                  value={order.manualPayment.senderNumber}
                />
              )}

              {order?.manualPayment?.transactionId && (
                <InfoLine
                  label="Manual TXN ID"
                  value={order.manualPayment.transactionId}
                />
              )}

              {order?.paidAt && (
                <InfoLine label="Paid At" value={formatDateTime(order.paidAt)} />
              )}
            </div>
          </SectionCard>

          {couponSavings.hasCoupon && (
            <SectionCard title="Coupon" icon={Tag}>
              <div className="space-y-3">
                <InfoLine
                  label="Code"
                  value={couponSavings.couponCode || 'Applied Coupon'}
                />

                <InfoLine label="Type" value={couponSavings.couponType} />

                {couponSavings.productDiscount > 0 && (
                  <InfoLine
                    label="Product Discount"
                    value={formatPrice(couponSavings.productDiscount)}
                    success
                  />
                )}

                {couponSavings.shippingDiscount > 0 && (
                  <InfoLine
                    label="Shipping Discount"
                    value={formatPrice(couponSavings.shippingDiscount)}
                    success
                  />
                )}

                <InfoLine
                  label="Total Savings"
                  value={formatPrice(couponSavings.totalSavings)}
                  success
                />
              </div>
            </SectionCard>
          )}

          <SectionCard title="Order Summary" icon={ReceiptText}>
            <div className="rounded-2xl bg-yellow-50 px-4">
              <SummaryRow
                label="Items Price"
                value={formatPrice(order?.itemsPrice)}
              />

              <SummaryRow label="Tax" value={formatPrice(order?.taxPrice)} />

              <SummaryRow
                label={
                  couponSavings.shippingDiscount > 0
                    ? 'Original Shipping'
                    : 'Shipping'
                }
                value={formatPrice(
                  couponSavings.shippingDiscount > 0
                    ? couponSavings.originalShippingPrice
                    : order?.shippingPrice
                )}
              />

              {couponSavings.shippingDiscount > 0 && (
                <SummaryRow
                  label="Shipping Discount"
                  value={`-${formatPrice(couponSavings.shippingDiscount)}`}
                  success
                />
              )}

              {couponSavings.shippingDiscount > 0 && (
                <SummaryRow
                  label="Payable Shipping"
                  value={formatPrice(couponSavings.finalShippingPrice)}
                />
              )}

              {couponSavings.productDiscount > 0 && (
                <SummaryRow
                  label="Product Discount"
                  value={`-${formatPrice(couponSavings.productDiscount)}`}
                  success
                />
              )}

              <SummaryRow
                label="Total"
                value={formatPrice(order?.totalPrice)}
                strong
              />
            </div>
          </SectionCard>

          <div className="rounded-3xl border border-yellow-200 bg-black p-5 text-yellow-300">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-300 text-black">
                <Smartphone size={18} strokeWidth={1.8} />
              </div>

              <div>
                <h3 className="text-base font-medium tracking-tight">
                  Need help with this order?
                </h3>

                <p className="mt-1 text-sm font-normal leading-6 text-yellow-100">
                  Contact support with order number #{orderNumber}.
                </p>

                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow-300 px-4 py-2 text-sm font-medium text-black transition hover:bg-white"
                >
                  <Home size={15} strokeWidth={1.8} />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;