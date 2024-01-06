/** @type {import('tailwindcss').Config} */

const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      animation: {
        'move-right': 'moveRight 15s linear infinite',
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
