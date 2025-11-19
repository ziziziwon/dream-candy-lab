// 로컬 저장소를 사용한 젤리 데이터 관리 (임시 버전, 추후 Firebase로 전환)

export type JellyData = {
  id: string;
  sweetness: number;
  sourness: number;
  flavor: string;
  texture: string;
  color: string;
  timestamp: string;
  votes: number;
  creatorName?: string;
};

const STORAGE_KEY = 'dream_candy_lab_jellies';
const VOTES_KEY = 'dream_candy_lab_votes';

// 모든 젤리 데이터 가져오기
export const getAllJellies = (): JellyData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load jellies:', error);
    return [];
  }
};

// 새 젤리 저장
export const saveJelly = (jellyData: Omit<JellyData, 'id' | 'votes'>): JellyData => {
  const jellies = getAllJellies();
  const newJelly: JellyData = {
    ...jellyData,
    id: `jelly_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    votes: 0,
  };
  
  jellies.push(newJelly);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jellies));
  
  return newJelly;
};

// 젤리에 투표
export const voteForJelly = (jellyId: string): boolean => {
  try {
    const votedJellies = getVotedJellies();
    
    // 이미 투표했는지 확인
    if (votedJellies.includes(jellyId)) {
      return false; // 이미 투표함
    }
    
    const jellies = getAllJellies();
    const jellyIndex = jellies.findIndex(j => j.id === jellyId);
    
    if (jellyIndex === -1) return false;
    
    jellies[jellyIndex].votes += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jellies));
    
    // 투표 기록 저장
    votedJellies.push(jellyId);
    localStorage.setItem(VOTES_KEY, JSON.stringify(votedJellies));
    
    return true;
  } catch (error) {
    console.error('Failed to vote:', error);
    return false;
  }
};

// 사용자가 투표한 젤리 목록
export const getVotedJellies = (): string[] => {
  try {
    const data = localStorage.getItem(VOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load voted jellies:', error);
    return [];
  }
};

// 투표순으로 정렬된 젤리
export const getJelliesSortedByVotes = (): JellyData[] => {
  const jellies = getAllJellies();
  return jellies.sort((a, b) => b.votes - a.votes);
};

// 우승 젤리 (가장 많은 투표)
export const getWinnerJelly = (): JellyData | null => {
  const sorted = getJelliesSortedByVotes();
  return sorted.length > 0 ? sorted[0] : null;
};

// 특정 젤리 가져오기
export const getJellyById = (id: string): JellyData | null => {
  const jellies = getAllJellies();
  return jellies.find(j => j.id === id) || null;
};

// 초기 샘플 데이터 생성 (처음 실행 시)
export const initializeSampleJellies = () => {
  const existing = getAllJellies();
  if (existing.length > 0) return; // 이미 데이터가 있으면 스킵
  
  const sampleJellies: Omit<JellyData, 'id' | 'votes'>[] = [
    {
      sweetness: 85,
      sourness: 20,
      flavor: 'strawberry',
      texture: 'soft',
      color: '#FF7CA8',
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      creatorName: '젤리마스터',
    },
    {
      sweetness: 60,
      sourness: 70,
      flavor: 'lemon',
      texture: 'chewy',
      color: '#FFD166',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      creatorName: '신맛러버',
    },
    {
      sweetness: 90,
      sourness: 10,
      flavor: 'grape',
      texture: 'bouncy',
      color: '#B794F6',
      timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
      creatorName: '포도광',
    },
    {
      sweetness: 70,
      sourness: 40,
      flavor: 'apple',
      texture: 'soft',
      color: '#A8E6CF',
      timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
      creatorName: '사과사랑',
    },
    {
      sweetness: 95,
      sourness: 5,
      flavor: 'peach',
      texture: 'bouncy',
      color: '#FFB6A6',
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      creatorName: '복숭아왕자',
    },
  ];
  
  sampleJellies.forEach(jelly => saveJelly(jelly));
  
  // 샘플 데이터에 랜덤 투표 추가
  const jellies = getAllJellies();
  jellies.forEach((jelly, index) => {
    jelly.votes = Math.floor(Math.random() * 50) + 10;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jellies));
};



