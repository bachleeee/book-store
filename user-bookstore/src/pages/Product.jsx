import React, { useState, useEffect } from "react";
import ProductService from "../service/product.service";
import ProductList from "../components/ProductList";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const limit = 12;

    useEffect(() => {
        fetchProducts();
    }, [currentPage, sortOrder, searchTerm]); 

    const fetchProducts = async () => {
        try {
            const response = await ProductService.getAll(currentPage, limit, sortOrder, searchTerm);
            setProducts(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        }
    };

    const handleSort = (order) => {
        setSortOrder((prevOrder) => (prevOrder === order ? "" : order));
    };

    const handleSearch = (e) => {
        e.preventDefault(); 
        setCurrentPage(1); 
        fetchProducts();
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center mb-3">
                        <div className="row mx-4">
                            <form onSubmit={handleSearch} className="form-inline">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-control"
                                        style={{ width: '450px' }}
                                        placeholder="Bạn muốn tìm sách..."
                                    />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-outline-danger">Tìm kiếm</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="btn-group">
                            <button
                                className={`btn btn-sm btn-outline-secondary ${sortOrder === "asc" ? "active" : ""}`}
                                onClick={() => handleSort("asc")}
                            >
                                Giá thấp đến cao
                            </button>
                            <button
                                className={`btn btn-sm btn-outline-secondary ${sortOrder === "desc" ? "active" : ""}`}
                                onClick={() => handleSort("desc")}
                            >
                                Giá cao đến thấp
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductList key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="text-center">Không tìm thấy sản phẩm nào</p>
                        )}
                    </div>

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
            </div>
        </div>
    );
};

export default ProductPage;
