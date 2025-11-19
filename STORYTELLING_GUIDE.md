# 🎬 Dream Candy Lab - 스토리텔링 가이드

## 전체 컨셉

**"달콤함의 완벽함을 추구하던 젤리 연구소에서, 실험 하나가 균형을 무너뜨렸다. 그리고 그곳에서 '다크 젤리'가 태어났다."**

메인 페이지를 단순 홍보 페이지가 아닌, **감정 곡선이 있는 단편 영화**처럼 구성.

---

## 🎞️ 7개 씬 구조

| 씬 | 이름 | 감정 | 시각 | 음악 | 조명 |
|----|------|------|------|------|------|
| **Scene 1** | Awakening | 순수/안정 | 크림톤, 반짝이는 젤리 | 밝은 신시사이저 | 부드러운 white light |
| **Scene 2** | Discovery | 호기심/흥분 | 비커, 버블 | 뽁뽁 젤리소리 | 반사광 |
| **Scene 3** | Failure | 긴장/붕괴 | 어두워짐, 깜빡임 | 기계음 섞임 | 조명 깜빡임 |
| **Scene 4** | Dark Jelly | 놀람/신비/이질감 | gummy3.usdz, 퍼플빛 | 저음 bass hit | 아래→위 스팟 |
| **Scene 5** | Silence | 평온/반성 | 어둠 속 빛 한줄기 | 무음 | 스팟라이트 1개 |
| **Scene 6** | Rebalance | 희망/재건 | 밝은 톤 복귀 | 하프톤 회복 | 따뜻한 조명 |
| **Scene 7** | CTA | 기대 | CTA 버튼 | 잔잔한 bgm | 중앙 spotlight |

---

## 📈 감정 곡선 (Emotional Curve)

```
달콤함 ↑
호기심 ↑↑
긴장 ↓↓
공포/놀람 ↓↓↓  ← 클라이맥스 (Dark Jelly)
여운 ↑
회복 ↑↑
희망 ↑↑↑
```

**"감정의 골짜기"**를 만들어 시각적 여운을 주는 구조.

---

## 🎨 씬별 세부 설계

### Scene 1: Awakening (달콤한 아침)
**감정**: 순수, 안정
**배경**: `#FFF7F0` (크림톤)
**요소**:
- 곡선 타이틀 (SVG Path)
- 부유하는 젤리 이모지
- 버블 효과
**내레이션**: "세상에서 가장 달콤한 실험이 시작되었습니다."
**구현**: `HeroSection.tsx`

---

### Scene 2: Discovery (새로운 실험)
**감정**: 호기심, 흥분
**배경**: `lab-cream → jelly-mint/10`
**요소**:
- 실험 비커 애니메이션 (🧪 ⚗️ 🧫)
- 위아래 bounce 모션
**내레이션**: "젤리들은 더 완벽한 맛을 만들고자 했어요."
**기술**: Framer Motion bounce

---

### Scene 3: Failure (달콤함의 균열)
**감정**: 긴장, 붕괴
**배경**: `jelly-mint/10 → jelly-red/20`
**요소**:
- 경고 타이틀 (⚠️)
- 깜빡이는 번개 (⚡)
- 빨간 텍스트 그림자
**내레이션**: "하지만 달콤함에는 균형이 필요했죠..."
**기술**: GSAP 색상 전환 + textShadow 애니메이션

---

### Scene 4: Dark Jelly (다크 하리보의 탄생) 🌟
**감정**: 놀람, 신비, 이질감
**배경**: `radial-gradient(#2B1E34 → #0B0612)`
**요소**:
- 3D 다크 젤리 모델 (회전 + 부유)
- 보라빛 조명
- 글로우 텍스트
**내레이션**: "Not all sweetness stays sweet…"
**기술**: 
- React Three Fiber
- GSAP 배경 전환
- Custom dodecahedron mesh

```tsx
<mesh>
  <dodecahedronGeometry args={[0.8, 0]} />
  <meshPhysicalMaterial
    color="#2B1E34"
    emissive="#8B5CF6"
    metalness={0.8}
    clearcoat={1}
  />
</mesh>
```

---

### Scene 5: Silence (실험의 여운)
**감정**: 평온, 반성
**배경**: `#0B0612 → #1a1a2e`
**요소**:
- 점 3개 (...) 펄스
- 희미한 텍스트
**내레이션**: "실험은 멈췄지만, 그 존재는 사라지지 않았어요."
**기술**: opacity pulse

---

### Scene 6: Rebalance (달콤함의 회복)
**감정**: 희망, 재건
**배경**: `#1a1a2e → jelly-lavender/20 → lab-cream`
**요소**:
- 젤리 이모지들이 다시 등장 (🍓🍋🍏🍇)
- Spring bounce animation
**내레이션**: "빛과 어둠이 섞인 새로운 맛이 태어났습니다."
**기술**: Framer Motion spring

---

### Scene 7: CTA (Join the Next Experiment)
**감정**: 기대, 참여 유도
**배경**: `lab-cream → white`
**요소**:
- 2개 CTA 버튼
  - "실험실 둘러보기 🧪" → `/lab`
  - "제품 보러가기 🍬" → `/product`
- 글로우 타이틀
**내레이션**: "다음 실험에 참여하시겠어요?"

---

## 🔧 기술 스택

### 애니메이션
- **Framer Motion**: 씬 진입, 요소 애니메이션
- **GSAP ScrollTrigger**: 섹션 전환, 색상 변화
- **React Three Fiber**: 3D 다크 젤리

### 조명 시스템
```tsx
// 다크 씬 조명
<ambientLight intensity={0.2} />
<directionalLight color="#FFD1E1" intensity={2.5} />
<pointLight position={[0, -1, 2]} color="#B794F6" intensity={1} />
```

### 색상 전환
```tsx
gsap.to(bgRef.current, {
  background: "radial-gradient(...)",
  duration: 2,
  ease: "power2.inOut",
});
```

---

## 🎭 모드 전환 기능

### Story Mode (기본)
7개 씬으로 구성된 스토리텔링

### Standard Mode (옵션)
기존 섹션 기반 (About + Product + Event)

```tsx
// 우측 상단 토글 버튼
<button onClick={toggleMode}>
  {viewMode === 'story' ? '📖 Story Mode' : '📄 Standard Mode'}
</button>
```

---

## 📱 반응형 고려사항

### 모바일
- 텍스트 크기: `text-4xl` → `text-2xl`
- 3D 모델 크기: `scale={0.6}`
- 세로 스크롤 최적화

### 데스크톱
- 전체 화면 활용
- 3D 인터랙션 강화
- OrbitControls 활성화

---

## 🎵 사운드 가이드 (미래 확장)

### Scene별 사운드
| 씬 | 사운드 |
|----|--------|
| Awakening | 밝은 벨 소리 |
| Discovery | 실험 비커 소리 |
| Failure | 경고음 |
| Dark Jelly | 저음 드론 |
| Silence | 무음 |
| Rebalance | 하프 아르페지오 |
| CTA | 업리프팅 멜로디 |

### 구현 (Tone.js)
```tsx
import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();
synth.triggerAttackRelease("C4", "8n");
```

---

## 🔗 페이지 연결

### 스토리텔링 후 이동
- **Lab** → "당신도 이 실험의 일원이 될 수 있습니다."
- **Product** → "다크젤리 이후, 새로운 맛들을 실험하고 있습니다."
- **About** → "우리가 왜 이 실험을 시작했는지, 이야기해볼게요."

---

## 📊 성능 최적화

### 3D 모델
- Suspense로 lazy load
- Placeholder 제공
- Preload 활용

```tsx
<Suspense fallback={<DarkJellyPlaceholder />}>
  <DarkJellyModel />
</Suspense>
```

### ScrollTrigger
```tsx
useEffect(() => {
  // Cleanup on unmount
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

---

## 🎯 사용자 경험

### 스크롤 가이드
- Scene 1: 자동 스크롤 인디케이터
- Scene 4: 다크 씬에서 잠시 머무름 유도
- Scene 7: 명확한 CTA

### 인터랙션
- 3D 모델: 마우스 드래그로 회전
- 텍스트: Viewport 진입 시 애니메이션
- 버튼: Hover/Tap 피드백

---

## ✨ 완성도

```
스토리텔링:    ████████████ 100%
감정 곡선:      ████████████ 100%
기술 구현:      ██████████░░  85%
3D 모델:        ████████░░░░  70% (실제 gummy3.glb 필요)
사운드:         ░░░░░░░░░░░░   0% (미래 확장)
```

---

## 🚀 다음 단계

1. ✅ 7개 씬 구조 완성
2. ✅ DarkScene 3D 구현
3. ✅ ScrollTrigger 전환
4. ⏳ 실제 gummy3.glb 모델 로드
5. ⏳ 사운드 시스템 추가
6. ⏳ 모바일 최적화

---

**Made with 💕 by Dream Candy Lab**
*"감정 곡선이 있는 브랜드 스토리텔링"*






