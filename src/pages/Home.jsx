import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../components/animation/ScrollReveal';
import TextReveal from '../components/animation/TextReveal';
import ParallaxImage from '../components/animation/ParallaxImage';
import ProductCard from '../components/ProductCard';
import NewsletterForm from '../components/ui/NewsletterForm';
import { getProductsByType } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroTextRef = useRef(null);
  const heroBigRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnRef = useRef(null);

  const featuredProducts = [
    ...getProductsByType('len-soi').slice(0, 2),
    ...getProductsByType('thu-bong').slice(0, 2),
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
      <section className="grid grid-cols-1 md:grid-cols-2">
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
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-[#6B7280] mb-3">Nổi Bật</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171717]">Sản Phẩm Nổi Bật</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/len-soi"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#171717] text-xs tracking-widest uppercase font-medium hover:bg-[#171717] hover:text-white transition-all duration-300"
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <ScrollReveal>
        <NewsletterForm />
      </ScrollReveal>
    </main>
  );
};

export default Home;
