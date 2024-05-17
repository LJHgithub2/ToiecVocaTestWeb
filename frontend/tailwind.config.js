/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#11f511',
        secondary: '#144e96',
        danger: '#e3342f',
        // 커스텀 색상 추가
        customColor1: '#aabbcc',
        customColor2: '#ddeeff',
        'my-color': {
          100: '#f0f9ff',
          200: '#e0f2fe',
          300: '#bae6fd',
          400: '#7dd3fc',
          500: '#38bdf8',
          600: '#0bfb57',
          700: '#0284c7',
          800: '#0369a1',
          900: '#075985',
        },
        'my-hover-color': '#5dffae',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
};