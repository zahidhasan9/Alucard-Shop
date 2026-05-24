
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   ArrowLeft,
//   ChevronRight,
//   Heart,
//   LayoutDashboard,
//   LockKeyhole,
//   LogOut,
//   MapPin,
//   Package,
//   ReceiptText,
//   Settings,
//   ShoppingBag,
//   Star,
//   Truck,
//   UserCircle,
// } from 'lucide-react';

// import Breadcrumb from '../Components/Breadcrumb';
// import AccountSettings from '../Components/UserDashBoard/AccountSettings';
// import OrderList from '../Components/UserDashBoard/OrderDashboard';
// import ReviewList from '../Components/UserDashBoard/ReviewList';
// import AddressSection from '../Components/UserDashBoard/Address';
// import LogoutButton from '../Components/UserDashBoard/Logout';

// import { fetchMyOrders } from '../features/OrderSlice';
// import { getUserAllReviews } from '../features/reviewSlice';

// const UserDashboard = () => {
//   const dispatch = useDispatch();
//   const [activePage, setActivePage] = useState('home');

//   const { user } = useSelector((state) => state.user);
//   const { myOrders = [], delivered, loading } = useSelector(
//     (state) => state.Order
//   );
//   const { userallreviews = [] } = useSelector((state) => state.review);

//   useEffect(() => {
//     dispatch(fetchMyOrders());
//     dispatch(getUserAllReviews());
//   }, [dispatch]);

//   const formatPrice = (amount) =>
//     Number(amount || 0).toLocaleString('en-BD', {
//       style: 'currency',
//       currency: 'BDT',
//       minimumFractionDigits: 0,
//     });

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   const recentOrders = [...myOrders].slice(0, 3);

//   const accountCards = [
//     {
//       id: 'orders',
//       title: 'Your Orders',
//       desc: 'Track, return, or buy products again.',
//       icon: <Package size={30} />,
//       badge: `${myOrders.length} Orders`,
//     },
//     {
//       id: 'address',
//       title: 'Your Addresses',
//       desc: 'Add, edit, or remove delivery addresses.',
//       icon: <MapPin size={30} />,
//       badge: 'Manage',
//     },
//     {
//       id: 'account',
//       title: 'Login & Security',
//       desc: 'Update name, email, and password.',
//       icon: <LockKeyhole size={30} />,
//       badge: 'Secure',
//     },
//     {
//       id: 'reviews',
//       title: 'Your Reviews',
//       desc: 'View and manage product reviews.',
//       icon: <Star size={30} />,
//       badge: `${userallreviews.length} Reviews`,
//     },
//     {
//       id: 'wishlist',
//       title: 'Wishlist',
//       desc: 'View saved products and favorite items.',
//       icon: <Heart size={30} />,
//       badge: 'Saved',
//     },
//     {
//       id: 'logout',
//       title: 'Logout',
//       desc: 'Sign out from your account safely.',
//       icon: <LogOut size={30} />,
//       badge: 'Exit',
//     },
//   ];

//   const pageTitle = {
//     orders: 'Your Orders',
//     address: 'Your Addresses',
//     account: 'Login & Security',
//     reviews: 'Your Reviews',
//     logout: 'Logout',
//   };

//   const renderPage = () => {
//     if (activePage === 'orders') return <OrderList />;
//     if (activePage === 'address') return <AddressSection />;
//     if (activePage === 'account') return <AccountSettings />;
//     if (activePage === 'reviews') return <ReviewList />;
//     if (activePage === 'logout') return <LogoutButton />;
//     return null;
//   };

//   if (activePage !== 'home' && activePage !== 'wishlist') {
//     return (
//       <div className="bg-gray-100">
//         <Breadcrumb />

//         <div className="container mx-auto px-4 py-8 font-Work_sans">
//           <div className="mb-5 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//             <button
//               onClick={() => setActivePage('home')}
//               className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
//             >
//               <ArrowLeft size={17} />
//               Account Home
//             </button>

//             <h1 className="text-lg font-bold text-gray-900">
//               {pageTitle[activePage]}
//             </h1>
//           </div>

//           <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
//             {renderPage()}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100">
//       <Breadcrumb />

//       <div className="container mx-auto px-4 py-8 font-Work_sans">
//         <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-yellow-600 p-6 text-white">
//             <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="grid h-16 w-16 place-items-center rounded-full bg-yellow-400 text-gray-950">
//                   <UserCircle size={38} />
//                 </div>

//                 <div>
//                   <p className="text-sm font-semibold text-yellow-300">
//                     Hello,
//                   </p>
//                   <h1 className="text-2xl font-bold">
//                     {user?.firstName} {user?.lastName}
//                   </h1>
//                   <p className="text-sm text-gray-200">{user?.email}</p>
//                 </div>
//               </div>

//               <Link
//                 to="/products"
//                 className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-yellow-500"
//               >
//                 <ShoppingBag size={18} />
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>

//           <div className="grid gap-3 p-4 sm:grid-cols-3">
//             <div className="rounded-xl bg-gray-50 p-4">
//               <p className="text-sm text-gray-500">Total Orders</p>
//               <h3 className="mt-1 text-2xl font-bold text-gray-950">
//                 {myOrders.length}
//               </h3>
//             </div>

//             <div className="rounded-xl bg-gray-50 p-4">
//               <p className="text-sm text-gray-500">Delivered</p>
//               <h3 className="mt-1 text-2xl font-bold text-gray-950">
//                 {delivered?.deliveredOrders || 0}
//               </h3>
//             </div>

//             <div className="rounded-xl bg-gray-50 p-4">
//               <p className="text-sm text-gray-500">Reviews</p>
//               <h3 className="mt-1 text-2xl font-bold text-gray-950">
//                 {userallreviews.length}
//               </h3>
//             </div>
//           </div>
//         </div>

//         <h2 className="mb-4 text-2xl font-bold text-gray-900">
//           Your Account
//         </h2>

//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {accountCards.map((card) => {
//             if (card.id === 'wishlist') {
//               return (
//                 <Link
//                   key={card.id}
//                   to="/wishlist"
//                   className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md"
//                 >
//                   <AccountCard card={card} />
//                 </Link>
//               );
//             }

//             return (
//               <button
//                 key={card.id}
//                 onClick={() => setActivePage(card.id)}
//                 className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md"
//               >
//                 <AccountCard card={card} />
//               </button>
//             );
//           })}
//         </div>

//         <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
//           <div className="flex items-center justify-between border-b border-gray-200 p-5">
//             <div>
//               <h3 className="text-lg font-bold text-gray-900">
//                 Recent Orders
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Your latest order activity.
//               </p>
//             </div>

//             <button
//               onClick={() => setActivePage('orders')}
//               className="text-sm font-bold text-yellow-700 hover:text-orange-600"
//             >
//               View all
//             </button>
//           </div>

//           {loading ? (
//             <div className="p-6 text-sm text-gray-500">Loading orders...</div>
//           ) : recentOrders.length ? (
//             <div className="divide-y divide-gray-100">
//               {recentOrders.map((order) => (
//                 <div
//                   key={order?._id || order?.orderId}
//                   className="grid gap-4 p-5 md:grid-cols-4 md:items-center"
//                 >
//                   <div>
//                     <p className="font-bold text-gray-900">
//                       {order?.orderId || 'N/A'}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {formatDate(order?.createdAt)}
//                     </p>
//                   </div>

//                   <div className="font-semibold text-gray-800">
//                     {formatPrice(order?.totalPrice)}
//                   </div>

//                   <div>
//                     <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
//                       <Truck size={14} />
//                       {order?.orderStatus || 'Processing'}
//                     </span>
//                   </div>

//                   <div className="flex gap-2 md:justify-end">
//                     <Link
//                       to={`/view-order/${order?.orderId}`}
//                       className="inline-flex items-center gap-1 rounded-full bg-gray-950 px-4 py-2 text-xs font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-950"
//                     >
//                       <ReceiptText size={14} />
//                       Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="p-8 text-center">
//               <Package className="mx-auto text-gray-400" size={44} />
//               <h4 className="mt-3 text-lg font-bold text-gray-900">
//                 No orders yet
//               </h4>
//               <p className="mt-1 text-sm text-gray-500">
//                 Start shopping and your orders will appear here.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const AccountCard = ({ card }) => {
//   return (
//     <>
//       <div className="mb-4 flex items-start justify-between">
//         <div className="grid h-14 w-14 place-items-center rounded-2xl bg-yellow-100 text-yellow-700 transition group-hover:bg-yellow-400 group-hover:text-gray-950">
//           {card.icon}
//         </div>

//         <ChevronRight
//           size={22}
//           className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-yellow-600"
//         />
//       </div>

//       <div className="flex items-center gap-2">
//         <h3 className="text-lg font-bold text-gray-950">{card.title}</h3>
//         <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
//           {card.badge}
//         </span>
//       </div>

//       <p className="mt-2 text-sm leading-6 text-gray-500">{card.desc}</p>
//     </>
//   );
// };

// export default UserDashboard;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  LockKeyhole,
  LogOut,
  MapPin,
  Package,
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

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState('home');

  const { user } = useSelector((state) => state.user);
  const { myOrders = [], delivered, loading } = useSelector(
    (state) => state.Order
  );
  const { userallreviews = [] } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchMyOrders());
    dispatch(getUserAllReviews());
  }, [dispatch]);

  const recentOrders = [...myOrders].slice(0, 3);

  const accountCards = [
    {
      id: 'orders',
      title: 'Your Orders',
      desc: 'Track orders, view details and download invoice.',
      icon: <Package size={30} />,
      badge: `${myOrders.length} Orders`,
    },
    {
      id: 'address',
      title: 'Your Addresses',
      desc: 'Manage delivery addresses and default address.',
      icon: <MapPin size={30} />,
      badge: 'Manage',
    },
    {
      id: 'account',
      title: 'Login & Security',
      desc: 'Update profile information and password.',
      icon: <LockKeyhole size={30} />,
      badge: 'Secure',
    },
    {
      id: 'reviews',
      title: 'Your Reviews',
      desc: 'View your product reviews and ratings.',
      icon: <Star size={30} />,
      badge: `${userallreviews.length} Reviews`,
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      desc: 'View your saved favorite products.',
      icon: <Heart size={30} />,
      badge: 'Saved',
      link: '/wishlist',
    },
    {
      id: 'logout',
      title: 'Logout',
      desc: 'Sign out safely from your account.',
      icon: <LogOut size={30} />,
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

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    });

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (activePage !== 'home') {
    return (
      <div className="min-h-screen bg-gray-100">
        <Breadcrumb />

        <div className="container mx-auto px-4 py-8 font-Work_sans">
          <div className="mb-5 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              <ArrowLeft size={17} />
              Account Home
            </button>

            <h1 className="text-base font-bold text-gray-900 sm:text-lg">
              {pageTitle[activePage]}
            </h1>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            {renderPage()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Breadcrumb />

      <div className="container mx-auto px-4 py-8 font-Work_sans">
        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-yellow-600 p-6 text-white">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-yellow-400 text-gray-950">
                  <UserCircle size={38} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-yellow-300">
                    Hello,
                  </p>
                  <h1 className="text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-sm text-gray-200">{user?.email}</p>
                </div>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-yellow-500"
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="mt-1 text-2xl font-bold text-gray-950">
                {myOrders.length}
              </h3>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Delivered</p>
              <h3 className="mt-1 text-2xl font-bold text-gray-950">
                {delivered?.deliveredOrders || 0}
              </h3>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Reviews</p>
              <h3 className="mt-1 text-2xl font-bold text-gray-950">
                {userallreviews.length}
              </h3>
            </div>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Your Account
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {accountCards.map((card) =>
            card.link ? (
              <Link
                key={card.id}
                to={card.link}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md"
              >
                <AccountCard card={card} />
              </Link>
            ) : (
              <button
                key={card.id}
                onClick={() => setActivePage(card.id)}
                className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md"
              >
                <AccountCard card={card} />
              </button>
            )
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Recent Orders
              </h3>
              <p className="text-sm text-gray-500">
                Your latest order activity.
              </p>
            </div>

            <button
              onClick={() => setActivePage('orders')}
              className="text-sm font-bold text-yellow-700 hover:text-orange-600"
            >
              View all
            </button>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-500">Loading orders...</div>
          ) : recentOrders.length ? (
            <div className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <div
                  key={order?._id || order?.orderId}
                  className="grid gap-4 p-5 md:grid-cols-4 md:items-center"
                >
                  <div>
                    <p className="font-bold text-gray-900">
                      {order?.orderId || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order?.createdAt)}
                    </p>
                  </div>

                  <div className="font-semibold text-gray-800">
                    {formatPrice(order?.totalPrice)}
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                      <Truck size={14} />
                      {order?.orderStatus || order?.paymentMethod?.status || 'Processing'}
                    </span>
                  </div>

                  <div className="md:text-right">
                    <Link
                      to={`/view-order/${order?.orderId}`}
                      className="inline-flex items-center rounded-full bg-gray-950 px-4 py-2 text-xs font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-950"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Package className="mx-auto text-gray-400" size={44} />
              <h4 className="mt-3 text-lg font-bold text-gray-900">
                No orders yet
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Start shopping and your orders will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AccountCard = ({ card }) => (
  <>
    <div className="mb-4 flex items-start justify-between">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-yellow-100 text-yellow-700 transition group-hover:bg-yellow-400 group-hover:text-gray-950">
        {card.icon}
      </div>

      <ChevronRight
        size={22}
        className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-yellow-600"
      />
    </div>

    <div className="flex flex-wrap items-center gap-2">
      <h3 className="text-lg font-bold text-gray-950">{card.title}</h3>
      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
        {card.badge}
      </span>
    </div>

    <p className="mt-2 text-sm leading-6 text-gray-500">{card.desc}</p>
  </>
);

export default UserDashboard;