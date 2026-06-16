import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../components/animation/ScrollReveal';
import TextReveal from '../components/animation/TextReveal';
import ParallaxImage from '../components/animation/ParallaxImage';
import ProductCard from '../components/ProductCard';

import { getProductsByType } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroTextRef = useRef(null);
  const heroBigRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnRef = useRef(null);

  const featuredProducts = [
    ...getProductsByType('len-soi').slice(0, 2),
    ...getProductsByType('thu-bong').slice(0, 3),
  ];

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo(heroBtnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .fromTo(heroBigRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3');

    gsap.to(heroBigRef.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <main>
      {/* Hero */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/background_1.png"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <TextReveal
            as="h1"
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            triggerOnLoad
          >
            Thế Hệ Mới Của Len Sợi Handmade
          </TextReveal>
          <p
            ref={heroSubRef}
            className="text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto"
            style={{ opacity: 0 }}
          >
            Len sợi cao cấp và thú bông handmade — làm nên từ tình yêu và sự tỉ mỉ
          </p>
          <div ref={heroBtnRef} style={{ opacity: 0 }}>
            <Link
              to="/len-soi"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white text-white text-xs tracking-widest uppercase font-medium hover:bg-white hover:text-[#171717] transition-all duration-300"
            >
              Khám Phá Ngay
            </Link>
          </div>
        </div>

        <div
          ref={heroBigRef}
          className="absolute bottom-0 left-0 right-0 z-10 text-center overflow-hidden pointer-events-none"
          style={{ opacity: 0 }}
        >
          <p
            className="font-serif font-black text-white tracking-[0.3em] uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 15vw, 12rem)', opacity: 0.15 }}
          >
            DUNG NHI
          </p>
        </div>
      </section>

      {/* Category Showcase */}
      {/* <section className="grid grid-cols-1 md:grid-cols-2">
        {[
          { label: 'LEN SỢI', sub: 'Khám phá bộ sưu tập', to: '/len-soi', img: '/background_1.png' },
          { label: 'THÚ BÔNG', sub: 'Handmade với tình yêu', to: '/thu-bong', img: '/background_2.png' },
        ].map(({ label, sub, to, img }, i) => (
          <ScrollReveal key={label} delay={i * 0.15} y={40}>
            <Link to={to} className="group relative block overflow-hidden aspect-[4/3]">
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                <p className="font-serif text-3xl md:text-4xl font-bold tracking-wide mb-2">{label}</p>
                <p className="text-sm text-white/80 mb-4">{sub}</p>
                <span className="text-xs tracking-widest uppercase border-b border-white/60 pb-0.5 group-hover:border-white transition-all duration-200">
                  Khám Phá →
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </section> */}

      {/* ── SHOP BESTSELLERS ── */}
      <section className="py-[100px]">
        {/* Header — CANCAN style: giant thin serif title left + small CTA bottom-right */}
        <ScrollReveal>
          <div className="flex items-end justify-between px-8 mb-8">
            <h2
              className="font-serif font-normal text-[#171717] tracking-tighter text-[3rem] min-[600px]:text-[3.625rem] min-[1024px]:text-[4.5rem] min-[1440px]:text-[6.25rem] min-[1920px]:text-[6.875rem]"
              style={{ lineHeight: '0.8' }}
            >
              SẢN PHẨM NỔI BẬT
            </h2>
            <Link
              to="/len-soi"
              className="text-xs tracking-widest uppercase font-bold text-[#171717] hover:opacity-50 transition-opacity duration-200 border-b border-black pb-0.5 mb-2 shrink-0"
            >
              Xem Tất Cả
            </Link>
          </div>
        </ScrollReveal>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {featuredProducts.map((product, i) => (
            <div
              key={product.id}
              className="group relative overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#F5F0EB] aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2 py-1 text-[10px] tracking-widest uppercase font-semibold text-white ${product.badge === 'sale' ? 'bg-[#171717]' : 'bg-[#D4829A]'}`}>
                    {product.badge === 'sale' ? 'Sale' : 'Mới'}
                  </span>
                )}
                <button
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-[#171717] hover:text-white"
                  aria-label="Yêu thích"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              {/* Info */}
              <div className="px-3 pt-3 pb-5 border-r border-[#F0EBE5]">
                <p className="text-sm font-medium text-[#171717] leading-snug truncate">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-[#D4829A]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-[#6B7280] line-through">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[#F0C87A] text-xs">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="text-[10px] text-[#6B7280]">({product.reviewCount})</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 px-8">
          <Link
            to="/len-soi"
            className="inline-flex items-center gap-2 px-10 py-3.5 border border-[#171717] text-xs tracking-widest uppercase font-medium hover:bg-[#171717] hover:text-white transition-all duration-300"
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      </section>

      {/* ── DISCOVER ESSENTIALS ── */}
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

        {/* Mosaic: 1 big left (2-row) + 2 top-right + 2 bottom-right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: '320px 320px',
            gap: '12px',
          }}
        >
          {/* Big left tile — Len Sợi */}
          <Link
            to="/len-soi"
            className="group relative overflow-hidden"
            style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}
          >
            <img src="/products/discover_len_soi.png" alt="Len Sợi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">Bộ Sưu Tập</p>
              <p className="text-white font-serif text-3xl font-bold uppercase">Len Sợi</p>
              <span className="inline-block mt-4 text-[11px] tracking-widest uppercase border-b border-white/50 text-white pb-0.5 group-hover:border-white transition-all duration-300">
                Khám Phá →
              </span>
            </div>
          </Link>

          {/* Top-right — Thú Bông */}
          <Link
            to="/thu-bong"
            className="group relative overflow-hidden"
            style={{ gridColumn: '3 / 5', gridRow: '1 / 2' }}
          >
            <img src="/products/discover_thu_bong.png" alt="Thú Bông" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-1">Handmade</p>
              <p className="text-white font-serif text-2xl font-bold uppercase">Thú Bông</p>
              <span className="inline-block mt-3 text-[11px] tracking-widest uppercase border-b border-white/50 text-white pb-0.5 group-hover:border-white transition-all duration-300">
                Khám Phá →
              </span>
            </div>
          </Link>

          {/* Bottom-right left — Dạy Nghề */}
          <Link
            to="/day-nghe"
            className="group relative overflow-hidden"
            style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}
          >
            <img src="/products/discover_day_nghe.png" alt="Dạy Nghề" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-white font-serif text-xl font-bold uppercase">Dạy Nghề</p>
              <span className="inline-block mt-2 text-[11px] tracking-widest uppercase border-b border-white/50 text-white pb-0.5 group-hover:border-white transition-all duration-300">
                Xem Thêm →
              </span>
            </div>
          </Link>

          {/* Bottom-right right — Phụ Kiện (dark tile) */}
          <Link
            to="/len-soi"
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

    </main>
  );
};

export default Home;
