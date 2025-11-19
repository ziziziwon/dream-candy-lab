# 🍬 Dream Candy Lab - 달콤한 젤리 실험실

> **"말랑말랑 · 몽글몽글 · 반짝반짝"**  

하리보 젤리의 감성과 쿠키런의 귀여움을 벤치마케팅하여 담은 달콤한 실험실 웹사이트입니다.

![Dream Candy Lab](https://img.shields.io/badge/Dream%20Candy%20Lab-🍬-FF6F91)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC)
![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-FF0055)

---

## ✨ 프로젝트 소개

**Dream Candy Lab**은 젤리들이 직접 실험을 진행하는 달콤한 연구소입니다.
부드러운 애니메이션, 파스텔 컬러, 그리고 귀여운 캐릭터들이 함께하는 감성적인 웹 경험을 선사합니다.

### 🎨 디자인 컨셉
- **무드보드**: 말랑말랑, 몽글몽글, 살짝 반짝이는 실험실
- **컬러 톤**: 크림 화이트 + 젤리빛 파스텔 (코랄, 옐로, 민트, 라벤더)
- **재질**: 반투명 젤리, 실리콘 느낌, 유광 플라스틱
- **형태감**: 둥글고 휘어지는 라운드 엣지 (32px+)

---

## 🧪 주요 기능

### 1️⃣ 스토리텔링 랜딩페이지
- 🫧 7개의 씬으로 구성된 영화 같은 스크롤 경험
- 🌈 3D 젤리 모델 (React Three Fiber)
- 💫 GSAP ScrollTrigger 기반 씬 전환
- 📜 부드러운 스크롤 인터랙션

### 2️⃣ Firebase 인증 시스템
- 🔐 이메일/비밀번호 로그인/회원가입
- 👤 전역 AuthContext로 상태 관리
- 🛡️ 역할 기반 접근 제어 (User/Admin)
- 📊 관리자 대시보드 (/admin)

### 3️⃣ 인터랙티브 젤리 실험실
- 🧪 나만의 젤리 만들기 (MakeJelly)
- 🎨 실시간 색상/속성 미리보기
- 🗳️ 젤리 콘테스트 & 투표 시스템
- 🔥 Firestore 실시간 데이터베이스 연동

### 4️⃣ 풀스택 E-Commerce
- 🛍️ 상품 상세 페이지 (수량 선택)
- 🛒 장바구니 시스템 (Zustand)
- 💳 실전 결제 페이지 (무신사/쿠팡 UX)
- 📦 3만원 이상 무료배송
- 🎉 결제 완료 Confetti 애니메이션

### 5️⃣ 마이페이지 (신규!)
- 👤 사용자 프로필 정보
- 💳 결제 내역 조회 및 관리
- 🧪 내가 만든 젤리 관리
- 🗳️ 콘테스트 참여 내역
- 🗑️ 젤리 삭제 기능

### 6️⃣ 관리자 기능
- 🗑️ 젤리 삭제 권한
- 📈 실시간 통계 모니터링
- 👥 사용자 관리
- 🔍 Firestore 데이터 관리

---

## 🛠️ 기술 스택

### Core
- **React 18** + **TypeScript** - 컴포넌트 기반 개발
- **React Router v6** - 클라이언트 사이드 라우팅
- **Tailwind CSS** - 유틸리티 퍼스트 스타일링
- **CSS Variables** - 커스텀 디자인 토큰

### Backend & Database
- **Firebase Authentication** - 이메일/비밀번호 인증
- **Firestore Database** - NoSQL 실시간 데이터베이스
- **Firebase Security Rules** - 데이터 접근 제어

### Animation & 3D
- **Framer Motion** - 선언적 UI 애니메이션
- **GSAP + ScrollTrigger** - 고급 스크롤 애니메이션
- **React Three Fiber** - 3D WebGL 렌더링
- **@react-three/drei** - 3D 헬퍼 컴포넌트
- **React Confetti** - 파티클 효과

### State Management
- **Zustand** - 경량 전역 상태 관리 (장바구니)
- **React Context API** - 인증 상태 관리

---

## 🚀 시작하기

### 설치
모든 패키지가 이미 설치되어 있습니다.

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3004/haribo](http://localhost:3004/haribo) 열기

### 빌드

```bash
npm run build
```

---

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ui/                       # UI 컴포넌트
│   │   ├── Button.tsx            # 젤리 버튼
│   │   ├── Card.tsx              # 유리 카드
│   │   └── Chip.tsx              # 태그 칩
│   ├── motion/                   # 애니메이션 컴포넌트
│   │   ├── ParticleSparkle.tsx   # 반짝임 효과
│   │   └── CurvedText.tsx        # 곡선 텍스트
│   ├── layout/                   # 레이아웃
│   │   ├── Header.tsx            # 헤더 (인증 통합)
│   │   ├── Footer.tsx            # 푸터
│   │   └── Container.tsx         # 컨테이너
│   ├── BootSequence.tsx          # 부팅 시퀀스
│   ├── GlitchParticleHero.tsx    # 3D 히어로
│   ├── ProductCard.tsx           # 상품 카드
│   └── ProductDetailModal.tsx    # 상품 상세 모달
├── pages/
│   ├── Home/                     # 홈 (7개 씬)
│   ├── Product/                  # 상품 목록/상세
│   ├── Cart/                     # 장바구니
│   ├── Checkout/                 # 결제
│   ├── Lab/                      # 젤리 만들기
│   ├── Contest/                  # 콘테스트
│   ├── Auth/                     # 로그인/회원가입
│   ├── MyPage/                   # 마이페이지 (신규!)
│   ├── Admin/                    # 관리자 대시보드
│   └── About/                    # 비하인드 신
├── stores/
│   ├── useCartStore.ts           # 장바구니 상태 (Zustand)
│   └── useSceneStore.ts          # 씬 상태
├── services/
│   ├── auth.ts                   # 인증 서비스
│   ├── jellyService.ts           # 젤리 CRUD
│   ├── orderService.ts           # 주문 관리 (신규!)
│   └── voteService.ts            # 투표 로직
├── contexts/
│   └── AuthContext.tsx           # 인증 컨텍스트
├── data/
│   └── jellyProducts.ts          # 상품 데이터
├── types/
│   ├── jellyProduct.ts           # 상품 타입
│   └── jelly.ts                  # 젤리 타입
├── shaders/
│   └── particleShader.ts         # 3D 셰이더
├── styles/
│   └── premium-theme.css         # 커스텀 CSS
├── firebase.ts                   # Firebase 설정
└── theme.ts                      # 테마 변수
```

---

## 🎨 컬러 시스템

| 이름 | HEX | 용도 |
|------|-----|------|
| Jelly Yellow | `#FFD100` | Primary 강조 |
| Jelly Pink | `#FF6F91` | Secondary 강조 |
| Jelly Mint | `#BFFFC8` | 상쾌한 포인트 |
| Jelly Lavender | `#D0C3FF` | 부드러운 강조 |
| Lab Cream | `#FFF9F6` | 배경색 |
| Text Choco | `#3B2E2A` | 주요 텍스트 |

---

## 🍭 캐릭터 소개

### 🧸 Dr. Jellybear
**역할**: 연구소장  
**특징**: 항상 실험노트를 들고 다니는 귀여운 곰돌이  
**대사**: "오늘도 달콤한 실험을 시작해볼까요? 🍯"

### 🍓 Strawbi
**역할**: 어시스턴트  
**특징**: 통통 튀는 말투로 연구소 분위기를 밝게 만듦  
**대사**: "오늘은 하트젤리 배합 성공! 완전 달달해요~! 💕"

### 🍋 Lemmi
**역할**: 엔지니어  
**특징**: 각종 실험 기계와 장비를 능숙하게 조작  
**대사**: "이 기계를 개선하면 더 좋은 젤리를 만들 수 있을 거예요! ⚙️"

### 🍏 Minty
**역할**: 디자이너  
**특징**: 젤리의 색과 향을 연구하며 아름다운 디자인 창조  
**대사**: "색상 조합이 완벽해요! 이번 젤리는 정말 예쁠 거예요 ✨"

---

## 💡 주요 애니메이션

### 🫧 부유 효과 (Float)
GSAP을 사용한 sin/cos 기반 자연스러운 부유 애니메이션

### 🎯 바운스 효과 (Bounce)
Framer Motion의 spring transition으로 통통 튀는 느낌

### 💫 버블 효과 (Bubble)
아래에서 위로 올라가는 투명 버블 애니메이션

### ✨ 반짝임 효과 (Sparkle)
랜덤 위치에 나타나는 작은 파티클

---

## 🎯 커스터마이징

### 색상 변경
`tailwind.config.js` 또는 `src/styles/jelly-theme.css`에서 수정:

```css
:root {
  --jelly-yellow: #FFD100;
  --jelly-pink: #FF6F91;
  /* ... */
}
```

### 제품 추가
`src/data/jellyProducts.ts`에 새 제품 추가:

```typescript
{
  id: 'jelly-009',
  name: '블루베리 버스트',
  flavor: 'blueberry',
  price: 4500,
  // ...
}
```

### 캐릭터 수정
`src/data/characters.ts`에서 캐릭터 정보 변경

---

## 🎉 구현 완료

### ✅ 완료된 기능
- [x] 전체 디자인 시스템 (Tailwind + Custom CSS)
- [x] 7개 씬 스토리텔링 랜딩페이지
- [x] 3D 젤리 모델 & WebGL 렌더링
- [x] Firebase 인증 시스템 (로그인/회원가입)
- [x] Firestore 실시간 데이터베이스
- [x] 역할 기반 접근 제어 (User/Admin)
- [x] 관리자 대시보드
- [x] 인터랙티브 젤리 만들기
- [x] 젤리 콘테스트 & 투표 시스템
- [x] 상품 상세 페이지 (수량 선택)
- [x] 장바구니 시스템 (Zustand)
- [x] 실전 결제 페이지 (무신사/쿠팡 UX)
- [x] 3만원 이상 무료배송 로직
- [x] 바로 구매 기능
- [x] 결제 완료 Confetti 애니메이션
- [x] **마이페이지 (결제 내역 & 내 젤리 관리)** ⭐ NEW!
- [x] **주문 정보 Firebase 저장** ⭐ NEW!
- [x] 반응형 디자인 (Mobile First)
- [x] 모든 마이크로 인터랙션

### 🔜 추가 가능한 기능
- [ ] 실제 결제 연동 (Stripe/Toss Payments)
- [ ] 주문 상태 업데이트 (배송 추적)
- [ ] 주문 취소 기능
- [ ] 리뷰 시스템
- [ ] 검색 기능
- [ ] 위시리스트
- [ ] 다크 모드
- [ ] PWA (오프라인 지원)
- [ ] 소셜 로그인 (Google/Kakao)
- [ ] 프로필 이미지 업로드
- [ ] 쿠폰 및 포인트 시스템

---

## 📚 문서

자세한 구현 가이드는 다음 파일을 참고하세요:
- `DESIGN_GUIDE.md` - 디자인 시스템 & 컬러 팔레트
- `IMPLEMENTATION_GUIDE.md` - 기술 구현 세부사항
- `PREMIUM_DESIGN_GUIDE.md` - 프리미엄 디자인 가이드
- `README_ECOMMERCE.md` - E-Commerce 기능 설명
- `MYPAGE_SETUP.md` - 마이페이지 설정 가이드 ⭐ NEW!
- `REBOOT_GUIDE.md` - 프로젝트 재시작 가이드

---

## 🔥 Firebase 설정

### 환경 변수 설정

`.env` 파일 생성:

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Firestore 컬렉션 구조

```
users/
  - uid (document ID)
  - email: string
  - displayName: string
  - role: "user" | "admin"
  - createdAt: timestamp

jellies/
  - id (auto-generated)
  - name: string
  - flavor: string
  - sweetness: number
  - sourness: number
  - texture: string
  - color: string
  - creatorId: string
  - creatorName: string
  - votes: number
  - createdAt: timestamp

votes/
  - id (auto-generated)
  - userId: string
  - jellyId: string
  - createdAt: timestamp

orders/ ⭐ NEW!
  - id (auto-generated)
  - userId: string
  - userName: string
  - items: array
  - totalPrice: number
  - shippingFee: number
  - finalPrice: number
  - paymentMethod: string
  - shippingInfo: object
  - status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  - orderNumber: string
  - createdAt: timestamp
```

---

## 📝 License

MIT License - 자유롭게 사용하세요!

---

## 👨‍💻 개발자

**Dream Candy Lab** - *Where sweetness meets science* 🧪

### 개발 과정
- **컨셉 기획**: 하리보 × 쿠키런 감성 융합
- **디자인 시스템**: 파스텔 컬러 + 둥근 모서리
- **프론트엔드**: React 18 + TypeScript + Tailwind
- **백엔드**: Firebase Authentication + Firestore
- **3D 그래픽**: React Three Fiber + GLTF
- **애니메이션**: Framer Motion + GSAP
- **E-Commerce**: 장바구니 + 결제 플로우

> 💡 **Tip**: `/about` 페이지에서 10단계 제작 과정을 확인하세요!

---

## 🌟 주요 특징

✨ **몰입형 스토리텔링** - 7개 씬으로 구성된 영화 같은 경험  
🎨 **커스텀 디자인 시스템** - 젤리 테마의 완전한 UI 라이브러리  
🧪 **인터랙티브 실험실** - 나만의 젤리를 만들고 투표하기  
🛍️ **풀스택 쇼핑몰** - 장바구니부터 결제까지 완전한 플로우  
🔥 **실시간 데이터베이스** - Firebase로 즉각적인 업데이트  
📱 **완벽한 반응형** - 모바일부터 4K까지 모든 화면 지원  

---

**Made with 💕 by Dream Candy Lab Team**

🍬 ✨ 🧪 🌈 🍭 💳 🛒 🎉
