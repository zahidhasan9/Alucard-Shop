import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Headline from './Components/Headline';
import Carousel from './Components/Carousel';
import Banner from './Components/Banner';
import FlashSell from './Components/FlashSell';
import ProductCardSet from './Components/Product/ProductCardSet';
import ProductsAll from './Page/ProductsAll';
import Newsletter from './Components/Newsletter';
import ProductDetails from './Page/ProductDetails';
import UserDashboard from './Page/UserDashboard';
import CartPage from './Page/CartPage';
import LoginPage from './Page/Login';
import RegisterPage from './Page/Register';
import ForgotPasswordPage from './Page/ForgotPassword';
import ResetPassword from './Page/ResetPassword';
import OrderPage from './Page/OrderPage';
import OrderSuccessPage from './Page/OderSuccessPage';
import OrderDetails from './Page/OrderDetails';
import InvoicePage from './Page/Invoice';
import Footer from './Components/Footer';

import Navbar2 from './Components/Navbar/Navbar-two';
import Navbar3 from './Components/Navbar/Navbar-three';

// toster And data part
import { Toaster } from 'react-hot-toast';
import Loader from './Components/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser } from './features/userSlice';

// Protected Route
import PrivateRoute from './HOC/PrivateRoute';
// Css Import
import './App.css';

import ToastTestButton from './Page/Toastcheck';

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchLoggedInUser());
    }
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Navbar />
      <Navbar2 /> */}
      <Navbar3 />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Banner />
              <Headline />
              <FlashSell />
              <ProductCardSet />
              <Newsletter />
            </>
          }
        />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/products" element={<ProductsAll />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/order" element={<OrderPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/ordersucess" element={<OrderSuccessPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/view-order/:id" element={<OrderDetails />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/invoice/:id" element={<InvoicePage />} />
        </Route>

        {/* Add more routes here */}
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </>
  );
}

export default App;

{
  /* <Route
  path="/login"
  element={
    <ProtectedPublicRoute>
      <LoginPage />
    </ProtectedPublicRoute>
  }
/>
<Route
  path="/register"
  element={
    <ProtectedPublicRoute>
      <RegisterPage />
    </ProtectedPublicRoute>
  }
/> */
}

{
  /* <BrowserRouter>
      <Routes>
         পাবলিক রাউট 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

       প্রাইভেট রাউট 
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter> */
}
