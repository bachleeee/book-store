import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderService from "../service/order.service";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    useEffect(() => {
        fetchOrders();
    }, [currentPage]);

    const fetchOrders = async () => {
        try {
            const response = await OrderService.getAll(currentPage, limit);
            setOrders(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        }
    };

    const removeOrder = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
            try {
                await OrderService.delete(id);
                fetchOrders();
            } catch (error) {
                console.error("Lỗi khi xóa đơn hàng:", error);
            }
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await OrderService.update(id, { newStatus }); 
            fetchOrders(); 
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        }
    };
    

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>📦 Danh sách đơn hàng</h4>
                <Link to="/order/add" className="btn btn-success">
                    ➕ Thêm đơn hàng
                </Link>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Mã đơn hàng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1 + (currentPage - 1) * limit}</td>
                            <td>{order._id}</td>
                            <td>
                                <select
                                    className="form-select"
                                    value={order.orderStatus}
                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                >
                                    <option value="placed">Chờ xác nhận</option>
                                    <option value="processing">Đang xử lý</option>
                                    <option value="shipped">Đã giao</option>
                                    <option value="delivered">Hoàn thành</option>
                                    <option value="canceled">Hủy</option>
                                </select>
                            </td>
                            <td>
                                <Link to={`/order/edit/${order._id}`} className="btn btn-warning btn-sm me-2">
                                    🖊️ Sửa
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeOrder(order._id)}
                                >
                                    🗑️ Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="m-3 d-flex justify-content-center">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`btn btn-sm mx-1 ${currentPage === index + 1 ? "btn-primary" : "btn-outline-secondary"}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;