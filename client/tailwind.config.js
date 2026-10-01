/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#06111F',
        panel: '#0b1a2a',
        accent: '#00a8ff',
        accent2: '#008cff',
        cyan: '#00d4ff',
        soft: '#9bb4c9'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,168,255,0.35), 0 18px 40px rgba(0,140,255,0.2)'
      }
    }
  },
  plugins: []
};
