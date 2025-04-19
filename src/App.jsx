import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Banner from './Components/Banner';
import FlashSell from './Components/FlashSell';
import Product from './Components/utility/Product';
import Newsletter from './Components/Newsletter';
import ProductView from './Page/ProductView';
import './App.css';
import Footer from './Components/Footer';

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
              <Product />
              <Newsletter />
            </>
          }
        />
        <Route path="/products-detail" element={<ProductView />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* Add more routes here */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
