import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

const CartEmpty = () => (
  <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6" style={{ paddingTop: '112px' }}>
    <ShoppingBag size={64} className="text-gray-200" />
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#171717] mb-2">Giỏ Hàng Trống</h1>
      <p className="text-[#6B7280] mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
      <div className="flex gap-4 justify-center">
        <Link href="/len-soi" className="px-6 py-3 border border-[#171717] text-xs tracking-widest uppercase font-medium hover:bg-[#171717] hover:text-white transition-all duration-300">
          Len Sợi
        </Link>
        <Link href="/thu-bong" className="px-6 py-3 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#D4829A] transition-all duration-300">
          Thú Bông
        </Link>
      </div>
    </div>
  </main>
);

export default CartEmpty;
