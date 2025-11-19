/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'jelly-yellow': '#FFD166',
        'jelly-pink': '#FF7CA8',
        'jelly-mint': '#A8E6CF',
        'jelly-lavender': '#D0C3FF',
        'jelly-red': '#E64B4B',
        'jelly-orange': '#FFB347',
        'lab-cream': '#FFF7F0',
        'lab-cream-light': '#FEE2E2',
        'lab-cream-purple': '#F8F0FF',
        'lab-glass': 'rgba(255,255,255,0.6)',
        'text-choco': '#3B2E2A',
        'text-rosegray': '#9E8C88',
      },
      fontFamily: {
        // 로고 / 메인 타이틀 (하리보 감성)
        logo: ['TmoneyRoundWind', 'BMJua', 'sans-serif'],
        // 섹션 타이틀 / 버튼 (폭닥하고 귀여운)
        title: ['BMJua', 'S-CoreDream', 'sans-serif'],
        // 본문 (깨끗하고 가독성 좋은)
        body: ['Pretendard', '-apple-system', 'sans-serif'],
        // 서브 라벨 / 칩 (공기감 있는)
        label: ['Cafe24Ssurround', 'Pretendard', 'sans-serif'],
        // 영어 로고 (젤리 느낌)
        eng: ['Fredoka One', 'Baloo 2', 'sans-serif'],
        // 숫자 / 강조 (실험실 느낌)
        number: ['Bebas Neue', 'sans-serif'],
      },
      borderRadius: {
        jelly: '32px',
        lab: '24px',
      },
      boxShadow: {
        jelly: '0 8px 20px rgba(255, 182, 193, 0.3)',
        glass: 'inset 0 0 8px rgba(255,255,255,0.3)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
    }
  },
  plugins: [],
};
