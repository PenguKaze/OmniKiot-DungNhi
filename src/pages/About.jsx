import ScrollReveal from '../components/animation/ScrollReveal';
import ParallaxImage from '../components/animation/ParallaxImage';

const VALUES = [
  { icon: '✦', title: 'Chất Lượng Cao', desc: 'Chỉ chọn len sợi từ những thương hiệu uy tín, đảm bảo độ mềm mại và bền màu.' },
  { icon: '♡', title: 'Làm Bằng Tay', desc: 'Mỗi sản phẩm đều được tạo ra thủ công, mang dấu ấn riêng và tình yêu của người làm.' },
  { icon: '✿', title: 'Sáng Tạo Không Ngừng', desc: 'Liên tục cập nhật những mẫu mới, theo xu hướng và lắng nghe nhu cầu của khách hàng.' },
];

const About = () => (
  <main style={{ paddingTop: '80px' }}>
    {/* Hero */}
    <div className="relative h-64 md:h-96 overflow-hidden flex items-center justify-center">
      <ParallaxImage src="/background_1.png" alt="About hero" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-black/50" />
      <h1 className="relative z-10 font-serif text-4xl md:text-6xl font-black text-white tracking-widest uppercase text-center px-6">
        Giới Thiệu
      </h1>
    </div>

    {/* Story section */}
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <ScrollReveal y={40}>
          <div className="aspect-[4/3] bg-[#F5F0EB] overflow-hidden">
            <ParallaxImage src="/background_2.png" alt="Dung Nhi studio" className="w-full h-full" speed={0.2} />
          </div>
        </ScrollReveal>
        <ScrollReveal y={40} delay={0.15}>
          <div>
            <p className="text-xs tracking-widest uppercase text-[#D4829A] font-medium mb-4">Câu Chuyện Của Chúng Tôi</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171717] mb-6 leading-tight">
              Từ Đam Mê Đến Thương Hiệu
            </h2>
            <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
              Len Sợi Dung Nhi được thành lập từ tình yêu với nghề thủ công. Bắt đầu từ những cuộn len đầu tiên và đôi tay khéo léo, chúng tôi đã tạo ra hàng ngàn sản phẩm handmade độc đáo.
            </p>
            <p className="text-[#6B7280] leading-relaxed text-sm">
              Mỗi sản phẩm là một câu chuyện — được dệt nên từ sự tỉ mỉ, tình yêu và tâm huyết của người thợ thủ công.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Values */}
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-[#171717]">Giá Trị Cốt Lõi</h2>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {VALUES.map((v, i) => (
          <ScrollReveal key={v.title} delay={i * 0.15}>
            <div className="text-center">
              <p className="text-3xl text-[#D4829A] mb-4">{v.icon}</p>
              <h3 className="font-serif text-lg font-bold text-[#171717] mb-3">{v.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{v.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </main>
);

export default About;
