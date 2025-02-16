import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../service/user.service';

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);
  const token = user?.token;

  useEffect(() => {
    getUserCart();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const getUserCart = async () => {
    try {
      if (isLoggedIn) {
        const userCart = await UserService.getCart(token);
        setCartProducts(userCart);
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId) 
        : [...prevSelected, productId] 
    );
  };

  const createOrder = async () => {
    try {
      if (selectedProducts.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng!");
        return;
      }

      const selectedItems = cartProducts
        .filter((product) => selectedProducts.includes(product._id))
        .map((product) => ({
          name: product.products[0].name,
          img: product.products[0].img,
          count: product.products[0].count,
          price: product.products[0].price
        }));

      const orderData = {
        total: totalAmount(),
        products: selectedItems
      };

      console.log("orderData", orderData);

      await UserService.createOrder(token, orderData);
      setMessage("✅ Đặt hàng thành công!");

    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      setMessage("Không thể đặt hàng. Vui lòng thử lại!");
    }
  };

  const totalAmount = () => {
    return cartProducts
      .filter((product) => selectedProducts.includes(product._id))
      .reduce((total, product) => {
        return total + product.products[0].price * product.products[0].count;
      }, 0);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Giỏ hàng của bạn</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr className="text-center">
              <th>Chọn</th>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.length > 0 ? (
              cartProducts.map((product, index) => (
                <tr key={product._id} className="text-center">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleSelectProduct(product._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <img src={product.products[0].img} alt={product.products[0].name} className="img-thumbnail" width="80" />
                  </td>
                  <td>{product.products[0].name}</td>
                  <td>{formatCurrency(product.products[0].price)}</td>
                  <td>{product.products[0].count}</td>
                  <td className="fw-bold text-danger">{formatCurrency(product.products[0].price * product.products[0].count)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">Giỏ hàng của bạn đang trống</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isLoggedIn && selectedProducts.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h3 className="fw-bold text-danger">Tổng tiền: {formatCurrency(totalAmount())}</h3>
          <button onClick={createOrder} className="btn btn-lg btn-primary px-4"> Đặt hàng</button>
        </div>
      )}

      <div className="text-center mt-3">
        <Link to="/order" className="btn btn-outline-dark">Kiểm tra đơn hàng</Link>
      </div>
    </div>
  );
};

export default CartPage;
