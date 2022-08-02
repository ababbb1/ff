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
        'room-card1': "url('/assets/room-card.webp')",
        'room-card2': "url('/assets/room-card2.png')",
        'room-card3': "url('/assets/room-card3.png')",
        'hint-info-white': "url('/assets/hint-info-white.webp')",
        'hint-info-black': "url('/assets/hint-info-black.webp')",
        free: "url('/assets/free.png')",
        random: "url('/assets/random.png')",
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
        'mainpage-magnifying-glass': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            transform: 'translateX(-4rem)',
            opacity: '1',
          },
          '75%': {
            transform: 'translateX(-4rem)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(-4rem)',
            opacity: '0',
          },
        },
        'mainpage-magnifying-glass-sm': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            transform: 'translateX(-3rem)',
            opacity: '1',
          },
          '75%': {
            transform: 'translateX(-3rem)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(-3rem)',
            opacity: '0',
          },
        },
        'mainpage-gun': {
          '0%': {
            opacity: '1',
          },
          '25%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
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
