import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";
import JellyModel from "../components/motion/JellyModel";

export default function DarkScene() {
  const bgRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  useEffect(() => {
    if (!bgRef.current) return;

    // 배경 다크 전환
    gsap.to(bgRef.current, {
      background: "radial-gradient(circle at center, #2B1E34 0%, #0B0612 100%)",
      duration: 2,
      ease: "power2.inOut",
    });

    // 조명 색상 변화 (보라톤)
    if (lightRef.current) {
      gsap.to(lightRef.current.color, { 
        r: 0.7, 
        g: 0.4, 
        b: 0.9, 
        duration: 3 
      });
    }
  }, []);

  return (
    <section 
      ref={bgRef} 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #FFF7F0 0%, #F8F0FF 100%)"
      }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0612]/40 to-[#0B0612]/80 pointer-events-none" />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          
          {/* 조명 */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            ref={lightRef}
            position={[3, 3, 5]} 
            intensity={2.0} 
            color="#FFD1E1" 
          />
          
          {/* 포인트 라이트 (보라빛) */}
          <pointLight position={[0, -2, 3]} intensity={1.5} color="#B794F6" />
          <pointLight position={[-3, 2, 2]} intensity={0.8} color="#FFD1E1" />
          <pointLight position={[3, -1, 2]} intensity={0.6} color="#A8E6CF" />

          {/* 3D 모델 - gummy3.glb (다크 젤리) */}
          <Suspense fallback={<DarkJellyPlaceholder />}>
            <group position={[0, -1.3, 0]}>
              <JellyModel url={`${process.env.PUBLIC_URL}/assets/models/gummy3.glb`} scale={0.4} darkMode />
            </group>
          </Suspense>

          <Environment preset="night" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* 텍스트 오버레이 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center"
        >
          <motion.h2 
            className="font-logo text-4xl md:text-6xl tracking-tight text-[#FFD1E1] mb-6"
            style={{
              textShadow: '0 0 20px rgba(255, 120, 255, 0.6), 0 0 40px rgba(255, 120, 255, 0.3)',
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 120, 255, 0.6)',
                '0 0 30px rgba(255, 120, 255, 0.8)',
                '0 0 20px rgba(255, 120, 255, 0.6)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Not all sweetness stays sweet…
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-[#BFA0D0] text-base md:text-xl font-label max-w-2xl mx-auto leading-relaxed"
          >
            Dream Candy Lab의 실험에서 태어난 다크 하리보.<br />
            <span className="text-[#E0D3FF]">달콤함의 균형이 무너질 때, 새로운 맛이 탄생한다.</span>
          </motion.p>
        </motion.div>

        {/* 경고 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 text-center"
        >
          <p className="text-[#9B7DC1] text-sm font-body italic">
            "달콤함에는 균형이 필요했죠..."
          </p>
        </motion.div>
      </div>

      {/* 파티클 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}

// 다크 젤리 모델 (실제로는 gummy3.glb를 로드)
function DarkJellyModel() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    
    // 회전
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    
    // 부유
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      {/* 임시 다크 젤리 형태 */}
      <dodecahedronGeometry args={[0.8, 0]} />
      <meshPhysicalMaterial
        color="#2B1E34"
        emissive="#8B5CF6"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// 로딩 플레이스홀더
function DarkJellyPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8B5CF6" wireframe />
    </mesh>
  );
}

