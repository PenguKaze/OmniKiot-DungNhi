import Link from 'next/link';
import ScrollReveal from '../animation/ScrollReveal';

const TILES = [
  {
    href: '/len-soi',
    src: '/products/discover_len_soi.png',
    alt: 'Len Sợi',
    style: { gridColumn: '1 / 3', gridRow: '1 / 3' },
    label: 'Len Sợi',
    sub: 'Bộ Sưu Tập',
    cta: 'Khám Phá →',
    size: 'text-3xl',
  },
  {
    href: '/thu-bong',
    src: '/products/discover_thu_bong.png',
    alt: 'Thú Bông',
    style: { gridColumn: '3 / 5', gridRow: '1 / 2' },
    label: 'Thú Bông',
    sub: 'Handmade',
    cta: 'Khám Phá →',
    size: 'text-2xl',
  },
  {
    href: '/day-nghe',
    src: '/products/discover_day_nghe.png',
    alt: 'Dạy Nghề',
    style: { gridColumn: '3 / 4', gridRow: '2 / 3' },
    label: 'Dạy Nghề',
    sub: null,
    cta: 'Xem Thêm →',
    size: 'text-xl',
  },
];

const DiscoverSection = () => (
  <section className="py-[100px] px-8 bg-[#F5F0EB]">
    <ScrollReveal>
      <div className="mb-12">
        <h2
          className="font-serif font-normal text-[#171717] tracking-tighter text-[3rem] min-[600px]:text-[3.625rem] min-[1024px]:text-[4.5rem] min-[1440px]:text-[6.25rem] min-[1920px]:text-[6.875rem]"
          style={{ lineHeight: '0.8' }}
        >
          KHÁM PHÁ SẢN PHẨM
        </h2>
      </div>
    </ScrollReveal>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '320px 320px',
        gap: '12px',
      }}
    >
      {TILES.map(({ href, src, alt, style, label, sub, cta, size }) => (
        <Link key={href + alt} href={href} className="group relative overflow-hidden" style={style}>
          <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute bottom-8 left-8">
            {sub && <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">{sub}</p>}
            <p className={`text-white font-serif ${size} font-bold uppercase`}>{label}</p>
            <span className="inline-block mt-4 text-[11px] tracking-widest uppercase border-b border-white/50 text-white pb-0.5 group-hover:border-white transition-all duration-300">
              {cta}
            </span>
          </div>
        </Link>
      ))}

      {/* Dark tile — Phụ Kiện */}
      <Link
        href="/len-soi"
        className="group relative overflow-hidden flex flex-col justify-end p-6 bg-[#171717]"
        style={{ gridColumn: '4 / 5', gridRow: '2 / 3' }}
      >
        <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">Mới Nhất</p>
        <p className="text-white font-serif text-xl font-bold uppercase leading-tight">Phụ Kiện<br />Đan Len</p>
        <span className="inline-block mt-4 text-[11px] tracking-widest uppercase border-b border-white/30 text-white pb-0.5 group-hover:border-white transition-all duration-300">
          Xem Thêm →
        </span>
      </Link>
    </div>
  </section>
);

export default DiscoverSection;
