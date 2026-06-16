const KnowledgeCard = ({ post }) => (
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
);

export default KnowledgeCard;
