import { ShoppingBag, Heart, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, showSimilarity, similarity }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const categoryName = categories.find(c => c.slug === product.category)?.name || product.category;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={13}
          className={i <= Math.round(rating) ? 'star' : 'star empty'}
          fill={i <= Math.round(rating) ? 'currentColor' : 'none'}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />

        {product.badge && !showSimilarity && (
          <div className="product-card__badge">
            <span className={`badge badge-${product.badge}`}>
              {product.badge === 'sale' ? 'Giảm giá' : 'Mới'}
            </span>
          </div>
        )}

        {showSimilarity && similarity != null && (
          <div className="product-card__similarity">
            <span className="product-card__similarity-badge">
              {similarity}% giống
            </span>
          </div>
        )}

        <div className="product-card__actions">
          <button
            className={`product-card__add-btn ${inCart ? 'product-card__add-btn--in-cart' : ''}`}
            onClick={handleAddToCart}
          >
            {inCart ? (
              <>
                <Check size={16} />
                Đã thêm
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Thêm vào giỏ
              </>
            )}
          </button>
          <button className="product-card__wishlist-btn" aria-label="Yêu thích">
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="product-card__content">
        <div className="product-card__category">{categoryName}</div>
        <Link to={`/san-pham/${product.slug}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>

        <div className="product-card__rating-row">
          <div className="rating">
            {renderStars(product.rating)}
          </div>
          <span className="product-card__rating-count">({product.reviewCount})</span>
          <div
            className="product-card__color"
            style={{ backgroundColor: product.color }}
            title={product.color}
          />
        </div>

        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className="product-card__original-price">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="product-card__discount">-{discount}%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

