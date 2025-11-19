import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../../components/layout/Container";
import Card from "../../components/ui/Card";
import Chip from "../../components/ui/Chip";
import { jellyProducts } from "../../data/jellyProducts";

export default function Product() {
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
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-lab-cream to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-logo text-text-choco mb-4">
            🍬 Dream Candy Collection
          </h1>
          <p className="text-text-rosegray font-label text-lg mb-8">
            우리 연구소에서 정성껏 만든 특별한 젤리들
          </p>

          {/* 필터 버튼 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-label text-sm transition-all duration-300 ${
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
            <Link key={product.id} to={`/product/${product.id}`}>
              <motion.div
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
                  </motion.div>

                  <h3 className="font-title text-xl text-text-choco mb-2">
                    {product.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.tags.slice(0, 2).map((tag) => (
                      <Chip key={tag} label={tag} color={product.color} size="sm" />
                    ))}
                  </div>

                  <p className="text-sm text-text-rosegray font-body mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-text-rosegray/10">
                    <span className="font-number text-2xl text-text-choco">
                      ₩{product.price.toLocaleString()}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-2xl cursor-pointer"
                    >
                      👀
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}

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




