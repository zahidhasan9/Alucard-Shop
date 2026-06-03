
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
import ScrollToTop from './Components/ScrollToTop';

const HomePage = lazy(() => import('./Page/HomePage'));
const ProductsAll = lazy(() => import('./Page/ProductsAll'));
const ProductDetails = lazy(() => import('./Page/ProductDetails'));
const CategoryProducts = lazy(() => import('./Page/CategoryProducts'));
const CartPage = lazy(() => import('./Page/CartPage'));
const WishlistPage = lazy(() => import('./Page/WishlistPage'));
const InfoPage = lazy(() => import('./Page/InfoPage'));
const CompareProducts = lazy(() => import('./Page/CompareProducts'));
const BrandProducts = lazy(() => import('./Page/BrandProducts'));

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
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsAll />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/category/:slug" element={<CategoryProducts />} />
            <Route path="/brand/:slug" element={<BrandProducts />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/compare" element={<CompareProducts />} />
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