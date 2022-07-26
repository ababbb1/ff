/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'animate-layout-border': '#17EF46',
      },
      backgroundImage: {
        'crumpled-paper': "url('/assets/crumpled-paper.webp')",
        note: "url('/assets/note.webp')",
        'note-sm': "url('/assets/note-sm.webp')",
        'room-card': "url('/assets/room-card.webp')",
      },
      keyframes: {
        'text-move-right': {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'text-move-down': {
          '0%': {
            transform: 'rotate(90deg) translateY(1rem) translateX(0px)',
          },
          '100%': {
            transform: 'rotate(90deg) translateY(1rem) translateX(100vh)',
          },
        },
        'text-move-left': {
          '0%': { transform: 'rotate(180deg) translateX(0)' },
          '100%': { transform: 'rotate(180deg) translateX(100vw)' },
        },
        'text-move-top': {
          '0%': {
            transform: 'rotate(-90deg) translateY(1rem) translateX(0)',
          },
          '100%': {
            transform: 'rotate(-90deg) translateY(1rem) translateX(100vh)',
          },
        },
      },
      animation: {
        'text-move-right': 'text-move-right',
        'text-move-down': 'text-move-down',
        'text-move-left': 'text-move-left',
        'text-move-top': 'text-move-top',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
};
