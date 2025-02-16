import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../service/product.service";

const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        img: "",
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ProductService.create(product);
            alert("🎉 Sản phẩm đã được thêm!");
            navigate("/product");
        } catch (error) {
            console.log("Lỗi khi thêm sản phẩm:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="col-6">
                <h3>Thêm sản phẩm</h3>
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
                    <button type="submit" className="btn btn-success">Lưu sản phẩm</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
