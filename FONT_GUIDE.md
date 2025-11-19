# 🍬 Dream Candy Lab - 폰트 가이드

## 폰트 시스템 철학

**"폭닥하지만 가볍지 않은 톤"** + **"하리보 팝컬러와 어울리는 둥근 폼"** + **"쿠키런식 귀여움 + 브랜드감"**

---

## 📚 폰트 계층 구조

### 1️⃣ Logo / Main Title
**`font-logo`** - TmoneyRoundWind + PyeongChang
- **용도**: 브랜드 로고, 메인 타이틀
- **특징**: 하리보 로고와 가장 유사한 톤, 부드러운 공기감
- **예시**: "Dream Candy Lab"

```tsx
<h1 className="font-logo text-6xl">Dream Candy Lab</h1>
```

---

### 2️⃣ Section Title / Button
**`font-title`** - PyeongChang + BMJua
- **용도**: 섹션 제목, 버튼 텍스트
- **특징**: 말랑한 젤리감, 폭닥하면서도 브랜드 고급스러움
- **예시**: "🧪 연구소 팀원들"

```tsx
<h2 className="font-title text-4xl">🧪 연구소 팀원들</h2>
<button className="font-title">달콤한 실험 시작</button>
```

---

### 3️⃣ Body Text
**`font-body`** - Pretendard
- **용도**: 본문, 설명 텍스트
- **특징**: 깨끗하고 가독성 좋음, 정제된 단정함
- **예시**: 제품 설명, 캐릭터 소개

```tsx
<p className="font-body text-base">
  달콤한 실험이 시작되는 곳, 젤리들의 작은 연구소
</p>
```

---

### 4️⃣ Sub Label / Chip
**`font-label`** - Cafe24Ssurround + Pretendard
- **용도**: 태그, 칩, 작은 라벨
- **특징**: 공기감 있는 산뜻함, 쿠키런 스타일 라운드
- **예시**: "베스트셀러", "진행중"

```tsx
<span className="font-label px-3 py-1 rounded-full">
  베스트셀러
</span>
```

---

### 5️⃣ English Text
**`font-eng`** - Fredoka One + Baloo 2
- **용도**: 영어 로고, 강조 단어
- **특징**: 젤리같은 둥근 볼드체
- **예시**: "Welcome", "Dream", "Candy"

```tsx
<span className="font-eng text-4xl">Welcome to the</span>
```

---

### 6️⃣ Numbers / Data
**`font-number`** - Bebas Neue
- **용도**: 가격, 수량, 통계
- **특징**: 직선형 모던, 실험실 느낌
- **예시**: 가격 표시, 데이터 시각화

```tsx
<span className="font-number text-3xl">₩4,500</span>
```

---

## 🎨 실전 조합 예시

### Hero Section
```tsx
<h1 className="font-logo text-7xl">
  <span className="font-eng text-5xl">Welcome to the</span>
  Dream Candy Lab
</h1>
<p className="font-label text-xl">
  달콤한 실험이 시작되는 곳
</p>
```

### Product Card
```tsx
<div>
  <h3 className="font-title text-2xl">하트베리 젤리</h3>
  <span className="font-label text-sm">베스트셀러</span>
  <p className="font-body text-base">딸기의 달콤함이 가득...</p>
  <span className="font-number text-3xl">₩4,500</span>
</div>
```

### Character Card
```tsx
<div>
  <h3 className="font-title text-xl">Dr. Jellybear</h3>
  <span className="font-label text-sm">연구소장</span>
  <p className="font-body text-sm">귀여운 곰돌이 연구소장...</p>
</div>
```

---

## 📐 폰트 크기 가이드

| 용도 | 크기 | 폰트 |
|------|------|------|
| 메인 타이틀 | 56-72px | font-logo |
| 섹션 헤더 | 36-48px | font-title |
| 카드 제목 | 20-24px | font-title |
| 본문 | 16-18px | font-body |
| 서브텍스트 | 12-14px | font-label |
| 가격/숫자 | 24-32px | font-number |

---

## 🌈 폰트 Weight 가이드

### TmoneyRoundWind
- **ExtraBold (800)**: 로고 전용

### PyeongChang
- **Bold (700)**: 모든 제목

### Pretendard
- **Regular (400)**: 기본 본문
- **Medium (500)**: 강조 텍스트
- **Bold (700)**: 중요 정보

### Cafe24Ssurround
- **Regular**: 모든 라벨

### Fredoka One
- **Regular (400)**: 영어 강조

### Bebas Neue
- **Bold (700)**: 모든 숫자

---

## 💡 폰트 믹싱 팁

### ✅ 좋은 조합
```tsx
// 한글 + 영어 믹스
<h1>
  <span className="font-eng">Dream</span>
  <span className="font-logo">Candy Lab</span>
</h1>

// 제목 + 라벨
<div>
  <h2 className="font-title">하트베리 젤리</h2>
  <span className="font-label">신제품</span>
</div>
```

### ❌ 피해야 할 조합
```tsx
// 너무 많은 폰트 혼용 (한 컴포넌트에 3개 이상)
<div>
  <h2 className="font-logo">...</h2>
  <p className="font-title">...</p>
  <span className="font-eng">...</span>
</div>
```

---

## 🔧 커스터마이징

### 새 폰트 추가
`src/index.css`에 추가:

```css
@font-face {
  font-family: 'NewFont';
  src: url('...') format('woff');
  font-weight: 400;
}
```

`tailwind.config.js`에 등록:

```js
fontFamily: {
  custom: ['NewFont', 'sans-serif'],
}
```

---

## 📱 반응형 폰트 크기

```tsx
// 모바일: text-4xl, 데스크톱: text-7xl
<h1 className="font-logo text-4xl md:text-7xl">
  Dream Candy Lab
</h1>

// 본문: 모바일 14px, 데스크톱 16px
<p className="font-body text-sm md:text-base">
  달콤한 실험...
</p>
```

---

## 🎯 폰트 로딩 최적화

모든 폰트는 CDN을 통해 로드되며, 필요한 weight만 선택적으로 로드합니다:

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fredoka+One&family=Baloo+2:wght@400;600;800&display=swap');

/* 한글 폰트 (jsDelivr) */
@import url('https://fastly.jsdelivr.net/gh/...');
```

---

## ✨ 완성된 폰트 시스템

Dream Candy Lab의 폰트 시스템은:
- 🍬 **하리보의 팝컬러**와 조화
- 🎮 **쿠키런의 귀여움**과 감성
- 🧪 **실험실의 브랜드감**과 고급스러움

이 세 가지를 완벽하게 표현합니다!

---

**Made with 💕 by Dream Candy Lab Design Team**







