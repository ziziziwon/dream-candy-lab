# 마이페이지 사용 가이드 🎉

## ✅ 완료된 기능

### 1. 결제 내역 관리 💳
- ✅ 모든 주문 내역 확인
- ✅ 주문 상세 정보 (상품, 수량, 금액)
- ✅ 배송 정보 확인
- ✅ 주문 상태 표시
- ✅ 디버깅 로그 추가

### 2. 내가 만든 젤리 관리 🧪
- ✅ Lab에서 만든 모든 젤리 표시
- ✅ 각 젤리의 투표 수 확인
- ✅ 젤리 삭제 기능
- ✅ **커스텀 젤리를 상품으로 구매** ⭐ NEW!
  - 장바구니에 담기
  - 바로 구매하기
  - 가격: ₩9,900

### 3. 디버깅 기능 🔍
- ✅ 브라우저 콘솔에 상세 로그 출력
- ✅ Firebase 인덱스 에러 자동 감지
- ✅ 데이터 로딩 상태 표시

---

## 🚀 사용 방법

### 1️⃣ 마이페이지 접속
```
방법 1: 헤더의 사용자 이름 (👤) 클릭
방법 2: URL 직접 입력 - /mypage
```

### 2️⃣ 결제 내역 확인
1. 마이페이지에서 **"💳 결제 내역"** 탭 선택
2. 주문 목록에서 확인하고 싶은 주문 선택
3. 주문 상세 정보 확인:
   - 주문번호
   - 주문 일시
   - 주문 상태
   - 상품 목록
   - 배송지 정보
   - 결제 금액

**결제 내역이 없는 경우:**
- "젤리 구경하러 가기 →" 버튼 클릭
- Product 페이지에서 상품 구매

### 3️⃣ 내가 만든 젤리 확인 및 구매
1. 마이페이지에서 **"🧪 내 젤리"** 탭 선택
2. Lab에서 만든 젤리 목록 확인
3. 각 젤리마다 3가지 옵션:
   - **🛒 장바구니**: 장바구니에 담기
   - **💳 구매**: 바로 결제 페이지로 이동
   - **콘테스트에서 보기**: Contest 페이지로 이동
   - **🗑️ 삭제**: 젤리 삭제 (우측 상단)

**젤리가 없는 경우:**
- "첫 젤리 만들러 가기 →" 버튼 클릭
- Lab 페이지에서 젤리 만들기

---

## 💡 커스텀 젤리 구매 기능

### 특징
- 💰 **가격**: ₩9,900 (고정)
- 🎨 **내용**: Lab에서 만든 나만의 젤리
- 📦 **배송**: 일반 상품과 동일
- 🏷️ **태그**: 커스텀, 맛, 나만의 젤리

### 구매 프로세스
```
1. 마이페이지 → "🧪 내 젤리" 탭
2. 원하는 젤리 선택
3. "🛒 장바구니" 또는 "💳 구매" 클릭
4. 결제 페이지로 이동
5. 배송 정보 입력
6. 결제 완료
7. 다시 마이페이지에서 주문 내역 확인!
```

---

## 🔍 문제 해결

### ❌ "아직 주문 내역이 없습니다"
**원인:** 실제로 구매한 적이 없음

**해결:**
1. `/product` 페이지로 이동
2. 상품 선택 후 장바구니 담기
3. 결제 진행
4. 마이페이지에서 확인

### ❌ "아직 만든 젤리가 없습니다"
**원인:** Lab에서 젤리를 만들지 않음

**해결:**
1. `/lab` 페이지로 이동
2. "젤리 만들기" 클릭
3. 맛, 색상, 식감 선택
4. 이름 입력 후 완성
5. 마이페이지에서 확인

### ❌ "Firebase 인덱스가 필요합니다"
**원인:** Firestore 복합 인덱스가 생성되지 않음

**해결:**
1. 브라우저 콘솔(F12) 열기
2. 에러 메시지의 링크 클릭
3. Firebase Console에서 "인덱스 만들기" 클릭
4. 1-2분 대기
5. 페이지 새로고침

자세한 내용은 `MYPAGE_DEBUG.md` 참고

### ❌ 데이터가 안 보임
**확인 사항:**
1. 로그인되어 있는가?
2. 브라우저 콘솔(F12)에 에러가 있는가?
3. Firebase 인덱스가 생성되었는가?

**브라우저 콘솔 확인:**
```
F12 → Console 탭
👤 현재 사용자: [UID] [이름]
📦 주문 내역: X개
🧪 내 젤리: X개
```

---

## 🎯 테스트 시나리오

### 완전한 사용자 흐름
```
1. 회원가입/로그인
   ↓
2. Lab에서 젤리 만들기
   ↓
3. Product에서 상품 구매
   ↓
4. 마이페이지에서 확인
   - 결제 내역 탭: 구매한 상품 확인
   - 내 젤리 탭: 만든 젤리 확인
   ↓
5. 커스텀 젤리 구매
   - "🛒 장바구니" 또는 "💳 구매" 클릭
   - 결제 진행
   ↓
6. 다시 마이페이지 확인
   - 결제 내역에 커스텀 젤리 추가됨!
```

---

## 📊 데이터 구조

### 결제 내역 (Orders)
```typescript
{
  id: string;
  userId: string;
  userName: string;
  items: [
    {
      productId: string;
      productName: string;
      quantity: number;
      price: number;
      emoji: string;
    }
  ];
  totalPrice: number;
  shippingFee: number;
  finalPrice: number;
  paymentMethod: string;
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    memo?: string;
  };
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderNumber: string;
  createdAt: timestamp;
}
```

### 내 젤리 (Jellies)
```typescript
{
  id: string;
  name: string;
  flavor: string;
  sweetness: number;
  sourness: number;
  texture: string;
  color: string;
  creatorId: string;
  creatorName: string;
  votes: number;
  createdAt: timestamp;
}
```

### 커스텀 젤리 → 상품 변환
```typescript
// Lab에서 만든 젤리
Jelly {
  name: "Rainbow Delight",
  flavor: "strawberry",
  sweetness: 80,
  sourness: 20,
  texture: "soft",
  color: "#FF7CA8"
}

// 변환된 상품
Product {
  id: "custom_[jellyId]",
  name: "Rainbow Delight",
  flavor: "strawberry",
  description: "[사용자]가 만든 커스텀 젤리입니다!",
  price: 9900, // ₩9,900
  sweetness: 4, // 80 / 20 = 4
  softness: 5, // "soft" = 5
  shine: 5,
  tags: ["커스텀", "딸기", "나만의 젤리"]
}
```

---

## 🎨 UI/UX

### 탭 네비게이션
- **💳 결제 내역**: 핑크-옐로우 그라데이션
- **🧪 내 젤리**: 민트-라벤더 그라데이션

### 버튼 디자인
- **장바구니**: 핑크-옐로우 (주요 액션)
- **바로 구매**: 민트-라벤더 (보조 액션)
- **삭제**: 레드 (위험 액션)

### 애니메이션
- Framer Motion을 사용한 부드러운 전환
- 호버 시 스케일 애니메이션
- 탭 전환 시 페이드 인/아웃

---

## 💻 개발자 정보

### 주요 파일
- `src/pages/MyPage/MyPage.tsx` - 메인 컴포넌트
- `src/services/orderService.ts` - 주문 관리
- `src/services/jellyService.ts` - 젤리 관리

### 사용된 기술
- React 18 + TypeScript
- Framer Motion (애니메이션)
- Firebase Firestore (데이터베이스)
- Zustand (장바구니 상태관리)
- Tailwind CSS (스타일링)

### 디버깅
브라우저 콘솔에서 다음 로그 확인:
```
🔍 마이페이지 데이터 로딩 시작...
👤 현재 사용자: [UID] [이름]
📦 주문 내역: X개
🧪 내 젤리: X개
💡 팁: ...
```

---

## 🌟 주요 개선 사항

### v1.1 (현재)
- ✅ 커스텀 젤리 구매 기능 추가
- ✅ 디버깅 로그 추가
- ✅ Firebase 인덱스 에러 자동 감지
- ✅ 사용자 경험 개선

### v1.0
- ✅ 기본 마이페이지 구현
- ✅ 결제 내역 조회
- ✅ 내 젤리 조회
- ✅ 젤리 삭제 기능

---

## 🎁 추가 정보

### 커스텀 젤리 가격 정책
- 기본 가격: ₩9,900
- 배송비: 3만원 이상 무료 (일반 상품과 동일)
- 장바구니에 다른 상품과 함께 담을 수 있음
- 결제 방법: 모든 결제 수단 이용 가능

### 젤리 생성 제한
- 로그인한 사용자만 생성 가능
- 삭제는 본인 또는 관리자만 가능
- 이름은 필수 입력

---

**Dream Candy Lab** 🍬  
이제 Lab에서 만든 나만의 젤리를 구매할 수 있습니다! ✨

궁금한 점이 있으면 `MYPAGE_DEBUG.md`를 참고하세요!


