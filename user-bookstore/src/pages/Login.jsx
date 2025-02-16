import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { login } from '../store/actions/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook để chuyển trang
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Lấy trạng thái đăng nhập

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // Nếu đã đăng nhập, chuyển về trang Home
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (event) => { 
    event.preventDefault();
    const dataLogin = { email, password };

    try {
      const resultAction = await dispatch(login(dataLogin));

      if (login.fulfilled.match(resultAction)) {
        window.alert("🎉 Đăng nhập thành công!");
      } else {
        setError("❌ Đăng nhập thất bại! Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      setError("Lỗi trong quá trình đăng nhập.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Đăng nhập</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Tên đăng nhập:</label>
            <input 
              type="text" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Nhập email..."
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Mật khẩu:</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Nhập mật khẩu..."
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
        </form>
        
        <div className="text-center mt-3">
          <a href="/register" className="text-decoration-none">Chưa có tài khoản? Đăng ký</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
