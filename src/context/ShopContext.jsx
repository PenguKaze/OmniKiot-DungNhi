import { createContext, useContext, useState, useEffect } from 'react';

// ─── Default config (dùng khi chưa có dữ liệu từ API) ───────────────────────
const DEFAULT_SHOP_CONFIG = {
  shopName: 'Len Sợi Dung Nhi',
  header: {
    showLogo: true,
    showLogoText: true,
    showNav: true,
    showSearch: true,
    showWishlist: true,
    showCart: true,
  },
  // Sau này có thể mở rộng thêm: footer, sidebar, ...
};

// ─── Context ─────────────────────────────────────────────────────────────────
const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [shopConfig, setShopConfig] = useState(DEFAULT_SHOP_CONFIG);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO Phase 2: Fetch config từ API theo slug/domain
    // const slug = window.location.hostname.split('.')[0];
    // fetch(`/api/shops/${slug}/config`)
    //   .then(res => res.json())
    //   .then(data => setShopConfig(data))
    //   .finally(() => setLoading(false));

    // Hiện tại dùng DEFAULT_SHOP_CONFIG - chỉnh ở đây để test
    setLoading(false);
  }, []);

  return (
    <ShopContext.Provider value={{ shopConfig, setShopConfig, loading }}>
      {children}
    </ShopContext.Provider>
  );
}

// ─── Hook tiện dụng ──────────────────────────────────────────────────────────
export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop phải được dùng trong ShopProvider');
  return ctx;
}

// Hook riêng để lấy config header (shortcut)
export function useHeaderConfig() {
  const { shopConfig } = useShop();
  return shopConfig?.header ?? DEFAULT_SHOP_CONFIG.header;
}
