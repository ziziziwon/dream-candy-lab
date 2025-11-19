import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
};

type Props = {
  count?: number;
  className?: string;
};

export default function ParticleSparkle({ count = 20, className = '' }: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            backgroundColor: [
              'rgba(255, 209, 0, 0.8)',
              'rgba(255, 111, 145, 0.8)',
              'rgba(191, 255, 200, 0.8)',
            ],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}


