/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0D1B2A',
          800: '#162032',
          700: '#1E293B',
        },
        gold: {
          400: '#F5C842',
          500: '#D4A017',
          600: '#B8860B',
        }
      }
    },
  },
  plugins: [],
}
