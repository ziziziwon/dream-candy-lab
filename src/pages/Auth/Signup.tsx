import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import ParticleSparkle from '../../components/motion/ParticleSparkle';
import FirebaseStatus from '../../components/debug/FirebaseStatus';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('🍬 비밀번호가 일치하지 않습니다!');
    }

    if (password.length < 6) {
      return setError('🍬 비밀번호는 최소 6자 이상이어야 합니다!');
    }

    if (!displayName.trim()) {
      return setError('🍬 이름을 입력해주세요!');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, displayName);
      navigate('/lab');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('🍬 이미 사용 중인 이메일입니다!');
      } else if (err.code === 'auth/invalid-email') {
        setError('🍬 올바른 이메일 형식이 아니에요!');
      } else if (err.code === 'auth/weak-password') {
        setError('🍬 비밀번호가 너무 약합니다. 더 강력한 비밀번호를 입력해주세요!');
      } else {
        setError('🍬 회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-lab-cream via-jelly-mint/10 to-jelly-lavender/10 relative overflow-hidden py-12">
      <ParticleSparkle count={40} />
      <FirebaseStatus />
      
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-logo text-text-choco mt-10 mb-2"
            animate={{
              textShadow: [
                '0 0 20px rgba(199, 243, 227, 0.3)',
                '0 0 30px rgba(199, 243, 227, 0.5)',
                '0 0 20px rgba(199, 243, 227, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🧬 회원가입
          </motion.h1>
          <p className="text-text-rosegray font-body text-lg">
            새로운 젤리 연구원이 되어보세요!
          </p>
        </div>

        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md rounded-lab p-8 shadow-jelly w-96"
        >
          <div className="mb-4">
            <label className="block font-label text-text-choco mb-2">
              ✏️ 이름 (닉네임)
            </label>
            <input
              type="text"
              placeholder="젤리 마스터"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-jelly-mint focus:outline-none font-body transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block font-label text-text-choco mb-2">
              📧 이메일
            </label>
            <input
              type="email"
              placeholder="jelly@dreamlab.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-jelly-mint focus:outline-none font-body transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block font-label text-text-choco mb-2">
              🔑 비밀번호
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-jelly-mint focus:outline-none font-body transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block font-label text-text-choco mb-2">
              🔒 비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-jelly-mint focus:outline-none font-body transition-colors"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-600 text-sm font-label text-center"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-jelly-mint to-jelly-lavender rounded-lg text-white font-title text-lg shadow-jelly hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🧪 가입 처리 중...' : '🍬 회원가입 완료!'}
          </motion.button>

          <div className="mt-6 text-center">
            <p className="text-text-rosegray font-body text-sm">
              이미 계정이 있나요?{' '}
              <Link
                to="/login"
                className="text-jelly-mint font-label font-bold hover:underline"
              >
                로그인하기 →
              </Link>
            </p>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => navigate('/')}
            className="text-text-rosegray font-label text-sm hover:text-text-choco transition-colors"
          >
            ← 메인으로 돌아가기
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

