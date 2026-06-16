'use client';
import ParallaxImage from '../components/animation/ParallaxImage';
import AboutStory from '../components/about/AboutStory';
import AboutValues from '../components/about/AboutValues';

const About = () => (
  <main style={{ paddingTop: '80px' }}>
    <div className="relative h-64 md:h-96 overflow-hidden flex items-center justify-center">
      <ParallaxImage src="/background_1.png" alt="About hero" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-black/50" />
      <h1 className="relative z-10 font-serif text-4xl md:text-6xl font-black text-white tracking-widest uppercase text-center px-6">
        Giới Thiệu
      </h1>
    </div>
    <section className="max-w-6xl mx-auto px-6 py-20">
      <AboutStory />
      <AboutValues />
    </section>
  </main>
);

export default About;
