import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../service/user.service";

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "" });

    useEffect(() => {
       getUserById();
     }, []);
   
     const getUserById = async () => {
       try {
         const response = await UserService.getById(id);
         setUser(response);
       } catch (error) {
         console.log("Lỗi khi lấy sản phẩm:", error);
       }
     };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await UserService.update(id, user);
            alert("✅ Cập nhật thành công!");
            navigate("/user");
        } catch (error) {
            console.error("Lỗi cập nhật người dùng:", error);
        }
    };

    return (
        <div className="container">
            <h3>✏️ Chỉnh Sửa Người Dùng</h3>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label>Tên:</label>
                    <input type="text" name="name" value={user.name} className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email} className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
            </form>
        </div>
    );
};

export default UserEdit;
