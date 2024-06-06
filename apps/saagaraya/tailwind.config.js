/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
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
  plugins: [require('@tailwindcss/typography')],
};
