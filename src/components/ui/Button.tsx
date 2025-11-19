import React from "react";
import { motion } from "framer-motion";

type Props = {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'mint';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function Button({ 
  label,
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = ''
}: Props) {
  const baseClasses = "rounded-jelly text-white font-title transition-all duration-200 jelly-button relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-jelly-yellow to-jelly-pink",
    secondary: "bg-gradient-to-r from-jelly-pink to-jelly-lavender",
    mint: "bg-gradient-to-r from-jelly-mint to-jelly-lavender",
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-lg",
    lg: "px-10 py-5 text-xl",
  };

  return (
    <motion.button
      whileHover={{ 
        scale: [1, 1.08, 1.05],
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} shadow-jelly drop-shadow-lg font-title ${className}`}
      onClick={onClick}
      style={{
        boxShadow: '0 8px 20px rgba(255, 124, 168, 0.3), 0 0 30px rgba(255, 124, 168, 0.2)',
      }}
    >
      {/* 반짝이는 하이라이트 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children || label}</span>
    </motion.button>
  );
}

