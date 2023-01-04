/* eslint-env node */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        neutral: colors.gray,
        brand: {
          100: '#c7493a',
          200: '#a33327',
          700: '#242424',
          800: '#1d1d1d',
          900: '#1a1a1a'
        }
      },
      fontFamily: {
        michroma: ['Michroma', 'Arial'],
        poppins: ['Poppins', 'Michroma']
      }
    }
  },
  plugins: []
}
