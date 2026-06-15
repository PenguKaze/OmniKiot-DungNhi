import { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-[#F5F0EB] py-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-xs tracking-widest uppercase text-[#6B7280] mb-4">Newsletter</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171717] mb-3">
          Nhận Ưu Đãi Đặc Biệt
        </h2>
        <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
          Đăng ký để nhận thông tin sản phẩm mới và ưu đãi dành riêng cho thành viên.
        </p>
        {submitted ? (
          <p className="text-[#7BAE7F] font-medium tracking-wide">Cảm ơn bạn đã đăng ký! ✓</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0 max-w-sm mx-auto">
            <input
              type="email"
              required
              placeholder="Email của bạn"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 border border-[#171717] px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#D4829A] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#D4829A] transition-all duration-300 border border-[#171717]"
            >
              Đăng Ký
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterForm;
