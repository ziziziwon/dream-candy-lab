# 🏗️ Dream Candy Lab - 사이트 구조 가이드

## 전체 개요

**"인터랙티브 브랜드 내러티브 + 실험실형 커머스 목업"**

---

## 📄 페이지 구조 (6개)

| 페이지 | 경로 | 설명 | 주요 기능 |
|--------|------|------|-----------|
| **Home** | `/` | 메인 스토리텔링 | Hero + About + Product + Event 섹션 |
| **Product** | `/product` | 제품 목록 | 필터링, 정렬, 카드 grid |
| **Product Detail** | `/product/:id` | 제품 상세 | 상세 정보, 장바구니 담기 |
| **Lab** | `/lab` | 실험실 공간 | 3개 Lab 존 소개, 실험 진행도 |
| **About** | `/about` | 브랜드 스토리 | 철학, 캐릭터 스토리, 미션 |
| **Cart** | `/cart` | 장바구니 | 수량 조절, 합계 계산 |
| **Checkout** | `/checkout` | 테스트 결제 | 배송 정보, 결제 완료 |

---

## 🧩 폴더 구조

```
src/
├── routes/
│   └── index.tsx              # React Router 설정
├── pages/
│   ├── Home/
│   │   └── Home.tsx           # 메인 페이지 (4개 섹션 조합)
│   ├── Product/
│   │   ├── Product.tsx        # 제품 목록
│   │   └── ProductDetail.tsx  # 제품 상세
│   ├── Lab/
│   │   └── Lab.tsx            # 실험실
│   ├── About/
│   │   └── About.tsx          # 어바웃
│   ├── Cart/
│   │   └── Cart.tsx           # 장바구니
│   └── Checkout/
│       └── Checkout.tsx       # 결제
├── components/
│   ├── ui/                    # Button, Card, Chip, Tooltip
│   ├── motion/                # JellyFloat, JellyBounce, BubbleEffect
│   └── layout/                # Layout, Header, Footer, Container
├── sections/
│   ├── HeroSection.tsx        # 곡선 텍스트, 비대칭 조명
│   ├── AboutSection.tsx       # 캐릭터 소개
│   ├── ProductSection.tsx     # 제품 미리보기
│   └── EventSection.tsx       # 이벤트
├── data/
│   ├── characters.ts          # 4명의 젤리 캐릭터
│   ├── events.ts              # 시즌 이벤트
│   └── jellyProducts.ts       # 8개 제품 데이터
├── stores/
│   └── useCartStore.ts        # Zustand 장바구니
├── types/
│   └── jellyProduct.ts        # 제품 타입
└── styles/
    └── jelly-theme.css        # 젤리 테마
```

---

## 🚀 라우팅 설정

### `src/routes/index.tsx`

```tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import Lab from "../pages/Lab/Lab";
import About from "../pages/About/About";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/lab", element: <Lab /> },
      { path: "/about", element: <About /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
]);
```

### `src/App.tsx`

```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## 🧭 네비게이션 (Header)

### 구성 요소

| 위치 | 요소 | 기능 |
|------|------|------|
| **좌측** | 로고 + 타이틀 | 홈으로 이동, hover 시 흔들림 |
| **중앙** | Nav 메뉴 | Home, Product, Lab, About |
| **우측** | 장바구니 아이콘 | Cart 페이지 이동, 아이템 수 표시 |

### 특징
- ✅ 현재 페이지 active 상태 표시
- ✅ 장바구니 아이템 수 실시간 표시
- ✅ 스크롤 시 배경 blur 효과
- ✅ 로고 hover 시 반짝이는 애니메이션

---

## 🛒 장바구니 (Zustand)

### `src/stores/useCartStore.ts`

```tsx
interface CartItem {
  product: JellyProduct;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: JellyProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
```

### 사용 예시

```tsx
const { addItem } = useCartStore();

<Button 
  label="장바구니에 담기" 
  onClick={() => addItem(product, 1)}
/>
```

---

## 📄 페이지별 세부 사항

### 1️⃣ Home (`/`)
- **구성**: HeroSection + AboutSection + ProductSection + EventSection
- **특징**: 스크롤 스토리텔링, 부유 애니메이션
- **CTA**: "달콤한 실험에 참여하기" → Product 섹션으로 스크롤

### 2️⃣ Product (`/product`)
- **구성**: 필터 버튼 + 제품 Grid
- **필터**: 전체, 딸기, 레몬, 민트, 포도
- **카드**: Hover 시 scale up, 클릭 시 상세 페이지

### 3️⃣ Product Detail (`/product/:id`)
- **구성**: 제품 이미지 + 정보 + 특성 바 + CTA
- **특성**: 달콤함, 부드러움, 반짝임 (5점 만점)
- **CTA**: "장바구니에 담기", "바로 구매"

### 4️⃣ Lab (`/lab`)
- **구성**: 3개 Lab 존 (Flavor, Texture, Color)
- **각 존**: 진행도 표시, 상태 (진행중/완료/대기중)
- **CTA**: "Join Experiment" → 상단으로 스크롤

### 5️⃣ About (`/about`)
- **구성**: 철학 + 캐릭터 스토리 + 미션
- **철학**: 다양성, 실험정신, 사랑
- **캐릭터**: Dr. Jellybear, Strawbi, Lemmi, Minty

### 6️⃣ Cart (`/cart`)
- **구성**: 아이템 목록 + 주문 요약
- **기능**: 수량 조절, 삭제, 총 금액 계산
- **빈 장바구니**: 빈 바구니 일러스트 + "제품 보러가기"

### 7️⃣ Checkout (`/checkout`)
- **구성**: 배송 정보 + 주문 요약 + 결제
- **테스트**: 2초 후 완료, 3초 후 홈으로
- **완료 화면**: "🎉 주문이 완료되었어요!"

---

## 🎨 페이지별 색상 톤

| 페이지 | 배경 그라데이션 | 포인트 컬러 |
|--------|----------------|------------|
| Home | lab-cream → pink/50 → lab-cream | pink, yellow |
| Product | lab-cream → white | pink, yellow |
| Lab | mint/20 → lab-cream → lavender/20 | mint, lavender |
| About | pink/10 → lab-cream | pink, yellow |
| Cart | lab-cream → white | pink |
| Checkout | lab-cream → white | pink, green |

---

## 💫 애니메이션 시스템

### 페이지 전환
```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
```

### 리스트 아이템
```tsx
transition={{ delay: index * 0.1, duration: 0.6 }}
```

### 버튼 인터랙션
```tsx
whileHover={{ scale: 1.08 }}
whileTap={{ scale: 0.95 }}
```

---

## 🔧 필요한 패키지

```bash
npm install react-router-dom
```

*(Stripe는 미래 확장용)*

---

## 📱 반응형 브레이크포인트

| 디바이스 | 브레이크포인트 | Grid |
|----------|---------------|------|
| Mobile | < 768px | 1 column |
| Tablet | 768px - 1024px | 2 columns |
| Desktop | > 1024px | 3-4 columns |

---

## ✨ 핵심 기능 완성도

- ✅ 라우팅 시스템 (React Router v6)
- ✅ 6개 페이지 완성
- ✅ 장바구니 상태 관리 (Zustand)
- ✅ 제품 필터링 & 상세 페이지
- ✅ 테스트 결제 플로우
- ✅ 반응형 디자인
- ✅ 페이지별 애니메이션

---

## 🚀 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm start
```

---

## 🎯 다음 단계 (미래 확장)

1. **3D Scene** - React Three Fiber for Lab page
2. **Stripe 실제 연동** - 테스트 모드 → 프로덕션
3. **하리보 실제 제품 크롤링** - API 연동
4. **AR 젤리 시연** - WebXR
5. **ScrollTrigger** - GSAP 스크롤 애니메이션
6. **Dark Mode** - 다크 젤리 테마

---

**Made with 💕 by Dream Candy Lab Team**
*"인터랙티브 브랜드 내러티브 완성"*






