import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);

  return (
    <div className="bg-light py-3 mb-3">
      <div className="container ">
        <div className="row">
          <div className="col-3">
            <Link to="/" className="menu-item">
              <img src="src\assets\img\mybookstrore.png" alt="logo" style={{ width: '240px' }} />
            </Link>
          </div>
          <div className="col-6">
          </div>
          <div className="col-3">
            <div className="btn-click d-flex justify-content-between w-100">
              <Link to="/product" className="btn btn-primary flex-grow-1 mx-1 text-center">
                <p className="mb-0">Sản phẩm</p>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/cart" className="btn btn-primary flex-grow-1 mx-1 text-center">
                    <p className="mb-0">Giỏ hàng</p>
                  </Link>
                  <button className="btn btn-primary flex-grow-1 mx-1 text-center">Logout</button>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary flex-grow-1 mx-1 text-center">
                  <i className="fa fa-user"></i>
                  <p className="mb-0">Đăng nhập</p>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;