'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../animation/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroBigRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnRef = useRef(null);

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
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      <div className="absolute inset-0 z-0">
        <img src="/background_1.png" alt="Hero" className="w-full h-full object-cover" />
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
        <p ref={heroSubRef} className="text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto" style={{ opacity: 0 }}>
          Len sợi cao cấp và thú bông handmade — làm nên từ tình yêu và sự tỉ mỉ
        </p>
        <div ref={heroBtnRef} style={{ opacity: 0 }}>
          <Link
            href="/len-soi"
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
  );
};

export default HeroSection;
