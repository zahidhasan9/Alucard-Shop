import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Heart,
  LockKeyhole,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  ShoppingBag,
  Star,
  Truck,
  UserCircle,
} from 'lucide-react';

import Breadcrumb from '../Components/Breadcrumb';
import AccountSettings from '../Components/UserDashBoard/AccountSettings';
import OrderList from '../Components/UserDashBoard/OrderDashboard';
import ReviewList from '../Components/UserDashBoard/ReviewList';
import AddressSection from '../Components/UserDashBoard/Address';
import LogoutButton from '../Components/UserDashBoard/Logout';

import { fetchMyOrders } from '../features/OrderSlice';
import { getUserAllReviews } from '../features/reviewSlice';
import * as API from '../features/API';

const deliveryMeta = {
  pending: {
    label: 'Pending',
    icon: Clock3,
    className: 'bg-yellow-100 text-yellow-900 border-yellow-200',
  },
  confirmed: {
    label: 'Confirmed',
    icon: CheckCircle2,
    className: 'bg-black text-yellow-300 border-black',
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    className: 'bg-yellow-200 text-black border-yellow-300',
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle2,
    className: 'bg-black text-yellow-300 border-black',
  },
};

const paymentMeta = {
  pending: 'Payment Pending',
  submitted: 'Payment Submitted',
  paid: 'Paid',
  failed: 'Payment Failed',
  verified: 'Paid',
  rejected: 'Payment Rejected',
};

const getOrderId = (order) => {
  return order?.orderId || order?._id || '';
};

const getDeliveryStatus = (order) => {
  return String(
    order?.Delivery || order?.deliveryStatus || order?.orderStatus || 'pending'
  ).toLowerCase();
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

const getOrderItemsCount = (order) => {
  const items = order?.orderItems || order?.items || [];

  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce((total, item) => {
    return total + Number(item?.qty || item?.quantity || 0);
  }, 0);
};

const getReturnRequestCount = (payload) => {
  if (Array.isArray(payload)) return payload.length;
  if (Array.isArray(payload?.requests)) return payload.requests.length;
  if (Array.isArray(payload?.returnRequests)) return payload.returnRequests.length;
  if (Array.isArray(payload?.data)) return payload.data.length;

  return Number(payload?.total || payload?.count || 0);
};

const formatPrice = (amount) => {
  return Number(amount || 0).toLocaleString('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  });
};

const formatDate = (date) => {
  if (!date) return 'N/A';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'N/A';
  }

  return parsedDate.toLocaleDateString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState('home');
  const [returnRequestCount, setReturnRequestCount] = useState(0);

  const { user } = useSelector((state) => state.user);
  const { myOrders = [], delivered, loading } = useSelector(
    (state) => state.Order
  );
  const { userallreviews = [] } = useSelector((state) => state.review);

  const safeOrders = Array.isArray(myOrders) ? myOrders : [];
  const safeReviews = Array.isArray(userallreviews) ? userallreviews : [];

  useEffect(() => {
    dispatch(fetchMyOrders());
    dispatch(getUserAllReviews());
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;

    const loadReturnRequests = async () => {
      try {
        const res = await API.getMyReturnRequests();

        if (mounted) {
          setReturnRequestCount(getReturnRequestCount(res.data));
        }
      } catch (error) {
        if (mounted) {
          setReturnRequestCount(0);
        }
      }
    };

    loadReturnRequests();

    return () => {
      mounted = false;
    };
  }, []);

  const recentOrders = useMemo(() => {
    return [...safeOrders]
      .sort((a, b) => {
        return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
      })
      .slice(0, 3);
  }, [safeOrders]);

  const dashboardSummary = useMemo(() => {
    const apiSummary =
      delivered && typeof delivered === 'object' && !Array.isArray(delivered)
        ? delivered
        : {};

    const pendingOrders = Number(
      apiSummary.pendingOrders ??
        safeOrders.filter((order) => getDeliveryStatus(order) === 'pending')
          .length
    );

    const confirmedOrders = Number(
      apiSummary.confirmedOrders ??
        safeOrders.filter((order) => getDeliveryStatus(order) === 'confirmed')
          .length
    );

    const shippedOrders = Number(
      apiSummary.shippedOrders ??
        safeOrders.filter((order) => getDeliveryStatus(order) === 'shipped')
          .length
    );

    const deliveredOrders = Number(
      apiSummary.deliveredOrders ??
        safeOrders.filter((order) => getDeliveryStatus(order) === 'delivered')
          .length
    );

    return {
      totalOrders: Number(apiSummary.totalOrders ?? safeOrders.length),
      activeOrders: pendingOrders + confirmedOrders + shippedOrders,
      deliveredOrders,
      reviews: safeReviews.length,
    };
  }, [delivered, safeOrders, safeReviews.length]);

  const accountCards = [
    {
      id: 'orders',
      title: 'Your Orders',
      desc: 'Track delivery, payment status and invoice.',
      icon: Package,
      badge: `${dashboardSummary.totalOrders} Orders`,
    },
    {
      id: 'returns',
      title: 'Return Requests',
      desc: 'Request return, refund or replacement for eligible orders.',
      icon: RotateCcw,
      badge: `${returnRequestCount} Requests`,
      link: '/return-request',
    },
    {
      id: 'address',
      title: 'Your Addresses',
      desc: 'Manage saved and default delivery address.',
      icon: MapPin,
      badge: 'Manage',
    },
    {
      id: 'account',
      title: 'Login & Security',
      desc: 'Update profile information and password.',
      icon: LockKeyhole,
      badge: 'Secure',
    },
    {
      id: 'reviews',
      title: 'Your Reviews',
      desc: 'View your product reviews and ratings.',
      icon: Star,
      badge: `${dashboardSummary.reviews} Reviews`,
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      desc: 'View your saved favorite products.',
      icon: Heart,
      badge: 'Saved',
      link: '/wishlist',
    },
    {
      id: 'logout',
      title: 'Logout',
      desc: 'Sign out safely from your account.',
      icon: LogOut,
      badge: 'Exit',
    },
  ];

  const pageTitle = {
    orders: 'Your Orders',
    address: 'Your Addresses',
    account: 'Login & Security',
    reviews: 'Your Reviews',
    logout: 'Logout',
  };

  const renderPage = () => {
    if (activePage === 'orders') return <OrderList />;
    if (activePage === 'address') return <AddressSection />;
    if (activePage === 'account') return <AccountSettings />;
    if (activePage === 'reviews') return <ReviewList />;
    if (activePage === 'logout') return <LogoutButton />;

    return null;
  };

  const userName =
    `${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
    user?.name ||
    'Customer';

  if (activePage !== 'home') {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <Breadcrumb />

        <div className="container mx-auto px-4 py-6 font-Work_sans md:py-8">
          <div className="mb-5 flex flex-col gap-3 rounded-[28px] border border-black/5 bg-white/90 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setActivePage('home')}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-200 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-300"
            >
              <ArrowLeft size={17} strokeWidth={1.8} />
              Account Home
            </button>

            <h1 className="text-base font-medium tracking-tight text-black sm:text-lg">
              {pageTitle[activePage]}
            </h1>
          </div>

          <div className="rounded-[30px] border border-black/5 bg-white p-4 shadow-sm sm:p-6">
            {renderPage()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Breadcrumb />

      <div className="container mx-auto px-4 py-6 font-Work_sans md:py-8">
        <section className="overflow-hidden rounded-[34px] border border-black/5 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-br from-yellow-200 via-yellow-100 to-white p-5 md:p-7">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-yellow-300/60 blur-3xl" />
            <div className="absolute -bottom-24 left-8 h-52 w-52 rounded-full bg-yellow-200/70 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[24px] bg-black text-yellow-300 shadow-sm">
                  <UserCircle size={38} strokeWidth={1.6} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-yellow-800">
                    Welcome back
                  </p>

                  <h1 className="mt-1 text-2xl font-medium tracking-tight text-black md:text-4xl">
                    {userName}
                  </h1>

                  <p className="mt-1 text-sm font-normal text-gray-600">
                    {user?.email || 'Manage your account and orders.'}
                  </p>
                </div>
              </div>

              <Link
                to="/products"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
              >
                <ShoppingBag size={18} strokeWidth={1.8} />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="Total Orders"
              value={dashboardSummary.totalOrders}
              icon={Package}
            />

            <SummaryCard
              label="Active Orders"
              value={dashboardSummary.activeOrders}
              icon={Truck}
            />

            <SummaryCard
              label="Delivered"
              value={dashboardSummary.deliveredOrders}
              icon={CheckCircle2}
            />

            <SummaryCard
              label="Returns"
              value={returnRequestCount}
              icon={RotateCcw}
            />
          </div>
        </section>

        <section className="mt-7">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-black">
                Your Account
              </h2>

              <p className="mt-1 text-sm font-normal text-gray-500">
                Quick access to orders, returns, address, review and account
                settings.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {accountCards.map((card) =>
              card.link ? (
                <Link
                  key={card.id}
                  to={card.link}
                  className="group rounded-[28px] border border-black/5 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md"
                >
                  <AccountCard card={card} />
                </Link>
              ) : (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActivePage(card.id)}
                  className="group rounded-[28px] border border-black/5 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md"
                >
                  <AccountCard card={card} />
                </button>
              )
            )}
          </div>
        </section>

        <RecentOrders
          loading={loading}
          recentOrders={recentOrders}
          setActivePage={setActivePage}
        />
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, icon: Icon }) => {
  return (
    <div className="rounded-[24px] border border-black/5 bg-[#fbfbfd] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-normal uppercase tracking-[0.16em] text-gray-500">
            {label}
          </p>

          <h3 className="mt-1 text-2xl font-medium tracking-tight text-black">
            {value}
          </h3>
        </div>

        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-300 text-black">
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
};

const AccountCard = ({ card }) => {
  const Icon = card.icon;

  return (
    <>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-[20px] bg-yellow-100 text-yellow-800 transition group-hover:bg-yellow-300 group-hover:text-black">
          <Icon size={25} strokeWidth={1.7} />
        </div>

        <ChevronRight
          size={21}
          strokeWidth={1.8}
          className="mt-1 text-gray-300 transition group-hover:translate-x-1 group-hover:text-black"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-medium tracking-tight text-black">
          {card.title}
        </h3>

        <span className="rounded-full bg-[#f5f5f7] px-2.5 py-1 text-[11px] font-medium text-gray-600">
          {card.badge}
        </span>
      </div>

      <p className="mt-2 text-sm font-normal leading-6 text-gray-500">
        {card.desc}
      </p>
    </>
  );
};

const DeliveryBadge = ({ status }) => {
  const meta = deliveryMeta[status] || deliveryMeta.pending;
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${meta.className}`}
    >
      <Icon size={13} strokeWidth={1.8} />
      {meta.label}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
  const isPaid = status === 'paid' || status === 'verified';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        isPaid
          ? 'border-black bg-black text-yellow-300'
          : 'border-yellow-200 bg-yellow-50 text-yellow-900'
      }`}
    >
      <CreditCard size={13} strokeWidth={1.8} />
      {paymentMeta[status] || 'Payment Pending'}
    </span>
  );
};

const RecentOrders = ({ loading, recentOrders, setActivePage }) => {
  return (
    <section className="mt-8 overflow-hidden rounded-[30px] border border-black/5 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-black/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-black">
            Recent Orders
          </h3>

          <p className="mt-1 text-sm font-normal text-gray-500">
            Latest orders sorted by order date.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActivePage('orders')}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
        >
          View all
          <ChevronRight size={16} strokeWidth={1.8} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-3 p-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-3xl bg-[#f5f5f7]"
            />
          ))}
        </div>
      ) : recentOrders.length ? (
        <div className="divide-y divide-black/5">
          {recentOrders.map((order) => {
            const orderId = getOrderId(order);
            const deliveryStatus = getDeliveryStatus(order);
            const paymentStatus = getPaymentStatus(order);
            const itemCount = getOrderItemsCount(order);

            return (
              <div
                key={orderId || order?._id}
                className="grid gap-4 p-5 transition hover:bg-[#fbfbfd] lg:grid-cols-[1.25fr_0.8fr_1fr_auto] lg:items-center"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-black">
                    #{orderId || 'N/A'}
                  </p>

                  <p className="mt-1 text-xs font-normal text-gray-500">
                    {formatDate(order?.createdAt)} · {itemCount} item
                    {itemCount > 1 ? 's' : ''}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-normal uppercase tracking-[0.14em] text-gray-400">
                    Total
                  </p>

                  <p className="mt-1 text-sm font-medium text-black">
                    {formatPrice(order?.totalPrice)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <DeliveryBadge status={deliveryStatus} />
                  <PaymentBadge status={paymentStatus} />
                </div>

                <div className="lg:text-right">
                  <Link
                    to={`/view-order/${orderId || order?._id}`}
                    className="inline-flex items-center justify-center rounded-full border border-black bg-black px-4 py-2 text-xs font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-9 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-[24px] bg-yellow-100 text-yellow-800">
            <Package size={34} strokeWidth={1.7} />
          </div>

          <h4 className="mt-4 text-lg font-medium tracking-tight text-black">
            No orders yet
          </h4>

          <p className="mt-1 text-sm font-normal text-gray-500">
            Start shopping and your latest orders will appear here.
          </p>

          <Link
            to="/products"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </section>
  );
};

export default UserDashboard;