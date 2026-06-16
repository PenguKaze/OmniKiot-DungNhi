import ScrollReveal from '../animation/ScrollReveal';
import ParallaxImage from '../animation/ParallaxImage';

const AboutStory = () => (
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
);

export default AboutStory;
