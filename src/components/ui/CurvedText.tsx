import React from "react";
import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  pathId?: string;
};

export default function CurvedText({ text, className = '', pathId = 'wave' }: Props) {
  return (
    <motion.svg
      viewBox="0 0 1300 280"
      className={`w-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <defs>
        <path
          id={pathId}
          d="M 70,140 Q 280,65 550,140 T 1300,140"
          fill="transparent"
        />
      </defs>
      <text
        fontFamily="PyeongChangPeace, TmoneyRoundWind, sans-serif"
        fontSize="130"
        fontWeight="700"
        fill="url(#gradient)"
        letterSpacing="-0.5"
        className="font-logo tracking-tight"
      >
        <textPath href={`#${pathId}`} startOffset="2.5%">
          {text}
        </textPath>
      </text>
      
      {/* 🍬 젤리 그라데이션 - 명확하고 선명하게 */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#FF7CA8', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#FFD166', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#C7F3E3', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}




