import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Eye, ArrowRight, BookOpen } from 'lucide-react';

const categories = [
  { id: 'tat-ca', name: 'Tất cả' },
  { id: 'huong-dan', name: 'Hướng dẫn' },
  { id: 'meo-hay', name: 'Mẹo hay' },
  { id: 'review', name: 'Review' },
  { id: 'cam-hung', name: 'Cảm hứng' },
  { id: 'kinh-nghiem', name: 'Kinh nghiệm' },
];

const articles = [
  {
    id: 1,
    title: 'Top 5 loại len dành cho người mới bắt đầu học đan móc',
    slug: 'top-5-loai-len-cho-nguoi-moi',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=500&fit=crop',
    category: 'huong-dan',
    categoryName: 'Hướng dẫn',
    date: '08/03/2026',
    readTime: '5 phút',
    views: 1250,
    excerpt: 'Bạn mới bắt đầu và không biết nên chọn loại len nào? Bài viết này sẽ giúp bạn hiểu rõ từng loại len cotton, acrylic, wool và cách chọn phù hợp với dự án đầu tay.',
    featured: true,
  },
  {
    id: 2,
    title: 'Hướng dẫn các mũi đan cơ bản: Xuôi, ngược, và tăng giảm mũi',
    slug: 'huong-dan-cac-mui-dan-co-ban',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&h=500&fit=crop',
    category: 'huong-dan',
    categoryName: 'Hướng dẫn',
    date: '05/03/2026',
    readTime: '8 phút',
    views: 2340,
    excerpt: 'Nắm vững các mũi đan cơ bản là bước đầu tiên quan trọng nhất. Cùng tìm hiểu chi tiết cách thực hiện mũi đan xuôi, ngược, và kỹ thuật tăng giảm mũi.',
    featured: true,
  },
  {
    id: 3,
    title: 'Sự khác nhau giữa len Milk Cotton 50g và 125g',
    slug: 'su-khac-nhau-len-milk-cotton',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop',
    category: 'review',
    categoryName: 'Review',
    date: '01/03/2026',
    readTime: '4 phút',
    views: 890,
    excerpt: 'Len Milk Cotton là loại len phổ biến nhất cho người mới. Nhưng chọn cuộn 50g hay 125g? So sánh chi tiết giá, chất lượng sợi và dự án phù hợp.',
  },
  {
    id: 4,
    title: 'Cách sửa lỗi thường gặp khi đan móc len',
    slug: 'cach-sua-loi-thuong-gap-dan-moc',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop',
    category: 'meo-hay',
    categoryName: 'Mẹo hay',
    date: '25/02/2026',
    readTime: '6 phút',
    views: 1567,
    excerpt: 'Bị rớt mũi, đan lệch, sợi len bị xoắn? Đây là những lỗi phổ biến và cách khắc phục đơn giản mà ai cũng có thể làm được.',
  },
  {
    id: 5,
    title: 'Hành trình móc len — Chia sẻ từ người đam mê thủ công',
    slug: 'hanh-trinh-moc-len-chia-se',
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=800&h=500&fit=crop',
    category: 'cam-hung',
    categoryName: 'Cảm hứng',
    date: '20/02/2026',
    readTime: '7 phút',
    views: 734,
    excerpt: 'Câu chuyện từ cô gái bắt đầu với cuộn len đầu tiên, đến khi tạo ra hàng trăm sản phẩm handmade và xây dựng thương hiệu riêng.',
  },
  {
    id: 6,
    title: 'Khám phá Amigurumi — Nghệ thuật móc thú bông Nhật Bản',
    slug: 'kham-pha-ky-thuat-amigurumi',
    image: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=800&h=500&fit=crop',
    category: 'huong-dan',
    categoryName: 'Hướng dẫn',
    date: '15/02/2026',
    readTime: '10 phút',
    views: 2100,
    excerpt: 'Amigurumi là nghệ thuật móc thú bông xuất phát từ Nhật Bản. Tìm hiểu nguồn gốc, kỹ thuật cơ bản và những mẫu đơn giản để bắt đầu.',
  },
  {
    id: 7,
    title: 'Kim tre, kim nhôm hay kim inox — Loại nào phù hợp với bạn?',
    slug: 'cach-chon-kim-dan-phu-hop',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=500&fit=crop',
    category: 'review',
    categoryName: 'Review',
    date: '10/02/2026',
    readTime: '5 phút',
    views: 650,
    excerpt: 'Mỗi loại kim đan có ưu nhược điểm riêng. Kim tre nhẹ và ấm tay, kim nhôm bóng và nhanh, kim inox bền và chắc.',
  },
  {
    id: 8,
    title: '10 ý tưởng quà tặng handmade từ len cho người thân yêu',
    slug: '10-y-tuong-qua-tang-len',
    image: 'https://images.unsplash.com/photo-1581783898382-80983a4b5c78?w=800&h=500&fit=crop',
    category: 'cam-hung',
    categoryName: 'Cảm hứng',
    date: '05/02/2026',
    readTime: '6 phút',
    views: 1890,
    excerpt: 'Từ khăn quàng cổ, nón len, túi xách đến thú bông và hoa len — ý tưởng quà tặng handmade ý nghĩa và dễ thực hiện nhất.',
  },
  {
    id: 9,
    title: 'Mẹo bảo quản sản phẩm len sợi bền đẹp theo thời gian',
    slug: 'meo-bao-quan-san-pham-len',
    image: 'https://images.unsplash.com/photo-1585250003680-41a6e189ec7f?w=800&h=500&fit=crop',
    category: 'meo-hay',
    categoryName: 'Mẹo hay',
    date: '01/02/2026',
    readTime: '4 phút',
    views: 430,
    excerpt: 'Sản phẩm len có thể bền đẹp nhiều năm nếu được bảo quản đúng cách. Cách giặt, phơi, và cất giữ đúng chuẩn.',
  },
  {
    id: 10,
    title: 'Kinh nghiệm bán sản phẩm len handmade trên Shopee và TikTok',
    slug: 'kinh-nghiem-ban-len-online',
    image: 'https://images.unsplash.com/photo-1597843786411-a7fa8b005b3d?w=800&h=500&fit=crop',
    category: 'kinh-nghiem',
    categoryName: 'Kinh nghiệm',
    date: '28/01/2026',
    readTime: '9 phút',
    views: 3200,
    excerpt: 'Kinh nghiệm thực tế bán sản phẩm len handmade online: chụp ảnh, viết mô tả, chạy quảng cáo và chăm sóc khách hàng.',
  },
];

const Knowledge = () => {
  const [activeCategory, setActiveCategory] = useState('tat-ca');

  const featured = articles.filter(a => a.featured);
  const filtered = activeCategory === 'tat-ca'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <main className="knowledge-page">
      {/* Hero */}
      <section className="knowledge-hero">
        <div className="container">
          <div className="knowledge-hero__breadcrumb">
            <Link to="/">Trang chủ</Link>
            <ChevronRight size={14} />
            <span>Kiến thức</span>
          </div>
          <h1 className="knowledge-hero__title">Chia Sẻ Kiến Thức</h1>
          <p className="knowledge-hero__sub">
            Mẹo hay, hướng dẫn và cảm hứng sáng tạo dành cho người yêu len sợi
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="knowledge-featured">
        <div className="container">
          <div className="knowledge-featured__grid">
            {/* Main featured */}
            <Link to={`/kien-thuc/${featured[0]?.slug}`} className="featured-main" id="featured-main">
              <img src={featured[0]?.image} alt={featured[0]?.title} className="featured-main__img" />
              <div className="featured-main__overlay">
                <span className="featured-main__cat">{featured[0]?.categoryName}</span>
                <h2 className="featured-main__title">{featured[0]?.title}</h2>
                <p className="featured-main__excerpt">{featured[0]?.excerpt}</p>
                <div className="featured-main__meta">
                  <span><Clock size={14} /> {featured[0]?.date}</span>
                  <span>{featured[0]?.readTime} đọc</span>
                  <span><Eye size={14} /> {featured[0]?.views.toLocaleString()}</span>
                </div>
              </div>
            </Link>

            {/* Side featured */}
            <div className="featured-side">
              {featured.slice(1).map(article => (
                <Link to={`/kien-thuc/${article.slug}`} className="featured-side__item" key={article.id}>
                  <img src={article.image} alt={article.title} className="featured-side__img" />
                  <div className="featured-side__overlay">
                    <span className="featured-side__cat">{article.categoryName}</span>
                    <h3 className="featured-side__title">{article.title}</h3>
                    <div className="featured-side__meta">
                      <span><Clock size={12} /> {article.readTime} đọc</span>
                      <span><Eye size={12} /> {article.views.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs + All Articles */}
      <section className="knowledge-all">
        <div className="container">
          <div className="knowledge-all__header">
            <h2 className="knowledge-all__title">
              <BookOpen size={22} /> Tất cả bài viết
            </h2>
            <div className="knowledge-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`knowledge-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  id={`tab-${cat.id}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="knowledge-grid">
            {filtered.map((article, i) => (
              <Link
                to={`/kien-thuc/${article.slug}`}
                className={`article-card animate-fadeInUp delay-${(i % 6) + 1}`}
                key={article.id}
                id={`article-${article.id}`}
              >
                <div className="article-card__img-wrap">
                  <img src={article.image} alt={article.title} className="article-card__img" loading="lazy" />
                  <span className="article-card__cat">{article.categoryName}</span>
                </div>
                <div className="article-card__body">
                  <h3 className="article-card__title">{article.title}</h3>
                  <p className="article-card__excerpt">{article.excerpt}</p>
                  <div className="article-card__footer">
                    <span className="article-card__date"><Clock size={13} /> {article.date}</span>
                    <span className="article-card__views"><Eye size={13} /> {article.views.toLocaleString()}</span>
                  </div>
                  <span className="article-card__read-more">
                    Đọc thêm <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="knowledge-empty">
              <p>📚 Không tìm thấy bài viết nào trong danh mục này.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Knowledge;
