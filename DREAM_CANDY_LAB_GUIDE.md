# 🍬 Dream Candy Lab - 완성 가이드

## 프로젝트 개요

**Dream Candy Lab**은 하리보 젤리 실험실 컨셉의 웹사이트입니다. 
말랑말랑하고 몽글몽글한 젤리들이 연구하는 달콤한 실험실을 표현했습니다.

---

## ✨ 주요 특징

### 🎨 디자인 시스템
- **컬러**: 젤리 옐로우, 핑크, 민트, 라벤더
- **폰트**: Gmarket Sans (타이틀), Pretendard (본문), Bebas Neue (숫자)
- **모션**: GSAP + Framer Motion을 활용한 부드러운 애니메이션
- **스타일**: 둥근 엣지, 유리 효과, 부유 애니메이션

### 🧪 주요 섹션

1. **Hero Section** - 젤리들이 둥둥 떠다니는 웰컴 화면
2. **About Section** - 4명의 젤리 캐릭터 소개
3. **Product Section** - 젤리 제품 카드 & 필터링
4. **Event Section** - 시즌 한정 이벤트
5. **Footer** - 팀원 소개 & 링크

---

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ui/                 # UI 컴포넌트
│   │   ├── Button.tsx      # 젤리 버튼
│   │   ├── Card.tsx        # 유리 카드
│   │   ├── Chip.tsx        # 태그 칩
│   │   └── Tooltip.tsx     # 툴팁
│   ├── motion/             # 애니메이션 컴포넌트
│   │   ├── JellyFloat.tsx  # 부유 애니메이션
│   │   ├── JellyBounce.tsx # 바운스 애니메이션
│   │   ├── BubbleEffect.tsx # 버블 효과
│   │   └── ParticleSparkle.tsx # 반짝임 효과
│   └── layout/             # 레이아웃 컴포넌트
│       ├── Header.tsx      # 헤더
│       ├── Footer.tsx      # 푸터
│       └── Container.tsx   # 컨테이너
├── sections/               # 페이지 섹션
│   ├── HeroSection.tsx     # 히어로 섹션
│   ├── AboutSection.tsx    # 어바웃 섹션
│   ├── ProductSection.tsx  # 제품 섹션
│   └── EventSection.tsx    # 이벤트 섹션
├── data/                   # 데이터
│   ├── characters.ts       # 캐릭터 데이터
│   ├── events.ts           # 이벤트 데이터
│   └── jellyProducts.ts    # 제품 데이터
├── types/                  # 타입 정의
│   └── jellyProduct.ts     # 제품 타입
├── styles/                 # 스타일
│   └── jelly-theme.css     # 젤리 테마 CSS
└── pages/
    └── Home.tsx            # 메인 페이지
```

---

## 🚀 시작하기

### 1. 의존성 설치
모든 패키지가 이미 설치되어 있습니다 (GSAP, Framer Motion, Tailwind 등).

### 2. 개발 서버 실행
\`\`\`bash
npm start
\`\`\`

브라우저에서 `http://localhost:3004` 열기

### 3. 빌드
\`\`\`bash
npm run build
\`\`\`

---

## 🎨 커스터마이징

### 색상 변경
`tailwind.config.js` 또는 `src/styles/jelly-theme.css`에서 색상 변경:

\`\`\`css
:root {
  --jelly-yellow: #FFD100;
  --jelly-pink: #FF6F91;
  --jelly-mint: #BFFFC8;
  --jelly-lavender: #D0C3FF;
}
\`\`\`

### 제품 추가
`src/data/jellyProducts.ts`에 새 제품 추가:

\`\`\`typescript
{
  id: 'jelly-009',
  name: '블루베리 버스트',
  flavor: 'blueberry',
  color: 'lavender',
  description: '터질듯한 블루베리 향!',
  price: 4500,
  // ...
}
\`\`\`

### 캐릭터 수정
`src/data/characters.ts`에서 캐릭터 정보 변경

---

## 🖼️ 이미지 추가하기

현재는 이모지로 대체되어 있지만, 실제 이미지를 추가하려면:

1. **이미지 준비**: `public/assets/images/` 폴더에 이미지 저장
2. **코드 수정**: 각 섹션에서 이모지를 이미지 경로로 변경

예시 (HeroSection.tsx):
\`\`\`tsx
// Before (이모지)
<FloatingEmoji emoji="🍓" />

// After (이미지)
<JellyFloat src="/assets/images/jelly-strawberry.png" />
\`\`\`

---

## 🧪 캐릭터 소개

### 🧸 Dr. Jellybear
- **역할**: 연구소장
- **특징**: 실험노트를 들고 다니는 귀여운 곰돌이

### 🍓 Strawbi
- **역할**: 어시스턴트
- **특징**: 통통 튀는 말투의 딸기맛 젤리

### 🍋 Lemmi
- **역할**: 엔지니어
- **특징**: 기계를 조작하는 레몬맛 젤리

### 🍏 Minty
- **역할**: 디자이너
- **특징**: 색과 향을 연구하는 민트맛 젤리

---

## 💡 애니메이션 효과

### 부유 효과 (Float)
GSAP을 사용한 sin/cos 기반 자연스러운 부유

### 바운스 효과 (Bounce)
Framer Motion의 spring transition

### 버블 효과 (Bubble)
아래에서 위로 올라가는 투명 버블 애니메이션

### 반짝임 효과 (Sparkle)
랜덤 위치에 나타나는 작은 파티클

---

## 🎯 주요 기능

- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ 부드러운 스크롤 애니메이션
- ✅ 제품 필터링 (맛별)
- ✅ Hover 인터랙션
- ✅ 유리 효과 (Glassmorphism)
- ✅ 그라데이션 버튼
- ✅ 스크롤 인디케이터

---

## 🔧 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Framer Motion** - UI 애니메이션
- **GSAP** - 고급 애니메이션
- **Zustand** - 상태 관리 (선택사항)

---

## 📝 다음 단계

### 추가할 수 있는 기능들:

1. **장바구니 기능** - Zustand로 상태 관리
2. **제품 상세 모달** - 클릭 시 상세 정보
3. **검색 기능** - 제품명으로 검색
4. **정렬 기능** - 가격순, 인기순
5. **다크 모드** - 밤에도 달콤하게
6. **사운드 효과** - 클릭 시 젤리 소리
7. **로딩 애니메이션** - 젤리가 차오르는 효과
8. **스크롤 진행 바** - 상단에 표시

---

## 🎉 완성!

Dream Candy Lab 웹사이트가 준비되었습니다!
달콤하고 귀여운 젤리 세계를 즐겨보세요 🍬✨

---

## 📞 문의

프로젝트 관련 문의나 개선 아이디어가 있다면 이슈를 남겨주세요!

**Made with 💕 by Dream Candy Lab Team**







