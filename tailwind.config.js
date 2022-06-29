/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'text-move-right': {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(498px)' },
        },
        'text-move-down': {
          '0%': { transform: 'translateY(0px) rotate(90deg)' },
          '100%': { transform: 'translateY(298px) rotate(90deg)' },
        },
      },
      animation: {
        'text-move-right': 'text-move-right',
        'text-move-down': 'text-move-down',
      },
    },
  },
  plugins: [],
};
