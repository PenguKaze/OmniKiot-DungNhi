const INFO = [
  { icon: '📍', text: 'TP. Hồ Chí Minh, Việt Nam' },
  { icon: '📞', text: '0123 456 789' },
  { icon: '✉️', text: 'hello@dungnhi.vn' },
  { icon: '🕐', text: '8:00 – 21:00 hàng ngày' },
];

const ContactInfo = () => (
  <div>
    <p className="text-xs tracking-widest uppercase font-semibold text-[#171717] mb-8">Thông Tin Liên Hệ</p>
    <ul className="space-y-6 text-sm text-[#6B7280]">
      {INFO.map(({ icon, text }) => (
        <li key={text} className="flex gap-3">
          <span>{icon}</span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ContactInfo;
