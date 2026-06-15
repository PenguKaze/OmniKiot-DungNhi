import { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import FilterSidebar from '../components/ui/FilterSidebar';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/animation/ScrollReveal';
import { getProductsByType, getCategoriesByType } from '../data/products';
import { sortProductsByColorSimilarity } from '../utils/colorUtils';

const SORT_FNS = {
  newest: (a, b) => b.id - a.id,
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  name_az: (a, b) => a.name.localeCompare(b.name),
  rating: (a, b) => (b.rating || 0) - (a.rating || 0),
};

const Products = ({ productType }) => {
  const allProducts = getProductsByType(productType);
  const categories = getCategoriesByType(productType);
  const [filters, setFilters] = useState({ selectedCategories: [], search: '', minPrice: '', maxPrice: '', sortBy: 'newest', colorSearch: null, colorThreshold: 60 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(allProducts);

  const title = productType === 'len-soi' ? 'LEN SỢI' : 'THÚ BÔNG';
  const heroImg = productType === 'len-soi' ? '/background_1.png' : '/background_2.png';

  useEffect(() => {
    let result = [...allProducts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
    }
    if (filters.selectedCategories?.length) {
      result = result.filter(p => filters.selectedCategories.includes(p.category));
    }
    if (filters.minPrice !== '') {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice !== '') {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }
    if (filters.colorSearch) {
      result = sortProductsByColorSimilarity(result, filters.colorSearch, filters.colorThreshold);
    } else {
      result.sort(SORT_FNS[filters.sortBy] || SORT_FNS.newest);
    }

    setDisplayProducts(result);
  }, [filters, productType]);

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Page hero banner */}
      <div className="relative h-48 md:h-64 overflow-hidden flex items-center justify-center">
        <img src={heroImg} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 font-serif text-4xl md:text-6xl font-black text-white tracking-widest uppercase">{title}</h1>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-8 md:hidden">
          <p className="text-sm text-[#6B7280]">{displayProducts.length} sản phẩm</p>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium border border-[#171717] px-4 py-2 hover:bg-[#171717] hover:text-white transition-all duration-200"
          >
            <SlidersHorizontal size={14} />
            Bộ Lọc
          </button>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            categories={categories}
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="hidden md:flex items-center justify-between mb-8">
              <p className="text-sm text-[#6B7280]">{displayProducts.length} sản phẩm</p>
            </div>

            {displayProducts.length === 0 ? (
              <div className="text-center py-24 text-[#6B7280]">
                <p className="font-serif text-2xl mb-2">Không tìm thấy sản phẩm</p>
                <p className="text-sm">Thử thay đổi bộ lọc</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((product, i) => (
                  <ScrollReveal key={product.id} delay={Math.min(i * 0.05, 0.3)}>
                    <ProductCard
                      product={product}
                      similarityPercent={
                        filters.colorSearch && product.colorSimilarity != null
                          ? Math.round(product.colorSimilarity)
                          : null
                      }
                    />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
