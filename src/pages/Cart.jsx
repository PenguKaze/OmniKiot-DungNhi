import { Link } from 'react-router-dom';
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowLeft,
  Sparkles, Truck, Shield, Gift, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    cartOriginalTotal,
    cartSavings,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty__visual">
              <div className="cart-empty__icon-bg">
                <ShoppingBag size={48} />
              </div>
              <div className="cart-empty__sparkle cart-empty__sparkle--1">✦</div>
              <div className="cart-empty__sparkle cart-empty__sparkle--2">✧</div>
              <div className="cart-empty__sparkle cart-empty__sparkle--3">✦</div>
            </div>
            <h1 className="cart-empty__title">Giỏ hàng trống</h1>
            <p className="cart-empty__text">
              Khám phá ngay bộ sưu tập len sợi cao cấp và thú bông handmade dễ thương!
            </p>
            <div className="cart-empty__actions">
              <Link to="/len-soi" className="btn btn-primary">
                🧶 Xem Len Sợi
              </Link>
              <Link to="/thu-bong" className="btn btn-secondary">
                🧸 Xem Thú Bông
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-page__header">
          <div>
            <Link to="/" className="cart-page__back">
              <ArrowLeft size={18} />
              <span>Tiếp tục mua sắm</span>
            </Link>
            <h1 className="cart-page__title">
              <ShoppingBag size={28} />
              Giỏ hàng của bạn
            </h1>
            <p className="cart-page__subtitle">
              Bạn có <strong>{cartCount}</strong> sản phẩm trong giỏ hàng
            </p>
          </div>
          <button className="cart-page__clear" onClick={clearCart}>
            <Trash2 size={16} />
            Xóa tất cả
          </button>
        </div>

        <div className="cart-page__layout">
          {/* Items Column */}
          <div className="cart-page__items-col">
            {/* Table Header (Desktop) */}
            <div className="cart-table__header">
              <span className="cart-table__col cart-table__col--product">Sản phẩm</span>
              <span className="cart-table__col cart-table__col--price">Đơn giá</span>
              <span className="cart-table__col cart-table__col--qty">Số lượng</span>
              <span className="cart-table__col cart-table__col--subtotal">Thành tiền</span>
              <span className="cart-table__col cart-table__col--action"></span>
            </div>

            {/* Items */}
            {cartItems.map((item, index) => {
              const discount = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : null;

              return (
                <div
                  key={item.id}
                  className="cart-table__row"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Product */}
                  <div className="cart-table__cell cart-table__cell--product">
                    <div className="cart-table__image-wrapper">
                      <img src={item.image} alt={item.name} className="cart-table__image" />
                      {discount && (
                        <span className="cart-table__badge">-{discount}%</span>
                      )}
                    </div>
                    <div className="cart-table__product-info">
                      <h3 className="cart-table__product-name">{item.name}</h3>
                      {item.material && (
                        <span className="cart-table__product-meta">{item.material}</span>
                      )}
                      <div
                        className="cart-table__product-color"
                        style={{ backgroundColor: item.color }}
                        title={item.color}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="cart-table__cell cart-table__cell--price">
                    <span className="cart-table__price-label">Đơn giá</span>
                    <span className="cart-table__price">{formatPrice(item.price)}</span>
                    {item.originalPrice && (
                      <span className="cart-table__original-price">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="cart-table__cell cart-table__cell--qty">
                    <span className="cart-table__price-label">Số lượng</span>
                    <div className="cart-table__quantity">
                      <button
                        className="cart-table__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        className="cart-table__qty-input"
                        value={item.quantity}
                        min="1"
                        max="99"
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          updateQuantity(item.id, Math.max(1, Math.min(99, val)));
                        }}
                      />
                      <button
                        className="cart-table__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="cart-table__cell cart-table__cell--subtotal">
                    <span className="cart-table__price-label">Thành tiền</span>
                    <span className="cart-table__subtotal">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  {/* Remove */}
                  <div className="cart-table__cell cart-table__cell--action">
                    <button
                      className="cart-table__remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Xóa sản phẩm"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Column */}
          <aside className="cart-page__summary">
            <div className="cart-summary">
              <h2 className="cart-summary__title">Tóm tắt đơn hàng</h2>

              <div className="cart-summary__rows">
                <div className="cart-summary__row">
                  <span>Tạm tính ({cartCount} sản phẩm)</span>
                  <span>{formatPrice(cartOriginalTotal)}</span>
                </div>

                {cartSavings > 0 && (
                  <div className="cart-summary__row cart-summary__row--savings">
                    <span>
                      <Sparkles size={14} />
                      Tiết kiệm
                    </span>
                    <span>-{formatPrice(cartSavings)}</span>
                  </div>
                )}

                <div className="cart-summary__row">
                  <span>
                    <Truck size={14} />
                    Phí vận chuyển
                  </span>
                  <span className="cart-summary__free">Miễn phí</span>
                </div>

                <div className="cart-summary__row cart-summary__total">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button className="btn btn-primary cart-summary__checkout">
                Tiến hành đặt hàng
              </button>

              <Link to="/len-soi" className="cart-summary__continue">
                <ArrowLeft size={14} />
                Tiếp tục mua sắm
              </Link>

              {/* Trust Badges */}
              <div className="cart-summary__trust">
                <div className="cart-summary__trust-item">
                  <Shield size={16} />
                  <span>Thanh toán an toàn</span>
                </div>
                <div className="cart-summary__trust-item">
                  <Truck size={16} />
                  <span>Giao hàng toàn quốc</span>
                </div>
                <div className="cart-summary__trust-item">
                  <Gift size={16} />
                  <span>Đóng gói cẩn thận</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
