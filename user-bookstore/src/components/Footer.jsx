import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-3">
            <h5>DỊCH VỤ</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-white">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-white">Chính sách thanh toán</a></li>
              <li><a href="#" className="text-white">Giới thiệu</a></li>
              <li><a href="#" className="text-white">Hệ thống cửa hàng</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>HỖ TRỢ</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Chính sách đổi - trả</a></li>
              <li><a href="#" className="text-white">Chính sách bảo hành</a></li>
              <li><a href="#" className="text-white">Chính sách vận chuyển</a></li>
              <li><a href="#" className="text-white">Chính sách khách sỉ</a></li>
              <li><a href="#" className="text-white">Phương thức thanh toán</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>TÀI KHOẢN</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Đăng nhập/Tạo tài khoản</a></li>
              <li><a href="#" className="text-white">Thay đổi địa chỉ</a></li>
              <li><a href="#" className="text-white">Chi tiết tài khoản</a></li>
              <li><a href="#" className="text-white">Lịch sử mua hàng</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>LIÊN HỆ</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white"><i className="fab fa-facebook"></i> Facebook</a></li>
              <li><a href="#" className="text-white"><i className="fab fa-youtube"></i> YouTube</a></li>
              <li><a href="#" className="text-white"><i className="fab fa-google"></i> Google</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
