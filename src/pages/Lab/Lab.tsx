import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import ParticleSparkle from "../../components/motion/ParticleSparkle";
import AboutSection from "../../sections/AboutSection";
import EventSection from "../../sections/EventSection";

export default function Lab() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Lab 소개 섹션 */}
      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-jelly-mint/20 via-lab-cream to-jelly-lavender/20" />
        <ParticleSparkle count={30} />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative z-10"
          >
            <h1 className="text-5xl md:text-6xl font-logo text-text-choco mb-6">
              🧪 Dream Candy Lab
            </h1>
            <p className="text-xl text-text-rosegray font-label max-w-3xl mx-auto">
              달콤한 실험이 진행되는 연구소에 오신 것을 환영합니다
            </p>
          </motion.div>

          {/* 실험실 공간 */}
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {labZones.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <motion.div
                  className="bg-white/60 backdrop-blur-md rounded-lab p-8 shadow-jelly h-full"
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 20px 40px rgba(255, 124, 168, 0.4)'
                  }}
                >
                  {/* 아이콘 */}
                  <motion.div
                    className="text-6xl mb-4"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, -10, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {zone.icon}
                  </motion.div>

                  <h3 className="font-title text-2xl text-text-choco mb-3">
                    {zone.title}
                  </h3>

                  <p className="text-text-rosegray font-body mb-6 leading-relaxed">
                    {zone.description}
                  </p>

                  {/* 진행 바 */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-label mb-2">
                      <span className="text-text-rosegray">실험 진행도</span>
                      <span className="text-text-choco">{zone.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${zone.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        className={`h-full bg-gradient-to-r ${zone.gradient} rounded-full`}
                      />
                    </div>
                  </div>

                  {/* 상태 */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-label ${
                    zone.status === 'active' ? 'bg-jelly-mint/30 text-green-700' :
                    zone.status === 'pending' ? 'bg-jelly-yellow/30 text-yellow-700' :
                    'bg-jelly-pink/30 text-pink-700'
                  }`}>
                    {zone.status === 'active' ? '진행중' :
                     zone.status === 'pending' ? '대기중' :
                     '완료'}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 text-center relative z-10"
          >
            <h2 className="font-title text-3xl text-text-choco mb-6">
              실험에 참여하고 싶으신가요?
            </h2>
            <Button 
              label="Join Experiment 🧪" 
              size="lg"
              onClick={() => navigate('/lab/make')}
            />
          </motion.div>
        </Container>
      </div>

      {/* About Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Event Section */}
      <div id="events">
        <EventSection />
      </div>
    </div>
  );
}

const labZones = [
  {
    id: 'flavor',
    icon: '🍓',
    title: 'Flavor Lab',
    description: '다양한 과일의 맛을 조합하여 완벽한 젤리 맛을 연구합니다.',
    progress: 85,
    status: 'active' as const,
    gradient: 'from-jelly-pink to-jelly-red',
  },
  {
    id: 'texture',
    icon: '🧫',
    title: 'Texture Lab',
    description: '말랑말랑한 완벽한 젤리 촉감을 위한 질감 연구소입니다.',
    progress: 92,
    status: 'completed' as const,
    gradient: 'from-jelly-mint to-jelly-lavender',
  },
  {
    id: 'color',
    icon: '🎨',
    title: 'Color Lab',
    description: '눈으로도 즐거운 아름다운 젤리 색상을 개발합니다.',
    progress: 65,
    status: 'pending' as const,
    gradient: 'from-jelly-yellow to-jelly-pink',
  },
];



