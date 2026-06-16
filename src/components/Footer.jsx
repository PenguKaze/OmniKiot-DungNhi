import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const footerColumns = [
  {
    title: 'Len Sợi',
    links: [
      { label: 'Len Cotton', to: '/len-soi' },
      { label: 'Len Acrylic', to: '/len-soi' },
      { label: 'Len Wool', to: '/len-soi' },
      { label: 'Phụ Kiện', to: '/len-soi' },
    ],
  },
  {
    title: 'Thú Bông',
    links: [
      { label: 'Gấu Bông', to: '/thu-bong' },
      { label: 'Thú Nhỏ', to: '/thu-bong' },
      { label: 'Nhân Vật', to: '/thu-bong' },
      { label: 'Móc Chìa Khóa', to: '/thu-bong' },
    ],
  },
  {
    title: 'Liên Hệ',
    links: [
      { label: 'TP. Hồ Chí Minh, Việt Nam', to: '/lien-he' },
      { label: '0123 456 789', to: '/lien-he' },
      { label: 'hello@dungnhi.vn', to: '/lien-he' },
      { label: '8:00 – 21:00 hàng ngày', to: '/lien-he' },
    ],
  },
];

const Footer = () => (
  <footer style={{ backgroundColor: '#171717', color: '#fff', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
    {/* Top section: nav columns */}
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 48px 60px' }}>
      <div style={{ display: 'flex', gap: '80px' }}>
        {footerColumns.map(({ title, links }) => (
          <div key={title}>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '20px',
                marginTop: 0,
              }}
            >
              {title}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '15px',
                      fontWeight: 400,
                      opacity: 1,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Giant brand wordmark — bottom-right */}
    <div style={{ display: 'flex', justifyContent: 'flex-end', overflow: 'hidden', lineHeight: 1 }}>
      <p
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(2.5rem, 6vw, 6rem)',
          lineHeight: 0.85,
          color: '#fff',
          margin: 0,
          paddingRight: '48px',
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        DUNG NHI
      </p>
    </div>

    {/* Bottom bar */}
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Left: Social */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Theo dõi</span>
        {[
          { Icon: Instagram, href: '#', label: 'Instagram' },
          { Icon: Facebook, href: '#', label: 'Facebook' },
          { Icon: Youtube, href: '#', label: 'YouTube' },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            style={{ color: '#fff', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.4')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      {/* Right: Copyright + policy */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span style={{ fontSize: '13px', color: '#fff' }}>© 2024 Len Sợi Dung Nhi.</span>
        {['Chính Sách Bảo Mật', 'Điều Khoản Dịch Vụ'].map(text => (
          <a
            key={text}
            href="#"
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            {text}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
