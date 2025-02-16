import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ product }) => {
  const formatCurrency = (price) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);

    return `${formattedPrice}`;
  };

  return (
    <Link to={`/products/${product.slug}`} className="col-3">
      <div className="product-card mb-4">
        <div>
          <img style={{ width: '80%', height: 'auto' }} src={product.img} alt="" />
        </div>
        <div className="product-detail m-1">
          <div className="product-title">{product.name}</div>
          <p className="product-price">{formatCurrency(product.price)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
