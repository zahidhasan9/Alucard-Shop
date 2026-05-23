// import React, { lazy, Suspense,useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import Headline from './Components/Headline';
// import Carousel from './Components/Carousel';
// import Banner from './Components/Banner';
// import FlashSell from './Components/FlashSell';
// import ProductCardSet from './Components/Product/ProductCardSet';
// import ProductsAll from './Page/ProductsAll';
// import Newsletter from './Components/Newsletter';
// import ProductDetails from './Page/ProductDetails';
// import UserDashboard from './Page/UserDashboard';
// import CartPage from './Page/CartPage';
// import LoginPage from './Page/Login';
// import RegisterPage from './Page/Register';
// import ForgotPasswordPage from './Page/ForgotPassword';
// import ResetPassword from './Page/ResetPassword';
// import OrderPage from './Page/OrderPage';
// import OrderSuccessPage from './Page/OderSuccessPage';
// import OrderDetails from './Page/OrderDetails';
// import InvoicePage from './Page/Invoice';
// import Footer from './Components/Footer';

// import Navbar2 from './Components/Navbar/Navbar-two';
// import Navbar3 from './Components/Navbar/Navbar-three';

// // toster And data part
// import { Toaster } from 'react-hot-toast';
// import Loader from './Components/Loader';

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLoggedInUser } from './features/userSlice';

// // Protected Route
// import PrivateRoute from './HOC/PrivateRoute';
// // Css Import
// import './App.css';

// import ToastTestButton from './Page/Toastcheck';

// function App() {
//   const { isAuthenticated, loading } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   // const token = window.localStorage.getItem('token');

//   useEffect(() => {
//     if (!isAuthenticated) {
//       dispatch(fetchLoggedInUser());
//     }
//   }, [isAuthenticated, dispatch]);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <>
//       {/* <Navbar />
//       <Navbar2 /> */}
//       <Navbar3 />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Carousel />
//               <Banner />
//               <Headline />
//               <FlashSell />
//               <ProductCardSet />
//               <Newsletter />
//             </>
//           }
//         />
//         <Route path="/product/:slug" element={<ProductDetails />} />
//         <Route path="/products" element={<ProductsAll />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/dashboard" element={<UserDashboard />} />
//         </Route>
//         <Route element={<PrivateRoute />}>
//           <Route path="/order" element={<OrderPage />} />
//         </Route>
//         <Route element={<PrivateRoute />}>
//           <Route path="/ordersucess" element={<OrderSuccessPage />} />
//         </Route>
//         <Route element={<PrivateRoute />}>
//           <Route path="/view-order/:id" element={<OrderDetails />} />
//         </Route>
//         <Route element={<PrivateRoute />}>
//           <Route path="/invoice/:id" element={<InvoicePage />} />
//         </Route>

//         {/* Add more routes here */}
//       </Routes>
//       <Toaster position="top-right" reverseOrder={false} />
//       <Footer />
//     </>
//   );
// }

// export default App;



// import { lazy, Suspense, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';

// import Navbar3 from './Components/Navbar/Navbar-three';
// import Footer from './Components/Footer';
// import Loader from './Components/Loader';
// import PrivateRoute from './HOC/PrivateRoute';
// import { fetchLoggedInUser } from './features/userSlice';

// import './App.css';

// const HomePage = lazy(() => import('./Page/HomePage'));
// const ProductsAll = lazy(() => import('./Page/ProductsAll'));
// const ProductDetails = lazy(() => import('./Page/ProductDetails'));
// const CartPage = lazy(() => import('./Page/CartPage'));
// const LoginPage = lazy(() => import('./Page/Login'));
// const RegisterPage = lazy(() => import('./Page/Register'));
// const ForgotPasswordPage = lazy(() => import('./Page/ForgotPassword'));
// const ResetPassword = lazy(() => import('./Page/ResetPassword'));

// const UserDashboard = lazy(() => import('./Page/UserDashboard'));
// const OrderPage = lazy(() => import('./Page/OrderPage'));
// const OrderSuccessPage = lazy(() => import('./Page/OderSuccessPage'));
// const OrderDetails = lazy(() => import('./Page/OrderDetails'));
// const InvoicePage = lazy(() => import('./Page/Invoice'));

// function App() {
//   const dispatch = useDispatch();
//   const { token, authChecked } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (token && !authChecked) {
//       dispatch(fetchLoggedInUser());
//     }
//   }, [token, authChecked, dispatch]);

//   return (
//     <>
//       <Navbar3 />

//       <Suspense fallback={<Loader />}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/product/:slug" element={<ProductDetails />} />
//           <Route path="/products" element={<ProductsAll />} />
//           <Route path="/cart" element={<CartPage />} />

//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//           <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

//           <Route element={<PrivateRoute />}>
//             <Route path="/dashboard" element={<UserDashboard />} />
//             <Route path="/order" element={<OrderPage />} />
//             <Route path="/ordersucess" element={<OrderSuccessPage />} />
//             <Route path="/view-order/:id" element={<OrderDetails />} />
//             <Route path="/invoice/:id" element={<InvoicePage />} />
//           </Route>
//         </Routes>
//       </Suspense>

//       <Toaster position="top-right" reverseOrder={false} />
//       <Footer />
//     </>
//   );
// }

// export default App;



import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import Navbar3 from './Components/Navbar/Navbar-three';
import Footer from './Components/Footer';
import Loader from './Components/Loader';
import PrivateRoute from './HOC/PrivateRoute';
import ErrorBoundary from './Components/ErrorBoundary';
import { fetchLoggedInUser } from './features/userSlice';

import './App.css';

const HomePage = lazy(() => import('./Page/HomePage'));
const ProductsAll = lazy(() => import('./Page/ProductsAll'));
const ProductDetails = lazy(() => import('./Page/ProductDetails'));
const CartPage = lazy(() => import('./Page/CartPage'));
const WishlistPage = lazy(() => import('./Page/WishlistPage'));
const InfoPage = lazy(() => import('./Page/InfoPage'));

const LoginPage = lazy(() => import('./Page/Login'));
const RegisterPage = lazy(() => import('./Page/Register'));
const ForgotPasswordPage = lazy(() => import('./Page/ForgotPassword'));
const ResetPassword = lazy(() => import('./Page/ResetPassword'));

const UserDashboard = lazy(() => import('./Page/UserDashboard'));
const OrderPage = lazy(() => import('./Page/OrderPage'));
const OrderSuccessPage = lazy(() => import('./Page/OderSuccessPage'));
const OrderDetails = lazy(() => import('./Page/OrderDetails'));
const InvoicePage = lazy(() => import('./Page/Invoice'));
const NotFound = lazy(() => import('./Page/NotFound'));
const ReturnRequestPage = lazy(() => import('./Page/ReturnRequestPage'));

function App() {
  const dispatch = useDispatch();
  const { token, authChecked } = useSelector((state) => state.user);

  useEffect(() => {
    if (token && !authChecked) {
      dispatch(fetchLoggedInUser());
    }
  }, [token, authChecked, dispatch]);

  return (
    <ErrorBoundary>
      <Navbar3 />

      <main className="pb-16 lg:pb-0">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsAll />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />

            <Route path="/about" element={<InfoPage type="about" />} />
            <Route path="/contact" element={<InfoPage type="contact" />} />
            <Route path="/privacy-policy" element={<InfoPage type="privacy" />} />
            <Route path="/return-policy" element={<InfoPage type="return" />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/ordersucess" element={<OrderSuccessPage />} />
              <Route path="/view-order/:id" element={<OrderDetails />} />
              <Route path="/invoice/:id" element={<InvoicePage />} />
              <Route path="/return-request" element={<ReturnRequestPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </main>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: '#111827',
            color: '#FACC15',
            fontWeight: 800,
            borderRadius: '16px',
          },
          success: {
            iconTheme: {
              primary: '#FACC15',
              secondary: '#111827',
            },
          },
          error: {
            style: {
              background: '#7F1D1D',
              color: '#FFFFFF',
              fontWeight: 800,
              borderRadius: '16px',
            },
          },
        }}
      />
    </ErrorBoundary>
  );
}

export default App;