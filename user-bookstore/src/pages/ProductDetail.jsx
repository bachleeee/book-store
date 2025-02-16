import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductService from '../service/product.service';
import UserService from '../service/user.service';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = useSelector(state => state.auth.user?.token);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await ProductService.getBySlug(slug);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    getProduct();
  }, [slug]);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!product) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const addToCart = async () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    try {
      const cartData = {  
        _id: product._id,
        count: quantity,
      };

      const response = await UserService.addtocart(token, { cart: [cartData] });
    if (response) {
      alert("Thêm vào giỏ hàng thành công!");
    }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <img src={product.img} className="img-fluid rounded" alt={product.name} />
            <div className="text-center mt-3">
              <button
                className="btn btn-danger btn-lg w-100"
                disabled={product.quantity <= 0 || !isLoggedIn}
                onClick={addToCart}
              >
                {isLoggedIn ? 'Thêm vào giỏ hàng' : 'Đăng nhập để mua hàng'}
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h1 className="fw-bold">{product.name}</h1>
          <p className={`fw-bold ${product.quantity > 0 ? 'text-success' : 'text-danger'}`}>
            {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
          </p>
          <p className="text-muted">Nhà xuất bản: Nhà xuất bản trẻ</p>

          <h3 className="text-danger fw-bold">{formatCurrency(product.price)}</h3>

          <div className="d-flex align-items-center mt-3">
            <label htmlFor="quantity" className="me-2">Số lượng:</label>
            <input
              type="number"
              id="quantity"
              className="form-control w-25 text-center"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-4 mt-4">
        <h5 className="text-danger">Mô tả</h5>
        <p className="text-muted">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;