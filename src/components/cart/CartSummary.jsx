import { formatPrice } from '../../data/products';

const CartSummary = ({ cartOriginalTotal, cartSavings, cartTotal }) => (
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
);

export default CartSummary;
