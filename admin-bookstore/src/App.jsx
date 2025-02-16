import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import User from "./pages/User";
import UserAdd from "./pages/UserAdd";
import UserEdit from "./pages/UserEdit";
import Product from "./pages/Product";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import Order from "./pages/Order";
import Login from "./pages/Login";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="d-flex">
      {location.pathname !== "/" && <Sidebar />}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user/edit/:id" element={<UserEdit />} />

        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
