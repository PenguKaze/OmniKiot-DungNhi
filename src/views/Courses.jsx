'use client';
import ScrollReveal from '../components/animation/ScrollReveal';
import CourseCard from '../components/courses/CourseCard';

const COURSES = [
  { id: 1, title: 'Móc Len Cơ Bản', desc: 'Dành cho người mới bắt đầu. Học các kỹ thuật móc cơ bản từ A–Z.', price: '500.000₫', duration: '8 buổi' },
  { id: 2, title: 'Làm Thú Bông Amigurumi', desc: 'Tạo ra những chú thú bông dễ thương theo phong cách Nhật Bản.', price: '800.000₫', duration: '12 buổi' },
  { id: 3, title: 'Móc Len Nâng Cao', desc: 'Các kỹ thuật nâng cao: đan hoa, tạo pattern phức tạp.', price: '700.000₫', duration: '10 buổi' },
];

const Courses = () => (
  <main style={{ paddingTop: '80px' }}>
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
            <CourseCard course={course} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </main>
);

export default Courses;
