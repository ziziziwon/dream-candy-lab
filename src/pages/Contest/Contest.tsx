import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import ParticleSparkle from "../../components/motion/ParticleSparkle";
import { useAuth } from "../../contexts/AuthContext";
import { useUserRole } from "../../hooks/useUserRole";
import { 
  getAllJellies,
  getJelliesSortedByVotes,
  voteForJelly,
  getUserVotedJellies,
  deleteJelly,
  type JellyData 
} from "../../services/jellyService";

export default function Contest() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isAdmin } = useUserRole();
  const [jellies, setJellies] = useState<JellyData[]>([]);
  const [votedJellies, setVotedJellies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadJellies = React.useCallback(async () => {
    try {
      setLoading(true);
      let data: JellyData[];
      
      if (sortBy === 'votes') {
        data = await getJelliesSortedByVotes();
      } else {
        data = await getAllJellies();
      }
      
      setJellies(data);
    } catch (error) {
      console.error('Error loading jellies:', error);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  useEffect(() => {
    loadJellies();
    
    // 투표 기록 로드 (로그인 상태일 때만)
    if (currentUser) {
      getUserVotedJellies(currentUser.uid).then(setVotedJellies);
    }
  }, [loadJellies, currentUser]);

  const handleVote = async (jellyId: string) => {
    if (!currentUser) {
      alert('🍬 투표하려면 로그인이 필요해요!');
      navigate('/login');
      return;
    }

    const result = await voteForJelly(jellyId, currentUser.uid);
    if (result.success) {
      await loadJellies();
      const updated = await getUserVotedJellies(currentUser.uid);
      setVotedJellies(updated);
    } else {
      alert(result.error || '투표에 실패했습니다.');
    }
  };

  const handleDelete = async (jellyId: string, jellyName: string) => {
    if (!isAdmin) {
      alert('관리자만 삭제할 수 있습니다.');
      return;
    }

    if (!window.confirm(`"${jellyName}" 젤리를 정말 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }

    try {
      setDeletingId(jellyId);
      const success = await deleteJelly(jellyId);
      
      if (success) {
        alert('✅ 젤리가 삭제되었습니다!');
        await loadJellies();
      } else {
        alert('❌ 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting jelly:', error);
      alert('❌ 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingId(null);
    }
  };

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
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

  const getTextureEmoji = (texture: string) => {
    const emojiMap: Record<string, string> = {
      soft: '☁️',
      chewy: '🎀',
      firm: '💎',
      crunchy: '⚡',
    };
    return emojiMap[texture] || '🍬';
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
          <p className="font-label text-text-choco">젤리 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lab-cream via-jelly-yellow/10 to-jelly-pink/10 relative overflow-hidden">
      <ParticleSparkle count={50} />
      
      <Container className="relative z-10 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-logo text-text-choco mb-4">
            🏆 젤리 콘테스트
          </h1>
          <p className="text-lg text-text-rosegray font-body mb-8">
            최고의 젤리에 투표하세요!
          </p>

          {/* Sort Toggle */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSortBy('votes')}
              className={`px-6 py-3 rounded-lg font-label transition-all ${
                sortBy === 'votes'
                  ? 'bg-gradient-to-r from-jelly-yellow to-jelly-pink text-white shadow-jelly'
                  : 'bg-white/70 text-text-choco'
              }`}
            >
              🏆 인기순
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSortBy('recent')}
              className={`px-6 py-3 rounded-lg font-label transition-all ${
                sortBy === 'recent'
                  ? 'bg-gradient-to-r from-jelly-mint to-jelly-lavender text-white shadow-jelly'
                  : 'bg-white/70 text-text-choco'
              }`}
            >
              ⏰ 최신순
            </motion.button>
          </div>
        </motion.div>

        {/* Jellies Grid */}
        {jellies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🧪</div>
            <p className="text-xl font-label text-text-choco mb-4">
              아직 생성된 젤리가 없습니다
            </p>
            <Button
              onClick={() => navigate('/lab/make')}
              className="mt-4"
            >
              첫 젤리 만들기 →
            </Button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {jellies.map((jelly, index) => {
                const hasVoted = votedJellies.includes(jelly.id);
                const isDeleting = deletingId === jelly.id;

                return (
                  <motion.div
                    key={jelly.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -50 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.05,
                      layout: { duration: 0.3 }
                    }}
                    className="bg-white/70 backdrop-blur-md rounded-lab p-6 shadow-jelly hover:shadow-xl transition-all relative"
                  >
                    {/* Rank Badge */}
                    {sortBy === 'votes' && (
                      <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-jelly-yellow to-jelly-pink rounded-full flex items-center justify-center shadow-lg text-white font-title text-lg">
                        {getRankEmoji(index)}
                      </div>
                    )}

                    {/* Admin Delete Button */}
                    {isAdmin && (
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(jelly.id, jelly.name)}
                        disabled={isDeleting}
                        className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg text-white hover:from-red-500 hover:to-red-700 transition-all disabled:opacity-50"
                        title="삭제 (관리자 전용)"
                      >
                        {isDeleting ? '⏳' : '🗑️'}
                      </motion.button>
                    )}

                    {/* Jelly Preview */}
                    <div className="mt-8 mb-4 flex justify-center">
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
                        식감: {jelly.texture} {getTextureEmoji(jelly.texture)}
                      </p>
                      <p className="text-xs text-text-rosegray font-mono">
                        제작: {jelly.creatorName}
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

                    {/* Vote Section */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🗳️</span>
                          <span className="text-2xl font-number text-text-choco">
                            {jelly.votes || 0}
                          </span>
                          <span className="text-sm text-text-rosegray font-label">표</span>
                        </div>
                        
                        {hasVoted ? (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-jelly-mint/20 to-jelly-lavender/20 rounded-lg">
                            <span>✅</span>
                            <span className="text-sm font-label text-text-choco">투표 완료</span>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVote(jelly.id)}
                            className="px-4 py-2 bg-gradient-to-r from-jelly-pink to-jelly-yellow rounded-lg text-white font-label shadow-jelly hover:shadow-xl transition-all"
                          >
                            투표하기 🎯
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Winner Button */}
        {jellies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Button
              onClick={() => navigate('/contest/winner')}
              size="lg"
            >
              🏆 우승 젤리 보러가기
            </Button>
          </motion.div>
        )}
      </Container>
    </div>
  );
}
