import { 
  collection, 
  addDoc, 
  getDocs,
  query, 
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  emoji?: string;
}

export interface OrderData {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  totalPrice: number;
  shippingFee: number;
  finalPrice: number;
  paymentMethod: string;
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    memo?: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderNumber: string;
  createdAt: Timestamp | any;
}

// 주문 생성
export async function createOrder(
  orderData: Omit<OrderData, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: '주문 생성 중 오류가 발생했습니다.' };
  }
}

// 사용자의 주문 내역 가져오기
export async function getUserOrders(userId: string): Promise<OrderData[]> {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as OrderData));
  } catch (error) {
    console.error('Error getting user orders:', error);
    return [];
  }
}

// 모든 주문 가져오기 (관리자용)
export async function getAllOrders(): Promise<OrderData[]> {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as OrderData));
  } catch (error) {
    console.error('Error getting all orders:', error);
    return [];
  }
}

// 주문 상태 텍스트
export function getOrderStatusText(status: OrderData['status']): string {
  const statusMap = {
    pending: '결제 대기',
    processing: '주문 처리중',
    shipped: '배송중',
    delivered: '배송 완료',
    cancelled: '취소됨',
  };
  return statusMap[status] || status;
}

// 주문 상태 이모지
export function getOrderStatusEmoji(status: OrderData['status']): string {
  const emojiMap = {
    pending: '⏳',
    processing: '📦',
    shipped: '🚚',
    delivered: '✅',
    cancelled: '❌',
  };
  return emojiMap[status] || '📋';
}



