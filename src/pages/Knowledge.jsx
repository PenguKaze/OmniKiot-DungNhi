import ScrollReveal from '../components/animation/ScrollReveal';

const POSTS = [
  { id: 1, title: 'Cách chọn len sợi phù hợp cho người mới bắt đầu', excerpt: 'Hướng dẫn chi tiết về các loại len sợi phổ biến và cách chọn len phù hợp với từng dự án.', date: '10/06/2024', category: 'Hướng dẫn' },
  { id: 2, title: 'Kỹ thuật móc amigurumi cơ bản', excerpt: 'Tìm hiểu các kỹ thuật cơ bản để làm thú bông amigurumi — từ vòng ma thuật đến tăng/giảm mũi.', date: '05/06/2024', category: 'Kỹ thuật' },
  { id: 3, title: 'Bảo quản sản phẩm len sợi đúng cách', excerpt: 'Các mẹo bảo quản len sợi và thú bông để giữ độ bền và màu sắc lâu dài.', date: '01/06/2024', category: 'Mẹo hay' },
  { id: 4, title: 'Xu hướng màu sắc len sợi 2024', excerpt: 'Những màu sắc len sợi đang được yêu thích nhất trong năm 2024.', date: '28/05/2024', category: 'Xu hướng' },
];

const Knowledge = () => (
  <main style={{ paddingTop: '80px' }}>
    <div className="relative h-48 md:h-64 overflow-hidden flex items-center justify-center bg-[#171717]">
      <h1 className="relative z-10 font-serif text-4xl md:text-6xl font-black text-white tracking-widest uppercase">Kiến Thức</h1>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {POSTS.map((post, i) => (
          <ScrollReveal key={post.id} delay={i * 0.1}>
            <article className="group cursor-pointer">
              <div className="aspect-[16/9] bg-[#F5F0EB] mb-4 overflow-hidden flex items-center justify-center">
                <span className="font-serif text-5xl text-[#D4829A] opacity-20">✦</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] tracking-widest uppercase text-[#D4829A] font-medium">{post.category}</span>
                <span className="text-[10px] text-[#6B7280]">•</span>
                <span className="text-[10px] text-[#6B7280]">{post.date}</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-[#171717] mb-2 group-hover:text-[#D4829A] transition-colors duration-200 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">{post.excerpt}</p>
              <span className="inline-block mt-4 text-xs tracking-widest uppercase border-b border-[#171717] pb-0.5 group-hover:border-[#D4829A] group-hover:text-[#D4829A] transition-all duration-200">
                Đọc tiếp →
              </span>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </main>
);

export default Knowledge;
