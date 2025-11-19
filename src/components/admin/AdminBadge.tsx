import { motion } from 'framer-motion';

export default function AdminBadge() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg"
    >
      <span className="text-sm">👑</span>
      <span className="text-xs font-label font-bold text-white">ADMIN</span>
    </motion.div>
  );
}


