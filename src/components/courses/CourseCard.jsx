const CourseCard = ({ course }) => (
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
);

export default CourseCard;
