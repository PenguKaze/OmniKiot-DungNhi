import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartOriginalTotal, cartSavings } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6" style={{ paddingTop: '112px' }}>
        <ShoppingBag size={64} className="text-gray-200" />
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#171717] mb-2">Giỏ Hàng Trống</h1>
          <p className="text-[#6B7280] mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/len-soi" className="px-6 py-3 border border-[#171717] text-xs tracking-widest uppercase font-medium hover:bg-[#171717] hover:text-white transition-all duration-300">
              Len Sợi
            </Link>
            <Link to="/thu-bong" className="px-6 py-3 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#D4829A] transition-all duration-300">
              Thú Bông
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12" style={{ paddingTop: '112px' }}>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#171717] mb-10">Giỏ Hàng</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Table */}
        <div className="flex-1">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-3 border-b border-gray-100 text-xs tracking-widest uppercase text-[#6B7280] font-medium">
            <span>Sản Phẩm</span>
            <span className="text-center">Giá</span>
            <span className="text-center">Số Lượng</span>
            <span className="text-center">Tổng</span>
            <span />
          </div>

          <ul className="divide-y divide-gray-100">
            {cartItems.map(item => (
              <li key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#F5F0EB] flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#171717]">{item.name}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{item.category}</p>
                  </div>
                </div>
                <p className="text-sm text-[#D4829A] font-semibold md:text-center">{formatPrice(item.price)}</p>
                <div className="flex items-center md:justify-center">
                  <div className="flex items-center border border-gray-200">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-xs hover:bg-gray-50">−</button>
                    <span className="px-4 py-1.5 text-sm border-x border-gray-200">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-xs hover:bg-gray-50">+</button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#171717] md:text-center">{formatPrice(item.price * item.quantity)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-[#6B7280] hover:text-red-500 transition-colors justify-self-end">
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <button onClick={clearCart} className="text-xs text-[#6B7280] hover:text-red-500 tracking-widest uppercase transition-colors">
              Xóa Tất Cả
            </button>
            <Link to="/len-soi" className="text-xs tracking-widest uppercase text-[#171717] hover:text-[#D4829A] transition-colors">
              ← Tiếp Tục Mua Sắm
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-[#F5F0EB] p-6">
            <p className="text-xs tracking-widest uppercase font-semibold mb-6">Tóm Tắt Đơn Hàng</p>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Tạm tính</span>
                <span>{formatPrice(cartOriginalTotal)}</span>
              </div>
              {cartSavings > 0 && (
                <div className="flex justify-between text-[#7BAE7F]">
                  <span>Tiết kiệm</span>
                  <span>−{formatPrice(cartSavings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Vận chuyển</span>
                <span className="text-[#7BAE7F]">Miễn phí</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-base">
                <span>Tổng</span>
                <span className="text-[#D4829A]">{formatPrice(cartTotal)}</span>
              </div>
            </div>
            <button className="w-full py-3.5 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#D4829A] transition-all duration-300">
              Tiến Hành Thanh Toán
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
