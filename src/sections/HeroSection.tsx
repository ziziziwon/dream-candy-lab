import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BubbleEffect from "../components/motion/BubbleEffect";
import CurvedText from "../components/ui/CurvedText";
import FloatingLab from "../components/motion/FloatingLab";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 젤리 이미지를 emoji로 대체 - 레이어 분리 (전경/배경)
  const jellyEmojis = [
    { emoji: "🍓", size: 80, delay: 0, x: '15%', y: '60%', layer: 'foreground' },
    { emoji: "🍋", size: 100, delay: 1.2, x: '80%', y: '30%', layer: 'background' },
    { emoji: "🍏", size: 90, delay: 2.4, x: '20%', y: '25%', layer: 'foreground' },
    { emoji: "🍇", size: 85, delay: 1.8, x: '75%', y: '65%', layer: 'background' },
    { emoji: "🍑", size: 95, delay: 0.6, x: '50%', y: '15%', layer: 'foreground' },
  ];

  // ScrollTrigger로 배경 색상 전환 (Hero → 다음 섹션)
  useEffect(() => {
    if (!heroBgRef.current) return;

    gsap.to(heroBgRef.current, {
      background: "linear-gradient(to bottom, #FFF7F5, #E8D4F7)",
      scrollTrigger: {
        trigger: heroBgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroBgRef} className="hero relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center pt-20">
      {/* 🌈 (1) 깨끗한 단색 배경 - 뿌연 느낌 제거 */}
      <div className="hero-bg absolute inset-0 bg-[#FFF9F7]" />
      
      {/* ✨ (2) Light Glow Layer - 부드러운 실험실 조명 (개별 레이어로 분리) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 왼쪽 상단 핑크빛 */}
        <motion.div
          className="absolute top-[15%] left-[20%] w-[450px] h-[450px] bg-[#FFD6E0]/60 blur-[120px] rounded-full mix-blend-screen"
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* 오른쪽 하단 민트빛 */}
        <motion.div
          className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-[#C7F3E3]/50 blur-[120px] rounded-full mix-blend-screen"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.15, 1],
            x: [0, -15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* 중앙 옐로우빛 (depth 추가) */}
        <motion.div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] bg-[#FFE5A0]/40 blur-[100px] rounded-full mix-blend-screen"
          animate={{
            opacity: [0.25, 0.4, 0.25],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* 🧪 실험실 장비 (좌측 상단) */}
      <FloatingLab position="left" type="flask" />
      <FloatingLab position="right" type="beaker" />
      
      {/* 🫧 버블 이펙트 */}
      <BubbleEffect />
      
      {/* 🍬 (2) 부유하는 젤리들 - 레이어 분리 (전경/배경) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {jellyEmojis.map((jelly, index) => (
          <DiagonalFloatingEmoji
            key={index}
            emoji={jelly.emoji}
            size={jelly.size}
            delay={jelly.delay}
            x={jelly.x}
            y={jelly.y}
            zIndex={jelly.layer === 'foreground' ? 30 : 5}
            blur={jelly.layer === 'foreground' ? 0 : 4}
            opacity={jelly.layer === 'foreground' ? 1 : 0.5}
          />
        ))}
      </div>

      {/* 🧪 (3) 메인 타이틀 - 폰트 통일 + 선명한 컬러 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7, 
          type: "spring", 
          stiffness: 70, 
          damping: 12,
          delay: 0.2 
        }}
        className="relative z-10 mb-8 max-w-5xl px-4"
      >
        {/* 상단 Welcome 텍스트 - 폰트 통일 + 대비 강화 */}
        <motion.div
          className="font-title text-xl md:text-2xl mb-7"
          style={{
            color: '#8B7355',
            textShadow: '0 2px 8px rgba(139, 115, 85, 0.15)',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Welcome to the
        </motion.div>
        
        {/* (4) 곡선 타이틀 - 젤리 질감 + 명확한 glow */}
        <div className="relative">
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 2px 12px rgba(255, 150, 180, 0.3))',
                'drop-shadow(0 4px 20px rgba(255, 150, 180, 0.5))',
                'drop-shadow(0 2px 12px rgba(255, 150, 180, 0.3))',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CurvedText 
              text="Dream Candy Lab" 
              className="mb-6"
            />
          </motion.div>
        </div>
        
        {/* 💬 서브 텍스트 - 대비 강화 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-body text-lg md:text-xl mb-4"
          style={{
            color: '#8B7355',
            textShadow: '0 1px 4px rgba(139, 115, 85, 0.1)',
          }}
        >
          달콤한 실험이 시작되는 곳, 젤리들의 작은 연구소 🍭
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="font-label text-sm md:text-base"
          style={{
            color: '#A67C52',
            letterSpacing: '0.05em',
          }}
        >
          말랑말랑 · 몽글몽글 · 반짝반짝
        </motion.p>
      </motion.div>

      {/* 🍬 (5) CTA 버튼 - 젤리 질감 + 깨끗한 glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 1.2, 
          type: "spring", 
          stiffness: 200, 
          damping: 10 
        }}
        whileHover={{ 
          scale: 1.08,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10"
      >
        <motion.button
          className="relative text-lg font-title font-semibold px-10 py-4 rounded-[40px] bg-gradient-to-r from-[#FF7CA8] to-[#FFD166] text-white overflow-hidden"
          style={{
            boxShadow: 'inset 0 1px 20px rgba(255,255,255,0.35), inset 0 -1px 10px rgba(0,0,0,0.05), 0 4px 20px rgba(255,124,168,0.35)',
          }}
          onClick={() => {
            navigate('/lab');
          }}
        >
          {/* 내부 하이라이트 (젤리 윤광) - 상단 */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/50 to-transparent rounded-t-[40px]"
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="relative z-10 drop-shadow-sm">달콤한 실험에 참여하기</span>
        </motion.button>
        
        {/* 버튼 외부 glow 효과 - 단순화 */}
        <motion.div
          className="absolute inset-0 -z-10 blur-xl opacity-50 bg-gradient-to-r from-[#FF7CA8] to-[#FFD166] rounded-[40px]"
          animate={{
            opacity: [0.35, 0.6, 0.35],
            scale: [1.05, 1.15, 1.05],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-jelly-pink rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-jelly-pink rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// 이모지 - 사선 흐름 + sway 조합 + 레이어 분리
function DiagonalFloatingEmoji({ 
  emoji, 
  size, 
  delay,
  x,
  y,
  zIndex = 10,
  blur = 0,
  opacity = 1,
}: { 
  emoji: string; 
  size: number; 
  delay: number;
  x: string;
  y: string;
  zIndex?: number;
  blur?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{
        left: x,
        top: y,
        fontSize: `${size}px`,
        zIndex,
        filter: `blur(${blur}px)`,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -15 }}
      animate={{ 
        opacity: opacity * 0.95, // 과일을 더 선명하게
        scale: 1,
        y: [0, -20, -15, -25, 0],
        x: [0, 5, -5, 8, 0],
        rotate: [0, 3, -3, 5, 0],
      }}
      transition={{
        duration: 5 + Math.random() * 2,
        delay: delay + 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
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
          ease: "easeInOut",
        }}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}

