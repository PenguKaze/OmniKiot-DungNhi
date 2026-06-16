# Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate frontend in-place từ React + Vite + React Router sang Next.js 15 App Router với SSG để cải thiện SEO và performance.

**Architecture:** Xoá Vite config và `src/App.jsx`, tạo `src/app/` theo App Router convention. Dùng Route Groups `(main)` và `(auth)` để tách layout có/không có Header-Footer. Pages hiện tại trong `src/pages/` giữ nguyên nội dung, chỉ thêm `'use client'` và fix imports; các file trong `src/app/` là thin wrappers re-export chúng.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4 (postcss), GSAP, Lucide React. Backend NestJS giữ riêng tại port 3001.

---

## File Map

**Tạo mới:**
- `next.config.js`
- `postcss.config.js`
- `src/app/layout.jsx` — HTML shell, global CSS, Google Fonts
- `src/app/(main)/layout.jsx` — Providers + Header + Footer + CartDrawer
- `src/app/(main)/page.jsx` — Home route
- `src/app/(main)/len-soi/page.jsx`
- `src/app/(main)/thu-bong/page.jsx`
- `src/app/(main)/day-nghe/page.jsx`
- `src/app/(main)/kien-thuc/page.jsx`
- `src/app/(main)/gioi-thieu/page.jsx`
- `src/app/(main)/lien-he/page.jsx`
- `src/app/(main)/gio-hang/page.jsx`
- `src/app/(auth)/layout.jsx` — bare layout, không Header/Footer
- `src/app/(auth)/login/page.jsx`
- `src/app/(auth)/register/page.jsx`

**Sửa đổi:**
- `package.json`
- `src/context/CartContext.jsx` — thêm `'use client'`
- `src/context/ShopContext.jsx` — thêm `'use client'`
- `src/components/Header.jsx` — `'use client'` + next/link + next/navigation
- `src/components/Footer.jsx` — next/link
- `src/components/CartDrawer.jsx` — `'use client'` + next/link
- `src/components/layout/MegaMenu.jsx` — next/link
- `src/components/animation/ScrollReveal.jsx` — `'use client'`
- `src/components/animation/ParallaxImage.jsx` — `'use client'`
- `src/components/animation/TextReveal.jsx` — `'use client'`
- `src/components/ui/NewsletterForm.jsx` — `'use client'`
- `src/pages/Home.jsx` — `'use client'` + next/link
- `src/pages/Products.jsx` — `'use client'`
- `src/pages/Cart.jsx` — `'use client'` + next/link
- `src/pages/Login.jsx` — `'use client'` + next/link + next/navigation
- `src/pages/Register.jsx` — `'use client'` + next/link + next/navigation
- `src/pages/Courses.jsx` — `'use client'`
- `src/pages/Knowledge.jsx` — `'use client'`
- `src/pages/About.jsx` — `'use client'`
- `src/pages/Contact.jsx` — `'use client'`

**Xoá:**
- `src/main.jsx`
- `src/App.jsx`
- `vite.config.js`
- `index.html`

---

## Task 1: Cập nhật package.json và cài dependencies

**Files:**
- Modify: `package.json`

- [ ] **Bước 1: Sửa package.json**

Thay toàn bộ nội dung `package.json` bằng:

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.3.3",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "gsap": "^3.15.0",
    "lucide-react": "^0.577.0",
    "tailwindcss": "^4.3.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.1",
    "postcss": "^8.5.3",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "eslint": "^9.39.1",
    "eslint-config-next": "^15.3.3",
    "globals": "^16.5.0"
  }
}
```

- [ ] **Bước 2: Cài dependencies**

```bash
npm install
```

Expected: thấy `next` xuất hiện trong `node_modules/`, không có error.

---

## Task 2: Tạo config files

**Files:**
- Create: `next.config.js`
- Create: `postcss.config.js`

- [ ] **Bước 1: Tạo next.config.js**

```js
// next.config.js
const nextConfig = {
  output: 'export',
};
export default nextConfig;
```

- [ ] **Bước 2: Tạo postcss.config.js**

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

---

## Task 3: Thêm `'use client'` cho Contexts

**Files:**
- Modify: `src/context/CartContext.jsx`
- Modify: `src/context/ShopContext.jsx`

- [ ] **Bước 1: Thêm `'use client'` vào CartContext.jsx**

Thêm dòng đầu tiên vào `src/context/CartContext.jsx`:

```jsx
'use client';
// (phần còn lại giữ nguyên)
```

- [ ] **Bước 2: Thêm `'use client'` vào ShopContext.jsx**

Thêm dòng đầu tiên vào `src/context/ShopContext.jsx`:

```jsx
'use client';
// (phần còn lại giữ nguyên)
```

---

## Task 4: Thêm `'use client'` cho animation và UI components

**Files:**
- Modify: `src/components/animation/ScrollReveal.jsx`
- Modify: `src/components/animation/ParallaxImage.jsx`
- Modify: `src/components/animation/TextReveal.jsx`
- Modify: `src/components/ui/NewsletterForm.jsx`

- [ ] **Bước 1: Thêm `'use client'` vào ScrollReveal.jsx**

Thêm `'use client';` làm dòng đầu tiên của `src/components/animation/ScrollReveal.jsx`.

- [ ] **Bước 2: Thêm `'use client'` vào ParallaxImage.jsx**

Thêm `'use client';` làm dòng đầu tiên của `src/components/animation/ParallaxImage.jsx`.

- [ ] **Bước 3: Thêm `'use client'` vào TextReveal.jsx**

Thêm `'use client';` làm dòng đầu tiên của `src/components/animation/TextReveal.jsx`.

- [ ] **Bước 4: Thêm `'use client'` vào NewsletterForm.jsx**

Thêm `'use client';` làm dòng đầu tiên của `src/components/ui/NewsletterForm.jsx`.

---

## Task 5: Update Header.jsx

**Files:**
- Modify: `src/components/Header.jsx`

Header dùng `Link` và `useLocation` từ react-router-dom.

- [ ] **Bước 1: Thêm `'use client'` và thay import**

Tìm đầu file `src/components/Header.jsx`:

```jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
```

Thay bằng:

```jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
```

- [ ] **Bước 2: Thay `useLocation` bằng `usePathname`**

Tìm trong component body:

```jsx
const location = useLocation();
```

Thay bằng:

```jsx
const pathname = usePathname();
```

- [ ] **Bước 3: Thay tất cả `location.pathname` bằng `pathname`**

Dùng find & replace trong file: `location.pathname` → `pathname`

---

## Task 6: Update Footer.jsx và CartDrawer.jsx

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/CartDrawer.jsx`

- [ ] **Bước 1: Update Footer.jsx**

Tìm dòng đầu `src/components/Footer.jsx`:

```jsx
import { Link } from 'react-router-dom';
```

Thay bằng:

```jsx
import Link from 'next/link';
```

- [ ] **Bước 2: Update CartDrawer.jsx**

Tìm dòng import react-router-dom trong `src/components/CartDrawer.jsx`:

```jsx
import { Link } from 'react-router-dom';
```

Thay bằng:

```jsx
'use client';
import Link from 'next/link';
```

Nếu `'use client'` chưa có ở đầu file, thêm vào dòng 1.

---

## Task 7: Update MegaMenu.jsx

**Files:**
- Modify: `src/components/layout/MegaMenu.jsx`

- [ ] **Bước 1: Thay react-router-dom Link**

Tìm trong `src/components/layout/MegaMenu.jsx`:

```jsx
import { Link } from 'react-router-dom';
```

Thay bằng:

```jsx
import Link from 'next/link';
```

---

## Task 8: Update pages — thêm `'use client'` + fix imports

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Products.jsx`
- Modify: `src/pages/Cart.jsx`
- Modify: `src/pages/Login.jsx`
- Modify: `src/pages/Register.jsx`
- Modify: `src/pages/Courses.jsx`
- Modify: `src/pages/Knowledge.jsx`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Contact.jsx`

- [ ] **Bước 1: Update Home.jsx**

Tìm đầu `src/pages/Home.jsx`:

```jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
```

Thay bằng:

```jsx
'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
```

- [ ] **Bước 2: Update Products.jsx**

Thêm `'use client';` làm dòng đầu tiên của `src/pages/Products.jsx`. (File này không dùng Link nên chỉ cần thêm directive.)

- [ ] **Bước 3: Update Cart.jsx**

Tìm đầu `src/pages/Cart.jsx`:

```jsx
import { Link } from 'react-router-dom';
```

Thay bằng:

```jsx
'use client';
import Link from 'next/link';
```

Nếu có thêm import khác từ react-router-dom trong Cart.jsx, gộp vào cùng dòng thay thế.

- [ ] **Bước 4: Update Login.jsx**

Tìm đầu `src/pages/Login.jsx`:

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
```

Thay bằng:

```jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
```

Tìm trong component body:

```jsx
const navigate = useNavigate();
```

Thay bằng:

```jsx
const router = useRouter();
```

Tìm tất cả `navigate(` và thay bằng `router.push(`. Ví dụ:

```jsx
navigate('/');  →  router.push('/');
```

- [ ] **Bước 5: Update Register.jsx**

Tương tự Login.jsx:

Tìm đầu `src/pages/Register.jsx`:

```jsx
import { Link, useNavigate } from 'react-router-dom';
```

Thay bằng:

```jsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
```

Thay `useNavigate()` → `useRouter()` và `navigate(` → `router.push(`.

- [ ] **Bước 6: Thêm `'use client'` cho Courses, Knowledge, About, Contact**

Thêm `'use client';` làm dòng đầu tiên của mỗi file:
- `src/pages/Courses.jsx`
- `src/pages/Knowledge.jsx`
- `src/pages/About.jsx`
- `src/pages/Contact.jsx`

---

## Task 9: Tạo root layout

**Files:**
- Create: `src/app/layout.jsx`

- [ ] **Bước 1: Tạo src/app/layout.jsx**

```jsx
import '../index.css';

export const metadata = {
  title: 'Len Sợi Dung Nhi',
  description: 'Len sợi cao cấp và thú bông handmade từ Việt Nam',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Task 10: Tạo (main) group layout

**Files:**
- Create: `src/app/(main)/layout.jsx`

- [ ] **Bước 1: Tạo src/app/(main)/layout.jsx**

```jsx
import { ShopProvider } from '../../context/ShopContext';
import { CartProvider } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartDrawer from '../../components/CartDrawer';

export default function MainLayout({ children }) {
  return (
    <ShopProvider>
      <CartProvider>
        <Header />
        <CartDrawer />
        {children}
        <Footer />
      </CartProvider>
    </ShopProvider>
  );
}
```

---

## Task 11: Tạo (auth) group layout

**Files:**
- Create: `src/app/(auth)/layout.jsx`

- [ ] **Bước 1: Tạo src/app/(auth)/layout.jsx**

```jsx
export default function AuthLayout({ children }) {
  return <>{children}</>;
}
```

---

## Task 12: Tạo route pages cho (main) group

**Files:**
- Create: `src/app/(main)/page.jsx`
- Create: `src/app/(main)/len-soi/page.jsx`
- Create: `src/app/(main)/thu-bong/page.jsx`
- Create: `src/app/(main)/day-nghe/page.jsx`
- Create: `src/app/(main)/kien-thuc/page.jsx`
- Create: `src/app/(main)/gioi-thieu/page.jsx`
- Create: `src/app/(main)/lien-he/page.jsx`
- Create: `src/app/(main)/gio-hang/page.jsx`

- [ ] **Bước 1: Tạo src/app/(main)/page.jsx**

```jsx
export { default } from '../../pages/Home';
```

- [ ] **Bước 2: Tạo src/app/(main)/len-soi/page.jsx**

```jsx
import Products from '../../../pages/Products';
export default function LenSoiPage() {
  return <Products productType="len-soi" />;
}
```

- [ ] **Bước 3: Tạo src/app/(main)/thu-bong/page.jsx**

```jsx
import Products from '../../../pages/Products';
export default function ThuBongPage() {
  return <Products productType="thu-bong" />;
}
```

- [ ] **Bước 4: Tạo src/app/(main)/day-nghe/page.jsx**

```jsx
export { default } from '../../../pages/Courses';
```

- [ ] **Bước 5: Tạo src/app/(main)/kien-thuc/page.jsx**

```jsx
export { default } from '../../../pages/Knowledge';
```

- [ ] **Bước 6: Tạo src/app/(main)/gioi-thieu/page.jsx**

```jsx
export { default } from '../../../pages/About';
```

- [ ] **Bước 7: Tạo src/app/(main)/lien-he/page.jsx**

```jsx
export { default } from '../../../pages/Contact';
```

- [ ] **Bước 8: Tạo src/app/(main)/gio-hang/page.jsx**

```jsx
export { default } from '../../../pages/Cart';
```

---

## Task 13: Tạo route pages cho (auth) group

**Files:**
- Create: `src/app/(auth)/login/page.jsx`
- Create: `src/app/(auth)/register/page.jsx`

- [ ] **Bước 1: Tạo src/app/(auth)/login/page.jsx**

```jsx
export { default } from '../../../pages/Login';
```

- [ ] **Bước 2: Tạo src/app/(auth)/register/page.jsx**

```jsx
export { default } from '../../../pages/Register';
```

---

## Task 14: Xoá Vite artifacts

**Files:**
- Delete: `src/main.jsx`
- Delete: `src/App.jsx`
- Delete: `vite.config.js`
- Delete: `index.html`

- [ ] **Bước 1: Xoá các file Vite**

```bash
rm src/main.jsx src/App.jsx vite.config.js index.html
```

---

## Task 15: Chạy dev server và verify

- [ ] **Bước 1: Chạy dev server**

```bash
npm run dev
```

Expected output:
```
▲ Next.js 15.x.x
- Local: http://localhost:3000
✓ Ready in Xs
```

- [ ] **Bước 2: Kiểm tra các route**

Mở browser và test từng URL:
- `http://localhost:3000/` — Home page với hero section và sản phẩm
- `http://localhost:3000/len-soi` — Trang sản phẩm len sợi, filter hoạt động
- `http://localhost:3000/thu-bong` — Trang thú bông
- `http://localhost:3000/login` — Trang login, KHÔNG có Header/Footer
- `http://localhost:3000/register` — Trang register, KHÔNG có Header/Footer
- `http://localhost:3000/gio-hang` — Trang giỏ hàng

- [ ] **Bước 3: Chạy build để verify SSG**

```bash
npm run build
```

Expected: thư mục `out/` được tạo với các file `.html` tĩnh, không có lỗi.
