import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Gift, Headphones } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, productTypes, getProductsByType, getCategoriesByType } from '../data/products';

const Home = () => {
  const featuredProducts = products.filter(p => p.badge === 'new' || p.rating >= 4.7).slice(0, 8);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape--1" />
          <div className="hero__shape hero__shape--2" />
          <div className="hero__shape hero__shape--3" />
        </div>

        <div className="container hero__container">
          <div className="hero__content">
            <div className="hero__tag">
              <span className="hero__tag-dot" />
              Chào mừng đến với Len Sợi Dung Nhi
            </div>

            <h1 className="hero__title">
              Khám phá thế giới <span>len sợi</span> đầy màu sắc
            </h1>

            <p className="hero__description">
              Len sợi cao cấp nhập khẩu và trong nước, đa dạng chủng loại từ cotton,
              acrylic đến wool. Biến ý tưởng sáng tạo của bạn thành hiện thực.
            </p>

            <div className="hero__buttons">
              <Link to="/len-soi" className="btn btn-primary btn-lg">
                Khám phá ngay
                <ArrowRight size={18} />
              </Link>
              <Link to="/gioi-thieu" className="btn btn-secondary btn-lg">
                Về chúng tôi
              </Link>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-number">500+</div>
                <div className="hero__stat-label">Sản phẩm</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">10K+</div>
                <div className="hero__stat-label">Khách hàng</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">4.9</div>
                <div className="hero__stat-label">Đánh giá</div>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-grid">
              <div className="hero__image-item">
                <img
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=560&fit=crop"
                  alt="Len sợi nhiều màu sắc"
                />
              </div>
              <div className="hero__image-item">
                <img
                  src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&h=560&fit=crop"
                  alt="Cuộn len wool"
                />
              </div>
              <div className="hero__image-item">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=560&fit=crop"
                  alt="Phụ kiện đan len"
                />
              </div>
              <div className="hero__image-item">
                <img
                  src="https://images.unsplash.com/photo-1585250003680-41a6e189ec7f?w=400&h=560&fit=crop"
                  alt="Sản phẩm len handmade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES - LEN SỢI ===== */}
      <section className="categories" id="categories-len">
        <div className="container">
          <h2 className="section-title">🧶 Len Sợi</h2>
          <p className="section-subtitle">
            Khám phá các loại len sợi và phụ kiện đan móc chất lượng cao
          </p>

          <div className="categories__grid">
            {getCategoriesByType('len-soi').map((cat, index) => (
              <Link
                to={`/len-soi?category=${cat.slug}`}
                className={`category-card animate-fadeInUp delay-${index + 1}`}
                key={cat.id}
                id={`category-${cat.slug}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-card__image"
                  loading="lazy"
                />
                <div className="category-card__overlay">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__count">
                    {getProductsByType('len-soi').filter(p => p.category === cat.slug).length} sản phẩm
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES - THÚ BÔNG ===== */}
      <section className="categories" id="categories-thu-bong">
        <div className="container">
          <h2 className="section-title">🧸 Thú Bông</h2>
          <p className="section-subtitle">
            Thú bông handmade đan móc từ len sợi, quà tặng độc đáo và dễ thương
          </p>

          <div className="categories__grid">
            {getCategoriesByType('thu-bong').map((cat, index) => (
              <Link
                to={`/thu-bong?category=${cat.slug}`}
                className={`category-card animate-fadeInUp delay-${index + 1}`}
                key={cat.id}
                id={`category-${cat.slug}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-card__image"
                  loading="lazy"
                />
                <div className="category-card__overlay">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__count">
                    {getProductsByType('thu-bong').filter(p => p.category === cat.slug).length} sản phẩm
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="featured" id="featured">
        <div className="container">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <p className="section-subtitle">
            Những sản phẩm được yêu thích nhất tại Len Sợi Dung Nhi
          </p>

          <div className="featured__grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="featured__cta">
            <Link to="/len-soi" className="btn btn-secondary">
              Xem len sợi
              <ArrowRight size={16} />
            </Link>
            <Link to="/thu-bong" className="btn btn-secondary" style={{marginLeft: '1rem'}}>
              Xem thú bông
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about__grid">
            <div className="about__image-container">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop"
                alt="Xưởng len sợi"
                className="about__image"
                loading="lazy"
              />
              <div className="about__image-accent" />
            </div>

            <div className="about__content">
              <h2>
                Đam mê len sợi, <span>truyền cảm hứng</span> sáng tạo
              </h2>
              <p>
                Len Sợi Dung Nhi được thành lập với sứ mệnh mang đến những sản phẩm
                len sợi chất lượng cao nhất. Chúng tôi tuyển chọn kỹ lưỡng từng cuộn len
                từ các nhà cung cấp uy tín trên toàn thế giới.
              </p>
              <p>
                Với hơn 5 năm kinh nghiệm, chúng tôi hiểu rõ nhu cầu của người yêu
                thích đan len và luôn cập nhật những xu hướng mới nhất.
              </p>

              <div className="about__features">
                <div className="about__feature">
                  <div className="about__feature-icon"><Truck size={20} /></div>
                  <span className="about__feature-text">Giao hàng toàn quốc</span>
                </div>
                <div className="about__feature">
                  <div className="about__feature-icon"><Shield size={20} /></div>
                  <span className="about__feature-text">Cam kết chính hãng</span>
                </div>
                <div className="about__feature">
                  <div className="about__feature-icon"><Gift size={20} /></div>
                  <span className="about__feature-text">Quà tặng hấp dẫn</span>
                </div>
                <div className="about__feature">
                  <div className="about__feature-icon"><Headphones size={20} /></div>
                  <span className="about__feature-text">Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter" id="newsletter">
        <div className="newsletter__card">
          <h2 className="newsletter__title">Đăng ký nhận ưu đãi</h2>
          <p className="newsletter__description">
            Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên khi đăng ký email
          </p>
          <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              className="newsletter__input"
              placeholder="Nhập email của bạn..."
              id="newsletter-email"
            />
            <button type="submit" className="newsletter__submit" id="newsletter-submit">
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
