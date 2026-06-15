import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { sortProductsByColorSimilarity } from '../../utils/colorUtils';

const FilterSidebar = ({
  categories,
  filters,
  onFiltersChange,
  isOpen,
  onClose,
}) => {
  const [colorInput, setColorInput] = useState('#D4829A');
  const [threshold, setThreshold] = useState(60);

  const handleCategoryToggle = (categoryId) => {
    const current = filters.selectedCategories || [];
    const next = current.includes(categoryId)
      ? current.filter(c => c !== categoryId)
      : [...current, categoryId];
    onFiltersChange({ ...filters, selectedCategories: next });
  };

  const handleColorSearch = () => {
    onFiltersChange({ ...filters, colorSearch: colorInput, colorThreshold: threshold });
  };

  const handleClearColor = () => {
    onFiltersChange({ ...filters, colorSearch: null, colorThreshold: 60 });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8 md:hidden">
        <p className="text-xs tracking-widest uppercase font-semibold">Bộ Lọc</p>
        <button onClick={onClose} className="text-[#171717]"><X size={18} /></button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase font-semibold mb-3">Tìm Kiếm</p>
        <input
          type="text"
          placeholder="Tên sản phẩm..."
          value={filters.search || ''}
          onChange={e => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full border-b border-gray-200 pb-2 text-sm focus:border-[#D4829A] transition-colors bg-transparent outline-none"
        />
      </div>

      {/* Categories */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase font-semibold mb-3">Danh Mục</p>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat.id}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={(filters.selectedCategories || []).includes(cat.id)}
                  onChange={() => handleCategoryToggle(cat.id)}
                  className="accent-[#D4829A] w-3.5 h-3.5"
                />
                <span className="text-sm text-[#6B7280] group-hover:text-[#171717] transition-colors">{cat.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price range */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase font-semibold mb-3">Khoảng Giá</p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Từ"
            value={filters.minPrice || ''}
            onChange={e => onFiltersChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : '' })}
            className="w-full border-b border-gray-200 pb-2 text-sm text-center focus:border-[#D4829A] transition-colors bg-transparent outline-none"
          />
          <span className="text-[#6B7280] text-sm">—</span>
          <input
            type="number"
            placeholder="Đến"
            value={filters.maxPrice || ''}
            onChange={e => onFiltersChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : '' })}
            className="w-full border-b border-gray-200 pb-2 text-sm text-center focus:border-[#D4829A] transition-colors bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Color search */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase font-semibold mb-3">🎨 Tìm Theo Màu</p>
        <div className="flex items-center gap-3 mb-3">
          <input
            type="color"
            value={colorInput}
            onChange={e => setColorInput(e.target.value)}
            className="w-10 h-10 cursor-pointer border-0 rounded-full overflow-hidden"
          />
          <div className="flex-1">
            <p className="text-xs text-[#6B7280]">Ngưỡng tương đồng: <span className="font-medium text-[#171717]">{threshold}%</span></p>
            <input
              type="range"
              min={20}
              max={90}
              value={threshold}
              onChange={e => setThreshold(Number(e.target.value))}
              className="w-full mt-1 accent-[#D4829A]"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleColorSearch}
            className="flex-1 py-2 text-xs tracking-widest uppercase bg-[#171717] text-white hover:bg-[#D4829A] transition-all duration-200"
          >
            Tìm
          </button>
          {filters.colorSearch && (
            <button
              onClick={handleClearColor}
              className="px-3 py-2 text-xs tracking-widest uppercase border border-gray-200 hover:border-[#171717] transition-all duration-200"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs tracking-widest uppercase font-semibold mb-3">Sắp Xếp</p>
        <select
          value={filters.sortBy || 'newest'}
          onChange={e => onFiltersChange({ ...filters, sortBy: e.target.value })}
          className="w-full border-b border-gray-200 pb-2 text-sm bg-transparent focus:border-[#D4829A] transition-colors outline-none"
        >
          <option value="newest">Mới nhất</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
          <option value="name_az">Tên A–Z</option>
          <option value="rating">Đánh giá cao</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 pr-8">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
        <aside className={`absolute top-0 left-0 h-full w-80 bg-white px-6 pt-6 pb-8 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {sidebarContent}
        </aside>
      </div>
    </>
  );
};

export default FilterSidebar;
