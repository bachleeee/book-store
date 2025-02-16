import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserService from '../service/user.service';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);
  const token = user?.token;

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    try {
      const userOrders = await UserService.getOrder(token);
      console.log(userOrders);
      setOrders(userOrders);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'placed':
        return <span className="badge bg-warning text-dark">Chờ xác nhận</span>;
      case 'processing':
        return <span className="badge bg-primary">Đang xử lý</span>;
      case 'shipped':
        return <span className="badge bg-success">Đã giao</span>;
      case 'cancelled':
        return <span className="badge bg-danger">Đã hủy</span>;
      default:
        return <span className="badge bg-secondary">Chờ xác nhận</span>;
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">📦 Danh sách đơn hàng</h2>

      {orders.length === 0 ? (
        <div className="text-center text-muted">Bạn chưa có đơn hàng nào.</div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">🛒 Đơn hàng #{order._id}</h5>
                  <p className="card-text">Tổng tiền: <strong>{formatCurrency(order.amount)}</strong></p>
                  <p className="card-text">Trạng thái: {getStatusBadge(order.orderStatus)}</p>

                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr className="text-center">
                          <th>Hình ảnh</th>
                          <th>Sản phẩm</th>
                          <th>SL</th>
                          <th>Giá</th>
                          <th>Tổng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.detail.map((product) => (
                          <tr key={product._id}>
                            <td className="text-center">
                              <img 
                                src={product.img} 
                                alt={product.name} 
                                className="img-thumbnail" 
                                width="60" 
                              />
                            </td>
                            <td>{product.name}</td>
                            <td className="text-center">{product.count}</td>
                            <td className="text-center">{formatCurrency(product.price)}</td>
                            <td className="text-center fw-bold text-danger">
                              {formatCurrency(product.price * product.count)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
