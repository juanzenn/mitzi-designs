const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        gray: colors.gray,
        primary: {
          400: '#FFE2E9',
          500: '#A50029',
          600: '#6D001B',
        },
        white: {
          DEFAULT: '#FFFFFF',
          accent: '#F6F6F6',
        },
        black: '#131313',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
