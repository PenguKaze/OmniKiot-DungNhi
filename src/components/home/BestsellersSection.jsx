import Link from 'next/link';
import ScrollReveal from '../animation/ScrollReveal';
import { getProductsByType } from '../../data/products';

const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

const BestsellersSection = () => {
  const featuredProducts = [
    ...getProductsByType('len-soi').slice(0, 2),
    ...getProductsByType('thu-bong').slice(0, 3),
  ];

  return (
    <section className="py-[100px]">
      <ScrollReveal>
        <div className="flex items-end justify-between px-8 mb-8">
          <h2
            className="font-serif font-normal text-[#171717] tracking-tighter text-[3rem] min-[600px]:text-[3.625rem] min-[1024px]:text-[4.5rem] min-[1440px]:text-[6.25rem] min-[1920px]:text-[6.875rem]"
            style={{ lineHeight: '0.8' }}
          >
            SẢN PHẨM NỔI BẬT
          </h2>
          <Link
            href="/len-soi"
            className="text-xs tracking-widest uppercase font-bold text-[#171717] hover:opacity-50 transition-opacity duration-200 border-b border-black pb-0.5 mb-2 shrink-0"
          >
            Xem Tất Cả
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {featuredProducts.map((product, i) => (
          <div
            key={product.id}
            className="group relative overflow-hidden"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative overflow-hidden bg-[#F5F0EB] aspect-[3/4]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.badge && (
                <span className={`absolute top-3 left-3 px-2 py-1 text-[10px] tracking-widest uppercase font-semibold text-white ${product.badge === 'sale' ? 'bg-[#171717]' : 'bg-[#D4829A]'}`}>
                  {product.badge === 'sale' ? 'Sale' : 'Mới'}
                </span>
              )}
              <button
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-[#171717] hover:text-white"
                aria-label="Yêu thích"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
            <div className="px-3 pt-3 pb-5 border-r border-[#F0EBE5]">
              <p className="text-sm font-medium text-[#171717] leading-snug truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-[#D4829A]">{VND.format(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-[#6B7280] line-through">{VND.format(product.originalPrice)}</span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[#F0C87A] text-xs">{'★'.repeat(Math.floor(product.rating))}</span>
                  <span className="text-[10px] text-[#6B7280]">({product.reviewCount})</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 px-8">
        <Link
          href="/len-soi"
          className="inline-flex items-center gap-2 px-10 py-3.5 border border-[#171717] text-xs tracking-widest uppercase font-medium hover:bg-[#171717] hover:text-white transition-all duration-300"
        >
          Xem Tất Cả Sản Phẩm
        </Link>
      </div>
    </section>
  );
};

export default BestsellersSection;
