# Design Spec: Migrate Frontend từ Vite sang Next.js

**Date:** 2026-06-16  
**Status:** Approved

## Mục tiêu

Migrate frontend từ React + Vite + React Router sang Next.js 15 (App Router) để cải thiện SEO và performance thông qua SSG. Backend NestJS vẫn giữ riêng tại port 3001.

## Approach

Migrate in-place trong thư mục `Frontend/` hiện tại: xoá cấu hình Vite, cài Next.js, chuyển từng file một.

## Cấu trúc thư mục sau migrate

```
Frontend/
├── app/
│   ├── layout.jsx              ← root layout: Header, Footer, Providers
│   ├── page.jsx                ← / (Home)
│   ├── len-soi/page.jsx        ← /len-soi
│   ├── thu-bong/page.jsx       ← /thu-bong
│   ├── day-nghe/page.jsx
│   ├── kien-thuc/page.jsx
│   ├── gioi-thieu/page.jsx
│   ├── lien-he/page.jsx
│   ├── gio-hang/page.jsx
│   ├── login/
│   │   ├── layout.jsx          ← layout riêng, không có Header/Footer
│   │   └── page.jsx
│   └── register/
│       ├── layout.jsx          ← layout riêng, không có Header/Footer
│       └── page.jsx
├── components/                 ← giữ nguyên cấu trúc
├── context/                    ← CartContext, ShopContext giữ nguyên
├── data/                       ← products.js giữ nguyên
├── public/                     ← giữ nguyên
├── next.config.js
└── postcss.config.js
```

File bị xoá: `src/main.jsx`, `src/App.jsx`, `vite.config.js`, `index.html`

## Rendering Strategy

### Server Components (mặc định, SSG)
- `app/page.jsx` — Home, render tĩnh lúc build
- `app/len-soi/page.jsx`, `app/thu-bong/page.jsx` — dùng `generateStaticParams()` + đọc `data/products.js` lúc build → HTML tĩnh, SEO đầy đủ

### Client Components (`'use client'`)
| Component | Lý do |
|---|---|
| `Header.jsx` | State mega-menu, mobile overlay |
| `CartDrawer.jsx` | State cart |
| `CartContext.jsx`, `ShopContext.jsx` | React context + state |
| `ScrollReveal.jsx`, `ParallaxImage.jsx`, `TextReveal.jsx` | GSAP + DOM APIs |
| `NewsletterForm.jsx` | Form interaction |

### Auth pages (Login, Register)
Dùng layout riêng `app/login/layout.jsx` và `app/register/layout.jsx` — không render Header/Footer. Thay thế logic `AUTH_PATHS` trong `App.jsx` cũ.

## Dependencies

### Bỏ
- `vite`
- `@vitejs/plugin-react`
- `@tailwindcss/vite`
- `react-router-dom`

### Thêm
- `next`
- `@tailwindcss/postcss`
- `postcss`

### Giữ nguyên
- `react`, `react-dom`
- `tailwindcss`
- `gsap`
- `lucide-react`

## Config Files

### `next.config.js`
```js
const nextConfig = {
  output: 'export', // static export → thư mục out/, deploy bất kỳ static host
};
export default nextConfig;
```

### `postcss.config.js`
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

## Notes

- `output: 'export'` tạo HTML tĩnh hoàn toàn, phù hợp vì backend NestJS chạy riêng
- Components dùng GSAP phải là Client Components vì GSAP cần `window`/DOM
- `next/link` thay thế `react-router-dom`'s `<Link>`
- `next/image` nên dùng thay `<img>` cho ảnh sản phẩm (optimization)
- `useRouter` từ `next/navigation` thay thế `useNavigate` từ react-router-dom
