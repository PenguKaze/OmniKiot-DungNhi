'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const CartDrawer = () => {
  const {
    isCartOpen, closeCart,
    cartItems, removeFromCart, updateQuantity, clearCart,
    cartTotal, cartSavings,
  } = useCart();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeCart(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeCart]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col transition-transform duration-400 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <p className="text-xs tracking-widest uppercase font-semibold">
            Giỏ Hàng {cartItems.length > 0 && `(${cartItems.length})`}
          </p>
          <button onClick={closeCart} className="text-[#171717] hover:text-[#D4829A] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <ShoppingBag size={48} className="text-gray-200" />
              <div>
                <p className="font-serif text-lg mb-1">Giỏ hàng trống</p>
                <p className="text-sm text-[#6B7280]">Thêm sản phẩm để bắt đầu</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/len-soi"
                  onClick={closeCart}
                  className="px-5 py-2.5 text-xs tracking-widest uppercase border border-[#171717] hover:bg-[#171717] hover:text-white transition-all duration-200"
                >
                  Len Sợi
                </Link>
                <Link
                  href="/thu-bong"
                  onClick={closeCart}
                  className="px-5 py-2.5 text-xs tracking-widest uppercase bg-[#171717] text-white hover:bg-[#D4829A] transition-all duration-200"
                >
                  Thú Bông
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map(item => (
                <li key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-[#F5F0EB] flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#171717] leading-snug">{item.name}</p>
                    <p className="text-sm text-[#D4829A] mt-1 font-semibold">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-xs hover:bg-gray-50 transition-colors"
                        >−</button>
                        <span className="px-3 py-1 text-xs border-x border-gray-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-xs hover:bg-gray-50 transition-colors"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#6B7280] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            {cartSavings > 0 && (
              <p className="text-xs text-[#7BAE7F] mb-2">Tiết kiệm: {formatPrice(cartSavings)}</p>
            )}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs tracking-widest uppercase text-[#6B7280]">Tổng cộng</span>
              <span className="font-semibold text-[#171717]">{formatPrice(cartTotal)}</span>
            </div>
            <Link
              href="/gio-hang"
              onClick={closeCart}
              className="block w-full text-center py-3.5 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#D4829A] transition-all duration-300"
            >
              Xem Giỏ Hàng & Thanh Toán
            </Link>
            <button
              onClick={clearCart}
              className="block w-full text-center py-2 mt-2 text-xs text-[#6B7280] hover:text-red-500 transition-colors tracking-widest uppercase"
            >
              Xóa tất cả
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
