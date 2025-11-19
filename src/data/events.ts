export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'ended';
  color: 'yellow' | 'pink' | 'mint' | 'lavender';
  image?: string;
};

export const events: Event[] = [
  {
    id: 'spring-jelly',
    title: '봄맞이 벚꽃 젤리 실험',
    description: '분홍빛 벚꽃 향이 가득한 특별한 젤리를 만들어요. 봄의 달콤함을 담았습니다.',
    date: '2025.03.01 - 03.31',
    status: 'ongoing',
    color: 'pink',
  },
  {
    id: 'rainbow-collection',
    title: '무지개 컬렉션 출시',
    description: '일곱 가지 색깔의 무지개 젤리 세트! 각 색깔마다 다른 맛과 향을 즐기세요.',
    date: '2025.04.15',
    status: 'upcoming',
    color: 'yellow',
  },
  {
    id: 'mint-breeze',
    title: '여름 민트 브리즈',
    description: '시원한 민트향과 함께하는 여름 한정 젤리. 상쾌한 여름을 선물합니다.',
    date: '2025.06.01 - 08.31',
    status: 'upcoming',
    color: 'mint',
  },
  {
    id: 'halloween-special',
    title: '할로윈 스페셜 에디션',
    description: '귀엽지만 살짝 으스스한 할로윈 젤리. 특별한 모양과 맛으로 가득합니다.',
    date: '2025.10.20 - 10.31',
    status: 'upcoming',
    color: 'lavender',
  },
];







