import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../../stores/useCartStore";
import { useAuth } from "../../contexts/AuthContext";
import { useUserRole } from "../../hooks/useUserRole";
import AdminBadge from "../admin/AdminBadge";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { currentUser, logout } = useAuth();
  const { isAdmin } = useUserRole();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Lab', path: '/lab' },
    { name: 'Contest', path: '/contest' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-jelly-yellow to-jelly-pink rounded-full flex items-center justify-center shadow-jelly"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white text-xl font-title">🍬</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-logo text-text-choco flex items-center gap-1">
                <span className="font-eng">Dream</span>
                <span>Candy Lab</span>
              </h1>
              <p className="text-xs text-text-rosegray font-label">달콤한 실험실</p>
            </div>
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path}>
                <motion.div
                  className={`text-text-choco font-body hover:text-jelly-pink transition-colors duration-300 relative group ${
                    isActive ? 'text-jelly-pink' : ''
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                  <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-gradient-to-r from-jelly-yellow to-jelly-pink transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </motion.div>
              </Link>
            );
          })}
          {/* Admin Menu */}
          {isAdmin && (
            <Link to="/admin">
              <motion.div
                className={`text-text-choco font-body hover:text-yellow-500 transition-colors duration-300 relative group flex items-center gap-1 ${
                  location.pathname === '/admin' ? 'text-yellow-500' : ''
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <span>👑</span>
                <span>Admin</span>
                <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 ${
                  location.pathname === '/admin' ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </motion.div>
            </Link>
          )}
        </nav>

        {/* Right Section: User + Cart */}
        <div className="flex items-center gap-4">
          {/* User Auth */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              {isAdmin && <AdminBadge />}
              <Link to="/mypage">
                <motion.div
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-jelly-yellow/10 to-jelly-pink/10 rounded-full hover:from-jelly-yellow/20 hover:to-jelly-pink/20 transition-all cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">👤</span>
                  <span className="font-label text-sm text-text-choco">
                    {currentUser.displayName || '연구원'}
                  </span>
                </motion.div>
              </Link>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-jelly-mint/20 to-jelly-lavender/20 rounded-lg font-label text-sm text-text-choco hover:from-jelly-mint/30 hover:to-jelly-lavender/30 transition-all"
              >
                로그아웃
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-jelly-pink/20 to-jelly-yellow/20 rounded-lg font-label text-sm text-text-choco hover:from-jelly-pink/30 hover:to-jelly-yellow/30 transition-all"
                >
                  로그인
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-jelly-pink to-jelly-yellow rounded-lg font-label text-sm text-white shadow-jelly hover:shadow-xl transition-all"
                >
                  회원가입
                </motion.button>
              </Link>
            </div>
          )}

          {/* Cart Icon */}
          <Link to="/cart">
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-jelly-pink/20 to-jelly-yellow/20 flex items-center justify-center">
                <span className="text-2xl">🧺</span>
              </div>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-jelly-red rounded-full flex items-center justify-center text-white text-xs font-number"
                >
                  {cartCount}
                </motion.div>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

