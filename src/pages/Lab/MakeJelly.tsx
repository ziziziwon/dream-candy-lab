import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import ParticleSparkle from "../../components/motion/ParticleSparkle";
import { useAuth } from "../../contexts/AuthContext";
import { createJelly } from "../../services/jellyService";

export default function MakeJelly() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [sweetness, setSweetness] = useState(70);
  const [sourness, setSourness] = useState(30);
  const [selectedFlavor, setSelectedFlavor] = useState('strawberry');
  const [selectedTexture, setSelectedTexture] = useState('soft');
  const [selectedColor, setSelectedColor] = useState('#FF7CA8');
  const [jellyName, setJellyName] = useState('');
  const [aiComment, setAiComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMixing, setIsMixing] = useState(false);
  const jellyRef = useRef<HTMLDivElement>(null);
  const mixingRef = useRef<HTMLDivElement>(null);

  // 랜덤 이름 목록
  const randomNames = [
    'Spring Harmony Jelly',
    'Lemonberry Dream',
    'Pink Bloom Delight',
    'Citrus Kiss',
    'Sunshine Mix',
    'Rainbow Bounce',
    'Sweet Paradise',
    'Candy Cloud',
    'Berry Galaxy',
    'Tropical Sunset',
  ];

  const flavors = [
    { id: 'strawberry', name: '🍓 딸기', color: '#FF7CA8' },
    { id: 'lemon', name: '🍋 레몬', color: '#FFD166' },
    { id: 'grape', name: '🍇 포도', color: '#B794F6' },
    { id: 'apple', name: '🍏 사과', color: '#A8E6CF' },
    { id: 'peach', name: '🍑 복숭아', color: '#FFB6A6' },
    { id: 'orange', name: '🍊 오렌지', color: '#FF8C42' },
  ];

  const textures = [
    { id: 'soft', name: '부드러움', emoji: '☁️' },
    { id: 'chewy', name: '쫄깃함', emoji: '🎯' },
    { id: 'bouncy', name: '탱글탱글', emoji: '⚡' },
  ];

  // 랜덤 이름 생성
  const handleRandomName = () => {
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    setJellyName(randomName);
  };

  // AI 코멘트 생성
  const generateAIComment = () => {
    const flavorName = flavors.find(f => f.id === selectedFlavor)?.name || '젤리';
    const comments = [
      `${flavorName} 완벽한 조합이에요! 상큼한 봄날의 젤리 같아요! 🌸`,
      `${flavorName} 달콤함과 신맛의 밸런스가 환상적이네요! ✨`,
      `${flavorName} 이 조합은 여름날 시원한 바람 같아요! 🌊`,
      `${flavorName} 정말 독창적인 레시피예요! 🎨`,
      `${flavorName} 프리미엄 디저트 느낌이 나네요! 👑`,
    ];
    
    if (sweetness > 80) {
      return `${flavorName} 달콤함이 가득해요! 행복한 맛이 느껴집니다! 😊`;
    } else if (sourness > 70) {
      return `${flavorName} 상큼한 신맛이 인상적이에요! 활력이 느껴져요! ⚡`;
    } else {
      return comments[Math.floor(Math.random() * comments.length)];
    }
  };


  // 색상 변경 시 믹싱 애니메이션 트리거
  useEffect(() => {
    if (jellyRef.current && mixingRef.current) {
      setIsMixing(true);

      // GSAP 믹싱 애니메이션
      const tl = gsap.timeline({
        onComplete: () => setIsMixing(false),
      });

      // 젤리가 회전하고 흔들리며 색상 전환
      tl.to(jellyRef.current, {
        rotation: 360,
        scale: 1.2,
        duration: 0.8,
        ease: "power2.inOut",
      })
        .to(jellyRef.current, {
          scale: 0.9,
          duration: 0.3,
          ease: "bounce.out",
        })
        .to(jellyRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        });

      // 믹싱 효과 (입자들이 회전)
      if (mixingRef.current && mixingRef.current.children.length > 0) {
        tl.to(
          Array.from(mixingRef.current.children),
          {
            rotation: 360,
            scale: 0,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.out",
          },
          0
        );
      }
    }
  }, [selectedColor, selectedFlavor]);

  const handleSubmit = async () => {
    // 로그인 체크
    if (!currentUser) {
      alert('🍬 젤리를 만들려면 로그인이 필요해요!');
      navigate('/login');
      return;
    }

    if (!jellyName.trim()) {
      alert('🍬 젤리 이름을 입력해주세요!');
      return;
    }

    // 제출 시작
    setIsSubmitting(true);
    setIsMixing(true);
    
    // AI 코멘트 생성 (즉시)
    const comment = generateAIComment();
    setAiComment(comment);
    
    if (jellyRef.current) {
      gsap.timeline({
        onComplete: () => {
          // 2️⃣ Firestore에 저장 (async를 즉시 실행)
          (async () => {
            try {
              const result = await createJelly(
                {
                  name: jellyName,
                  flavor: selectedFlavor,
                  sweetness,
                  sourness,
                  texture: selectedTexture,
                  color: selectedColor,
                },
                currentUser.uid,
                currentUser.displayName || 'Anonymous'
              );
              
              if (result.success) {
                console.log('젤리 저장 완료:', result.id);
                
                // Contest 페이지로 이동
                setTimeout(() => {
                  navigate('/contest');
                }, 1000);
              } else {
                alert('젤리 저장에 실패했습니다. 다시 시도해주세요.');
                setIsSubmitting(false);
                setIsMixing(false);
              }
            } catch (error) {
              console.error('Error saving jelly:', error);
              alert('젤리 저장 중 오류가 발생했습니다.');
              setIsSubmitting(false);
              setIsMixing(false);
            }
          })();
        },
      })
        .to(jellyRef.current, {
          scale: 1.3,
          rotation: 720,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(jellyRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.in(2)",
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lab-cream via-jelly-yellow/10 to-jelly-pink/10">
      <ParticleSparkle count={50} />
      
      <Container>
        <div className="pt-32 pb-24">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-logo text-text-choco mb-4">
              🧪 젤리 제조 실험실
            </h1>
            <p className="text-xl text-text-rosegray font-body max-w-2xl mx-auto">
              나만의 완벽한 젤리를 만들어보세요!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* 왼쪽: 컨트롤 패널 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 bg-white/70 backdrop-blur-md rounded-lab p-6 shadow-jelly h-full"
            >
              {/* 맛 선택 */}
              <div className="mb-6">
                <h3 className="font-title text-xl text-text-choco mb-3">
                  🍓 과일 맛 선택
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {flavors.map((flavor) => (
                    <motion.button
                      key={flavor.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedFlavor(flavor.id);
                        setSelectedColor(flavor.color);
                      }}
                      className={`p-3 rounded-lg font-label text-sm transition-all ${
                        selectedFlavor === flavor.id
                          ? 'bg-gradient-to-br from-jelly-pink to-jelly-yellow text-white shadow-lg'
                          : 'bg-gray-100 text-text-choco hover:bg-gray-200'
                      }`}
                    >
                      {flavor.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 단맛 조절 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-title text-lg text-text-choco">
                    🍬 단맛
                  </h3>
                  <span className="font-label text-jelly-pink font-bold">
                    {sweetness}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sweetness}
                  onChange={(e) => setSweetness(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #FF7CA8 0%, #FF7CA8 ${sweetness}%, #e5e7eb ${sweetness}%, #e5e7eb 100%)`,
                  }}
                />
              </div>

              {/* 신맛 조절 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-title text-lg text-text-choco">
                    🍋 신맛
                  </h3>
                  <span className="font-label text-jelly-yellow font-bold">
                    {sourness}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sourness}
                  onChange={(e) => setSourness(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FFD166 0%, #FFD166 ${sourness}%, #e5e7eb ${sourness}%, #e5e7eb 100%)`,
                  }}
                />
              </div>

              {/* 질감 선택 */}
              <div className="mb-6">
                <h3 className="font-title text-xl text-text-choco mb-3">
                  🧫 질감 선택
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {textures.map((texture) => (
                    <motion.button
                      key={texture.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTexture(texture.id)}
                      className={`p-3 rounded-lg font-label transition-all ${
                        selectedTexture === texture.id
                          ? 'bg-gradient-to-br from-jelly-mint to-jelly-lavender text-white shadow-lg'
                          : 'bg-gray-100 text-text-choco hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-xl mb-1">{texture.emoji}</div>
                      <div className="text-xs">{texture.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ✏️ 젤리 이름 짓기 */}
              <div className="mb-6">
                <h3 className="font-title text-xl text-text-choco mb-3">
                  ✏️ 젤리 이름 짓기
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="나만의 젤리 이름을 입력하세요"
                    value={jellyName}
                    onChange={(e) => setJellyName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-jelly-pink focus:outline-none font-label text-sm text-center transition-colors"
                    maxLength={30}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRandomName}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-jelly-yellow to-jelly-orange text-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                    title="랜덤 이름 제안"
                  >
                    🎲
                  </motion.button>
                </div>
                {jellyName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm font-label text-jelly-pink text-center"
                  >
                    ✨ "{jellyName}"
                  </motion.p>
                )}
                {!jellyName && (
                  <p className="mt-2 text-xs font-label text-text-rosegray text-center">
                    이름을 입력하지 않으면 "이름 없는 젤리 🍬"로 저장됩니다
                  </p>
                )}
              </div>

              {/* 🎨 색상 커스터마이징 */}
              <div className="mb-6">
                <h3 className="font-title text-xl text-text-choco mb-3">
                  🎨 색상 커스터마이징
                </h3>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-16 h-16 rounded-lg cursor-pointer border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="text-xs font-label text-text-rosegray mb-1">
                      선택된 색상
                    </div>
                    <div className="font-title text-lg text-text-choco">
                      {selectedColor.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 오른쪽: 미리보기 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-3 sticky top-32"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-lab p-8 shadow-jelly h-full">
                <h3 className="font-title text-3xl text-text-choco mb-8 text-center">
                  ✨ 젤리 미리보기
                </h3>
                
                {/* 젤리 미리보기 */}
                <div className="flex flex-col items-center justify-center min-h-[450px] relative">
                  {/* 믹싱 입자 효과 */}
                  <div ref={mixingRef} className="absolute inset-0 pointer-events-none">
                    <AnimatePresence>
                      {isMixing && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className="absolute w-6 h-6 rounded-full"
                              style={{
                                background: selectedColor,
                                left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 30}%`,
                                top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 30}%`,
                                boxShadow: `0 0 20px ${selectedColor}`,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    animate={{
                      y: isMixing ? [0, -15, 0] : [0, -15, 0],
                      rotate: isMixing ? [0, 5, -5, 0] : [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10"
                  >
                    {/* 젤리 메인 */}
                    <motion.div
                      ref={jellyRef}
                      className="w-64 h-64 rounded-full relative"
                      style={{
                        background: `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}CC 100%)`,
                        boxShadow: `0 20px 60px ${selectedColor}66, inset 0 -10px 30px rgba(0,0,0,0.1), inset 0 10px 30px rgba(255,255,255,0.5)`,
                      }}
                      animate={{
                        scale: isMixing ? [1, 1.2, 0.9, 1] : [1, 1.05, 1],
                      }}
                      transition={{
                        duration: isMixing ? 1.2 : 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                        >
                          {/* 하이라이트 */}
                          <div 
                            className="absolute top-12 left-12 w-20 h-20 bg-white/40 rounded-full blur-xl"
                          />
                        </motion.div>

                    {/* 반짝임 효과 */}
                    <motion.div
                      className="absolute -top-2 -right-2 text-4xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>

                  {/* 정보 표시 */}
                  <div className="mt-10 text-center space-y-4">
                    {/* 젤리 이름 표시 */}
                    <motion.div
                      key={jellyName}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-title text-3xl text-text-choco"
                    >
                      {jellyName || '이름 없는 젤리 🍬'}
                    </motion.div>

                    <div className="h-px bg-gradient-to-r from-transparent via-jelly-pink to-transparent" />

                    <div className="font-title text-xl text-text-choco">
                      {flavors.find(f => f.id === selectedFlavor)?.name} 맛
                    </div>
                    <div className="font-label text-base text-text-rosegray">
                      단맛 {sweetness}% • 신맛 {sourness}%
                    </div>
                    <div className="font-label text-base text-text-rosegray">
                      {textures.find(t => t.id === selectedTexture)?.name}
                    </div>

                    {/* AI 코멘트 */}
                    <AnimatePresence>
                      {aiComment && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                          className="mt-6 p-4 bg-gradient-to-br from-jelly-yellow/10 to-jelly-pink/10 rounded-lg border-2 border-jelly-pink/20"
                        >
                          <div className="text-xs font-label text-jelly-pink mb-1">
                            💬 AI 실험실의 평가
                          </div>
                          <div className="font-body text-sm text-text-choco">
                            {aiComment}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 제출 중 프로그레스 */}
                    {isSubmitting && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4"
                      >
                        <div className="text-xs font-label text-jelly-mint mb-2">
                          🧪 젤리가 섞이는 중...
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-jelly-pink via-jelly-yellow to-jelly-mint"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, ease: 'easeInOut' }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* 제출 버튼 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 flex flex-col items-center"
                >
                  <Button
                    label={isSubmitting ? "제출 중..." : "실험 결과 제출 🚀"}
                    size="lg"
                    onClick={handleSubmit}
                    className="w-auto px-12"
                  />
                  <button
                    onClick={() => navigate('/lab')}
                    className="mt-4 py-3 text-text-rosegray font-label hover:text-text-choco transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    ← 연구소로 돌아가기
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}

