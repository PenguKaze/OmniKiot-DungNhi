import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Award, Users, Sparkles, CheckCircle } from 'lucide-react';

const milestones = [
  { year: '2020', title: 'Khởi đầu', desc: 'Bắt đầu từ niềm đam mê đan móc len và chia sẻ với bạn bè.' },
  { year: '2021', title: 'Cửa hàng đầu tiên', desc: 'Mở cửa hàng online bán len sợi và phụ kiện đan móc.' },
  { year: '2023', title: 'Mở rộng', desc: 'Ra mắt dòng sản phẩm thú bông handmade và các khóa dạy nghề.' },
  { year: '2024', title: 'Cộng đồng', desc: 'Xây dựng cộng đồng 5,000+ thành viên yêu len sợi.' },
  { year: '2026', title: 'Hiện tại', desc: 'Tiếp tục phát triển với hơn 200 sản phẩm và 6 khóa học chuyên nghiệp.' },
];

const values = [
  { icon: <Heart size={28} />, title: 'Tận tâm', desc: 'Mỗi sản phẩm đều được tạo ra với tình yêu và sự chỉn chu trong từng mũi đan.' },
  { icon: <Award size={28} />, title: 'Chất lượng', desc: 'Chỉ sử dụng nguyên liệu len sợi chất lượng cao, an toàn và bền màu.' },
  { icon: <Users size={28} />, title: 'Cộng đồng', desc: 'Xây dựng không gian chia sẻ, học hỏi và kết nối cho người yêu len sợi.' },
  { icon: <Sparkles size={28} />, title: 'Sáng tạo', desc: 'Luôn cập nhật xu hướng mới nhất và sáng tạo những mẫu thiết kế độc đáo.' },
];

const About = () => {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__breadcrumb">
            <Link to="/">Trang chủ</Link>
            <ChevronRight size={14} />
            <span>Giới thiệu</span>
          </div>
          <div className="about-hero__content">
            <span className="about-hero__tag">🧶 Về chúng tôi</span>
            <h1 className="about-hero__title">
              Len Sợi <span>Dung Nhi</span>
            </h1>
            <p className="about-hero__desc">
              Nơi mỗi sợi len kể một câu chuyện — từ đam mê thủ công đến những sản phẩm 
              handmade tràn đầy tình yêu và sự sáng tạo.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="container">
          <div className="about-story__grid">
            <div className="about-story__image">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=700&fit=crop" 
                alt="Đan móc len" 
              />
              <div className="about-story__image-accent" />
            </div>
            <div className="about-story__text">
              <h2 className="section-title">Câu chuyện của chúng tôi</h2>
              <p>
                <strong>Len Sợi Dung Nhi</strong> ra đời từ niềm đam mê giản dị — tình yêu 
                với những cuộn len nhiều màu sắc và niềm vui khi tự tay tạo ra một sản phẩm ý nghĩa.
              </p>
              <p>
                Từ những ngày đầu chỉ đan móc cho bạn bè và gia đình, chúng tôi nhận ra rằng 
                mỗi mũi kim đan đều chứa đựng sự kiên nhẫn, sáng tạo và tình cảm. Đó là lý do 
                chúng tôi muốn lan tỏa nghệ thuật đan móc đến nhiều người hơn.
              </p>
              <p>
                Ngày nay, <strong>Dung Nhi</strong> không chỉ là cửa hàng len sợi — mà còn là 
                nơi bạn có thể học đan móc từ cơ bản đến nâng cao, tìm nguồn cảm hứng sáng tạo, 
                và kết nối với cộng đồng yêu thủ công khắp Việt Nam.
              </p>
              <div className="about-story__highlights">
                <div className="about-story__highlight">
                  <CheckCircle size={18} />
                  <span>200+ sản phẩm len sợi & thú bông</span>
                </div>
                <div className="about-story__highlight">
                  <CheckCircle size={18} />
                  <span>1,100+ học viên đã tham gia khóa học</span>
                </div>
                <div className="about-story__highlight">
                  <CheckCircle size={18} />
                  <span>5,000+ thành viên cộng đồng</span>
                </div>
                <div className="about-story__highlight">
                  <CheckCircle size={18} />
                  <span>100% nguyên liệu chất lượng cao</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title section-title--center">Giá trị cốt lõi</h2>
          <p className="section-subtitle">Những nguyên tắc định hướng mọi hoạt động của chúng tôi</p>
          <div className="about-values__grid">
            {values.map((v, i) => (
              <div className={`about-value-card animate-fadeInUp delay-${i + 1}`} key={i}>
                <div className="about-value-card__icon">{v.icon}</div>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="container">
          <h2 className="section-title section-title--center">Hành trình phát triển</h2>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`} key={i}>
                <div className="timeline__dot" />
                <div className={`timeline__card animate-fadeInUp delay-${i + 1}`}>
                  <span className="timeline__year">{m.year}</span>
                  <h3 className="timeline__title">{m.title}</h3>
                  <p className="timeline__desc">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta__card">
            <h2>Hãy cùng chúng tôi tạo nên những điều đẹp đẽ 🧶</h2>
            <p>Khám phá sản phẩm, tham gia khóa học hoặc liên hệ với chúng tôi ngay hôm nay!</p>
            <div className="about-cta__buttons">
              <Link to="/len-soi" className="btn btn-primary btn-lg">Xem sản phẩm</Link>
              <Link to="/lien-he" className="btn btn-secondary btn-lg">Liên hệ ngay</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
