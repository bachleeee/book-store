import React from 'react';
import UserService from '../service/user.service';
import { useSelector } from 'react-redux';

const CartItem = ({ product }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const removeFromCart = async () => {
    try {
      const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?');

      if (!confirmed) {
        return;
      }
      const result = {
        cart_id: product._id,
        product_id: product.products[0].product
      };

      await UserService.deleteProductFromCart(cookieValue, result);

      // Reload trang để cập nhật giỏ hàng
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  };

  return (
    <div className="cart-item row">
      <div className="col-md-1">
        <img src={product.products[0].img} alt="Product Image" className="product-image" />
      </div>
      <div className="col-md-6">
        <div className="product-details">
          <h5>{product.products[0].name}</h5>
          <p>Giá: {formatCurrency(product.products[0].price)}</p>
          <p>Số lượng: {product.products[0].count}</p>
        </div>
      </div>
      <div className="col-md-2 total-price">
        <p>Tổng: {formatCurrency(product.cartTotal)}</p>
        <button onClick={removeFromCart} className="btn btn-danger">Xóa</button>
      </div>
    </div>
  );
};

export default CartItem;
