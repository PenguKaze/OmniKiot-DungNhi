import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const MENUS = {
  'LEN SỢI': {
    path: '/len-soi',
    categories: [
      { label: 'Len Cotton', path: '/len-soi?category=cotton' },
      { label: 'Len Acrylic', path: '/len-soi?category=acrylic' },
      { label: 'Len Wool', path: '/len-soi?category=wool' },
      { label: 'Phụ Kiện', path: '/len-soi?category=accessories' },
    ],
    featured: { label: 'Cotton Milk Mới Về', image: null },
  },
  'THÚ BÔNG': {
    path: '/thu-bong',
    categories: [
      { label: 'Gấu Bông', path: '/thu-bong?category=bears' },
      { label: 'Thú Nhỏ', path: '/thu-bong?category=small-animals' },
      { label: 'Nhân Vật', path: '/thu-bong?category=characters' },
      { label: 'Móc Chìa Khóa', path: '/thu-bong?category=keychains' },
    ],
    featured: { label: 'Bộ Thú Bông Mới', image: null },
  },
};

const MegaMenu = ({ item, onClose }) => {
  const menu = MENUS[item];
  const panelRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    if (!panelRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(panelRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
    tl.fromTo(
      itemsRef.current?.querySelectorAll('a, button') || [],
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, stagger: 0.04, ease: 'power2.out' },
      '-=0.1'
    );
  }, []);

  if (!menu) return null;

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-40"
      style={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10" ref={itemsRef}>
        <div className="grid grid-cols-3 gap-12">
          {/* Col 1: Categories */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[#6B7280] mb-6">Danh Mục</p>
            <ul className="space-y-4">
              {menu.categories.map(cat => (
                <li key={cat.path}>
                  <Link
                    to={cat.path}
                    onClick={onClose}
                    className="text-sm font-medium text-[#171717] hover:text-[#D4829A] transition-colors duration-200 tracking-wide uppercase"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Featured */}
          <div className="col-span-1">
            <div className="bg-[#F5F0EB] aspect-square flex items-center justify-center">
              <span className="text-xs text-[#6B7280]">Featured product</span>
            </div>
            <p className="text-xs mt-2 text-[#171717] font-medium">{menu.featured.label}</p>
          </div>

          {/* Col 3: CTA */}
          <div className="flex flex-col justify-between">
            <div />
            <Link
              to={menu.path}
              onClick={onClose}
              className="text-sm tracking-widest uppercase font-semibold text-[#171717] hover:text-[#D4829A] transition-colors duration-200 flex items-center gap-2"
            >
              Xem Tất Cả <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
