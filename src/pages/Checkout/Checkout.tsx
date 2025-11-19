import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../stores/useCartStore";
import { getJellyEmoji, JellyProduct } from "../../types/jellyProduct";
import ParticleSparkle from "../../components/motion/ParticleSparkle";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useAuth } from "../../contexts/AuthContext";
import { createOrder } from "../../services/orderService";

type PaymentMethod = "card" | "toss" | "naver" | "kakao" | "bank" | "phone";

interface DirectPurchaseState {
  directPurchase: boolean;
  product: JellyProduct;
  quantity: number;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: cartItems, getTotalPrice, clearCart, updateQuantity } = useCartStore();
  const { width, height } = useWindowSize();
  const { currentUser } = useAuth();
  
  // 직접 구매 모드인지 확인
  const directPurchaseState = location.state as DirectPurchaseState | null;
  const isDirectPurchase = directPurchaseState?.directPurchase === true;
  
  // 직접 구매 상품의 수량 관리
  const [directPurchaseQuantity, setDirectPurchaseQuantity] = useState(
    directPurchaseState?.quantity || 1
  );
  
  // 직접 구매 모드면 전달받은 상품 사용, 아니면 장바구니 상품 사용
  const items = useMemo(() => {
    if (isDirectPurchase && directPurchaseState?.product) {
      return [{
        product: directPurchaseState.product,
        quantity: directPurchaseQuantity,
      }];
    }
    return cartItems;
  }, [isDirectPurchase, directPurchaseState, cartItems, directPurchaseQuantity]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    memo: "",
  });

  // 총 상품 금액 계산
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [items]);
  
  const shippingFee = totalPrice > 30000 ? 0 : 2500; // 3만원 이상 무료배송
  const discount = 0; // 쿠폰/포인트 할인
  const finalPrice = totalPrice + shippingFee - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  // 수량 변경 핸들러
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    if (isDirectPurchase) {
      setDirectPurchaseQuantity(newQuantity);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.phone || !form.address) {
      alert("🍬 배송 정보를 모두 입력해주세요!");
      return;
    }

    if (!currentUser) {
      alert("🍬 로그인이 필요합니다!");
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    // 결제 시뮬레이션 (3초)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 주문 정보를 Firebase에 저장
    const orderNumber = `DCL-${Date.now().toString().slice(-8)}`;
    const orderData = {
      userId: currentUser.uid,
      userName: currentUser.displayName || '연구원',
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        emoji: getJellyEmoji(item.product),
      })),
      totalPrice,
      shippingFee,
      finalPrice,
      paymentMethod,
      shippingInfo: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        memo: form.memo,
      },
      orderNumber,
    };

    const result = await createOrder(orderData);
    
    if (!result.success) {
      alert('❌ 주문 처리 중 오류가 발생했습니다.');
      setIsProcessing(false);
      return;
    }
    
    setIsProcessing(false);
    setIsComplete(true);
    setShowReceipt(true);
    
    // 7초 후 자동으로 홈으로
    setTimeout(() => {
      // 장바구니에서 구매한 경우에만 장바구니 비우기
      if (!isDirectPurchase) {
        clearCart();
      }
      navigate('/');
    }, 7000);
  };

  const paymentMethods = [
    { id: "card", label: "💳 신용/체크카드", color: "from-jelly-pink to-jelly-yellow" },
    { id: "toss", label: "💙 Toss Pay", color: "from-blue-400 to-blue-600" },
    { id: "naver", label: "💚 Naver Pay", color: "from-green-400 to-green-600" },
    { id: "kakao", label: "💛 Kakao Pay", color: "from-yellow-400 to-yellow-600" },
    { id: "bank", label: "🏦 무통장입금", color: "from-gray-400 to-gray-600" },
    { id: "phone", label: "📱 휴대폰 결제", color: "from-purple-400 to-purple-600" },
  ] as const;

  // 장바구니 비었을 때
  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-gradient-to-br from-lab-cream to-jelly-yellow/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-title text-text-choco mb-4">
            장바구니가 비어있어요!
          </h1>
          <p className="text-text-rosegray font-body mb-8">
            먼저 젤리를 담아주세요 🍬
          </p>
          <button
            onClick={() => navigate('/product')}
            className="px-8 py-4 bg-gradient-to-r from-jelly-pink to-jelly-yellow rounded-jelly text-white font-title shadow-jelly hover:shadow-xl transition-all"
          >
            젤리 보러가기 →
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8fa] via-[#fffdf9] to-[#fef9f6] relative overflow-hidden">
      <ParticleSparkle count={30} />
      
      {/* Confetti */}
      {isComplete && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      
      <div className="relative z-10 pt-32 pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <header className="bg-gradient-to-r from-[#ffc7da] to-[#fff2b1] rounded-t-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <h1 className="text-3xl md:text-4xl font-logo text-[#543d3d] flex items-center gap-3 mb-2">
                <span className="text-4xl">💳</span>
                {isDirectPurchase ? '바로 구매' : '결제하기'}
              </h1>
              <p className="text-[#543d3d]/70 font-body text-sm">
                {isDirectPurchase 
                  ? '선택한 상품을 바로 구매합니다 🚀' 
                  : 'Dream Candy Lab Sweet Checkout ✨'
                }
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#543d3d]/60 font-label">주문번호</p>
              <p className="text-lg font-number text-[#543d3d] font-bold">
                DCL-{Date.now().toString().slice(-8)}
              </p>
            </div>
          </header>

          <form onSubmit={handleCheckout}>
            <div className="bg-white/80 backdrop-blur-lg border-x-2 border-b-2 border-[#ffe4ec] shadow-[0_8px_30px_rgba(255,182,193,0.25)] rounded-b-[2rem] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-10">
                {/* Left: 상품 정보 & 배송 정보 & 결제 방법 */}
                <section className="lg:col-span-2 space-y-6">
                  {/* 1️⃣ 상품 정보 */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border-2 border-[#ffdce8] rounded-2xl p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-title text-[#5a3e3e] mb-5 flex items-center gap-2">
                      <span>🍬</span>
                      <span>상품 정보</span>
                    </h2>
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="pb-4 border-b border-[#ffdce8] last:border-0"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-jelly-yellow/30 to-jelly-pink/30 flex items-center justify-center shadow-sm">
                                <span className="text-3xl">{getJellyEmoji(item.product)}</span>
                              </div>
                              <div>
                                <p className="font-title text-[#5e3b3b] mb-1">{item.product.name}</p>
                                <p className="text-sm text-[#a67c7c] font-body">
                                  개당 ₩{item.product.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <p className="font-number font-bold text-[#ff6699] text-lg">
                              ₩{(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          
                          {/* 수량 조절 */}
                          <div className="flex items-center gap-2 ml-20">
                            <span className="text-sm text-[#a67c7c] font-label">수량</span>
                            <div className="flex items-center border border-[#ffdce8] rounded-lg overflow-hidden">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                className="px-3 py-1 bg-[#fff6f9] hover:bg-[#ffe7ee] transition-colors text-[#ff6699] font-bold text-sm"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 font-number text-[#5e3b3b] font-medium bg-white min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="px-3 py-1 bg-[#fff6f9] hover:bg-[#ffe7ee] transition-colors text-[#ff6699] font-bold text-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 2️⃣ 배송 정보 */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white border-2 border-[#ffdce8] rounded-2xl p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-title text-[#5a3e3e] mb-5 flex items-center gap-2">
                      <span>📦</span>
                      <span>배송 정보</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#a67c7c] font-label mb-2">받는 사람</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="예: 김젤리"
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#ffd6e0] focus:ring-2 focus:ring-[#ffb1c8] focus:border-[#ffb1c8] outline-none transition-all font-body"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[#a67c7c] font-label mb-2">연락처</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="010-1234-5678"
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#ffd6e0] focus:ring-2 focus:ring-[#ffb1c8] focus:border-[#ffb1c8] outline-none transition-all font-body"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[#a67c7c] font-label mb-2">배송 주소</label>
                        <textarea
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          rows={2}
                          placeholder="서울특별시 젤리구 캔디로 77"
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#ffd6e0] focus:ring-2 focus:ring-[#ffb1c8] focus:border-[#ffb1c8] outline-none transition-all font-body resize-none"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[#a67c7c] font-label mb-2">배송 메모 (선택)</label>
                        <input
                          name="memo"
                          value={form.memo}
                          onChange={handleChange}
                          placeholder="예: 문 앞에 놔주세요"
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#ffd6e0] focus:ring-2 focus:ring-[#ffb1c8] focus:border-[#ffb1c8] outline-none transition-all font-body"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* 3️⃣ 결제 방법 */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white border-2 border-[#ffdce8] rounded-2xl p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-title text-[#5a3e3e] mb-5 flex items-center gap-2">
                      <span>💳</span>
                      <span>결제 방법</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {paymentMethods.map((method, index) => (
                        <motion.button
                          key={method.id}
                          type="button"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`rounded-xl py-3 px-2 font-label text-sm transition-all ${
                            paymentMethod === method.id
                              ? `bg-gradient-to-r ${method.color} text-white shadow-lg`
                              : "bg-[#fff6f9] text-[#775555] border-2 border-[#ffdce8] hover:bg-[#fff0f3]"
                          }`}
                        >
                          {method.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </section>

                {/* Right: 결제 요약 */}
                <motion.aside
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:sticky lg:top-32 h-fit"
                >
                  <div className="bg-gradient-to-br from-white via-jelly-yellow/5 to-jelly-pink/5 border-2 border-[#ffdce8] rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                    <h2 className="text-xl font-title text-[#5a3e3e] mb-5 flex items-center gap-2">
                      <span>🧪</span>
                      <span>결제 요약</span>
                    </h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-[#5e3b3b] font-body">
                        <span>상품금액</span>
                        <span className="font-number">₩{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#5e3b3b] font-body">
                        <span>배송비</span>
                        <span className="font-number">
                          {shippingFee === 0 ? (
                            <span className="text-jelly-mint font-bold">무료</span>
                          ) : (
                            `₩${shippingFee.toLocaleString()}`
                          )}
                        </span>
                      </div>
                      {shippingFee > 0 && (
                        <p className="text-xs text-jelly-mint font-label">
                          💡 3만원 이상 무료배송!
                        </p>
                      )}
                      {discount > 0 && (
                        <div className="flex justify-between text-jelly-pink font-body">
                          <span>할인금액</span>
                          <span className="font-number">-₩{discount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-jelly-pink/10 to-jelly-yellow/10 rounded-xl p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="font-title text-[#5a3e3e] text-lg">총 결제금액</span>
                        <span className="font-number text-[#ff5c8a] text-2xl font-extrabold">
                          ₩{finalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      whileHover={{ scale: isProcessing ? 1 : 1.03 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.97 }}
                      className="w-full py-4 bg-gradient-to-r from-[#ff7fa2] to-[#ffd29f] text-white text-lg font-title rounded-2xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: isProcessing ? '100%' : '-100%' }}
                        transition={{ duration: 1, repeat: isProcessing ? Infinity : 0 }}
                      />
                      <span className="relative z-10">
                        {isProcessing ? '💫 결제 처리 중...' : '🍭 결제 완료하기'}
                      </span>
                    </motion.button>

                    <p className="text-xs text-center text-[#a67c7c] font-body mt-4 leading-relaxed">
                      테스트 결제 페이지입니다.<br />실제 결제가 진행되지 않습니다 🍬
                    </p>
                  </div>

                  {/* 처리 중 애니메이션 */}
                  <AnimatePresence>
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 text-center bg-white/90 backdrop-blur-md border-2 border-jelly-mint/30 rounded-2xl p-6"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="text-6xl mb-3"
                        >
                          🍬
                        </motion.div>
                        <p className="text-text-choco font-label text-lg mb-1">
                          결제를 처리하고 있어요...
                        </p>
                        <p className="text-text-rosegray font-body text-sm">
                          잠시만 기다려주세요! ✨
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.aside>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* 영수증 팝업 */}
      <AnimatePresence>
        {showReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowReceipt(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1, 1.2, 1]
                }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                className="text-8xl text-center mb-6"
              >
                🎉
              </motion.div>
              
              <h2 className="text-3xl font-logo text-text-choco text-center mb-3">
                결제 완료!
              </h2>
              <p className="text-center text-text-rosegray font-body mb-6">
                젤리가 곧 배송됩니다 🚚💨
              </p>

              <div className="bg-gradient-to-br from-jelly-yellow/10 to-jelly-pink/10 rounded-2xl p-6 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-rosegray font-label">주문번호</span>
                    <span className="font-number text-text-choco font-bold">
                      DCL-{Date.now().toString().slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-rosegray font-label">결제금액</span>
                    <span className="font-number text-jelly-pink font-bold">
                      ₩{finalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-rosegray font-label">결제방법</span>
                    <span className="font-body text-text-choco">
                      {paymentMethods.find(m => m.id === paymentMethod)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-rosegray font-label">받는 사람</span>
                    <span className="font-body text-text-choco">{form.name}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowReceipt(false);
                    // 장바구니에서 구매한 경우에만 장바구니 비우기
                    if (!isDirectPurchase) {
                      clearCart();
                    }
                    navigate('/mypage');
                  }}
                  className="w-full py-4 bg-gradient-to-r from-jelly-pink to-jelly-yellow text-white font-title rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  마이페이지에서 확인하기 💳
                </button>
                <button
                  onClick={() => {
                    setShowReceipt(false);
                    // 장바구니에서 구매한 경우에만 장바구니 비우기
                    if (!isDirectPurchase) {
                      clearCart();
                    }
                    navigate('/');
                  }}
                  className="w-full py-3 bg-white text-text-choco font-label rounded-2xl border-2 border-gray-200 hover:bg-gray-50 transition-all"
                >
                  홈으로 돌아가기 🏠
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
