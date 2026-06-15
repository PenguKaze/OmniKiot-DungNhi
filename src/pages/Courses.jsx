import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Users, Star, BookOpen, Award, Play } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Cơ bản đan len cho người mới',
    slug: 'co-ban-dan-len',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    instructor: 'Cô Dung Nhi',
    level: 'Cơ bản',
    duration: '8 buổi (16 giờ)',
    students: 234,
    rating: 4.9,
    reviewCount: 89,
    price: 800000,
    originalPrice: 1200000,
    description: 'Khóa học dành cho người mới bắt đầu, học cách cầm kim, các mũi đan cơ bản, đan khăn, nón đơn giản.',
    topics: ['Cách cầm kim đan', 'Mũi đan xuôi & ngược', 'Đan khăn quàng cổ', 'Đan nón beanie'],
    badge: 'Phổ biến',
  },
  {
    id: 2,
    title: 'Móc len Amigurumi - Thú bông',
    slug: 'moc-len-amigurumi',
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=600&h=400&fit=crop',
    instructor: 'Cô Dung Nhi',
    level: 'Trung bình',
    duration: '12 buổi (24 giờ)',
    students: 178,
    rating: 4.8,
    reviewCount: 67,
    price: 1200000,
    originalPrice: 1800000,
    description: 'Học kỹ thuật móc amigurumi Nhật Bản, tạo ra các chú thú bông len dễ thương từ cơ bản đến nâng cao.',
    topics: ['Mũi móc cơ bản', 'Đọc chart amigurumi', 'Móc thú nhỏ (gấu, thỏ)', 'Tạo hình & nhồi bông'],
    badge: 'Hot',
  },
  {
    id: 3,
    title: 'Đan áo len thời trang',
    slug: 'dan-ao-len-thoi-trang',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=400&fit=crop',
    instructor: 'Cô Dung Nhi',
    level: 'Nâng cao',
    duration: '16 buổi (32 giờ)',
    students: 95,
    rating: 4.9,
    reviewCount: 42,
    price: 2000000,
    originalPrice: null,
    description: 'Khóa nâng cao hướng dẫn đan áo len, cardigan, sweater theo kiểu dáng thời trang hiện đại.',
    topics: ['Đo & thiết kế pattern', 'Kỹ thuật đan nâng cao', 'Đan áo raglan top-down', 'Hoàn thiện & lắp ghép'],
    badge: 'Mới',
  },
  {
    id: 4,
    title: 'Móc khóa & phụ kiện len mini',
    slug: 'moc-khoa-phu-kien',
    image: 'https://images.unsplash.com/photo-1581783898382-80983a4b5c78?w=600&h=400&fit=crop',
    instructor: 'Cô Dung Nhi',
    level: 'Cơ bản',
    duration: '4 buổi (8 giờ)',
    students: 312,
    rating: 4.7,
    reviewCount: 134,
    price: 500000,
    originalPrice: 700000,
    description: 'Học cách móc các phụ kiện nhỏ xinh: móc khóa, hoa len, charm túi xách, quà tặng handmade.',
    topics: ['Móc hoa len cơ bản', 'Móc khóa thú mini', 'Charm & phụ kiện túi', 'Đóng gói quà tặng'],
    badge: 'Bestseller',
  },
  {
    id: 5,
    title: 'Kinh doanh sản phẩm len handmade',
    slug: 'kinh-doanh-len-handmade',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=400&fit=crop',
    instructor: 'Cô Dung Nhi',
    level: 'Tất cả',
    duration: '6 buổi (12 giờ)',
    students: 156,
    rating: 4.6,
    reviewCount: 58,
    price: 1500000,
    originalPrice: 2000000,
    description: 'Hướng dẫn từ A-Z cách bán sản phẩm len handmade online, xây dựng thương hiệu, chụp ảnh sản phẩm.',
    topics: ['Định giá sản phẩm', 'Chụp ảnh sản phẩm đẹp', 'Bán hàng trên Shopee/TikTok', 'Xây dựng thương hiệu'],
    badge: null,
  },
  {
    id: 6,
    title: 'Đan túi xách len macramé',
    slug: 'dan-tui-xach-macrame',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    instructor: 'Cô Dung Nhi',
    level: 'Trung bình',
    duration: '10 buổi (20 giờ)',
    students: 128,
    rating: 4.8,
    reviewCount: 45,
    price: 1000000,
    originalPrice: null,
    description: 'Kết hợp kỹ thuật đan len và macramé để tạo ra những chiếc túi xách độc đáo, thời trang.',
    topics: ['Các nút macramé cơ bản', 'Kết hợp len & dây', 'Đan túi tote', 'Đan túi đeo chéo'],
    badge: 'Mới',
  },
];

const formatCoursePrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={14}
        className={i <= Math.round(rating) ? 'star' : 'star empty'}
        fill={i <= Math.round(rating) ? 'currentColor' : 'none'}
      />
    );
  }
  return stars;
};

const Courses = () => {
  return (
    <main className="courses-page">
      {/* Hero */}
      <section className="courses-hero">
        <div className="courses-hero__bg" />
        <div className="container courses-hero__container">
          <div className="courses-hero__breadcrumb">
            <Link to="/">Trang chủ</Link>
            <ChevronRight size={14} />
            <span>Dạy nghề</span>
          </div>
          <div className="courses-hero__content">
            <span className="courses-hero__tag">🎓 Khóa học đan móc len</span>
            <h1 className="courses-hero__title">
              Học <span>đan móc len</span> cùng Dung Nhi
            </h1>
            <p className="courses-hero__description">
              Từ người mới bắt đầu đến nâng cao — học trực tiếp với thợ đan lành nghề,
              tự tay tạo ra những sản phẩm len sợi tuyệt đẹp.
            </p>
            <div className="courses-hero__stats">
              <div className="courses-hero__stat">
                <BookOpen size={20} />
                <div>
                  <strong>6</strong>
                  <span>Khóa học</span>
                </div>
              </div>
              <div className="courses-hero__stat">
                <Users size={20} />
                <div>
                  <strong>1,100+</strong>
                  <span>Học viên</span>
                </div>
              </div>
              <div className="courses-hero__stat">
                <Award size={20} />
                <div>
                  <strong>4.8</strong>
                  <span>Đánh giá</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-list">
        <div className="container">
          <div className="courses-list__grid">
            {courses.map((course, index) => (
              <div
                className={`course-card animate-fadeInUp delay-${(index % 6) + 1}`}
                key={course.id}
                id={`course-${course.slug}`}
              >
                <div className="course-card__image-wrapper">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-card__image"
                    loading="lazy"
                  />
                  {course.badge && (
                    <span className="course-card__badge">{course.badge}</span>
                  )}
                  <div className="course-card__play-overlay">
                    <div className="course-card__play-btn">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="course-card__content">
                  <div className="course-card__meta">
                    <span className={`course-card__level course-card__level--${course.level === 'Cơ bản' ? 'basic' : course.level === 'Trung bình' ? 'medium' : course.level === 'Nâng cao' ? 'advanced' : 'all'}`}>
                      {course.level}
                    </span>
                    <span className="course-card__duration">
                      <Clock size={13} />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="course-card__title">{course.title}</h3>
                  <p className="course-card__description">{course.description}</p>

                  <div className="course-card__topics">
                    {course.topics.slice(0, 3).map((topic, i) => (
                      <span key={i} className="course-card__topic">✓ {topic}</span>
                    ))}
                    {course.topics.length > 3 && (
                      <span className="course-card__topic course-card__topic--more">
                        +{course.topics.length - 3} nội dung
                      </span>
                    )}
                  </div>

                  <div className="course-card__footer">
                    <div className="course-card__rating">
                      <div className="rating">{renderStars(course.rating)}</div>
                      <span className="course-card__rating-text">
                        {course.rating} ({course.reviewCount})
                      </span>
                    </div>
                    <div className="course-card__students">
                      <Users size={14} />
                      {course.students} học viên
                    </div>
                  </div>

                  <div className="course-card__price-row">
                    <div className="course-card__price">
                      <span className="course-card__current-price">
                        {formatCoursePrice(course.price)}
                      </span>
                      {course.originalPrice && (
                        <span className="course-card__original-price">
                          {formatCoursePrice(course.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button className="course-card__enroll-btn">
                      Đăng ký ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="courses-cta">
        <div className="container">
          <div className="courses-cta__card">
            <div className="courses-cta__content">
              <h2 className="courses-cta__title">Bạn muốn học thử trước?</h2>
              <p className="courses-cta__text">
                Đăng ký buổi học thử miễn phí để trải nghiệm phương pháp giảng dạy
                tận tâm và không gian học tập thân thiện tại Len Sợi Dung Nhi.
              </p>
              <div className="courses-cta__buttons">
                <button className="btn btn-primary btn-lg" id="trial-signup">
                  📞 Đăng ký học thử miễn phí
                </button>
                <a href="tel:0901234567" className="btn btn-secondary btn-lg">
                  Gọi tư vấn: 090 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Courses;
