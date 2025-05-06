import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Banner from './Components/Banner';
import FlashSell from './Components/FlashSell';
import ProductCardSet from './Components/Product/ProductCardSet';
import ProductCardSet2 from './Components/Product/ProfuctView/ProjuctView';
import Newsletter from './Components/Newsletter';
import ProductView from './Page/ProductView';
import UserDashboard from './Page/UserDashboard';
import LoginPage from './Page/Login';
import RegisterPage from './Page/Register';
import ForgotPasswordPage from './Page/ForgotPassword';
import Footer from './Components/Footer';

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
  const { isAuthenticated,loading } = useSelector((state) => state.user);
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
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Banner />
              <FlashSell />
              <ProductCardSet />
              <Newsletter />
              <ToastTestButton />
            </>
          }
        />
        <Route path="/products-detail" element={<ProductView />} />
        <Route path="/products" element={<ProductCardSet2 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-Password" element={<ForgotPasswordPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
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
