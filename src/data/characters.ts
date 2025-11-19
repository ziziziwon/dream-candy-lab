export type Character = {
  id: string;
  name: string;
  emoji: string;
  role: string;
  color: 'yellow' | 'pink' | 'mint' | 'lavender';
  description: string;
  quote: string;
};

export const characters: Character[] = [
  {
    id: 'dr-jellybear',
    name: 'Dr. Jellybear',
    emoji: '🧸',
    role: '연구소장',
    color: 'yellow',
    description: '귀여운 곰돌이 연구소장. 항상 실험노트를 들고 다니며 새로운 젤리 레시피를 연구합니다.',
    quote: '오늘도 달콤한 실험을 시작해볼까요? 🍯',
  },
  {
    id: 'strawbi',
    name: 'Strawbi',
    emoji: '🍓',
    role: '어시스턴트',
    color: 'pink',
    description: '딸기맛 젤리 어시스턴트. 통통 튀는 말투로 연구소의 분위기를 밝게 만듭니다.',
    quote: '오늘은 하트젤리 배합 성공! 완전 달달해요~! 💕',
  },
  {
    id: 'lemmi',
    name: 'Lemmi',
    emoji: '🍋',
    role: '엔지니어',
    color: 'yellow',
    description: '레몬맛 젤리 엔지니어. 각종 실험 기계와 장비를 능숙하게 조작합니다.',
    quote: '이 기계를 개선하면 더 좋은 젤리를 만들 수 있을 거예요! ⚙️',
  },
  {
    id: 'minty',
    name: 'Minty',
    emoji: '🍏',
    role: '디자이너',
    color: 'mint',
    description: '민트맛 젤리 디자이너. 젤리의 색과 향을 연구하며 아름다운 젤리를 디자인합니다.',
    quote: '색상 조합이 완벽해요! 이번 젤리는 정말 예쁠 거예요 ✨',
  },
];







