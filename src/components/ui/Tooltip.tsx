import React, { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

export default function Tooltip({ children, content, position = 'top' }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${positionClasses[position]} px-3 py-2 text-xs font-body text-text-choco bg-white/95 backdrop-blur-sm rounded-lg shadow-jelly whitespace-nowrap border border-jelly-pink/20`}
          >
            {content}
            {/* Tooltip Arrow */}
            <div className={`absolute w-2 h-2 bg-white/95 transform rotate-45 ${
              position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
              position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
              position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
              'left-[-4px] top-1/2 -translate-y-1/2'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}







