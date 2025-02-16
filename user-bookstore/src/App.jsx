import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Order from './pages/Order';
import ProductDetail from './pages/ProductDetail';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login"; // Kiểm tra đường dẫn

  return (
    <div className='app'>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
