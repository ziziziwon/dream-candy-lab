import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./HeroSection";
import DarkScene from "./DarkScene";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function StorytellingHome() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ScrollTrigger 설정
    const sections = gsap.utils.toArray<HTMLElement>(".story-section");
    
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(section, { opacity: 1, duration: 0.5 });
        },
        onLeave: () => {
          gsap.to(section, { opacity: 0.3, duration: 0.5 });
        },
        onEnterBack: () => {
          gsap.to(section, { opacity: 1, duration: 0.5 });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Scene 1: Awakening - 달콤한 아침 */}
      <div className="story-section">
        <HeroSection />
      </div>

      {/* Scene 2: Discovery - 새로운 실험 */}
      <section className="story-section relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-lab-cream to-jelly-mint/10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center px-6 max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl font-logo text-text-choco mb-6">
            🧪 The Perfect Experiment
          </h2>
          <p className="text-xl text-text-rosegray font-label leading-relaxed">
            젤리들은 더 완벽한 맛을 만들고자 했어요.<br />
            매일 밤, 실험실에는 새로운 조합이 시도되었습니다.
          </p>
          
          {/* 실험 비커들 */}
          <div className="flex justify-center gap-8 mt-12">
            {['🧪', '⚗️', '🧫'].map((icon, i) => (
              <motion.div
                key={i}
                className="text-6xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Scene 3: Failure - 달콤함의 균열 */}
      <section className="story-section relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-jelly-mint/10 to-jelly-red/20 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center px-6 max-w-4xl"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-logo text-jelly-red mb-6"
            animate={{
              textShadow: [
                '0 0 10px rgba(230, 75, 75, 0.3)',
                '0 0 20px rgba(230, 75, 75, 0.6)',
                '0 0 10px rgba(230, 75, 75, 0.3)',
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⚠️ Balance Broken
          </motion.h2>
          <p className="text-xl text-text-choco font-label leading-relaxed">
            하지만 달콤함에는 균형이 필요했죠.<br />
            <span className="text-jelly-red">그날 밤, 무언가 잘못되었습니다...</span>
          </p>

          {/* 깜빡이는 경고 */}
          <motion.div
            className="mt-12 text-5xl"
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ⚡
          </motion.div>
        </motion.div>
      </section>

      {/* Scene 4: Dark Jelly - 다크 하리보의 탄생 */}
      <div className="story-section">
        <DarkScene />
      </div>

      {/* Scene 5: Silence - 실험의 여운 */}
      <section className="story-section relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0B0612] to-[#1a1a2e] py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="text-center px-6 max-w-4xl"
        >
          <motion.div
            className="text-6xl mb-8"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ...
          </motion.div>
          <p className="text-xl text-[#BFA0D0] font-label leading-relaxed">
            실험은 멈췄지만, 그 존재는 사라지지 않았어요.<br />
            <span className="text-[#E0D3FF]">어둠 속에서도 빛은 남아있었습니다.</span>
          </p>
        </motion.div>
      </section>

      {/* Scene 6: Rebalance - 달콤함의 회복 */}
      <section className="story-section relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] via-jelly-lavender/20 to-lab-cream py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center px-6 max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl font-logo text-text-choco mb-6">
            🌈 A New Balance
          </h2>
          <p className="text-xl text-text-rosegray font-label leading-relaxed mb-8">
            빛과 어둠이 섞인 새로운 맛이 태어났습니다.<br />
            <span className="text-jelly-pink">균형은 완벽함이 아니라, 조화였어요.</span>
          </p>

          {/* 회복되는 젤리들 */}
          <div className="flex justify-center gap-6 mt-12">
            {['🍓', '🍋', '🍏', '🍇'].map((icon, i) => (
              <motion.div
                key={i}
                className="text-5xl"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  {icon}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Scene 7: CTA - Join the Next Experiment */}
      <section className="story-section relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-lab-cream to-white py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center px-6 max-w-4xl"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-logo text-text-choco mb-8"
            animate={{
              textShadow: [
                '0 4px 10px rgba(255, 124, 168, 0.2)',
                '0 4px 20px rgba(255, 124, 168, 0.4)',
                '0 4px 10px rgba(255, 124, 168, 0.2)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Join the Next Experiment
          </motion.h2>
          
          <p className="text-xl text-text-rosegray font-label mb-12 leading-relaxed">
            다음 실험에 참여하시겠어요?<br />
            <span className="text-jelly-pink">당신도 이 이야기의 일부가 될 수 있습니다.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              label="실험실 둘러보기 🧪" 
              size="lg"
              onClick={() => navigate('/lab')}
            />
            <Button 
              label="제품 보러가기 🍬" 
              size="lg"
              variant="secondary"
              onClick={() => navigate('/product')}
            />
          </div>

          {/* 스크롤 완료 표시 */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-sm text-text-rosegray font-body mt-12"
          >
            ✨ You've experienced the Dream Candy Lab story
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}

