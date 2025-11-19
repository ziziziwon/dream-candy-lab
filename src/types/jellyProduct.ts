// Dream Candy Lab Product Types

export type JellyFlavor = 'strawberry' | 'lemon' | 'mint' | 'grape' | 'peach' | 'apple' | 'orange';
export type JellyColor = 'yellow' | 'pink' | 'mint' | 'lavender' | 'red' | 'orange';

export interface JellyProduct {
  id: string;
  name: string;
  flavor: JellyFlavor;
  color: JellyColor;
  description: string;
  price: number;
  image?: string;
  emoji?: string; // 젤리 이모지
  sweetness: number; // 1-5
  softness: number; // 1-5
  shine: number; // 1-5 (반짝임 정도)
  inStock: boolean;
  tags: string[];
  character?: string; // 추천 캐릭터
}

// 맛에 따른 기본 이모지 반환 함수
export function getJellyEmoji(product: JellyProduct): string {
  if (product.emoji) return product.emoji;
  
  // 맛에 따른 기본 이모지
  const flavorEmojis: Record<JellyFlavor, string> = {
    strawberry: '🍓',
    lemon: '🍋',
    mint: '🌿',
    grape: '🍇',
    peach: '🍑',
    apple: '🍏',
    orange: '🍊',
  };
  
  return flavorEmojis[product.flavor] || '🍬';
}

export interface JellyCartItem {
  product: JellyProduct;
  quantity: number;
}







