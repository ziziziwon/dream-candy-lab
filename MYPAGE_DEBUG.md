# 마이페이지 디버깅 가이드 🔍

마이페이지에서 결제 내역과 젤리 정보가 보이지 않을 때 확인해야 할 사항들입니다.

## 1️⃣ 브라우저 콘솔 확인

### Chrome/Edge 개발자 도구 열기
- Windows: `F12` 또는 `Ctrl + Shift + I`
- Mac: `Cmd + Option + I`

### 확인할 내용
마이페이지(`/mypage`)를 열고 Console 탭에서 다음을 확인하세요:

#### ✅ 정상적인 경우
```
젤리 저장 완료: [ID]
```

#### ❌ 에러가 있는 경우
```
Error getting user orders: ...
Error getting my jellies: ...
FirebaseError: The query requires an index...
```

## 2️⃣ Firebase 인덱스 확인

### 인덱스가 필요한 이유
마이페이지에서 데이터를 불러올 때 복합 쿼리를 사용합니다:
- `orders` 컬렉션: `userId`로 필터링 + `createdAt`으로 정렬
- `jellies` 컬렉션: `creatorId`로 필터링 + `createdAt`으로 정렬

### 인덱스 생성 방법

#### 자동 생성 (권장)
1. 마이페이지를 처음 방문하면 브라우저 콘솔에 에러가 표시됩니다
2. 에러 메시지에 포함된 링크를 클릭하세요
3. Firebase Console로 이동하여 "인덱스 만들기" 버튼 클릭
4. 인덱스 생성 완료까지 1-2분 대기

#### 수동 생성
Firebase Console → Firestore Database → 색인(Indexes) → 복합 색인 만들기

**Orders 인덱스:**
- 컬렉션 ID: `orders`
- 필드 1: `userId` (오름차순)
- 필드 2: `createdAt` (내림차순)

**Jellies 인덱스:**
- 컬렉션 ID: `jellies`
- 필드 1: `creatorId` (오름차순)
- 필드 2: `createdAt` (내림차순)

## 3️⃣ 실제 데이터 확인

### Firebase Console에서 확인
[Firebase Console](https://console.firebase.google.com/) → 프로젝트 선택 → Firestore Database

#### Orders 컬렉션 확인
1. 좌측에서 `orders` 컬렉션 클릭
2. 문서가 있는지 확인
3. 문서를 클릭하여 `userId` 필드가 현재 로그인한 사용자의 UID와 일치하는지 확인

#### Jellies 컬렉션 확인
1. 좌측에서 `jellies` 컬렉션 클릭
2. 문서가 있는지 확인
3. 문서를 클릭하여 `creatorId` 필드가 현재 로그인한 사용자의 UID와 일치하는지 확인

### 현재 사용자 UID 확인하는 방법
브라우저 콘솔에서 다음 코드를 실행:
```javascript
// 현재 로그인한 사용자 정보 확인
firebase.auth().currentUser
```

## 4️⃣ 테스트 시나리오

### 결제 내역이 없는 경우
**증상:** "아직 주문 내역이 없습니다" 메시지가 표시됨

**해결:**
1. Product 페이지로 이동 (`/product`)
2. 상품 선택 후 장바구니에 담기
3. 결제 페이지로 이동 (`/cart` → `결제하기`)
4. 배송 정보 입력 후 결제 완료
5. 마이페이지에서 주문 내역 확인

### 내 젤리가 없는 경우
**증상:** "아직 만든 젤리가 없습니다" 메시지가 표시됨

**해결:**
1. Lab 페이지로 이동 (`/lab`)
2. "젤리 만들기" 클릭 (`/lab/make`)
3. 젤리 속성 설정 (맛, 색상, 식감 등)
4. 이름 입력 후 "젤리 완성하기!" 클릭
5. Contest 페이지로 자동 이동되면 성공
6. 마이페이지에서 내 젤리 확인

## 5️⃣ Firebase Security Rules 확인

### 현재 규칙 확인
Firebase Console → Firestore Database → 규칙(Rules)

### 올바른 규칙
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Orders collection
    match /orders/{orderId} {
      // 사용자는 자신의 주문만 읽을 수 있음
      allow read: if request.auth != null && 
                     (resource.data.userId == request.auth.uid ||
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      
      // 로그인한 사용자는 주문 생성 가능
      allow create: if request.auth != null && 
                       request.resource.data.userId == request.auth.uid;
    }
    
    // Jellies collection
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

## 6️⃣ 네트워크 요청 확인

### Network 탭 확인
1. 개발자 도구 → Network 탭
2. 마이페이지 새로고침
3. `firestore` 관련 요청 확인
4. 상태 코드가 200인지 확인

### 에러 응답 확인
- **403 Forbidden**: Security Rules 문제
- **400 Bad Request**: 인덱스 문제
- **401 Unauthorized**: 로그인 문제

## 7️⃣ 로그인 상태 확인

### 증상
마이페이지 접속 시 자동으로 로그인 페이지로 리다이렉트됨

### 해결
1. 로그인 페이지에서 이메일/비밀번호 입력
2. 로그인 성공 후 마이페이지 재방문
3. 또는 회원가입 후 로그인

## 8️⃣ 문제 해결 체크리스트

- [ ] 로그인되어 있는가?
- [ ] 브라우저 콘솔에 에러가 있는가?
- [ ] Firebase 인덱스가 생성되어 있는가?
- [ ] 실제로 결제를 완료한 적이 있는가?
- [ ] 실제로 젤리를 만든 적이 있는가?
- [ ] Firebase Console에서 데이터가 보이는가?
- [ ] Security Rules가 올바르게 설정되어 있는가?
- [ ] 네트워크 요청이 성공하는가?

## 9️⃣ 빠른 테스트 방법

### 즉시 테스트하기
```bash
# 1. 회원가입/로그인
http://localhost:3000/haribo/signup

# 2. 젤리 만들기
http://localhost:3000/haribo/lab/make

# 3. 상품 구매
http://localhost:3000/haribo/product
# → 상품 선택 → 장바구니 → 결제

# 4. 마이페이지 확인
http://localhost:3004/haribo/mypage
```

## 🆘 여전히 안 되는 경우

### 캐시 삭제
1. Chrome: `Ctrl + Shift + Delete` (Windows) / `Cmd + Shift + Delete` (Mac)
2. "캐시된 이미지 및 파일" 선택
3. 삭제 후 페이지 새로고침

### 서버 재시작
```bash
# 개발 서버 종료 (Ctrl + C)
# 재시작
npm start
```

### Firebase 재연결
```bash
# .env 파일 확인
cat .env

# Firebase 설정이 올바른지 확인
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
```

## 📞 추가 지원

여전히 문제가 해결되지 않으면:
1. 브라우저 콘솔의 전체 에러 메시지 복사
2. Firebase Console의 스크린샷
3. Network 탭의 실패한 요청 상세 정보

이 정보를 제공해주시면 더 정확한 해결책을 드릴 수 있습니다!

---

**Dream Candy Lab** 🍬
달콤한 디버깅의 세계에 오신 것을 환영합니다!


