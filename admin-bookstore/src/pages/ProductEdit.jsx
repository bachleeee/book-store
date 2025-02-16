import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/product.service";

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    img: "",
  });

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const response = await ProductService.getById(id);
      setProduct(response);
    } catch (error) {
      console.log("Lỗi khi lấy sản phẩm:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.update(id, product);
      alert("✅ Cập nhật thành công!");
      navigate("/product");
    } catch (error) {
      console.log("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>✏️ Chỉnh sửa sản phẩm</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm:</label>
          <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá:</label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">URL Hình ảnh:</label>
          <input type="text" className="form-control" name="img" value={product.img} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default EditProduct;
