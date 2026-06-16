'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const MENUS = {
  'LEN SỢI': {
    path: '/len-soi',
    columns: [
      {
        title: 'Theo Chất Liệu',
        items: [
          { label: 'Len Cotton Milk', path: '/len-soi?category=cotton' },
          { label: 'Len Cotton Cake', path: '/len-soi?category=cotton-cake' },
          { label: 'Len Wool Merino', path: '/len-soi?category=wool' },
          { label: 'Len Acrylic Nhung', path: '/len-soi?category=acrylic' },
        ]
      },
      {
        title: 'Dụng Cụ Đan Móc',
        items: [
          { label: 'Kim Móc / Kim Đan', path: '/len-soi?category=tools' },
          { label: 'Mắt Thú / Bông Gòn', path: '/len-soi?category=materials' },
          { label: 'Dụng Cụ Phụ Trợ', path: '/len-soi?category=accessories' },
        ]
      }
    ],
    featured: [
      {
        label: 'Len Cotton Milk',
        sub: 'Chất len mềm mịn, an toàn cho làn da của bé',
        image: '/products/len_cotton_milk.png',
        path: '/len-soi?category=cotton',
        cta: 'KHÁM PHÁ NGAY'
      },
      {
        label: 'Len Wool Merino',
        sub: '100% tự nhiên, giữ ấm và thoáng khí vượt trội',
        image: '/products/len_wool_merino.png',
        path: '/len-soi?category=wool',
        cta: 'MUA SẮM NGAY'
      }
    ]
  },
  'THÚ BÔNG': {
    path: '/thu-bong',
    columns: [
      {
        title: 'Theo Chủ Đề',
        items: [
          { label: 'Thú Bông Amigurumi', path: '/thu-bong?category=animals' },
          { label: 'Móc Khóa Mini', path: '/thu-bong?category=keychains' },
          { label: 'Búp Bê Handmade', path: '/thu-bong?category=dolls' },
          { label: 'Set Đan Móc DIY', path: '/thu-bong?category=diy' },
        ]
      },
      {
        title: 'Nhân Vật Nổi Bật',
        items: [
          { label: 'Gấu Teddy Ấm Áp', path: '/thu-bong' },
          { label: 'Thỏ Bunny Trắng', path: '/thu-bong' },
          { label: 'Cún Corgi Vui Vẻ', path: '/thu-bong' },
          { label: 'Mèo Kawaii Tinh Nghịch', path: '/thu-bong' },
        ]
      }
    ],
    featured: [
      {
        label: 'Gấu Teddy Pastel',
        sub: 'Sự kết hợp hoàn hảo giữa len sợi và sự tỉ mỉ',
        image: '/products/gau_teddy_len_pastel.png',
        path: '/thu-bong',
        cta: 'KHÁM PHÁ NGAY'
      },
      {
        label: 'Thỏ Bunny Trắng',
        sub: 'Thú bông đan móc thủ công xinh xắn đáng yêu',
        image: '/products/tho_bunny_trang.png',
        path: '/thu-bong',
        cta: 'MUA SẮM NGAY'
      }
    ]
  }
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
  }, [item]);

  if (!menu) return null;

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-40"
      style={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10" ref={itemsRef}>
        <div className="grid grid-cols-4 gap-12">
          
          {/* Col 1 & 2: Navigation Columns */}
          {menu.columns.map((col, index) => (
            <div key={col.title} className="flex flex-col justify-between h-full">
              <div>
                <p className="text-xs tracking-widest uppercase text-[#6B7280] mb-6">{col.title}</p>
                <ul className="space-y-4">
                  {col.items.map(subItem => (
                    <li key={subItem.label}>
                      <Link
                        href={subItem.path}
                        onClick={onClose}
                        className="text-xs font-semibold text-[#171717] hover:text-[#D4829A] transition-colors duration-200 tracking-wider uppercase"
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Only render "Xem Tất Cả" at the bottom of the first column to match CANCAN layout */}
              {index === 0 && (
                <div className="mt-8">
                  <Link
                    href={menu.path}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-[#171717] hover:text-[#D4829A] transition-colors duration-200 border-b border-black pb-0.5"
                  >
                    Xem Tất Cả <span>→</span>
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* Col 3 & 4: Promotional Cards */}
          {menu.featured.map(feat => (
            <div key={feat.label} className="flex flex-col justify-between h-full">
              <div>
                <div className="bg-[#F5F0EB] aspect-[4/3] overflow-hidden mb-3">
                  <img 
                    src={feat.image} 
                    alt={feat.label} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <p className="text-xs font-bold text-[#171717] tracking-wider uppercase">{feat.label}</p>
                <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed normal-case">{feat.sub}</p>
              </div>
              <div className="mt-3">
                <Link
                  href={feat.path}
                  onClick={onClose}
                  className="text-[10px] tracking-widest uppercase font-bold text-[#171717] hover:opacity-50 transition-opacity duration-200 border-b border-black pb-0.5 inline-block"
                >
                  {feat.cta}
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
