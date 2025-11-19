import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUserRole } from '../../hooks/useUserRole';
import ParticleSparkle from '../../components/motion/ParticleSparkle';

interface User {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  joinedAt: string;
}

interface Jelly {
  id: string;
  name: string;
  flavor: string;
  creatorName: string;
  votes: number;
  createdAt: any;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [users, setUsers] = useState<User[]>([]);
  const [jellies, setJellies] = useState<Jelly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      navigate('/');
      return;
    }

    if (!isAdmin) return;

    async function fetchData() {
      try {
        // Fetch users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        } as User));
        setUsers(usersData);

        // Fetch jellies
        const jelliesQuery = query(
          collection(db, 'jellies'),
          orderBy('votes', 'desc')
        );
        const jelliesSnapshot = await getDocs(jelliesQuery);
        const jelliesData = jelliesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Jelly));
        setJellies(jelliesData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [isAdmin, roleLoading, navigate]);

  if (roleLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lab-cream to-jelly-yellow/10">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <p className="font-label text-text-choco">관리자 권한 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lab-cream via-jelly-yellow/10 to-jelly-pink/10 relative overflow-hidden">
      <ParticleSparkle count={30} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-logo text-text-choco mb-4 flex items-center justify-center gap-3">
            <span>👑</span>
            <span>관리자 대시보드</span>
          </h1>
          <p className="text-text-rosegray font-body">
            Dream Candy Lab 전체 관리 시스템
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-md rounded-lab p-6 shadow-jelly"
          >
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-title text-text-choco mb-1">
              {users.length}
            </div>
            <div className="text-sm font-label text-text-rosegray">
              총 사용자
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-md rounded-lab p-6 shadow-jelly"
          >
            <div className="text-4xl mb-2">🍬</div>
            <div className="text-3xl font-title text-text-choco mb-1">
              {jellies.length}
            </div>
            <div className="text-sm font-label text-text-rosegray">
              생성된 젤리
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-md rounded-lab p-6 shadow-jelly"
          >
            <div className="text-4xl mb-2">🗳️</div>
            <div className="text-3xl font-title text-text-choco mb-1">
              {jellies.reduce((sum, j) => sum + (j.votes || 0), 0)}
            </div>
            <div className="text-sm font-label text-text-rosegray">
              총 투표 수
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Users List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 backdrop-blur-md rounded-lab p-6 shadow-jelly"
          >
            <h2 className="text-2xl font-title text-text-choco mb-4 flex items-center gap-2">
              <span>👥</span>
              <span>사용자 목록</span>
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {users.map((user, index) => (
                <motion.div
                  key={user.uid}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-jelly-yellow/10 to-jelly-pink/10 rounded-lg"
                >
                  <div>
                    <div className="font-label text-text-choco font-bold flex items-center gap-2">
                      {user.displayName}
                      {user.role === 'admin' && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-400 text-white rounded-full">
                          👑 ADMIN
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-text-rosegray font-body">
                      {user.email}
                    </div>
                  </div>
                  <div className="text-xs text-text-rosegray font-mono">
                    {new Date(user.joinedAt).toLocaleDateString('ko-KR')}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Jellies List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 backdrop-blur-md rounded-lab p-6 shadow-jelly"
          >
            <h2 className="text-2xl font-title text-text-choco mb-4 flex items-center gap-2">
              <span>🍬</span>
              <span>젤리 순위</span>
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {jellies.map((jelly, index) => (
                <motion.div
                  key={jelly.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-jelly-mint/10 to-jelly-lavender/10 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-title text-text-choco">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-label text-text-choco font-bold">
                        {jelly.name}
                      </div>
                      <div className="text-xs text-text-rosegray font-body">
                        {jelly.flavor} · by {jelly.creatorName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">🗳️</span>
                    <span className="font-number text-text-choco font-bold">
                      {jelly.votes || 0}
                    </span>
                  </div>
                </motion.div>
              ))}

              {jellies.length === 0 && (
                <div className="text-center py-8 text-text-rosegray font-body">
                  아직 생성된 젤리가 없습니다
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => navigate('/')}
            className="text-text-rosegray font-label hover:text-text-choco transition-colors"
          >
            ← 메인으로 돌아가기
          </button>
        </motion.div>
      </div>
    </div>
  );
}


