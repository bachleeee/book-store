import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutClick = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
    }
  };

  return (
    <nav className="d-flex flex-column bg-dark vh-100 p-3 text-white">
      <div className="text-center mb-4">
        <img
          src="/src/assets/img/mybookstrore.png"
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "150px" }}
        />
      </div>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/product">
            <i className="fas fa-box me-2"></i> Quản lý sản phẩm
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/user">
            <i className="fas fa-users me-2"></i> Quản lý khách hàng
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/order">
            <i className="fas fa-shopping-cart me-2"></i> Quản lý đơn hàng
          </Link>
        </li>
      </ul>

      {isLoggedIn && (
        <div className="mt-auto text-center">
          <button className="btn btn-danger w-100" onClick={logoutClick}>
            <i className="fas fa-sign-out-alt"></i> Đăng xuất
          </button>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
