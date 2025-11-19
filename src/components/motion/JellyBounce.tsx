import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function JellyBounce({ children, delay = 0, className = '' }: Props) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 12,
        mass: 0.7,
        delay,
      }}
      whileHover={{
        scale: 1.1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}




