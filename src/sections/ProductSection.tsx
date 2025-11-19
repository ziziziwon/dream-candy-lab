import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Container from "../components/layout/Container";
import { jellyProducts } from "../data/jellyProducts";
import Button from "../components/ui/Button";

export default function ProductSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = ['all', 'strawberry', 'lemon', 'mint', 'grape'];
  const filterLabels: Record<string, string> = {
    all: '전체',
    strawberry: '딸기',
    lemon: '레몬',
    mint: '민트',
    grape: '포도',
  };

  const filteredProducts = selectedFilter === 'all' 
    ? jellyProducts 
    : jellyProducts.filter(p => p.flavor === selectedFilter);

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-white to-lab-cream relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-jelly-yellow rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-jelly-pink rounded-full blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-title text-text-choco mb-4">
            🍬 달콤한 젤리들
          </h2>
          <p className="text-text-rosegray font-body text-lg mb-8">
            우리 연구소에서 정성껏 만든 특별한 젤리들을 만나보세요
          </p>

          {/* 필터 버튼 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-jelly-yellow to-jelly-pink text-white shadow-jelly'
                    : 'bg-white text-text-rosegray border-2 border-text-rosegray/20 hover:border-jelly-pink/50'
                }`}
              >
                {filterLabels[filter]}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Card>
                {/* 제품 이미지 대체 (색상 원) */}
                <motion.div
                  className="w-full h-48 rounded-lab mb-4 flex items-center justify-center text-6xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, 
                      var(--jelly-${product.color}) 0%, 
                      ${getSecondaryColor(product.color)} 100%)`,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {getFlavorEmoji(product.flavor)}
                  
                  {/* 반짝임 표시 */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {Array.from({ length: product.shine }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-xs"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                      >
                        ✨
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* 제품명 */}
                <h3 className="font-title text-xl text-text-choco mb-2">
                  {product.name}
                </h3>

                {/* 태그들 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags.slice(0, 2).map((tag) => (
                    <Chip key={tag} label={tag} color={product.color} size="sm" />
                  ))}
                </div>

                {/* 설명 */}
                <p className="text-sm text-text-rosegray font-body mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* 특성 바 */}
                <div className="space-y-2 mb-4 text-xs font-body">
                  <PropertyBar label="달콤함" value={product.sweetness} color="pink" />
                  <PropertyBar label="부드러움" value={product.softness} color="lavender" />
                </div>

                {/* 가격 & 버튼 */}
                <div className="flex items-center justify-between pt-4 border-t border-text-rosegray/10">
                  <span className="font-number text-2xl text-text-choco">
                    ₩{product.price.toLocaleString()}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-jelly-pink to-jelly-lavender flex items-center justify-center text-white shadow-jelly"
                  >
                    🛒
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// 특성 바 컴포넌트
function PropertyBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-text-rosegray">{label}</span>
        <span className="text-text-choco font-medium">{value}/5</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / 5) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r from-jelly-${color} to-jelly-pink rounded-full`}
        />
      </div>
    </div>
  );
}

// 맛에 따른 이모지 반환
function getFlavorEmoji(flavor: string): string {
  const emojiMap: Record<string, string> = {
    strawberry: '🍓',
    lemon: '🍋',
    mint: '🍏',
    grape: '🍇',
    peach: '🍑',
    apple: '🍎',
    orange: '🍊',
  };
  return emojiMap[flavor] || '🍬';
}

// 보조 색상 반환
function getSecondaryColor(color: string): string {
  const colorMap: Record<string, string> = {
    yellow: '#FFE566',
    pink: '#FFB6C1',
    mint: '#D4FFC8',
    lavender: '#E0D3FF',
    red: '#FF6B6B',
    orange: '#FFB347',
  };
  return colorMap[color] || '#FFFFFF';
}





