import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  src: string;
  size?: number;
  delay?: number;
  floatRange?: number;
  className?: string;
};

export default function JellyFloat({
  src,
  size = 120,
  delay = 0,
  floatRange = 20,
  className = '',
}: Props) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Float animation
    gsap.to(el, {
      y: `+=${floatRange}`,
      duration: 4 + Math.random() * 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay,
    });
    
    // Slight rotation
    gsap.to(el, {
      rotation: "+=10",
      duration: 6 + Math.random() * 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: delay + 0.5,
    });
  }, [delay, floatRange]);

  const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200) - 100;
  const randomY = Math.random() * 200 - 100;
  const randomRotate = Math.random() * 360;

  return (
    <img
      ref={ref}
      src={src}
      alt="floating jelly"
      className={`absolute opacity-80 select-none pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        left: `${randomX}px`,
        top: `${randomY + 150}px`,
        transform: `rotate(${randomRotate}deg)`,
        filter: 'drop-shadow(0 4px 8px rgba(255, 182, 193, 0.3))',
      }}
    />
  );
}


