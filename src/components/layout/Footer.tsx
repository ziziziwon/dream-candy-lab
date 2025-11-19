import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-lab-cream to-white py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-jelly-pink rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-jelly-yellow rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Links & Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="font-title text-text-choco mb-4">Dream Candy Lab</h4>
            <p className="text-sm text-text-rosegray font-body leading-relaxed">
              달콤한 실험이 시작되는 곳<br />
              젤리들의 작은 연구소 🍭
            </p>
          </div>
          
          <div>
            <h4 className="font-title text-text-choco mb-4">바로가기</h4>
            <ul className="space-y-2 text-sm font-body">
              {['About', 'Products', 'Lab', 'Events', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-text-rosegray hover:text-jelly-pink transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-title text-text-choco mb-4">소셜 미디어</h4>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'YouTube'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-jelly-pink to-jelly-lavender flex items-center justify-center text-white shadow-jelly"
                  title={social}
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-text-rosegray/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-rosegray font-body">
            © {currentYear} Dream Candy Lab. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-text-rosegray font-body">
            <a href="#" className="hover:text-jelly-pink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-jelly-pink transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}




