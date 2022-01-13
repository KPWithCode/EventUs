// const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/styles/**/*.css', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ['BodoniSvtyTwoITCTT-Bold', 'sans-serif']
      },
      colors: {
        darkGray: '#0b222a',
        nightBlue: '#0b222a',
        lightPink: '#ffe4f3',
        pumpkinSpice: '#FDEDD4',
        mainColor: '#1a202c',
        white: '#FFFFFF',
        ...defaultTheme.colors
      }
    },
  },
  plugins: [],
}
