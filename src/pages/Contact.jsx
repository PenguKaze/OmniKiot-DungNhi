import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, MessageCircle, Facebook, Music } from 'lucide-react';

const contactInfo = [
  {
    icon: <MapPin size={22} />,
    title: 'Địa chỉ',
    lines: ['Số 27 ngõ 167 đường Quang Tiến', 'Đại Mỗ, Nam Từ Liêm', 'TP. Hà Nội'],
  },
  {
    icon: <Phone size={22} />,
    title: 'Điện thoại',
    lines: ['0904968186'],
  },
  {
    icon: <Mail size={22} />,
    title: 'Email',
    lines: ['hello@dungnhi.vn', 'support@dungnhi.vn'],
  },
  {
    icon: <Clock size={22} />,
    title: 'Giờ làm việc',
    lines: ['Thứ 2 - Thứ 6: 8:00 - 18:00', 'Thứ 7: 9:00 - 17:00', 'Chủ nhật: Nghỉ'],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__breadcrumb">
            <Link to="/">Trang chủ</Link>
            <ChevronRight size={14} />
            <span>Liên hệ</span>
          </div>
          <h1 className="contact-hero__title">Liên Hệ Với Chúng Tôi</h1>
          <p className="contact-hero__sub">
            Bạn có câu hỏi? Chúng tôi luôn sẵn sàng hỗ trợ bạn!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-info__grid">
            {contactInfo.map((info, i) => (
              <div className={`contact-info-card animate-fadeInUp delay-${i + 1}`} key={i}>
                <div className="contact-info-card__icon">{info.icon}</div>
                <h3 className="contact-info-card__title">{info.title}</h3>
                {info.lines.map((line, j) => (
                  <p className="contact-info-card__line" key={j}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-main__grid">
            {/* Form */}
            <div className="contact-form-wrapper">
              <h2 className="contact-form__title">
                <MessageCircle size={22} /> Gửi tin nhắn cho chúng tôi
              </h2>
              <p className="contact-form__subtitle">
                Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24 giờ.
              </p>

              {submitted && (
                <div className="contact-form__success">
                  ✅ Cảm ơn bạn! Tin nhắn đã được gửi thành công. Chúng tôi sẽ liên hệ sớm nhất!
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="contact-name">Họ và tên *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div className="contact-form__group">
                    <label htmlFor="contact-email">Email *</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="contact-phone">Số điện thoại</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="090 123 4567"
                    />
                  </div>
                  <div className="contact-form__group">
                    <label htmlFor="contact-subject">Chủ đề</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">— Chọn chủ đề —</option>
                      <option value="san-pham">Hỏi về sản phẩm</option>
                      <option value="don-hang">Đơn hàng & vận chuyển</option>
                      <option value="khoa-hoc">Khóa học dạy nghề</option>
                      <option value="hop-tac">Hợp tác kinh doanh</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-message">Nội dung tin nhắn *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Viết nội dung tin nhắn..."
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="contact-form__submit" id="contact-submit">
                  <Send size={16} />
                  Gửi tin nhắn
                </button>
              </form>
            </div>

            {/* Map + Social */}
            <div className="contact-side">
              <div className="contact-map">
                <iframe
                  title="Bản đồ cửa hàng"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8711455278312!2d105.75490657596912!3d20.997801688839726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134536a16ab1d4f%3A0xfa3857b24ada03db!2zMjcgTmcuIDE2NyDEkC4gUXVhbmcgVGnhur9uLCDEkGFpIE3hu5csIEjDoCDEkMO0bmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1773330127389!5m2!1svi!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="contact-social">
                <h3 className="contact-social__title">Kết nối với chúng tôi</h3>
                <p className="contact-social__desc">
                  Theo dõi để cập nhật sản phẩm mới, khuyến mãi và mẹo đan móc hay!
                </p>
                <div className="contact-social__links">
                  <a href="https://www.facebook.com/dung.nhi.9883" target="_blank" className="contact-social__link contact-social__link--fb" aria-label="Facebook">
                    <Facebook size={20} />
                    Facebook
                  </a>
                  <a href="https://www.zalo.me/0904968186" target="_blank" className="contact-social__link contact-social__link--zalo" aria-label="Zalo">
                    <MessageCircle size={20} />
                    Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
