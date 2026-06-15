import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      localStorage.setItem('accessToken', data.accessToken);
      if (data.workspace?.slug) {
        localStorage.setItem('workspaceSlug', data.workspace.slug);
      }
      
      // Chuyển hướng người dùng sau khi đăng nhập thành công
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Đăng Nhập</h1>
        <p className="auth-subtitle">Quản lý cửa hàng của bạn</p>
        
        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__group">
            <label>Email quản trị</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="auth-form__group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" className="auth-form__submit" disabled={loading}>
            {loading ? 'Đang kiểm tra...' : 'Đăng Nhập'}
          </button>
        </form>

        <p className="auth-redirect">
          Chưa có cửa hàng? <Link to="/register">Tạo mới ngay</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
