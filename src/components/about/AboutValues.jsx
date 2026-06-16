import ScrollReveal from '../animation/ScrollReveal';

const VALUES = [
  { icon: '✦', title: 'Chất Lượng Cao', desc: 'Chỉ chọn len sợi từ những thương hiệu uy tín, đảm bảo độ mềm mại và bền màu.' },
  { icon: '♡', title: 'Làm Bằng Tay', desc: 'Mỗi sản phẩm đều được tạo ra thủ công, mang dấu ấn riêng và tình yêu của người làm.' },
  { icon: '✿', title: 'Sáng Tạo Không Ngừng', desc: 'Liên tục cập nhật những mẫu mới, theo xu hướng và lắng nghe nhu cầu của khách hàng.' },
];

const AboutValues = () => (
  <>
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
  </>
);

export default AboutValues;
