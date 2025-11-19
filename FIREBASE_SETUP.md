# 🔥 Firebase 설정 가이드

Dream Candy Lab에 Firebase 인증 및 데이터베이스를 연결하는 방법입니다.

## 📋 1단계: Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: **"Dream Candy Lab"** 입력
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

## 🔑 2단계: 웹 앱 등록 및 설정 키 발급

1. 프로젝트 콘솔에서 **"프로젝트 설정"** (⚙️) 클릭
2. **"일반"** 탭에서 **"앱 추가"** > **"웹 (</> 아이콘)"** 선택
3. 앱 닉네임: "Dream Candy Lab Web" 입력
4. Firebase Hosting 설정은 나중에 (선택사항)
5. **Firebase SDK 구성 코드 복사**

## 🔐 3단계: 환경 변수 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 입력하세요:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=dream-candy-lab.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=dream-candy-lab
REACT_APP_FIREBASE_STORAGE_BUCKET=dream-candy-lab.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**⚠️ 주의:** `.env` 파일은 Git에 커밋하지 마세요! (이미 `.gitignore`에 포함되어 있습니다)

## 🔓 4단계: Firebase Authentication 활성화

1. Firebase Console에서 **"Authentication"** 메뉴 클릭
2. **"시작하기"** 클릭
3. **"Sign-in method"** 탭 선택
4. **"이메일/비밀번호"** 제공업체 활성화
5. (선택사항) Google, 카카오 등 소셜 로그인 추가 가능

## 📊 5단계: Firestore Database 생성

1. Firebase Console에서 **"Firestore Database"** 메뉴 클릭
2. **"데이터베이스 만들기"** 클릭
3. 보안 규칙: **"테스트 모드에서 시작"** 선택 (개발용)
4. Firestore 위치: **"asia-northeast3 (Seoul)"** 선택 (한국 서버)
5. 생성 완료

### 🔒 프로덕션 보안 규칙 (나중에 적용)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 유저 컬렉션
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 젤리 컬렉션
    match /jellies/{jellyId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.creatorId == request.auth.uid;
    }
    
    // 투표 컬렉션
    match /votes/{voteId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // 주문 컬렉션
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
  }
}
```

## 🗂️ 6단계: Firestore 컬렉션 구조

Dream Candy Lab에서 사용하는 컬렉션 구조:

```
users/
  {uid}/
    uid: string
    displayName: string
    email: string
    role: "user" | "admin"
    joinedAt: timestamp

jellies/
  {jellyId}/
    flavor: string
    sweetness: number (0-100)
    sourness: number (0-100)
    texture: string
    color: string
    name: string
    creatorId: string (users/{uid})
    creatorName: string
    votes: number
    createdAt: timestamp

votes/
  {voteId}/
    userId: string
    jellyId: string
    timestamp: timestamp

orders/
  {orderId}/
    userId: string
    jellyId: string
    jellyName: string
    price: number
    quantity: number
    paymentStatus: "pending" | "paid" | "failed"
    createdAt: timestamp
```

## ✅ 7단계: 설정 확인

설정이 완료되면 다음을 확인하세요:

1. ✅ `.env` 파일이 생성되고 Firebase 키가 입력됨
2. ✅ Firebase Authentication에서 이메일/비밀번호 활성화됨
3. ✅ Firestore Database가 생성됨
4. ✅ 개발 서버 재시작 (`npm start`)

## 🚀 8단계: 테스트

1. 브라우저에서 `http://localhost:3003/haribo/signup` 접속
2. 회원가입 진행
3. Firebase Console > Authentication에서 유저 생성 확인
4. Firestore Database > users 컬렉션에서 유저 정보 확인

---

## 🔧 문제 해결

### Q: Firebase 에러: "Firebase: Error (auth/invalid-api-key)"
**A:** `.env` 파일의 API 키를 다시 확인하세요. `REACT_APP_` 접두사가 있어야 합니다.

### Q: 환경 변수가 적용되지 않아요
**A:** 개발 서버를 재시작하세요 (`npm start`). `.env` 파일 변경 사항은 재시작 후 적용됩니다.

### Q: Firestore 읽기/쓰기 권한 에러
**A:** Firestore 보안 규칙을 테스트 모드로 설정했는지 확인하세요.

---

## 📚 다음 단계

- [ ] Stripe 결제 연동
- [ ] 소셜 로그인 (Google, 카카오)
- [ ] 이메일 인증
- [ ] 비밀번호 재설정

## 🆘 도움이 필요하신가요?

Firebase 공식 문서: https://firebase.google.com/docs



