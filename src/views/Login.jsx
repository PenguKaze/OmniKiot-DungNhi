'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại');
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Image side */}
      <div className="hidden md:block relative overflow-hidden">
        <img src="/background_2.png" alt="Login" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-end p-12">
          <p className="font-serif text-4xl font-bold text-white tracking-widest uppercase leading-tight">
            Len Sợi<br />Dung Nhi
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-8 py-16 bg-white">
        <div className="w-full max-w-sm">
          <p className="text-xs tracking-widest uppercase text-[#6B7280] mb-2">Chào mừng trở lại</p>
          <h1 className="font-serif text-3xl font-bold text-[#171717] mb-10">Đăng Nhập</h1>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {[
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'password', label: 'Mật khẩu', type: 'password' },
            ].map(field => (
              <div key={field.name} className="border-b border-gray-200 pb-2 focus-within:border-[#D4829A] transition-colors">
                <label className="block text-[10px] tracking-widest uppercase text-[#6B7280] mb-2">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={form[field.name]}
                  onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full text-sm text-[#171717] bg-transparent outline-none"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#D4829A] transition-all duration-300 disabled:opacity-60"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          <p className="text-sm text-[#6B7280] text-center mt-8">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-[#171717] font-medium hover:text-[#D4829A] transition-colors underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
