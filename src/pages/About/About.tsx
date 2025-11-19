import React from "react";
import { motion } from "framer-motion";
import Container from "../../components/layout/Container";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-b from-jelly-pink/10 to-lab-cream py-20 mb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-logo text-text-choco mb-6">
              💭 About Dream Candy Lab
            </h1>
            <p className="text-xl text-text-rosegray font-label max-w-3xl mx-auto leading-relaxed">
              우리는 달콤함을 연구하는 작은 실험실입니다.<br />
              실패해도 괜찮아요. 실험의 실패가 달콤함을 완성한다고 믿습니다.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container>
        {/* 철학 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-title text-text-choco text-center mb-12">
            🧪 우리의 철학
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {philosophies.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center p-6 bg-white/50 rounded-lab"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-title text-xl text-text-choco mb-3">
                  {item.title}
                </h3>
                <p className="text-text-rosegray font-body text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 미션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-jelly-yellow/20 to-jelly-pink/20 rounded-lab p-12 mb-20"
        >
          <h2 className="text-4xl font-title text-text-choco mb-6">
            Our Mission
          </h2>
          <p className="text-2xl text-text-choco font-label max-w-3xl mx-auto leading-relaxed">
            "세상의 모든 사람들에게<br />
            <span className="text-jelly-pink font-title">달콤한 행복</span>을 전하는 것"
          </p>
        </motion.div>

        {/* 비하인드 신 - 포트폴리오 제작 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-5xl md:text-6xl font-logo text-text-choco mb-6"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 124, 168, 0.2)',
                  '0 0 30px rgba(255, 124, 168, 0.4)',
                  '0 0 20px rgba(255, 124, 168, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎬 Behind the Scenes
            </motion.h2>
            <div className="w-32 h-1 bg-gradient-to-r from-jelly-yellow via-jelly-pink to-jelly-lavender mx-auto rounded-full mb-6" />
            <p className="text-xl text-text-rosegray font-body max-w-3xl mx-auto leading-relaxed">
              Dream Candy Lab이 <span className="text-jelly-pink font-title">탄생한 과정</span>을<br />
              11단계의 여정으로 소개합니다 ✨
            </p>
          </div>

          {/* 제작 과정 타임라인 */}
          <div className="space-y-12 mb-16">
            {behindScenes.map((scene, index) => (
              <motion.div
                key={scene.phase}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                className="relative"
              >
                <div className={`flex flex-col lg:flex-row gap-8 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* 단계 번호 & 아이콘 */}
                  <div className="flex-shrink-0 lg:w-32 flex lg:flex-col items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${scene.gradient} flex items-center justify-center text-white font-title text-3xl shadow-xl`}
                    >
                      {index + 1}
                    </motion.div>
                    <div className="text-6xl lg:mt-4">{scene.icon}</div>
                  </div>

                  {/* 내용 */}
                  <motion.div 
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(255, 124, 168, 0.3)" }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-white/50"
                  >
                    {/* 제목 */}
                    <h3 className="font-title text-3xl lg:text-4xl text-text-choco mb-6 flex items-center gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-jelly-yellow to-jelly-pink animate-pulse" />
                      {scene.phase}
                    </h3>
                    
                    {/* 설명 */}
                    <div className="mb-6 space-y-4">
                      {scene.description.split('. ').filter(s => s.trim()).map((sentence, i) => (
                        <p key={i} className="text-text-rosegray font-body text-base lg:text-lg leading-relaxed pl-4 border-l-2 border-jelly-pink/30">
                          {sentence.trim()}{sentence.includes('.') ? '' : '.'}
                        </p>
                      ))}
                    </div>
                    
                    {/* 태그 */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                      {scene.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-4 py-2 bg-gradient-to-r from-jelly-mint/30 to-jelly-lavender/30 rounded-full text-sm font-label text-text-choco border-2 border-jelly-mint/40 shadow-sm hover:shadow-md transition-shadow"
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* 연결선 (마지막 제외) */}
                {index < behindScenes.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="hidden lg:block absolute left-10 top-24 w-0.5 h-12 bg-gradient-to-b from-jelly-pink/50 to-transparent"
                    style={{ originY: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* 기술 스택 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-jelly-lavender/20 via-white/60 to-jelly-mint/20 rounded-3xl p-10 lg:p-16 shadow-2xl border border-white/50"
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl lg:text-5xl font-logo text-text-choco mb-4">
                🛠️ Tech Stack
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-jelly-mint to-jelly-lavender mx-auto rounded-full" />
              <p className="text-text-rosegray font-body mt-4">
                프로젝트를 완성하기 위해 사용된 기술들
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.08, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(255, 124, 168, 0.3)',
                    transition: { duration: 0.2 }
                  }}
                  className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:border-jelly-pink/30 transition-all"
                >
                  <motion.div 
                    className="text-5xl lg:text-6xl mb-4"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {tech.icon}
                  </motion.div>
                  <p className="font-title text-base lg:text-lg text-text-choco mb-2">
                    {tech.name}
                  </p>
                  <p className="text-xs lg:text-sm text-text-rosegray font-body">
                    {tech.purpose}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

const philosophies = [
  {
    icon: '🌈',
    title: '다양성',
    description: '모든 맛과 색깔은 소중해요. 우리는 다양한 조합을 존중합니다.',
  },
  {
    icon: '🧪',
    title: '실험정신',
    description: '실패를 두려워하지 않아요. 매일매일 새로운 시도를 합니다.',
  },
  {
    icon: '💕',
    title: '사랑',
    description: '모든 젤리에는 우리의 정성과 사랑이 담겨 있습니다.',
  },
];

const behindScenes = [
  {
    phase: '컨셉 기획 & 리서치',
    icon: '💡',
    description: '하리보 젤리의 생생한 컬러감과 쿠키런 월드의 귀여운 UI 감성을 분석했습니다. "말랑말랑", "몽글몽글", "반짝반짝"이라는 3가지 키워드를 중심으로 브랜드 아이덴티티를 정립했죠. 기존 e-커머스와 차별화하기 위해 "실험실"이라는 스토리텔링 컨셉을 도입했고, 사용자가 단순히 쇼핑하는 것이 아니라 달콤한 실험에 참여한다는 몰입형 경험을 설계했습니다. Pinterest, Dribbble에서 200여 개의 캔디 브랜드 레퍼런스를 수집하고, Cookie Run Kingdom 앱을 실제로 플레이하며 UX 패턴을 연구했습니다.',
    tags: ['브랜딩 전략', '컨셉 디자인', 'UI/UX 리서치', '경쟁사 분석'],
    gradient: 'from-jelly-yellow to-jelly-orange',
  },
  {
    phase: '디자인 시스템 & 컴포넌트 설계',
    icon: '🎨',
    description: '"New Candy Harmony" 컬러 팔레트를 직접 제작했습니다. 기존 하리보 컬러(#FFD100)를 베이스로 밝은 톤의 jelly-yellow(#FFD166), jelly-pink(#FF7CA8), jelly-mint(#A8E6CF) 등 6가지 메인 컬러와 3가지 크림 톤 배경색을 정의했어요. Tailwind CSS를 확장해 rounded-jelly(32px), rounded-lab(24px) 등 커스텀 border-radius와 shadow-jelly 효과를 구현했습니다. 한글 폰트는 TmoneyRoundWind, PyeongChang, BMJua를 조합하고, 영문은 Fredoka One과 Baloo 2로 통일했습니다. 총 25개의 재사용 가능한 컴포넌트(Button, Chip, Card 등)를 TypeScript로 타입 안전하게 구축했습니다.',
    tags: ['Tailwind Config', '컬러 시스템', '타이포그래피', 'Component Library', 'Design Tokens'],
    gradient: 'from-jelly-pink to-jelly-lavender',
  },
  {
    phase: '3D 모델링 & WebGL 최적화',
    icon: '🍬',
    description: 'Blender로 제작된 8.5MB 크기의 gummy3.glb 3D 젤리 모델을 최적화하여 웹에 적용했습니다. React Three Fiber + drei 라이브러리로 Canvas를 구성하고, useGLTF 훅으로 모델을 로드했어요. useFrame을 활용해 60fps의 부드러운 회전(rotation.y), 사인파 기반 부유 애니메이션(position.y)을 구현했습니다. DarkScene에서는 PerspectiveCamera 위치를 [0, 0, 5]로 조정하고, DirectionalLight + PointLight 3개를 배치해 신비로운 보라빛 조명을 연출했습니다. Environment preset="night"로 리얼리즘을 강화하고, OrbitControls로 사용자 인터랙션을 추가했죠. 초기 로딩 속도를 위해 Suspense + Fallback UI를 구현했습니다.',
    tags: ['React Three Fiber', 'Three.js', 'GLTF 최적화', '3D Animation', 'WebGL', 'Lighting System'],
    gradient: 'from-jelly-mint to-jelly-lavender',
  },
  {
    phase: '7개 씬 스토리텔링 & GSAP 애니메이션',
    icon: '📖',
    description: '단순한 랜딩페이지를 넘어 영화처럼 흐르는 7개의 스토리 씬을 설계했습니다: ① HeroSection (곡선 텍스트 + 플로팅 이모지), ② IntroSection (실험실 소개), ③ ProcessSection (제작 과정), ④ DarkScene (3D 클라이맥스), ⑤ RevealSection (신제품 티저), ⑥ CollectionSection (제품 프리뷰), ⑦ EndingSection (CTA). GSAP ScrollTrigger를 활용해 스크롤 위치에 따라 배경색이 부드럽게 전환되고, 요소들이 페이드인/슬라이드인되도록 구현했습니다. Framer Motion의 whileInView로 viewport 기반 애니메이션을 적용하고, staggerChildren으로 순차 애니메이션을 연출했어요. 각 씬의 전환 타이밍을 0.1초 단위로 조정하며 리듬감을 만들었습니다.',
    tags: ['Framer Motion', 'GSAP ScrollTrigger', 'Narrative Design', 'Scene Transition', 'Viewport Animation'],
    gradient: 'from-jelly-lavender to-jelly-pink',
  },
  {
    phase: '마이크로 인터랙션 & 모션 그래픽',
    icon: '✨',
    description: '사용자 경험을 풍부하게 만드는 50여 개의 마이크로 인터랙션을 구현했습니다. 버튼은 whileHover시 scale [1, 1.08, 1.05]로 젤리처럼 튀고, whileTap시 0.95로 눌리는 촉감을 표현했어요. 대각선으로 떠다니는 젤리 이모지는 diagonal-drift 키프레임을 사용해 6초 동안 자연스럽게 움직입니다. 버블 효과는 bubble-rise 애니메이션으로 화면 하단에서 위로 떠오르며, CurvedText 컴포넌트는 SVG path를 따라 텍스트를 배치해 곡선 효과를 만들었습니다. FloatingLab 컴포넌트로 실험실 도구(플라스크, 비커)가 sway 애니메이션으로 좌우로 흔들리고, ParticleSparkle로 배경에 반짝이는 입자 효과를 추가했습니다. 모든 애니메이션은 ease-in-out으로 부드럽게 가감속하도록 조정했습니다.',
    tags: ['Micro Interaction', 'Keyframe Animation', 'Motion Graphics', 'SVG Path', 'Particle Effect', 'UX Detail'],
    gradient: 'from-jelly-orange to-jelly-red',
  },
  {
    phase: '반응형 디자인 & 성능 최적화',
    icon: '📱',
    description: 'Mobile-first 접근으로 320px부터 2560px까지 모든 해상도를 지원합니다. Tailwind의 md:, lg: 브레이크포인트를 활용해 Grid 레이아웃을 1열 → 2열 → 4열로 반응형 전환했고, 텍스트는 text-4xl → md:text-6xl로 단계적으로 확대했어요. 3D Canvas는 모바일에서 해상도를 낮춰 성능을 확보했습니다. React.lazy()로 About, Lab 페이지를 Code Splitting하고, dynamic import로 번들 크기를 462KB(gzip)로 최적화했습니다. 이미지는 WebP 포맷을 우선 사용하고, loading="lazy" 속성을 추가했죠. Lighthouse 기준 Performance 92점, Accessibility 100점, SEO 100점을 달성했습니다. PWA manifest.json을 설정해 홈 화면 추가 기능을 지원하고, Service Worker로 오프라인 대응을 준비했습니다.',
    tags: ['Mobile First', 'Responsive Grid', 'Code Splitting', 'Lazy Loading', 'Bundle Optimization', 'Lighthouse', 'PWA'],
    gradient: 'from-jelly-mint to-jelly-yellow',
  },
  {
    phase: '배포 & CI/CD 파이프라인',
    icon: '🚀',
    description: 'cafe24 호스팅 환경에 맞춰 /haribo 서브폴더 배포를 구성했습니다. package.json에 homepage: "/haribo"를 설정하고, React Router의 createBrowserRouter에 basename: "/haribo"를 추가해 경로 문제를 해결했어요. process.env.PUBLIC_URL을 사용해 3D 모델과 에셋의 절대 경로를 동적으로 생성했습니다. npm run build로 생성된 build 폴더를 FTP로 업로드하고, gummy3.glb 파일이 정상적으로 로드되는지 확인했죠. index.html의 meta 태그를 최적화해 SNS 공유 시 Open Graph 이미지와 설명이 표시되도록 했습니다. robots.txt와 sitemap.xml을 작성해 검색 엔진 최적화(SEO)를 완료했고, Google Analytics를 연동해 사용자 행동을 추적할 준비를 마쳤습니다.',
    tags: ['Deployment', 'Basename Config', 'FTP Upload', 'SEO', 'Open Graph', 'Analytics', 'Production Build'],
    gradient: 'from-jelly-red to-jelly-pink',
  },
  {
    phase: 'Firebase 백엔드 & 인증 시스템',
    icon: '🔥',
    description: '서버리스 백엔드로 Firebase를 선택해 프로젝트에 실시간 데이터베이스와 인증 기능을 통합했습니다. Firebase Authentication으로 이메일/비밀번호 로그인을 구현하고, AuthContext를 통해 전역 인증 상태를 관리했어요. Firestore Database에 users, jellies, votes, orders 4개의 컬렉션 구조를 설계했습니다. role 필드를 활용한 역할 기반 접근 제어(RBAC)를 구현해 "user"와 "admin" 권한을 분리했고, useUserRole 커스텀 훅으로 관리자만 접근 가능한 기능을 제어했습니다. 투표 시스템은 votes 컬렉션에서 userId + jellyId 조합으로 중복 투표를 방지하고, Firestore의 increment()를 사용해 실시간 투표 수를 업데이트했어요. 보안 규칙(Security Rules)을 작성해 본인의 데이터만 수정 가능하도록 제한하고, 관리자 대시보드(/admin)에서 전체 사용자와 젤리 통계를 실시간으로 모니터링할 수 있도록 구현했습니다. .env 파일로 Firebase API 키를 환경 변수로 관리해 보안을 강화했습니다.',
    tags: ['Firebase Auth', 'Firestore Database', 'RBAC', 'Real-time Sync', 'Security Rules', 'Environment Variables', 'Admin Dashboard'],
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    phase: '인터랙티브 젤리 실험실 & 콘테스트',
    icon: '🧪',
    description: '사용자가 직접 젤리를 만들고 투표할 수 있는 풀스택 인터랙션을 구현했습니다. MakeJelly 페이지에서는 맛(flavor), 달콤함(sweetness), 상큼함(sourness), 식감(texture), 색상(color)을 실시간으로 조절할 수 있고, 슬라이더를 움직이면 미리보기 젤리의 색상이 즉시 변경됩니다. GSAP 타임라인으로 제출 버튼 클릭 시 젤리가 회전(rotation: 720deg)하며 축소(scale: 0)되는 믹싱 애니메이션을 구현했어요. AI 코멘트 생성 로직으로 "달콤도와 상큼도의 조화가 완벽합니다!"같은 피드백을 자동 생성하고, 랜덤 이름 생성기로 "Spring Harmony Jelly" 등의 이름을 제안했습니다. Contest 페이지는 Firestore에서 실시간으로 젤리 목록을 불러오고, 투표순/최신순 정렬을 지원해요. 로그인한 유저만 투표 가능하며, 이미 투표한 젤리는 "✅ 투표 완료" 상태로 표시됩니다. 관리자는 각 젤리 카드 우측 상단의 빨간색 🗑️ 버튼으로 부적절한 콘텐츠를 삭제할 수 있고, 삭제 시 확인 팝업과 함께 관련 투표 기록도 자동으로 제거됩니다. AnimatePresence로 삭제 시 부드러운 fade-out 애니메이션을 적용했습니다.',
    tags: ['Interactive UI', 'Real-time Preview', 'GSAP Timeline', 'Voting System', 'Admin Controls', 'CRUD Operations', 'Conditional Rendering', 'Animation'],
    gradient: 'from-jelly-mint via-jelly-lavender to-jelly-pink',
  },
  {
    phase: '실전 E-Commerce & 결제 시스템',
    icon: '💳',
    description: '무신사와 쿠팡의 UX를 벤치마킹하여 실제 쇼핑몰 수준의 결제 플로우를 구현했습니다. 장바구니(Cart)에서는 상품별 수량 조절(+/-), 삭제, 실시간 가격 계산이 가능하고, 3만원 이상 시 무료배송이 자동 적용되며 "무료배송까지 ₩XX,XXX 남았어요!" 알림이 표시됩니다. 상품 상세(ProductDetail) 페이지에서는 수량 선택기를 추가해 총 금액을 실시간으로 미리 확인할 수 있고, "바로 구매" 버튼을 통해 장바구니를 거치지 않고 즉시 결제 페이지로 이동하는 다이렉트 퍼처스 기능을 구현했어요. 결제(Checkout) 페이지는 3열 그리드 레이아웃으로 ① 상품 정보(썸네일+이모지+수량 조절기), ② 배송 정보(이름/연락처/주소/메모), ③ 결제 방법(카드/TossPay/NaverPay/KakaoPay/무통장/휴대폰) 선택을 한 화면에 배치했습니다. 우측 사이드바에는 상품금액, 배송비, 할인금액, 최종 결제금액이 실시간으로 계산되어 표시되고, "🍭 결제 완료하기" 버튼은 호버 시 그라데이션 shimmer 효과가 적용됩니다. 결제 완료 후에는 react-confetti로 500개의 색종이가 터지고, 영수증 팝업에 주문번호, 결제금액, 결제방법, 받는 사람이 표시됩니다. 7초 후 자동으로 홈으로 이동하며, 직접 구매 모드에서는 장바구니가 유지되지만 장바구니 결제 시에는 clearCart()로 비워집니다. 모든 입력 필드는 border-2 border-[#ffd6e0]로 Dream Candy Lab의 파스텔 감성을 유지하고, focus:ring-2 focus:ring-[#ffb1c8]로 접근성을 확보했습니다. Zustand의 useCartStore로 전역 상태를 관리하고, React Router의 location.state로 페이지 간 데이터를 안전하게 전달했어요. TypeScript로 JellyProduct, DirectPurchaseState 인터페이스를 정의해 타입 안정성을 보장하고, useMemo로 가격 계산 로직을 최적화했습니다.',
    tags: ['E-Commerce UX', 'Cart System', 'Direct Purchase', 'Payment Flow', 'Shipping Logic', 'Confetti Animation', 'Zustand State', 'Multi-step Form', 'Responsive Layout', 'Micro Interactions'],
    gradient: 'from-pink-400 via-rose-400 to-red-400',
  },
  {
    phase: '마이페이지 & 주문 관리 시스템',
    icon: '👤',
    description: '사용자 중심의 완전한 마이페이지 기능을 구축했습니다. 헤더의 사용자 이름을 클릭하면 /mypage로 이동하며, 탭 기반 UI로 "💳 결제 내역"과 "🧪 내 젤리"를 직관적으로 전환할 수 있습니다. orderService.ts를 새로 작성해 Firestore의 orders 컬렉션에서 사용자별 주문 내역을 조회하고, getUserOrders() 함수로 userId 필터링 + createdAt 내림차순 정렬을 수행합니다. 결제 내역 탭에서는 각 주문의 주문번호, 일시, 상태(결제대기/처리중/배송중/완료/취소), 상품 목록, 배송지 정보, 총 결제금액이 카드 형태로 표시되고, 주문 상태별로 다른 색상(파랑/초록/빨강)의 배지가 적용됩니다. 내 젤리 탭에서는 Lab에서 만든 커스텀 젤리를 3D 프리뷰와 함께 보여주고, 각 젤리마다 "🛒 장바구니"와 "💳 구매" 버튼을 배치해 Lab 젤리를 실제 상품(₩9,900)으로 구매할 수 있는 혁신적인 기능을 구현했습니다. convertJellyToProduct() 함수로 JellyData를 JellyProduct 타입으로 변환하며, flavor, sweetness, texture를 매핑해 일관된 상품 속성을 생성합니다. 젤리 삭제 기능도 추가해 우측 상단의 🗑️ 버튼으로 본인이 만든 젤리를 제거할 수 있고, 삭제 시 확인 팝업이 표시됩니다. 브라우저 콘솔에 "🔍 마이페이지 데이터 로딩 시작...", "📦 주문 내역: X개", "🧪 내 젤리: X개" 같은 상세한 디버깅 로그를 추가해 개발자가 데이터 흐름을 추적할 수 있도록 했습니다. Firebase 인덱스 에러 발생 시 자동으로 감지해 사용자에게 인덱스 생성 안내 알림을 표시하고, MYPAGE_DEBUG.md와 MYPAGE_USAGE.md 문서를 작성해 트러블슈팅과 사용 가이드를 제공했습니다. Checkout 페이지도 수정해 결제 완료 시 createOrder()로 Firestore에 주문 정보를 자동 저장하고, 영수증 팝업에 "마이페이지에서 확인하기" 버튼을 추가해 사용자가 즉시 주문 내역을 확인할 수 있도록 UX를 개선했습니다.',
    tags: ['My Page', 'Order Management', 'User Dashboard', 'Custom Jelly Purchase', 'Tab Navigation', 'CRUD Operations', 'Firebase Integration', 'Debug Logging', 'Error Handling', 'Documentation'],
    gradient: 'from-purple-400 via-pink-400 to-rose-400',
  },
];

const techStack = [
  { icon: '⚛️', name: 'React 18', purpose: '컴포넌트 기반' },
  { icon: '📘', name: 'TypeScript', purpose: '타입 안정성' },
  { icon: '🎨', name: 'Tailwind CSS', purpose: '유틸리티 스타일링' },
  { icon: '🎭', name: 'Framer Motion', purpose: '선언적 애니메이션' },
  { icon: '🎬', name: 'GSAP', purpose: '고급 애니메이션' },
  { icon: '🧊', name: 'React Three Fiber', purpose: '3D 렌더링' },
  { icon: '🔥', name: 'Firebase', purpose: '백엔드/인증' },
  { icon: '📊', name: 'Firestore', purpose: '실시간 DB' },
  { icon: '🗂️', name: 'Zustand', purpose: '상태 관리' },
  { icon: '🛣️', name: 'React Router v7', purpose: '라우팅' },
  { icon: '🎉', name: 'React Confetti', purpose: '파티클 효과' },
];



