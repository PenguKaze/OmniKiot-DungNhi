import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useHeaderConfig } from '../context/ShopContext';
import MegaMenu from './layout/MegaMenu';
import AnnouncementBar from './layout/AnnouncementBar';

const NAV_LINKS = [
  { to: '/', label: 'Trang Chủ', hasMega: false },
  { to: '/len-soi', label: 'LEN SỢI', hasMega: true },
  { to: '/thu-bong', label: 'THÚ BÔNG', hasMega: true },
  { to: '/day-nghe', label: 'Dạy Nghề', hasMega: false },
  { to: '/kien-thuc', label: 'Kiến Thức', hasMega: false },
  { to: '/gioi-thieu', label: 'Giới Thiệu', hasMega: false },
  { to: '/lien-he', label: 'Liên Hệ', hasMega: false },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();
  const hCfg = useHeaderConfig();
  const leaveTimer = useRef(null);
  const lastScrollY = useRef(0);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 60);
      setAnnouncementVisible(current < lastScrollY.current || current < 10);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveMenu(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavEnter = (label, hasMega) => {
    clearTimeout(leaveTimer.current);
    if (hasMega) setActiveMenu(label);
  };

  const handleNavLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const transparent = isHome && !scrolled && !menuOpen;
  const textColor = transparent ? 'text-white' : 'text-[#171717]';
  const headerBg = transparent ? 'bg-transparent' : 'bg-white shadow-sm';

  return (
    <>
      <AnnouncementBar visible={announcementVisible} />

      <header
        className={`fixed left-0 right-0 z-[90] transition-all duration-300 ${headerBg}`}
        style={{ top: announcementVisible ? '32px' : '0px' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className={`font-serif text-xl font-bold tracking-widest uppercase ${textColor} transition-colors duration-300`}
          >
            Dung Nhi
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" onMouseLeave={handleNavLeave}>
            {NAV_LINKS.map(({ to, label, hasMega }) => (
              <div
                key={to}
                className={hasMega ? "" : "relative"}
                onMouseEnter={() => handleNavEnter(label, hasMega)}
              >
                <Link
                  to={to}
                  className={`text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${textColor} hover:text-[#D4829A]`}
                >
                  {label}
                </Link>
                {hasMega && activeMenu === label && (
                  <MegaMenu item={label} onClose={() => setActiveMenu(null)} />
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className={`${textColor} hover:text-[#D4829A] transition-colors duration-200`} aria-label="Tìm kiếm">
              <Search size={18} />
            </button>
            <button
              className={`relative ${textColor} hover:text-[#D4829A] transition-colors duration-200`}
              onClick={toggleCart}
              aria-label="Giỏ hàng"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#D4829A] text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className={`md:hidden ${textColor} hover:text-[#D4829A] transition-colors duration-200`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#171717] flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-white text-2xl font-serif tracking-widest uppercase hover:text-[#D4829A] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
