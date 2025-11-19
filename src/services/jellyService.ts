import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy, 
  increment,
  serverTimestamp,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export interface JellyData {
  id: string;
  name: string;
  flavor: string;
  sweetness: number;
  sourness: number;
  texture: string;
  color: string;
  creatorId: string;
  creatorName: string;
  votes: number;
  createdAt: Timestamp | any;
}

// 젤리 생성
export async function createJelly(
  jellyData: Omit<JellyData, 'id' | 'votes' | 'createdAt' | 'creatorId' | 'creatorName'>,
  userId: string,
  userName: string
) {
  try {
    const jellyRef = await addDoc(collection(db, 'jellies'), {
      ...jellyData,
      creatorId: userId,
      creatorName: userName,
      votes: 0,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: jellyRef.id };
  } catch (error) {
    console.error('Error creating jelly:', error);
    return { success: false, error };
  }
}

// 모든 젤리 가져오기 (최신순)
export async function getAllJellies(): Promise<JellyData[]> {
  try {
    const q = query(collection(db, 'jellies'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as JellyData));
  } catch (error) {
    console.error('Error getting jellies:', error);
    return [];
  }
}

// 투표순으로 젤리 가져오기
export async function getJelliesSortedByVotes(): Promise<JellyData[]> {
  try {
    const q = query(collection(db, 'jellies'), orderBy('votes', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as JellyData));
  } catch (error) {
    console.error('Error getting jellies by votes:', error);
    return [];
  }
}

// 특정 젤리 가져오기
export async function getJellyById(jellyId: string): Promise<JellyData | null> {
  try {
    const jellyDoc = await getDoc(doc(db, 'jellies', jellyId));
    if (jellyDoc.exists()) {
      return {
        id: jellyDoc.id,
        ...jellyDoc.data()
      } as JellyData;
    }
    return null;
  } catch (error) {
    console.error('Error getting jelly:', error);
    return null;
  }
}

// 투표하기
export async function voteForJelly(
  jellyId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 이미 투표했는지 확인
    const votesQuery = query(
      collection(db, 'votes'),
      where('userId', '==', userId),
      where('jellyId', '==', jellyId)
    );
    const votesSnapshot = await getDocs(votesQuery);

    if (!votesSnapshot.empty) {
      return { success: false, error: '이미 투표한 젤리입니다!' };
    }

    // 투표 기록 추가
    await addDoc(collection(db, 'votes'), {
      userId,
      jellyId,
      timestamp: serverTimestamp(),
    });

    // 젤리 투표 수 증가
    const jellyRef = doc(db, 'jellies', jellyId);
    await updateDoc(jellyRef, {
      votes: increment(1)
    });

    return { success: true };
  } catch (error) {
    console.error('Error voting:', error);
    return { success: false, error: '투표 중 오류가 발생했습니다.' };
  }
}

// 유저가 투표한 젤리 목록 가져오기
export async function getUserVotedJellies(userId: string): Promise<string[]> {
  try {
    const votesQuery = query(
      collection(db, 'votes'),
      where('userId', '==', userId)
    );
    const votesSnapshot = await getDocs(votesQuery);
    return votesSnapshot.docs.map(doc => doc.data().jellyId);
  } catch (error) {
    console.error('Error getting voted jellies:', error);
    return [];
  }
}

// 젤리 삭제 (관리자 전용)
export async function deleteJelly(jellyId: string): Promise<boolean> {
  try {
    // 젤리 문서 삭제
    await deleteDoc(doc(db, 'jellies', jellyId));

    // 관련 투표 기록도 삭제
    const votesQuery = query(
      collection(db, 'votes'),
      where('jellyId', '==', jellyId)
    );
    const votesSnapshot = await getDocs(votesQuery);
    
    const deletePromises = votesSnapshot.docs.map(voteDoc => 
      deleteDoc(doc(db, 'votes', voteDoc.id))
    );
    await Promise.all(deletePromises);

    return true;
  } catch (error) {
    console.error('Error deleting jelly:', error);
    return false;
  }
}

// 내가 만든 젤리 가져오기
export async function getMyJellies(userId: string): Promise<JellyData[]> {
  try {
    const q = query(
      collection(db, 'jellies'),
      where('creatorId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as JellyData));
  } catch (error) {
    console.error('Error getting my jellies:', error);
    return [];
  }
}

