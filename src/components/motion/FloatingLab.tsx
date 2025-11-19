import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

type Props = {
  position: 'left' | 'right';
  type: 'flask' | 'beaker' | 'tube';
};

export default function FloatingLab({ position, type }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 부유 + sway 조합
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(el, {
      y: -20,
      x: position === 'left' ? 10 : -10,
      rotation: position === 'left' ? 3 : -3,
      duration: 3,
      ease: "sine.inOut",
    }).to(el, {
      y: 0,
      x: 0,
      rotation: 0,
      duration: 3,
      ease: "sine.inOut",
    });
  }, [position]);

  const icons = {
    flask: '🧪',
    beaker: '⚗️',
    tube: '🧫',
  };

  const positionClasses = {
    left: 'left-[10%] top-[15%]',
    right: 'right-[10%] top-[20%]',
  };

  return (
    <motion.div
      ref={ref}
      className={`absolute ${positionClasses[position]} text-7xl opacity-30 pointer-events-none`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {icons[type]}
    </motion.div>
  );
}






