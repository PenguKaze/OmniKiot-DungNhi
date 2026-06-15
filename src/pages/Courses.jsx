import ScrollReveal from '../components/animation/ScrollReveal';

const COURSES = [
  { id: 1, title: 'Móc Len Cơ Bản', desc: 'Dành cho người mới bắt đầu. Học các kỹ thuật móc cơ bản từ A–Z.', price: '500.000₫', duration: '8 buổi', image: null },
  { id: 2, title: 'Làm Thú Bông Amigurumi', desc: 'Tạo ra những chú thú bông dễ thương theo phong cách Nhật Bản.', price: '800.000₫', duration: '12 buổi', image: null },
  { id: 3, title: 'Móc Len Nâng Cao', desc: 'Các kỹ thuật nâng cao: đan hoa, tạo pattern phức tạp.', price: '700.000₫', duration: '10 buổi', image: null },
];

const Courses = () => (
  <main style={{ paddingTop: '80px' }}>
    {/* Hero banner */}
    <div className="relative h-48 md:h-64 overflow-hidden flex items-center justify-center bg-[#171717]">
      <h1 className="relative z-10 font-serif text-4xl md:text-6xl font-black text-white tracking-widest uppercase">Dạy Nghề</h1>
    </div>

    <div className="max-w-6xl mx-auto px-6 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-[#6B7280] text-sm max-w-xl mx-auto leading-relaxed">
            Học móc len và làm thú bông cùng Dung Nhi — từ người mới đến nâng cao.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course, i) => (
          <ScrollReveal key={course.id} delay={i * 0.1}>
            <div className="group border border-gray-100 hover:border-[#D4829A] transition-all duration-300">
              <div className="aspect-[4/3] bg-[#F5F0EB] flex items-center justify-center">
                <span className="font-serif text-4xl text-[#D4829A] opacity-30">✦</span>
              </div>
              <div className="p-6">
                <p className="font-serif text-lg font-bold text-[#171717] mb-2">{course.title}</p>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{course.desc}</p>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-4">
                  <span>⏱ {course.duration}</span>
                  <span className="font-semibold text-[#D4829A] text-sm">{course.price}</span>
                </div>
                <button className="w-full py-2.5 text-xs tracking-widest uppercase border border-[#171717] hover:bg-[#171717] hover:text-white transition-all duration-200">
                  Đăng Ký Ngay
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </main>
);

export default Courses;
