import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/user.service";

const UserAdd = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.create(user);
      alert("✅ Thêm người dùng thành công!");
      navigate("/user"); 
    } catch (error) {
      console.error("Lỗi thêm người dùng:", error);
    }
  };

  return (
    <div className="container">
      <h3>Thêm Người Dùng</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên:</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Thêm</button>
      </form>
    </div>
  );
};

export default UserAdd;
