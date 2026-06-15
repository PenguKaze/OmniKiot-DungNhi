import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#171717] text-white">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div>
          <p className="font-serif text-xl font-bold tracking-widest uppercase mb-4">Dung Nhi</p>
          <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs">
            Handmade với tình yêu — len sợi cao cấp và thú bông handmade từ Việt Nam.
          </p>
          <div className="flex gap-4 mt-6">
            {[
              { Icon: Facebook, href: '#', label: 'Facebook' },
              { Icon: Instagram, href: '#', label: 'Instagram' },
              { Icon: Youtube, href: '#', label: 'YouTube' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#6B7280] hover:text-[#D4829A] transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Len Sợi */}
        <div>
          <p className="text-xs tracking-widest uppercase font-semibold mb-6">Len Sợi</p>
          <ul className="space-y-3">
            {['Len Cotton', 'Len Acrylic', 'Len Wool', 'Phụ Kiện'].map(item => (
              <li key={item}>
                <Link to="/len-soi" className="text-sm text-[#6B7280] hover:text-white transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Thú Bông */}
        <div>
          <p className="text-xs tracking-widest uppercase font-semibold mb-6">Thú Bông</p>
          <ul className="space-y-3">
            {['Gấu Bông', 'Thú Nhỏ', 'Nhân Vật', 'Móc Chìa Khóa'].map(item => (
              <li key={item}>
                <Link to="/thu-bong" className="text-sm text-[#6B7280] hover:text-white transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <p className="text-xs tracking-widest uppercase font-semibold mb-6">Liên Hệ</p>
          <ul className="space-y-3 text-sm text-[#6B7280]">
            <li>📍 TP. Hồ Chí Minh, Việt Nam</li>
            <li>📞 0123 456 789</li>
            <li>✉️ hello@dungnhi.vn</li>
            <li>🕐 8:00 – 21:00 hàng ngày</li>
          </ul>
        </div>
      </div>

      {/* Big brand text */}
      <div className="border-t border-[#2a2a2a] pt-8 overflow-hidden">
        <p
          className="font-serif font-black text-center text-[#6B7280] tracking-[0.3em] uppercase select-none"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)', opacity: 0.15 }}
        >
          DUNG NHI
        </p>
      </div>

      <p className="text-center text-xs text-[#6B7280] mt-4">
        © 2024 Len Sợi Dung Nhi. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
