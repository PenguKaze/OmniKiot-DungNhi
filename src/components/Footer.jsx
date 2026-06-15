import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__brand-name">
              🧶 Len Sợi <span>Dung Nhi</span>
            </div>
            <p className="footer__brand-description">
              Chuyên cung cấp len sợi cao cấp, phụ kiện đan móc và các khóa học
              đan len cho người yêu thích handmade. Chất lượng tốt nhất, giá cả
              hợp lý nhất.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <span>f</span>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <span>ig</span>
              </a>
              <a href="#" className="footer__social-link" aria-label="TikTok">
                <span>tk</span>
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <span>yt</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__heading">Len Sợi</h4>
            <div className="footer__links">
              <Link to="/len-soi?category=len-cotton" className="footer__link">Len Cotton</Link>
              <Link to="/len-soi?category=len-acrylic" className="footer__link">Len Acrylic</Link>
              <Link to="/len-soi?category=len-wool" className="footer__link">Len Wool</Link>
              <Link to="/len-soi?category=phu-kien" className="footer__link">Phụ kiện</Link>
            </div>
          </div>

          {/* Thu Bong */}
          <div>
            <h4 className="footer__heading">Thú Bông</h4>
            <div className="footer__links">
              <Link to="/thu-bong?category=gau-bong" className="footer__link">Gấu Bông</Link>
              <Link to="/thu-bong?category=thu-nho" className="footer__link">Thú Nhỏ</Link>
              <Link to="/thu-bong?category=nhan-vat" className="footer__link">Nhân Vật</Link>
              <Link to="/thu-bong?category=moc-khoa" className="footer__link">Móc Khóa</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer__heading">Liên hệ</h4>
            <div className="footer__contact-item">
              <MapPin size={16} className="footer__contact-icon" />
              <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
            </div>
            <div className="footer__contact-item">
              <Phone size={16} className="footer__contact-icon" />
              <span>0901 234 567</span>
            </div>
            <div className="footer__contact-item">
              <Mail size={16} className="footer__contact-icon" />
              <span>hello@lensoidungnhi.vn</span>
            </div>
            <div className="footer__contact-item">
              <Clock size={16} className="footer__contact-icon" />
              <span>T2 - CN: 8:00 - 21:00</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Len Sợi Dung Nhi. Tất cả quyền được bảo lưu.</p>
          <p>Made with ❤️ in Vietnam</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
