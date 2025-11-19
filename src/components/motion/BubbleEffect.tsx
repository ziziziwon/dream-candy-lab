import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Bubble = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

export default function BubbleEffect() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 20 + Math.random() * 40,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.left}%`,
            bottom: -50,
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.8), 
              rgba(255, 200, 220, 0.3))`,
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            y: [-50, -window.innerHeight - 100],
            x: [0, (Math.random() - 0.5) * 100],
            scale: [0, 1, 1, 0.8],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}


