# 마이페이지 설정 가이드

## 🎉 구현 완료!

일반 유저용 마이페이지가 성공적으로 구현되었습니다!

### 주요 기능

1. **결제 내역 관리** 💳
   - 자신의 모든 주문 내역 확인
   - 주문 상세 정보 (상품, 배송지, 결제 금액)
   - 주문 상태 추적

2. **내 젤리 관리** 🧪
   - 콘테스트에 제출한 자신의 젤리 확인
   - 젤리별 투표 수 확인
   - 콘테스트 페이지로 빠른 이동

3. **프로필 정보** 👤
   - 사용자 이름과 이메일 표시
   - 로그아웃 기능

## 📍 접근 방법

### 1. 헤더에서 접근
- 로그인 후 헤더 우측의 사용자 이름을 클릭하면 마이페이지로 이동합니다
- 예: `👤 연구원` 클릭

### 2. 직접 URL 접근
- `/mypage` 경로로 접근 (예: `http://localhost:3000/haribo/mypage`)

## 🔥 Firebase 설정 필요사항

### Firestore 복합 인덱스 생성

주문 내역과 젤리 조회를 위해 복합 인덱스가 필요합니다.

#### 1. Orders 컬렉션 인덱스

Firebase Console에서 Firestore > 색인 탭으로 이동 후 다음 인덱스를 생성하세요:

**컬렉션 ID:** `orders`
- 필드 1: `userId` (오름차순)
- 필드 2: `createdAt` (내림차순)

또는 앱을 실행하고 마이페이지를 방문하면 콘솔에 인덱스 생성 링크가 자동으로 표시됩니다.
링크를 클릭하면 Firebase Console로 이동하여 자동으로 인덱스를 생성할 수 있습니다.

#### 2. Jellies 컬렉션 인덱스

**컬렉션 ID:** `jellies`
- 필드 1: `creatorId` (오름차순)
- 필드 2: `createdAt` (내림차순)

이 인덱스는 이미 `getMyJellies` 함수를 위해 필요하므로 이미 생성되어 있을 수 있습니다.

### 수동 인덱스 생성 방법

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택
3. 좌측 메뉴에서 **Firestore Database** 선택
4. 상단 탭에서 **색인(Indexes)** 선택
5. **복합 색인 만들기** 클릭
6. 위의 설정대로 인덱스 생성

## 📁 생성된 파일

### 1. `/src/services/orderService.ts`
- 주문 생성 및 조회 기능
- Firebase Firestore와 통신
- 주문 상태 관리

### 2. `/src/pages/MyPage/MyPage.tsx`
- 마이페이지 메인 컴포넌트
- 탭 기반 UI (결제 내역 / 내 젤리)
- 프로필 정보 표시

### 3. 수정된 파일들
- `/src/pages/Checkout/Checkout.tsx`: 결제 완료 시 주문 정보 저장
- `/src/routes/index.tsx`: `/mypage` 라우트 추가
- `/src/components/layout/Header.tsx`: 마이페이지 링크 추가

## 🎨 UI/UX 특징

### 디자인
- Dream Candy Lab 테마와 일치하는 파스텔 컬러
- 부드러운 애니메이션과 트랜지션
- 모바일 반응형 디자인

### 사용자 경험
- 탭 전환으로 쉬운 네비게이션
- 데이터 로딩 중 스피너 표시
- 빈 상태일 때 친절한 안내 메시지
- 관련 페이지로 빠른 이동 버튼

## 🔐 보안

- 로그인하지 않은 사용자는 자동으로 로그인 페이지로 리다이렉트
- 각 사용자는 자신의 주문과 젤리만 볼 수 있음
- Firebase Security Rules로 데이터 접근 제어 (아래 참조)

## 📝 Firebase Security Rules

Firestore Security Rules에 다음을 추가하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Orders collection
    match /orders/{orderId} {
      // 사용자는 자신의 주문만 읽을 수 있음
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      
      // 로그인한 사용자는 주문 생성 가능
      allow create: if request.auth != null && 
                       request.resource.data.userId == request.auth.uid;
      
      // 관리자는 모든 주문 읽기 가능
      allow read: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Jellies collection (기존 규칙에 추가)
    match /jellies/{jellyId} {
      // 모든 사용자가 읽을 수 있음
      allow read: if true;
      
      // 로그인한 사용자는 젤리 생성 가능
      allow create: if request.auth != null;
      
      // 작성자와 관리자만 수정/삭제 가능
      allow update, delete: if request.auth != null && 
        (resource.data.creatorId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Votes collection
    match /votes/{voteId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

## 🚀 테스트 방법

### 1. 회원가입 및 로그인
```
1. 회원가입 페이지에서 새 계정 생성
2. 로그인
```

### 2. 젤리 만들기
```
1. Lab 페이지로 이동
2. 젤리 만들기 체험
3. 콘테스트에 제출
```

### 3. 상품 구매
```
1. Product 페이지에서 상품 선택
2. 장바구니 담기
3. 결제 진행
4. 배송 정보 입력
```

### 4. 마이페이지 확인
```
1. 헤더의 사용자 이름 클릭
2. 결제 내역 탭에서 주문 확인
3. 내 젤리 탭에서 만든 젤리 확인
```

## 💡 추가 개선 아이디어

### 단기
- [ ] 주문 취소 기능
- [ ] 주문 상세 페이지
- [ ] 배송 추적 기능
- [ ] 젤리 수정/삭제 기능

### 중기
- [ ] 찜한 상품 목록
- [ ] 쿠폰 및 포인트 관리
- [ ] 리뷰 작성 기능
- [ ] 1:1 문의 기능

### 장기
- [ ] 프로필 이미지 업로드
- [ ] 팔로우/팔로잉 시스템
- [ ] 젤리 레시피 공유
- [ ] 소셜 로그인 연동

## 🐛 트러블슈팅

### 문제: 마이페이지가 로딩되지 않음
**해결:** Firebase 인덱스가 생성되었는지 확인하세요. 브라우저 콘솔에서 인덱스 생성 링크를 확인할 수 있습니다.

### 문제: 주문 내역이 표시되지 않음
**해결:** 
1. Firebase Console에서 `orders` 컬렉션이 생성되었는지 확인
2. Security Rules가 올바르게 설정되었는지 확인
3. 실제로 결제를 완료했는지 확인

### 문제: 젤리가 표시되지 않음
**해결:**
1. Lab 페이지에서 젤리를 만들고 콘테스트에 제출했는지 확인
2. `jellies` 컬렉션의 복합 인덱스가 생성되었는지 확인

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. 브라우저 콘솔 로그
2. Firebase Console > Firestore > 데이터
3. Firebase Console > Authentication > 사용자
4. 네트워크 탭에서 API 호출 상태

---

**Dream Candy Lab** 🍬
달콤한 코딩의 세계에 오신 것을 환영합니다!

