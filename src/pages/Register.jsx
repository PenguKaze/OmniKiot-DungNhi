import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    shopName: '',
    shopSlug: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e) => {
    const shopName = e.target.value;
    setFormData({
      ...formData,
      shopName,
      shopSlug: generateSlug(shopName),
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Gọi API Backend (đã có ở bước trước)
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }

      // Lưu Token và chuyển hướng
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('workspaceSlug', data.workspace.slug);
      
      // Chuyển về trang chủ của shop vừa tạo
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
        <h1 className="auth-title">Khởi Tạo Workspace</h1>
        <p className="auth-subtitle">Tạo cửa hàng của riêng bạn trong 1 phút</p>
        
        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__group">
            <label>Tên Shop / Thương hiệu</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleNameChange}
              placeholder="VD: Len Sợi Dung Nhi"
              required
            />
          </div>

          <div className="auth-form__group">
            <label>Tên miền (Slug)</label>
            <input
              type="text"
              name="shopSlug"
              value={formData.shopSlug}
              onChange={handleChange}
              placeholder="vd: dung-nhi"
              required
            />
            <small>Đường dẫn: yourdomain.com/shop/<strong>{formData.shopSlug || '...'}</strong></small>
          </div>

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
              placeholder="Ít nhất 6 ký tự"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-form__submit" disabled={loading}>
            {loading ? 'Đang tạo cửa hàng...' : 'Đăng Ký & Tạo Shop'}
          </button>
        </form>

        <p className="auth-redirect">
          Đã có cửa hàng? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
