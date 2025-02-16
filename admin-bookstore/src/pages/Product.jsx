import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductService from "../service/product.service";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 10;

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await ProductService.getAll(currentPage, limit);
            setProducts(response.data);
            setTotalPages(response.totalPages);
            console.log(response);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        }
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>📦 Danh sách sản phẩm</h4>
                <Link to="/product/add" className="btn btn-success">
                    ➕ Thêm sản phẩm
                </Link>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={`/product/edit/${product._id}`} className="btn btn-warning btn-sm me-2">
                                    🖊️ Sửa
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeProduct(product.id)}
                                >
                                    🗑️ Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="m-3 d-flex justify-content-center">
                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                        <button
                            key={pageNum}
                            className={`btn btn-sm mx-1 ${currentPage === pageNum ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => setCurrentPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductPage;
