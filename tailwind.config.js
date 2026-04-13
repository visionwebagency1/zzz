/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F4EE',
        charcoal: '#2C2416',
        gold: '#C4A882',
        'gold-light': '#D4B896',
        stone: '#E8E2D9',
        mid: '#7A6E62',
        dark: '#1A1410',
        'dark-brown': '#3D2B1A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(56px,10vw,120px)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(40px,7vw,80px)', { lineHeight: '1.0' }],
        'display-md': ['clamp(28px,5vw,52px)', { lineHeight: '1.1' }],
        'display-sm': ['clamp(22px,3.5vw,36px)', { lineHeight: '1.15' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
