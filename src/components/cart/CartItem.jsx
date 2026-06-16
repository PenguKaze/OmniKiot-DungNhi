import { Trash2 } from 'lucide-react';
import { formatPrice } from '../../data/products';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <li className="py-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center">
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
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-xs hover:bg-gray-50">−</button>
        <span className="px-4 py-1.5 text-sm border-x border-gray-200">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-xs hover:bg-gray-50">+</button>
      </div>
    </div>

    <p className="text-sm font-semibold text-[#171717] md:text-center">{formatPrice(item.price * item.quantity)}</p>

    <button onClick={() => onRemove(item.id)} className="text-[#6B7280] hover:text-red-500 transition-colors justify-self-end">
      <Trash2 size={15} />
    </button>
  </li>
);

export default CartItem;
