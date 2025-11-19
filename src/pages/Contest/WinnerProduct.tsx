import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import ParticleSparkle from "../../components/motion/ParticleSparkle";
import { getWinnerJelly, type JellyData } from "../../services/jellyStorage";
import { useCartStore } from "../../stores/useCartStore";

export default function WinnerProduct() {
  const navigate = useNavigate();
  const [winner, setWinner] = useState<JellyData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const winnerJelly = getWinnerJelly();
    setWinner(winnerJelly);
  }, []);

  if (!winner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-title text-text-choco mb-4">
              아직 우승 젤리가 결정되지 않았습니다 🍬
            </h2>
            <p className="text-text-rosegray font-body mb-6">
              콘테스트에 참여하고 투표해주세요!
            </p>
            <Button
              label="콘테스트 참여하기"
              onClick={() => navigate('/contest')}
            />
          </div>
        </Container>
      </div>
    );
  }

  const getFlavorEmoji = (flavor: string) => {
    const map: Record<string, string> = {
      strawberry: '🍓',
      lemon: '🍋',
      grape: '🍇',
      apple: '🍏',
      peach: '🍑',
      orange: '🍊',
    };
    return map[flavor] || '🍬';
  };

  const getFlavorName = (flavor: string) => {
    const map: Record<string, string> = {
      strawberry: '딸기',
      lemon: '레몬',
      grape: '포도',
      apple: '사과',
      peach: '복숭아',
      orange: '오렌지',
    };
    return map[flavor] || flavor;
  };

  const getTextureLabel = (texture: string) => {
    const map: Record<string, string> = {
      soft: '부드러움 ☁️',
      chewy: '쫄깃함 🎯',
      bouncy: '탱글탱글 ⚡',
    };
    return map[texture] || texture;
  };

  const handleAddToCart = () => {
    const product = {
      id: `winner_${winner.id}`,
      name: `${getFlavorName(winner.flavor)} 우승 젤리`,
      flavor: winner.flavor as any,
      color: 'pink' as any,
      description: `${winner.votes}표를 받아 우승한 Dream Candy Lab의 걸작`,
      price: 15900,
      image: '',
      sweetness: Math.floor(winner.sweetness / 20),
      softness: winner.texture === 'soft' ? 5 : winner.texture === 'chewy' ? 3 : 4,
      shine: 5,
      inStock: true,
      tags: ['우승작', '한정판', getFlavorName(winner.flavor)],
    };
    addToCart(product, quantity);
    alert(`🎉 장바구니에 ${quantity}개 추가되었습니다!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jelly-yellow/10 via-lab-cream to-jelly-pink/10">
      <ParticleSparkle count={60} />
      
      <Container>
        <div className="pt-32 pb-24">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-white font-title mb-4">
              🏆 CONTEST WINNER
            </div>
            <h1 className="text-5xl md:text-6xl font-logo text-text-choco mb-4">
              {getFlavorEmoji(winner.flavor)} {getFlavorName(winner.flavor)} 우승 젤리
            </h1>
            <p className="text-xl text-text-rosegray font-body max-w-2xl mx-auto">
              {winner.votes}표를 받아 우승한 Dream Candy Lab의 걸작!<br />
              이제 실제 제품으로 만나보세요 ✨
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 왼쪽: 제품 이미지 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-md rounded-lab p-12 shadow-jelly"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex justify-center"
              >
                {/* 젤리 이미지 */}
                <div
                  className="w-80 h-80 rounded-full relative"
                  style={{
                    background: `linear-gradient(135deg, ${winner.color} 0%, ${winner.color}CC 100%)`,
                    boxShadow: `0 30px 80px ${winner.color}88, inset 0 -20px 40px rgba(0,0,0,0.1), inset 0 20px 40px rgba(255,255,255,0.6)`,
                  }}
                >
                  {/* 하이라이트 */}
                  <div className="absolute top-16 left-16 w-24 h-24 bg-white/50 rounded-full blur-2xl" />
                  
                  {/* 우승 배지 */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-4xl shadow-xl">
                    🏆
                  </div>
                </div>

                {/* 반짝임 */}
                <motion.div
                  className="absolute -top-4 -left-4 text-5xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -right-4 text-5xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 오른쪽: 제품 정보 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/70 backdrop-blur-md rounded-lab p-8 shadow-jelly mb-6">
                <h2 className="font-title text-3xl text-text-choco mb-4">
                  제품 정보
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-label text-text-rosegray">풍미</span>
                    <span className="font-title text-text-choco">
                      {getFlavorEmoji(winner.flavor)} {getFlavorName(winner.flavor)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label text-text-rosegray">질감</span>
                    <span className="font-title text-text-choco">
                      {getTextureLabel(winner.texture)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label text-text-rosegray">단맛</span>
                    <span className="font-title text-text-choco">{winner.sweetness}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label text-text-rosegray">신맛</span>
                    <span className="font-title text-text-choco">{winner.sourness}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label text-text-rosegray">투표수</span>
                    <span className="font-title text-jelly-pink">❤️ {winner.votes}표</span>
                  </div>
                </div>

                {winner.creatorName && (
                  <div className="bg-jelly-yellow/10 rounded-lg p-4 mb-6">
                    <p className="font-label text-sm text-text-rosegray mb-1">
                      🏅 크리에이터
                    </p>
                    <p className="font-title text-lg text-text-choco">
                      {winner.creatorName}
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="font-label text-text-rosegray">가격</span>
                    <div className="text-right">
                      <span className="font-title text-4xl text-text-choco">
                        15,900
                      </span>
                      <span className="font-label text-xl text-text-rosegray ml-1">
                        원
                      </span>
                    </div>
                  </div>

                  {/* 수량 선택 */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-label text-text-choco">수량</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-title text-xl"
                      >
                        -
                      </button>
                      <span className="font-title text-2xl text-text-choco w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-title text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 구매 버튼 */}
                  <div className="space-y-3">
                    <Button
                      label={`장바구니 담기 (${(15900 * quantity).toLocaleString()}원)`}
                      size="lg"
                      onClick={handleAddToCart}
                      className="w-full"
                    />
                    <button
                      onClick={() => navigate('/contest')}
                      className="w-full py-3 text-text-rosegray font-label hover:text-text-choco transition-colors"
                    >
                      ← 콘테스트로 돌아가기
                    </button>
                  </div>
                </div>
              </div>

              {/* 상세 설명 */}
              <div className="bg-white/70 backdrop-blur-md rounded-lab p-8 shadow-jelly">
                <h3 className="font-title text-2xl text-text-choco mb-4">
                  🍬 제품 특징
                </h3>
                <ul className="space-y-3 font-body text-text-rosegray">
                  <li className="flex items-start gap-2">
                    <span className="text-jelly-pink mt-1">✓</span>
                    <span>Dream Candy Lab 콘테스트에서 {winner.votes}표를 획득한 우승작</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jelly-yellow mt-1">✓</span>
                    <span>실제 실험실에서 개발한 레시피로 제작</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jelly-mint mt-1">✓</span>
                    <span>프리미엄 천연 재료만 사용</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jelly-lavender mt-1">✓</span>
                    <span>한정판 제품 (수량 한정)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jelly-pink mt-1">✓</span>
                    <span>무료 배송 (30,000원 이상 구매 시)</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}

