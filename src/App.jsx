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
import Footer from './Components/Footer';

// toster
import { Toaster } from 'react-hot-toast';

// Css Import
import './App.css';
import ForgotPasswordPage from './Page/ForgotPassword';

import ToastTestButton from './Page/Toastcheck';

function App() {
  return (
    <>
      {/* <div>
        <Navbar />
        <Carousel />
        <Banner />
        <FlashSell />
        <Product />
        <Newsletter />
        <Footer />
      </div>{' '} */}
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
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-Password" element={<ForgotPasswordPage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* Add more routes here */}
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </>
  );
}

export default App;
