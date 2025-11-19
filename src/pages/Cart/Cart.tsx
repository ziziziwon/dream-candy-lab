import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import { useCartStore } from "../../stores/useCartStore";

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  const totalPrice = getTotalPrice();
  const shippingFee = totalPrice >= 30000 ? 0 : 2500; // 3만원 이상 무료배송
  const finalPrice = totalPrice + shippingFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">🧺</div>
            <h1 className="text-4xl font-logo text-text-choco mb-4">
              장바구니가 비어있어요
            </h1>
            <p className="text-text-rosegray font-body mb-8">
              달콤한 젤리를 담아보세요!
            </p>
            <Button 
              label="제품 보러가기" 
              onClick={() => navigate('/product')}
            />
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-lab-cream to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-logo text-text-choco mb-12 text-center">
            🧺 장바구니
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 장바구니 아이템 */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="bg-white/70 backdrop-blur-sm rounded-lab p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-6">
                      {/* 제품 이미지 */}
                      <div
                        className="w-24 h-24 rounded-lg flex items-center justify-center text-4xl flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, var(--jelly-${item.product.color}), transparent)`,
                        }}
                      >
                        {getFlavorEmoji(item.product.flavor)}
                      </div>

                      {/* 제품 정보 */}
                      <div className="flex-1">
                        <h3 className="font-title text-xl text-text-choco mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-text-rosegray font-body text-sm mb-2">
                          {item.product.flavor}
                        </p>
                        <p className="font-number text-lg text-jelly-pink">
                          ₩{item.product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* 수량 조절 */}
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-jelly-pink/20 flex items-center justify-center text-jelly-pink font-title"
                        >
                          -
                        </motion.button>
                        <span className="font-number text-xl w-8 text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-jelly-mint/30 flex items-center justify-center text-green-700 font-title"
                        >
                          +
                        </motion.button>
                      </div>

                      {/* 삭제 버튼 */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.product.id)}
                        className="text-2xl"
                      >
                        🗑️
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/70 backdrop-blur-sm rounded-lab p-6 shadow-jelly sticky top-32"
              >
                <h2 className="font-title text-2xl text-text-choco mb-6">
                  주문 요약
                </h2>

                <div className="space-y-3 mb-6 font-body">
                  <div className="flex justify-between text-text-rosegray">
                    <span>상품 금액</span>
                    <span className="font-number">₩{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-rosegray">
                    <span>배송비</span>
                    {shippingFee === 0 ? (
                      <span className="text-jelly-mint font-bold">무료 🎉</span>
                    ) : (
                      <span className="font-number">₩{shippingFee.toLocaleString()}</span>
                    )}
                  </div>
                  
                  {/* 무료배송 안내 */}
                  {shippingFee > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-jelly-yellow/20 to-jelly-pink/20 rounded-lg p-3 text-center border border-jelly-pink/30"
                    >
                      <p className="text-xs text-text-choco font-label mb-1">
                        🚚 무료배송까지
                      </p>
                      <p className="text-sm font-number font-bold text-jelly-pink">
                        ₩{(30000 - totalPrice).toLocaleString()} 남았어요!
                      </p>
                    </motion.div>
                  )}
                  
                  {shippingFee === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-jelly-mint/20 to-jelly-lavender/20 rounded-lg p-3 text-center border border-jelly-mint/30"
                    >
                      <p className="text-sm text-text-choco font-label">
                        ✨ 무료배송 혜택이 적용되었어요!
                      </p>
                    </motion.div>
                  )}
                  
                  <div className="border-t border-text-rosegray/20 pt-3 flex justify-between font-title text-xl text-text-choco">
                    <span>총 결제금액</span>
                    <span className="text-jelly-pink font-number">₩{finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  label="결제하기 💳" 
                  onClick={() => navigate('/checkout')}
                  className="w-full"
                />

                <Link to="/product">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full mt-3 py-3 text-text-rosegray font-body text-sm hover:text-jelly-pink transition-colors"
                  >
                    ← 계속 쇼핑하기
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
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






