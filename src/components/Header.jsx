import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useHeaderConfig } from '../context/ShopContext';
import logoImg from '../assets/dung_nhi_handmade-removebg.png';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  // ← Đọc config ẩn/hiện từ ShopContext
  const hCfg = useHeaderConfig();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/len-soi', label: 'Len Sợi' },
    { to: '/thu-bong', label: 'Thú Bông' },
    { to: '/day-nghe', label: 'Dạy nghề' },
    { to: '/kien-thuc', label: 'Kiến thức' },
    { to: '/gioi-thieu', label: 'Giới thiệu' },
    { to: '/lien-he', label: 'Liên hệ' },
  ];

  // Kiểm tra xem có ít nhất 1 action button được hiện không
  const hasActions = hCfg.showSearch || hCfg.showWishlist || hCfg.showCart;

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : 'header--transparent'}`}>
        <div className="header-inner">

          {/* Logo */}
          {hCfg.showLogo && (
            <Link to="/" className="header__logo">
              <img src={logoImg} alt="Dung Nhi Handmade" className="header__logo-img" />
              {hCfg.showLogoText && (
                <div className="header__logo-text">
                  Len Sợi <span>Dung Nhi</span>
                </div>
              )}
            </Link>
          )}

          {/* Nav */}
          {hCfg.showNav && (
            <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`header__nav-link ${location.pathname === to ? 'active' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Action buttons */}
          {hasActions && (
            <div className="header__actions">
              {hCfg.showSearch && (
                <button className="header__action-btn" id="search-btn" aria-label="Tìm kiếm">
                  <Search size={20} />
                </button>
              )}

              {hCfg.showWishlist && (
                <button className="header__action-btn" id="wishlist-btn" aria-label="Yêu thích">
                  <Heart size={20} />
                </button>
              )}

              {hCfg.showCart && (
                <button
                  className="header__action-btn"
                  id="cart-btn"
                  aria-label="Giỏ hàng"
                  onClick={toggleCart}
                >
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="header__cart-count" key={cartCount}>{cartCount}</span>
                  )}
                </button>
              )}

              {/* Menu mobile toggle luôn hiện nếu nav được bật */}
              {hCfg.showNav && (
                <button
                  className="header__menu-toggle"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Menu"
                  id="menu-toggle"
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          )}

        </div>
      </header>

      <div
        className={`mobile-overlay ${menuOpen ? 'mobile-overlay--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
};

export default Header;
