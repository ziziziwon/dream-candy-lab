import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import Chip from "../../components/ui/Chip";
import { jellyProducts } from "../../data/jellyProducts";
import { useCartStore } from "../../stores/useCartStore";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = React.useState(1);
  
  const product = jellyProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-logo text-text-choco mb-4">제품을 찾을 수 없어요 😢</h1>
          <Button label="돌아가기" onClick={() => navigate('/product')} />
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    // 애니메이션 효과
  };
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <Container>
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/product')}
          className="flex items-center gap-2 text-text-rosegray font-label mb-8 hover:text-jelly-pink transition-colors"
        >
          ← 돌아가기
        </motion.button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 제품 이미지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-full aspect-square rounded-lab flex items-center justify-center text-9xl"
              style={{
                background: `linear-gradient(135deg, 
                  var(--jelly-${product.color}) 0%, 
                  ${getSecondaryColor(product.color)} 100%)`,
              }}
            >
              {getFlavorEmoji(product.flavor)}
            </div>
          </motion.div>

          {/* 제품 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
                <Chip key={tag} label={tag} color={product.color} size="sm" />
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-logo text-text-choco mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-number text-jelly-pink mb-6">
              ₩{product.price.toLocaleString()}
            </p>

            {/* 수량 선택 */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-label text-text-rosegray">수량</span>
              <div className="flex items-center border-2 border-jelly-pink/30 rounded-xl overflow-hidden">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 bg-jelly-pink/10 hover:bg-jelly-pink/20 transition-colors font-bold text-jelly-pink"
                >
                  -
                </button>
                <span className="px-6 py-2 font-number text-lg font-bold text-text-choco">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 bg-jelly-pink/10 hover:bg-jelly-pink/20 transition-colors font-bold text-jelly-pink"
                >
                  +
                </button>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-label text-text-rosegray mb-1">총 금액</p>
                <p className="text-2xl font-number text-jelly-pink font-bold">
                  ₩{(product.price * quantity).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-text-rosegray font-body text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* 특성 */}
            <div className="space-y-4 mb-8">
              <PropertyBar label="달콤함" value={product.sweetness} />
              <PropertyBar label="부드러움" value={product.softness} />
              <PropertyBar label="반짝임" value={product.shine} />
            </div>

            {/* 캐릭터 추천 */}
            {product.character && (
              <div className="bg-gradient-to-r from-jelly-yellow/10 to-jelly-pink/10 rounded-lab p-4 mb-8">
                <p className="font-label text-sm text-text-rosegray">
                  <strong>{product.character}</strong>가 추천하는 젤리예요! 🍬
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-4">
              <Button 
                label="장바구니에 담기 🛒" 
                onClick={handleAddToCart}
                className="flex-1"
              />
              <Button 
                label="바로 구매" 
                variant="secondary"
                onClick={() => navigate('/checkout', { 
                  state: { directPurchase: true, product, quantity } 
                })}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

function PropertyBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between mb-2 font-label">
        <span className="text-text-rosegray">{label}</span>
        <span className="text-text-choco font-medium">{value}/5</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-jelly-pink to-jelly-yellow rounded-full"
        />
      </div>
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






