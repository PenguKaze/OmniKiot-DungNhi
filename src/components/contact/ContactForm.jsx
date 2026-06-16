'use client';
import { useState } from 'react';

const FIELDS = [
  { name: 'name', label: 'Họ và tên', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
];

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return <p className="text-[#7BAE7F] font-medium">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất. ✓</p>;
  }

  return (
    <div>
      <p className="text-xs tracking-widest uppercase font-semibold text-[#171717] mb-8">Gửi Tin Nhắn</p>
      <form onSubmit={handleSubmit} className="space-y-8">
        {FIELDS.map(field => (
          <div key={field.name} className="border-b border-gray-200 pb-2 focus-within:border-[#D4829A] transition-colors">
            <label className="block text-[10px] tracking-widest uppercase text-[#6B7280] mb-2">{field.label}</label>
            <input
              type={field.type}
              required
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
    </div>
  );
};

export default ContactForm;
