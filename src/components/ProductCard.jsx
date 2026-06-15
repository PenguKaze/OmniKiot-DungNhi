import { useRef } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const ProductCard = ({ product, similarityPercent = null }) => {
  const { addToCart, isInCart } = useCart();
  const imgRef = useRef(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const inCart = isInCart(product.id);

  return (
    <div className="group relative">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F5F0EB] aspect-[3/4]">
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-[10px] tracking-widest uppercase font-semibold text-white ${
              product.badge === 'sale' ? 'bg-red-500' : 'bg-[#7BAE7F]'
            }`}
          >
            {product.badge === 'sale' ? 'Sale' : 'Mới'}
          </span>
        )}

        {/* Similarity badge */}
        {similarityPercent !== null && (
          <span className="absolute top-3 right-3 px-2 py-1 text-[10px] bg-[#171717] text-white font-medium">
            {similarityPercent}% phù hợp
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#171717]/0 group-hover:bg-[#171717]/30 transition-all duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 text-[10px] tracking-widest uppercase font-medium transition-all duration-200 ${
                inCart
                  ? 'bg-[#D4829A] text-white'
                  : 'bg-white text-[#171717] hover:bg-[#171717] hover:text-white'
              }`}
            >
              {inCart ? 'Đã thêm ✓' : 'Thêm vào giỏ'}
            </button>
            <button className="p-2 bg-white text-[#171717] hover:bg-[#D4829A] hover:text-white transition-all duration-200" aria-label="Yêu thích">
              <Heart size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-[#171717] leading-snug">{product.name}</p>
          {product.color && (
            <span
              className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5 border border-gray-200"
              style={{ background: product.color }}
            />
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-[#D4829A]">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[#6B7280] line-through">{formatPrice(product.originalPrice)}</span>
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
  );
};

export default ProductCard;
