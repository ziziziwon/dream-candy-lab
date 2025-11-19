# 🎨 Dream Candy Lab - 리디자인 가이드

## 핵심 철학: "밝고 역동적인 균형 불균형"

이전 포트폴리오의 **"정적 미학"**에서 **"역동적 리듬감"**으로 완전히 전환

---

## 🔄 변화의 핵심

| 항목 | 기존 | 새 방향 |
|------|------|---------|
| **무드 톤** | 감성적, 파스텔 베이지 | 밝은 크림톤 + 네온 민트 + 따뜻한 핑크 |
| **광원** | 중앙 빛, 은은한 확산광 | 측면 스팟 + 반사광 + 배경 라이트 그라데이션 |
| **구도 리듬** | 중앙정렬, 안정형 | 비대칭, 사선 흐름 (젤리들이 '쏟아지는' 느낌) |
| **모션** | 느린 fade + scroll reveal | 탄성 + bounce + delay offset (리듬감 강조) |
| **타이포그래피 리듬** | 일직선 정렬 | 곡선 baseline, SVG path text |

---

## 🎨 New Candy Harmony - 색상 구조

### 배경 색상
```css
--lab-cream: #FFF7F0          /* 따뜻한 크림톤 */
--lab-cream-gradient-1: #FEE2E2  /* 핑크 그라데이션 */
--lab-cream-gradient-2: #F8F0FF  /* 라벤더 그라데이션 */
```

### 메인 컬러 (더 밝고 활력있게)
```css
--jelly-pink: #FF7CA8          /* 중심 포인트 */
--jelly-mint: #A8E6CF          /* 보조 포인트 */
--jelly-yellow: #FFD166        /* 하리보 옐로 */
```

### 조명 효과
```css
--glow-pink: rgba(255, 120, 200, 0.4)
--glow-mint: rgba(168, 230, 207, 0.3)
--glow-yellow: rgba(255, 209, 102, 0.35)
```

**조명 방향**: 왼쪽 상단 → 오른쪽 하단
**반사광**: 젤리가 "빛을 받는 생명체"처럼 표현

---

## 🏗️ HeroSection - 새 구도 설계

### 구성
```
좌측 상단: 실험 플라스크 + 작은 젤리 버블들이 떠다님
중앙: 타이틀 텍스트 "Dream Candy Lab" — 곡선 형태 (SVG Path Text)
우측 하단: 젤리들이 모여서 작은 실험 장치 작동 중
배경 조명: radial-gradient(circle at 30% 40%, #fff4f8 0%, transparent 70%)
```

### 비대칭 구도의 목적
- 중앙이 아니라, 시선을 살짝 우하단으로 끌어내림
- **"포근한데 역동적"**이란 인상

---

## 🎞️ 모션 리듬 디자인

### 타이밍 시스템
| 요소 | 타이밍 | 효과 |
|------|--------|------|
| **Hero 타이틀** | delay 0.2s, spring(70, 12) | 단단한 젤리 bounce |
| **버튼 hover** | scale 1 → 1.08 → 1.05, 0.3s | 눌렀다 돌아오는 촉감 |
| **배경 젤리** | y축 float + x축 sway | 공기 속 젤리 부유감 |
| **Lab Section** | staggered 0.1s 간격 | 연구소 질서감 |
| **ScrollTrigger** | section 간 tone shift | 실험실 온도 변화 |

### 애니메이션 종류
```css
@keyframes float {
  /* y축 + x축 동시 움직임 */
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-15px) translateX(5px); }
  66% { transform: translateY(-25px) translateX(-5px); }
}

@keyframes jelly-bounce {
  /* 젤리 촉감 */
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.08, 0.92) rotate(2deg); }
  50% { transform: scale(0.92, 1.08) rotate(-2deg); }
  75% { transform: scale(1.05, 0.95) rotate(1deg); }
  100% { transform: scale(1) rotate(0deg); }
}

@keyframes diagonal-drift {
  /* 사선 흐름 */
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(30px, 20px) rotate(5deg); }
}
```

---

## 📐 타이포그래피 리듬

### SVG Path Text (곡선 타이틀)
```tsx
<svg viewBox="0 0 800 150">
  <path id="wave" d="M 50,80 Q 200,40 400,80 T 750,80" />
  <text fontFamily="TmoneyRoundWind" fontSize="48">
    <textPath href="#wave">
      Dream Candy Lab
    </textPath>
  </text>
</svg>
```

### Baseline 리듬
- 기존: 일직선 정렬
- 새 버전: 곡선/사선/불규칙 baseline
- 효과: "아, 이번 건 다르다"는 시각적 기억

---

## 🌊 페이지 리듬 흐름 (Scene Structure)

각 섹션은 **"젤리들이 움직이는 리듬"**이 달라야 함
→ 섹션별로 다른 BPM의 음악처럼 구성

### Hero Section
- **리듬**: Allegro (빠르고 활기차게)
- **특징**: 부유 / 반사 / 곡선 텍스트
- **배경**: 왼쪽 상단 스팟 라이트

### About Section
- **리듬**: Moderato (중간 템포)
- **특징**: 캐릭터 실험 동선 (좌우 스플릿)
- **배경**: 크림 → 민트 그라데이션

### Product Section
- **리듬**: Vivace (생기있게)
- **특징**: 카드가 리듬감 있게 튀어나옴 (offset grid)
- **배경**: 핑크 → 옐로 그라데이션

### Lab Section
- **리듬**: Andante (느리고 평온하게)
- **특징**: 색상 온도 변화 (pink → mint gradient)
- **배경**: 실험실 조명 효과

### CTA Section
- **리듬**: Forte (강하게)
- **특징**: 중앙 하이라이트 빛 강조
- **배경**: 집중된 스팟 라이트

### Footer
- **리듬**: Adagio (매우 느리게)
- **특징**: 낮은 톤으로 안정감
- **배경**: cream + choco

---

## 💫 인터랙션 디테일

### 버튼 효과
```tsx
<motion.button
  whileHover={{ 
    scale: [1, 1.08, 1.05]  // 젤리 촉감
  }}
  style={{
    boxShadow: '0 8px 20px rgba(255, 124, 168, 0.3)'
  }}
>
  {/* 반짝이는 하이라이트 */}
  <motion.div
    className="highlight"
    initial={{ x: '-100%' }}
    whileHover={{ x: '100%' }}
  />
</motion.button>
```

### 젤리 반사광
```tsx
<motion.div
  animate={{
    filter: [
      'drop-shadow(0 0 8px rgba(255, 124, 168, 0.3))',
      'drop-shadow(0 0 16px rgba(255, 124, 168, 0.5))',
      'drop-shadow(0 0 8px rgba(255, 124, 168, 0.3))',
    ],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
>
  🍓
</motion.div>
```

---

## 🎯 디자인 감정 밸런스

| 축 | 기존 | 새 방향 |
|----|------|---------|
| **감성** | 따뜻함 100% | 따뜻함 70% + 실험적 30% |
| **조명** | 균등광 | 포인트광 + 명암 대비 |
| **리듬** | 느림 | 미묘한 템포 변화 |
| **여백** | 안정 | 여백에 움직임 (floating, micro motion) |

---

## 🧪 구현된 주요 컴포넌트

### 1. CurvedText.tsx
곡선 형태의 SVG Path Text 컴포넌트

### 2. FloatingLab.tsx
실험실 장비 부유 애니메이션 (플라스크, 비커)

### 3. DiagonalFloatingEmoji
사선 흐름 + sway 조합의 젤리 애니메이션

### 4. Enhanced Button
- 젤리 촉감 bounce
- 반짝이는 하이라이트 효과
- 강화된 glow 효과

---

## ✨ 핵심 메시지

**"Dream Candy Lab은 이전의 세계를 해체하고 다시 조합한 실험이다."**

달콤함은 그대로 두되, 리듬·조명·곡선을 변형시켜
완전히 새로운 **디자인의 '박자감'**을 만드는 것이 핵심.

---

## 🎵 리듬 비유

```
기존: 느린 발라드 (정적, 감성적)
새로운: 경쾌한 팝 음악 (역동적, 리듬감)
```

하지만 여전히 **"달콤함"**이라는 멜로디는 유지.

---

**Made with 💕 by Dream Candy Lab Design Team**
*"질서 속 자유로운 젤리들"*






