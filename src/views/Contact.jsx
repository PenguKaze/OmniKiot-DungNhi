'use client';
import ScrollReveal from '../components/animation/ScrollReveal';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

const Contact = () => (
  <main style={{ paddingTop: '80px' }}>
    <div className="relative h-48 md:h-64 flex items-center justify-center bg-[#171717]">
      <h1 className="font-serif text-4xl md:text-6xl font-black text-white tracking-widest uppercase">Liên Hệ</h1>
    </div>
    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
      <ScrollReveal y={40}>
        <ContactForm />
      </ScrollReveal>
      <ScrollReveal y={40} delay={0.15}>
        <ContactInfo />
      </ScrollReveal>
    </div>
  </main>
);

export default Contact;
