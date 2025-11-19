import React from "react";
import { motion } from "framer-motion";

type Props = {
  label: string;
  color?: 'yellow' | 'pink' | 'mint' | 'lavender' | 'red' | 'orange';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
};

export default function Chip({ label, color = 'pink', size = 'md', icon }: Props) {
  const colorClasses = {
    yellow: "bg-jelly-yellow/20 text-jelly-yellow border-jelly-yellow/30",
    pink: "bg-jelly-pink/20 text-jelly-pink border-jelly-pink/30",
    mint: "bg-jelly-mint/30 text-green-700 border-jelly-mint/50",
    lavender: "bg-jelly-lavender/30 text-purple-700 border-jelly-lavender/50",
    red: "bg-jelly-red/20 text-jelly-red border-jelly-red/30",
    orange: "bg-orange-200 text-orange-700 border-orange-300",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
  };

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className={`inline-flex items-center gap-1 rounded-full border-2 font-label ${colorClasses[color]} ${sizeClasses[size]} shadow-sm`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </motion.span>
  );
}

