'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import CartEmpty from '../components/cart/CartEmpty';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartOriginalTotal, cartSavings } = useCart();

  if (cartItems.length === 0) return <CartEmpty />;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12" style={{ paddingTop: '112px' }}>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#171717] mb-10">Giỏ Hàng</h1>

      <div className="flex flex-col lg:flex-row gap-12">
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
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <button onClick={clearCart} className="text-xs text-[#6B7280] hover:text-red-500 tracking-widest uppercase transition-colors">
              Xóa Tất Cả
            </button>
            <Link href="/len-soi" className="text-xs tracking-widest uppercase text-[#171717] hover:text-[#D4829A] transition-colors">
              ← Tiếp Tục Mua Sắm
            </Link>
          </div>
        </div>

        <CartSummary
          cartOriginalTotal={cartOriginalTotal}
          cartSavings={cartSavings}
          cartTotal={cartTotal}
        />
      </div>
    </main>
  );
};

export default Cart;
