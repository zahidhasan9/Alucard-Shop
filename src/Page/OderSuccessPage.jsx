import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckCircle,
  Home,
  Mail,
  PackageCheck,
  ReceiptText,
  Smartphone,
  ShoppingBag,
  Tag,
} from 'lucide-react';

import usePageTitle from '../hooks/usePageTitle';
import { getLastOrder } from '../features/OrderSlice';

const OderSuccessPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { lastOrder } = useSelector((state) => state.Order);

  usePageTitle(
    'Order Successful | Alucard Shop',
    'Your order has been placed successfully.'
  );

  useEffect(() => {
    dispatch(getLastOrder());
  }, [dispatch]);

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    });

  const paymentLabel =
    lastOrder?.manualPayment?.provider?.toUpperCase() ||
    (lastOrder?.paymentMethod?.method === 'cod'
      ? 'Cash on Delivery'
      : lastOrder?.paymentMethod?.method || 'Payment');

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
      <div className="container mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-yellow-600 p-8 text-center text-white">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-yellow-400 text-gray-950">
              <CheckCircle size={46} />
            </div>

            <h1 className="mt-5 text-3xl font-black">
              Order Placed Successfully!
            </h1>

            <p className="mt-2 text-sm text-gray-200">
              Order updates will be sent to {user?.email || 'your email'}.
            </p>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-3">
            <InfoCard
              icon={<PackageCheck size={24} />}
              title="Order ID"
              desc={lastOrder?.orderId || 'Processing'}
            />

            <InfoCard
              icon={<ReceiptText size={24} />}
              title="Total"
              desc={formatPrice(lastOrder?.totalPrice)}
            />

            <InfoCard
              icon={<Mail size={24} />}
              title="Email"
              desc={user?.email || 'Not available'}
            />
          </div>

          <div className="border-t border-gray-100 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <DetailBox
                icon={<Smartphone size={20} />}
                title="Payment Information"
              >
                <Row label="Method" value={paymentLabel} />
                <Row
                  label="Status"
                  value={
                    lastOrder?.paymentMethod?.status ||
                    lastOrder?.manualPayment?.status ||
                    'Pending'
                  }
                />

                {lastOrder?.manualPayment?.senderNumber && (
                  <Row
                    label="Sender Number"
                    value={lastOrder.manualPayment.senderNumber}
                  />
                )}

                {lastOrder?.manualPayment?.transactionId && (
                  <Row
                    label="Transaction ID"
                    value={lastOrder.manualPayment.transactionId}
                  />
                )}
              </DetailBox>

              <DetailBox icon={<Tag size={20} />} title="Coupon Summary">
                <Row
                  label="Coupon"
                  value={lastOrder?.coupon?.code || 'No coupon used'}
                />
                <Row
                  label="Discount"
                  value={formatPrice(lastOrder?.discountPrice || 0)}
                />
                <Row
                  label="Shipping Discount"
                  value={formatPrice(lastOrder?.coupon?.shippingDiscount || 0)}
                />
              </DetailBox>
            </div>

            <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-center">
              <p className="text-sm font-semibold leading-6 text-yellow-900">
                Your order is now being processed. You can track it anytime from
                your account dashboard.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-950"
              >
                <PackageCheck size={18} />
                View My Orders
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                <Home size={18} />
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const InfoCard = ({ icon, title, desc }) => (
  <div className="rounded-xl bg-gray-50 p-4 text-center">
    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-yellow-100 text-yellow-700">
      {icon}
    </div>
    <h3 className="mt-3 text-sm font-black text-gray-950">{title}</h3>
    <p className="mt-1 break-words text-xs font-semibold text-gray-500">
      {desc}
    </p>
  </div>
);

const DetailBox = ({ icon, title, children }) => (
  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
    <div className="mb-3 flex items-center gap-2">
      <span className="text-yellow-700">{icon}</span>
      <h3 className="font-black text-gray-950">{title}</h3>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="break-all text-right font-bold text-gray-900">
      {value}
    </span>
  </div>
);

export default OderSuccessPage;