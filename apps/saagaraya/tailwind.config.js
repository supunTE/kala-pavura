/** @type {import('tailwindcss').Config} */

const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  darkMode: ['class'],
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'curious-blue': {
          50: '#f1f8fe',
          100: '#e2f1fc',
          200: '#bee2f9',
          300: '#85caf4',
          400: '#44afec',
          500: '#2da1e4',
          600: '#0f76ba',
          700: '#0d5e97',
          800: '#0f517d',
          900: '#124368',
          950: '#0c2b45',
        },
      },
      animation: {
        'move-right': 'moveRight 20s linear infinite',
      },
      keyframes: {
        moveRight: {
          '0%': { left: '-20%' },
          '5%': { left: '120%' },
          '100%': { left: '120%' },
        },
      },
    },
  },
  plugins: [],
};
