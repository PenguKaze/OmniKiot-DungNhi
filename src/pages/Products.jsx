import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronRight, RotateCcw, Palette } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, colors, productTypes, getProductsByType, getCategoriesByType } from '../data/products';
import { sortProductsByColorSimilarity, colorSimilarity, hexToRgb } from '../utils/colorUtils';

const Products = ({ productType }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedColor, setSelectedColor] = useState('');
  const [colorThreshold, setColorThreshold] = useState(40);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get type info
  const typeInfo = productTypes.find(t => t.slug === productType);
  const typeProducts = getProductsByType(productType);
  const typeCategories = getCategoriesByType(productType);

  // Quick color presets for easy picking
  const colorPresets = [
    { name: 'Hồng', value: '#E8A0BF' },
    { name: 'Xanh mint', value: '#A8D5BA' },
    { name: 'Vàng', value: '#F2D388' },
    { name: 'Tím', value: '#B5A8D5' },
    { name: 'Trắng', value: '#F5F0E8' },
    { name: 'Xám', value: '#B0A8A0' },
    { name: 'Nâu', value: '#C4A882' },
    { name: 'Đỏ', value: '#D4756B' },
    { name: 'Xanh dương', value: '#7BA8D4' },
    { name: 'Cam', value: '#E8B470' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...typeProducts];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price
    if (priceMin) {
      result = result.filter(p => p.price >= Number(priceMin));
    }
    if (priceMax) {
      result = result.filter(p => p.price <= Number(priceMax));
    }

    // Color similarity filter
    if (selectedColor) {
      result = sortProductsByColorSimilarity(result, selectedColor, colorThreshold);
    } else {
      // Sort (only if not sorting by color)
      switch (sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          result.sort((a, b) => b.id - a.id);
      }
    }

    return result;
  }, [searchTerm, selectedCategory, selectedColor, colorThreshold, priceMin, priceMax, sortBy, typeProducts]);

  const handleCategoryClick = (slug) => {
    const newCategory = selectedCategory === slug ? '' : slug;
    setSelectedCategory(newCategory);
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
    setSidebarOpen(false);
  };

  const handleColorPresetClick = (colorValue) => {
    setSelectedColor(selectedColor === colorValue ? '' : colorValue);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedColor('');
    setColorThreshold(40);
    setPriceMin('');
    setPriceMax('');
    setSortBy('newest');
    setSearchParams({});
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedColor || priceMin || priceMax;

  const pageTitle = typeInfo ? typeInfo.name : 'Sản phẩm';
  const pageIcon = typeInfo ? typeInfo.icon : '📦';

  return (
    <main className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-page__header">
          <div className="products-page__breadcrumb">
            <Link to="/">Trang chủ</Link>
            <ChevronRight size={14} />
            <span>{pageTitle}</span>
          </div>
          <h1 className="products-page__title">
            {pageIcon} {pageTitle}
          </h1>
          <p className="products-page__count">
            Hiển thị {filteredProducts.length} / {typeProducts.length} sản phẩm
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          className="products-page__filter-toggle"
          onClick={() => setSidebarOpen(true)}
          id="filter-toggle"
        >
          <SlidersHorizontal size={18} />
          Bộ lọc sản phẩm
        </button>

        {/* Sidebar Mobile Overlay */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay--visible' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

        <div className="products-page__layout">
          {/* Sidebar */}
          <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`} id="products-sidebar">
            {/* Search */}
            <div className="sidebar__section">
              <h3 className="sidebar__title">Tìm kiếm</h3>
              <div className="sidebar__search">
                <Search size={16} className="sidebar__search-icon" />
                <input
                  type="text"
                  className="sidebar__search-input"
                  placeholder="Tìm tên sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="product-search"
                />
              </div>
            </div>

            {/* Category */}
            <div className="sidebar__section">
              <h3 className="sidebar__title">Danh mục</h3>
              <div className="sidebar__category-list">
                <button
                  className={`sidebar__category-btn ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('')}
                  id="category-all"
                >
                  <span>Tất cả</span>
                  <span className="sidebar__category-count">{typeProducts.length}</span>
                </button>
                {typeCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    className={`sidebar__category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.slug)}
                    id={`filter-category-${cat.slug}`}
                  >
                    <span>{cat.name}</span>
                    <span className="sidebar__category-count">
                      {typeProducts.filter(p => p.category === cat.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div className="sidebar__section">
              <h3 className="sidebar__title">
                <Palette size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Bảng Màu
              </h3>

              {/* Color Picker Input */}
              <div className="color-picker">
                <div className="color-picker__main">
                  <div className="color-picker__input-wrapper">
                    <input
                      type="color"
                      className="color-picker__input"
                      value={selectedColor || '#E8A0BF'}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      id="color-picker-input"
                      title="Chọn màu bất kỳ"
                    />
                    <div
                      className="color-picker__preview"
                      style={{ backgroundColor: selectedColor || '#E8A0BF' }}
                    >
                      {!selectedColor && <Palette size={18} />}
                    </div>
                  </div>
                  <div className="color-picker__info">
                    <span className="color-picker__label">
                      {selectedColor ? 'Màu đã chọn' : 'Chọn màu sắc'}
                    </span>
                    <span className="color-picker__hex">
                      {selectedColor ? selectedColor.toUpperCase() : 'Nhấn để chọn'}
                    </span>
                  </div>
                  {selectedColor && (
                    <button
                      className="color-picker__clear"
                      onClick={() => setSelectedColor('')}
                      title="Xóa bộ lọc màu"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Quick Presets */}
                <div className="color-picker__presets">
                  <span className="color-picker__presets-label">Màu nhanh:</span>
                  <div className="color-picker__presets-grid">
                    {colorPresets.map((c) => (
                      <button
                        key={c.value}
                        className={`color-picker__preset ${selectedColor === c.value ? 'active' : ''}`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                        onClick={() => handleColorPresetClick(c.value)}
                        aria-label={`Chọn màu ${c.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Similarity Threshold Slider */}
                {selectedColor && (
                  <div className="color-picker__threshold">
                    <div className="color-picker__threshold-header">
                      <span className="color-picker__threshold-label">Độ chính xác:</span>
                      <span className="color-picker__threshold-value">{colorThreshold}%</span>
                    </div>
                    <input
                      type="range"
                      className="color-picker__threshold-slider"
                      min="20"
                      max="90"
                      value={colorThreshold}
                      onChange={(e) => setColorThreshold(Number(e.target.value))}
                      id="color-threshold"
                    />
                    <div className="color-picker__threshold-labels">
                      <span>Rộng hơn</span>
                      <span>Chính xác</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="sidebar__section">
              <h3 className="sidebar__title">Khoảng giá (VNĐ)</h3>
              <div className="sidebar__price-range">
                <div className="sidebar__price-inputs">
                  <input
                    type="number"
                    className="sidebar__price-input"
                    placeholder="Từ"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    id="price-min"
                  />
                  <span className="sidebar__price-separator">—</span>
                  <input
                    type="number"
                    className="sidebar__price-input"
                    placeholder="Đến"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    id="price-max"
                  />
                </div>
              </div>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button className="sidebar__clear-btn" onClick={clearFilters} id="clear-filters">
                <RotateCcw size={14} />
                Xóa bộ lọc
              </button>
            )}
          </aside>

          {/* Products Area */}
          <div className="products-area">
            <div className="products-area__toolbar">
              <p className="products-area__result-text">
                Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm
                {selectedColor && (
                  <>
                    {' '}
                    <span className="products-area__color-indicator">
                      gần màu{' '}
                      <span
                        className="products-area__color-dot"
                        style={{ backgroundColor: selectedColor }}
                      />
                    </span>
                  </>
                )}
              </p>
              <div className="products-area__sort">
                {selectedColor ? (
                  <span className="products-area__sort-label" style={{ color: 'var(--color-primary)' }}>
                    🎨 Sắp xếp theo độ tương đồng màu
                  </span>
                ) : (
                  <>
                    <span className="products-area__sort-label">Sắp xếp:</span>
                    <select
                      className="products-area__sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      id="sort-select"
                    >
                      <option value="newest">Mới nhất</option>
                      <option value="price-asc">Giá tăng dần</option>
                      <option value="price-desc">Giá giảm dần</option>
                      <option value="name-asc">Tên A-Z</option>
                      <option value="rating">Đánh giá cao</option>
                    </select>
                  </>
                )}
              </div>
            </div>

            <div className="products-area__grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showSimilarity={!!selectedColor}
                    similarity={product.colorSimilarity}
                  />
                ))
              ) : (
                <div className="products-area__empty">
                  <div className="products-area__empty-icon">{selectedColor ? '🎨' : pageIcon}</div>
                  <h3 className="products-area__empty-title">
                    {selectedColor ? 'Không tìm thấy màu tương tự' : 'Không tìm thấy sản phẩm'}
                  </h3>
                  <p className="products-area__empty-text">
                    {selectedColor
                      ? 'Hãy thử giảm độ chính xác hoặc chọn màu khác'
                      : 'Hãy thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
