import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Container from "../../components/layout/Container";
import ParticleSparkle from "../../components/motion/ParticleSparkle";
import { getUserOrders, OrderData, getOrderStatusText, getOrderStatusEmoji } from "../../services/orderService";
import { getMyJellies, JellyData, deleteJelly } from "../../services/jellyService";
import { JellyProduct } from "../../types/jellyProduct";
import { useCartStore } from "../../stores/useCartStore";

type TabType = 'orders' | 'jellies' | 'profile';

export default function MyPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [jellies, setJellies] = useState<JellyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingJellyId, setDeletingJellyId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      alert('🍬 로그인이 필요합니다!');
      navigate('/login');
      return;
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, navigate]);

  const loadData = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      console.log('🔍 마이페이지 데이터 로딩 시작...');
      console.log('👤 현재 사용자:', currentUser.uid, currentUser.displayName);
      
      const [ordersData, jelliesData] = await Promise.all([
        getUserOrders(currentUser.uid),
        getMyJellies(currentUser.uid),
      ]);
      
      console.log('📦 주문 내역:', ordersData.length, '개');
      console.log('🧪 내 젤리:', jelliesData.length, '개');
      
      setOrders(ordersData);
      setJellies(jelliesData);
      
      if (ordersData.length === 0) {
        console.log('💡 팁: 결제 내역이 없습니다. /product 페이지에서 상품을 구매해보세요!');
      }
      
      if (jelliesData.length === 0) {
        console.log('💡 팁: 만든 젤리가 없습니다. /lab/make 페이지에서 젤리를 만들어보세요!');
      }
    } catch (error) {
      console.error('❌ 데이터 로딩 오류:', error);
      
      // Firebase 인덱스 관련 에러인지 확인
      if (error instanceof Error && error.message.includes('index')) {
        alert('🔥 Firebase 인덱스가 필요합니다!\n\n브라우저 콘솔의 링크를 클릭하여 인덱스를 생성해주세요.\n\n또는 MYPAGE_DEBUG.md 파일을 참고하세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDeleteJelly = async (jellyId: string, jellyName: string) => {
    if (!window.confirm(`"${jellyName}" 젤리를 정말 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }

    try {
      setDeletingJellyId(jellyId);
      const success = await deleteJelly(jellyId);
      
      if (success) {
        alert('✅ 젤리가 삭제되었습니다!');
        await loadData();
      } else {
        alert('❌ 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting jelly:', error);
      alert('❌ 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingJellyId(null);
    }
  };

  const getFlavorEmoji = (flavor: string) => {
    const emojiMap: Record<string, string> = {
      strawberry: '🍓',
      grape: '🍇',
      lemon: '🍋',
      peach: '🍑',
      mint: '🌿',
      blueberry: '🫐',
      orange: '🍊',
      watermelon: '🍉',
      cherry: '🍒',
      apple: '🍎',
    };
    return emojiMap[flavor] || '🍬';
  };

  const getFlavorName = (flavor: string) => {
    const map: Record<string, string> = {
      strawberry: '딸기',
      lemon: '레몬',
      grape: '포도',
      apple: '사과',
      peach: '복숭아',
      orange: '오렌지',
      mint: '민트',
      blueberry: '블루베리',
      watermelon: '수박',
      cherry: '체리',
    };
    return map[flavor] || flavor;
  };

  const addToCart = useCartStore((state) => state.addItem);

  // 내가 만든 젤리를 상품으로 변환
  const convertJellyToProduct = (jelly: JellyData): JellyProduct => {
    return {
      id: `custom_${jelly.id}`,
      name: jelly.name,
      flavor: jelly.flavor as any,
      color: 'pink' as any,
      description: `${currentUser?.displayName || '나'}가 만든 커스텀 젤리입니다!`,
      price: 9900, // 커스텀 젤리 가격
      sweetness: Math.floor(jelly.sweetness / 20),
      softness: jelly.texture === 'soft' ? 5 : jelly.texture === 'chewy' ? 3 : 4,
      shine: 5,
      inStock: true,
      tags: ['커스텀', getFlavorName(jelly.flavor), '나만의 젤리'],
    };
  };

  const handleAddJellyToCart = (jelly: JellyData) => {
    const product = convertJellyToProduct(jelly);
    addToCart(product, 1);
    alert(`🎉 "${jelly.name}" 젤리가 장바구니에 담겼습니다!`);
  };

  const handleBuyJellyNow = (jelly: JellyData) => {
    const product = convertJellyToProduct(jelly);
    navigate('/checkout', {
      state: { directPurchase: true, product, quantity: 1 }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lab-cream to-jelly-yellow/10">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🍬
          </motion.div>
          <p className="font-label text-text-choco">정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8fa] via-[#fffdf9] to-[#fef9f6] relative overflow-hidden">
      <ParticleSparkle count={40} />
      
      <Container className="relative z-10 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-logo text-text-choco mb-4">
            👤 마이페이지
          </h1>
          <p className="text-lg text-text-rosegray font-body mb-6">
            {currentUser?.displayName || '연구원'}님의 Dream Candy Lab
          </p>
          
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-jelly mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-jelly-yellow to-jelly-pink flex items-center justify-center shadow-lg">
                <span className="text-3xl">👤</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-title text-xl text-text-choco">{currentUser?.displayName || '연구원'}</p>
                <p className="text-sm text-text-rosegray font-body">{currentUser?.email}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-jelly-mint/20 to-jelly-lavender/20 rounded-lg font-label text-sm text-text-choco hover:from-jelly-mint/30 hover:to-jelly-lavender/30 transition-all"
              >
                로그아웃
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-3 rounded-xl font-title text-lg transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-jelly-pink to-jelly-yellow text-white shadow-jelly'
                : 'bg-white/70 text-text-choco hover:bg-white/90'
            }`}
          >
            💳 결제 내역 ({orders.length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('jellies')}
            className={`px-8 py-3 rounded-xl font-title text-lg transition-all ${
              activeTab === 'jellies'
                ? 'bg-gradient-to-r from-jelly-mint to-jelly-lavender text-white shadow-jelly'
                : 'bg-white/70 text-text-choco hover:bg-white/90'
            }`}
          >
            🧪 내 젤리 ({jellies.length})
          </motion.button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {orders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-xl font-label text-text-choco mb-4">
                    아직 주문 내역이 없습니다
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/product')}
                    className="px-8 py-4 bg-gradient-to-r from-jelly-pink to-jelly-yellow rounded-jelly text-white font-title shadow-jelly hover:shadow-xl transition-all"
                  >
                    젤리 구경하러 가기 →
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      {/* Order Header */}
                      <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
                        <div>
                          <p className="font-title text-lg text-text-choco mb-1">
                            주문번호: {order.orderNumber}
                          </p>
                          <p className="text-sm text-text-rosegray font-body">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg font-label text-sm ${
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {getOrderStatusEmoji(order.status)} {getOrderStatusText(order.status)}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-jelly-yellow/30 to-jelly-pink/30 flex items-center justify-center">
                                <span className="text-2xl">{item.emoji || '🍬'}</span>
                              </div>
                              <div>
                                <p className="font-body text-text-choco">{item.productName}</p>
                                <p className="text-sm text-text-rosegray font-label">
                                  수량: {item.quantity}개
                                </p>
                              </div>
                            </div>
                            <p className="font-number text-text-choco font-bold">
                              ₩{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gradient-to-r from-jelly-yellow/10 to-jelly-pink/10 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-text-rosegray font-label">상품금액</span>
                          <span className="font-number text-text-choco">
                            ₩{order.totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-text-rosegray font-label">배송비</span>
                          <span className="font-number text-text-choco">
                            {order.shippingFee === 0 ? (
                              <span className="text-jelly-mint font-bold">무료</span>
                            ) : (
                              `₩${order.shippingFee.toLocaleString()}`
                            )}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-title text-text-choco">총 결제금액</span>
                            <span className="font-number text-jelly-pink text-xl font-bold">
                              ₩{order.finalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-text-rosegray font-label mb-2">📦 배송 정보</p>
                        <div className="text-sm text-text-choco font-body space-y-1">
                          <p>• 받는 사람: {order.shippingInfo.name}</p>
                          <p>• 연락처: {order.shippingInfo.phone}</p>
                          <p>• 주소: {order.shippingInfo.address}</p>
                          {order.shippingInfo.memo && (
                            <p>• 메모: {order.shippingInfo.memo}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'jellies' && (
            <motion.div
              key="jellies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {jellies.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🧪</div>
                  <p className="text-xl font-label text-text-choco mb-4">
                    아직 만든 젤리가 없습니다
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/lab/make')}
                    className="px-8 py-4 bg-gradient-to-r from-jelly-mint to-jelly-lavender rounded-jelly text-white font-title shadow-jelly hover:shadow-xl transition-all"
                  >
                    첫 젤리 만들러 가기 →
                  </motion.button>
                </motion.div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {jellies.map((jelly, index) => {
                    const isDeleting = deletingJellyId === jelly.id;
                    return (
                    <motion.div
                      key={jelly.id}
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/70 backdrop-blur-md rounded-lab p-6 shadow-jelly hover:shadow-xl transition-all relative"
                    >
                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteJelly(jelly.id, jelly.name)}
                        disabled={isDeleting}
                        className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg text-white hover:from-red-500 hover:to-red-700 transition-all disabled:opacity-50"
                        title="젤리 삭제"
                      >
                        {isDeleting ? '⏳' : '🗑️'}
                      </motion.button>
                      {/* Jelly Preview */}
                      <div className="mb-4 flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
                          className="relative w-32 h-32 rounded-jelly flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${jelly.color}dd, ${jelly.color})`,
                            boxShadow: `0 10px 30px ${jelly.color}66`,
                          }}
                        >
                          <div
                            className="absolute top-4 left-4 w-8 h-8 rounded-full opacity-40"
                            style={{
                              background: 'radial-gradient(circle, white 0%, transparent 70%)',
                            }}
                          />
                          <span className="text-4xl">{getFlavorEmoji(jelly.flavor)}</span>
                        </motion.div>
                      </div>

                      {/* Jelly Info */}
                      <div className="text-center mb-4">
                        <h3 className="text-2xl font-title text-text-choco mb-2">
                          {jelly.name}
                        </h3>
                        <p className="text-sm text-text-rosegray font-body mb-1">
                          맛: {jelly.flavor} {getFlavorEmoji(jelly.flavor)}
                        </p>
                        <p className="text-sm text-text-rosegray font-body mb-1">
                          식감: {jelly.texture}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex justify-center gap-6 mb-4 text-center">
                        <div>
                          <div className="text-xs text-text-rosegray font-label">달콤함</div>
                          <div className="text-lg font-number text-text-choco">{jelly.sweetness}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-text-rosegray font-label">상큼함</div>
                          <div className="text-lg font-number text-text-choco">{jelly.sourness}%</div>
                        </div>
                      </div>

                      {/* Vote Info */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl">🗳️</span>
                          <span className="text-2xl font-number text-text-choco">
                            {jelly.votes || 0}
                          </span>
                          <span className="text-sm text-text-rosegray font-label">표</span>
                        </div>
                        <p className="text-xs text-text-rosegray text-center mt-2 font-body">
                          {formatDate(jelly.createdAt)}
                        </p>
                      </div>

                      {/* Purchase Buttons */}
                      <div className="mt-4 space-y-2">
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddJellyToCart(jelly)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-jelly-pink to-jelly-yellow rounded-lg text-white font-label text-sm shadow-jelly hover:shadow-xl transition-all"
                          >
                            🛒 장바구니
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBuyJellyNow(jelly)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-jelly-mint to-jelly-lavender rounded-lg text-white font-label text-sm shadow-jelly hover:shadow-xl transition-all"
                          >
                            💳 구매
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate('/contest')}
                          className="w-full px-4 py-2 bg-gradient-to-r from-jelly-yellow/20 to-jelly-pink/20 rounded-lg font-label text-xs text-text-choco hover:from-jelly-yellow/30 hover:to-jelly-pink/30 transition-all"
                        >
                          콘테스트에서 보기 →
                        </motion.button>
                        <p className="text-xs text-center text-text-rosegray font-body mt-2">
                          💰 커스텀 젤리 가격: ₩9,900
                        </p>
                      </div>
                    </motion.div>
                  );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}

