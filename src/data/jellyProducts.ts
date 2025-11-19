import { JellyProduct } from '../types/jellyProduct';

// Dream Candy Lab 젤리 제품 데이터

export const jellyProducts: JellyProduct[] = [
  {
    id: 'jelly-001',
    name: '하트베리 젤리',
    flavor: 'strawberry',
    color: 'pink',
    description: '딸기의 달콤함이 가득한 하트 모양 젤리. Strawbi가 가장 좋아하는 맛이에요! 💕',
    price: 4500,
    sweetness: 5,
    softness: 4,
    shine: 5,
    inStock: true,
    tags: ['베스트셀러', '하트모양', '달콤함'],
    character: 'Strawbi',
  },
  {
    id: 'jelly-002',
    name: '레몬 스파클',
    flavor: 'lemon',
    color: 'yellow',
    description: '상큼한 레몬향과 은은한 반짝임. 새콤달콤한 맛의 균형이 완벽해요! ✨',
    price: 4000,
    sweetness: 3,
    softness: 3,
    shine: 5,
    inStock: true,
    tags: ['상큼함', '반짝이', '새콤달콤'],
    character: 'Lemmi',
  },
  {
    id: 'jelly-003',
    name: '민트 브리즈',
    flavor: 'mint',
    color: 'mint',
    description: '시원한 민트향이 입안 가득. 여름에 특히 인기가 많은 상쾌한 젤리예요! 🌿',
    price: 4200,
    sweetness: 2,
    softness: 4,
    shine: 4,
    inStock: true,
    tags: ['시원함', '상쾌함', '여름한정'],
    character: 'Minty',
  },
  {
    id: 'jelly-004',
    name: '그레이프 드림',
    flavor: 'grape',
    color: 'lavender',
    description: '포도의 풍부한 맛과 부드러운 식감. 달콤한 꿈을 꾸는 듯한 맛이에요! 🍇',
    price: 4300,
    sweetness: 4,
    softness: 5,
    shine: 3,
    inStock: true,
    tags: ['부드러움', '풍미', '인기'],
    character: 'Dr. Jellybear',
  },
  {
    id: 'jelly-005',
    name: '피치 블러쉬',
    flavor: 'peach',
    color: 'pink',
    description: '복숭아의 달콤함과 부끄러운 핑크빛. 사랑스러운 색감과 맛! 🍑',
    price: 4400,
    sweetness: 4,
    softness: 5,
    shine: 4,
    inStock: true,
    tags: ['달콤함', '부드러움', '예쁨'],
  },
  {
    id: 'jelly-006',
    name: '애플 프레시',
    flavor: 'apple',
    color: 'mint',
    description: '청사과의 상큼함을 그대로 담았어요. 깔끔한 맛과 식감! 🍏',
    price: 3900,
    sweetness: 3,
    softness: 3,
    shine: 3,
    inStock: true,
    tags: ['상큼함', '깔끔함', '가성비'],
  },
  {
    id: 'jelly-007',
    name: '오렌지 선샤인',
    flavor: 'orange',
    color: 'orange',
    description: '햇살처럼 밝은 오렌지 젤리. 비타민 가득한 활력을 느껴보세요! 🌞',
    price: 4100,
    sweetness: 4,
    softness: 4,
    shine: 5,
    inStock: true,
    tags: ['활력', '비타민', '밝음'],
  },
  {
    id: 'jelly-008',
    name: '무지개 믹스 팩',
    flavor: 'strawberry',
    color: 'pink',
    description: '7가지 맛이 모두 들어있는 스페셜 팩! 매일 다른 맛을 즐겨보세요 🌈',
    price: 12000,
    sweetness: 4,
    softness: 4,
    shine: 5,
    inStock: true,
    tags: ['세트', '다양함', '선물추천', '베스트'],
  },
];

export const getJellyProductById = (id: string): JellyProduct | undefined => {
  return jellyProducts.find((p) => p.id === id);
};

export const getJellyProductsByFlavor = (flavor: string): JellyProduct[] => {
  return jellyProducts.filter((p) => p.flavor === flavor);
};

export const getJellyProductsByColor = (color: string): JellyProduct[] => {
  return jellyProducts.filter((p) => p.color === color);
};

export const getBestSellerJellies = (): JellyProduct[] => {
  return jellyProducts.filter((p) => p.tags.includes('베스트셀러') || p.tags.includes('베스트'));
};







