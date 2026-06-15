import { useState } from 'react';
import ScrollReveal from '../components/animation/ScrollReveal';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main style={{ paddingTop: '80px' }}>
      <div className="relative h-48 md:h-64 flex items-center justify-center bg-[#171717]">
        <h1 className="font-serif text-4xl md:text-6xl font-black text-white tracking-widest uppercase">Liên Hệ</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Form */}
        <ScrollReveal y={40}>
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold text-[#171717] mb-8">Gửi Tin Nhắn</p>
            {sent ? (
              <p className="text-[#7BAE7F] font-medium">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất. ✓</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { name: 'name', label: 'Họ và tên', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                ].map(field => (
                  <div key={field.name} className="border-b border-gray-200 pb-2 focus-within:border-[#D4829A] transition-colors">
                    <label className="block text-[10px] tracking-widest uppercase text-[#6B7280] mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.name]}
                      onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full text-sm text-[#171717] bg-transparent outline-none placeholder:text-gray-300"
                    />
                  </div>
                ))}
                <div className="border-b border-gray-200 pb-2 focus-within:border-[#D4829A] transition-colors">
                  <label className="block text-[10px] tracking-widest uppercase text-[#6B7280] mb-2">Nội dung</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full text-sm text-[#171717] bg-transparent outline-none resize-none placeholder:text-gray-300"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#D4829A] transition-all duration-300"
                >
                  Gửi Tin Nhắn
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal y={40} delay={0.15}>
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold text-[#171717] mb-8">Thông Tin Liên Hệ</p>
            <ul className="space-y-6 text-sm text-[#6B7280]">
              <li className="flex gap-3"><span>📍</span><span>TP. Hồ Chí Minh, Việt Nam</span></li>
              <li className="flex gap-3"><span>📞</span><span>0123 456 789</span></li>
              <li className="flex gap-3"><span>✉️</span><span>hello@dungnhi.vn</span></li>
              <li className="flex gap-3"><span>🕐</span><span>8:00 – 21:00 hàng ngày</span></li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default Contact;
