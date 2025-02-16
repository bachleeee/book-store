import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/user.service";

const UserPage = () => {
    const [Users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 10;

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            const response = await UserService.getAll(currentPage, limit);
            setUsers(response.data);
            setTotalPages(response.totalPages);
            console.log(response);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
        }
    };

    const removeUser = async (id) => {
        try {
            await UserService.delete(id);
            fetchUsers();
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
        }
    }

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>📦 Danh sách người dùng</h4>
                <Link to="/User/add" className="btn btn-success">
                    ➕ Thêm người dùng
                </Link>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Tên người dùng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map((User, index) => (
                        <tr key={User._id}>
                            <td>{index + 1}</td>
                            <td>{User.name}</td>
                            <td>
                                <Link to={`/User/edit/${User._id}`} className="btn btn-warning btn-sm me-2">
                                    🖊️ Sửa
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeUser(User.id)}
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

export default UserPage;
