import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const CartDrawer = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    cartSavings,
    isCartOpen,
    justAdded,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const drawerRef = useRef(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isCartOpen ? 'cart-overlay--visible' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`cart-drawer ${isCartOpen ? 'cart-drawer--open' : ''}`}
        id="cart-drawer"
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__header-left">
            <ShoppingBag size={22} className="cart-drawer__header-icon" />
            <h2 className="cart-drawer__title">Giỏ hàng</h2>
            {cartCount > 0 && (
              <span className="cart-drawer__count">{cartCount}</span>
            )}
          </div>
          <button
            className="cart-drawer__close"
            onClick={closeCart}
            id="cart-drawer-close"
            aria-label="Đóng giỏ hàng"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <div className="cart-drawer__empty-icon">🧶</div>
            <h3 className="cart-drawer__empty-title">Giỏ hàng trống</h3>
            <p className="cart-drawer__empty-text">
              Hãy khám phá các sản phẩm len sợi và thú bông dễ thương nhé!
            </p>
            <Link
              to="/len-soi"
              className="btn btn-primary btn-sm"
              onClick={closeCart}
            >
              Khám phá ngay
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="cart-drawer__items">
              {cartItems.map((item) => {
                const discount = item.originalPrice
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : null;
                const isNew = justAdded === item.id;

                return (
                  <div
                    key={item.id}
                    className={`cart-item ${isNew ? 'cart-item--highlight' : ''}`}
                    id={`cart-item-${item.id}`}
                  >
                    <div className="cart-item__image-wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item__image"
                      />
                      {discount && (
                        <span className="cart-item__discount">-{discount}%</span>
                      )}
                    </div>

                    <div className="cart-item__info">
                      <h4 className="cart-item__name">{item.name}</h4>
                      <div className="cart-item__price-row">
                        <span className="cart-item__price">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="cart-item__original-price">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="cart-item__actions">
                        <div className="cart-item__quantity">
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Giảm số lượng"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="cart-item__qty-value">{item.quantity}</span>
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Tăng số lượng"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <span className="cart-item__subtotal">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        <button
                          className="cart-item__remove"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="cart-drawer__footer">
              {cartSavings > 0 && (
                <div className="cart-drawer__savings">
                  <Sparkles size={15} />
                  <span>Bạn tiết kiệm được <strong>{formatPrice(cartSavings)}</strong></span>
                </div>
              )}

              <div className="cart-drawer__summary">
                <div className="cart-drawer__summary-row">
                  <span>Tạm tính ({cartCount} sản phẩm)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="cart-drawer__summary-row">
                  <span>Phí vận chuyển</span>
                  <span className="cart-drawer__free-ship">Miễn phí</span>
                </div>
                <div className="cart-drawer__summary-row cart-drawer__summary-total">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <Link
                to="/gio-hang"
                className="btn btn-primary cart-drawer__checkout-btn"
                onClick={closeCart}
              >
                <ShoppingBag size={18} />
                Xem giỏ hàng & Thanh toán
              </Link>

              <button
                className="cart-drawer__clear-btn"
                onClick={clearCart}
              >
                Xóa tất cả
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
