/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      },
      colors: {
        'dark-blue': '#030e41',
        'medium-blue': '#025BFE',
        'light-blue': '#4193da',
        'dark-yellow': '#9E8A4E',
        'medium-yellow': '#f7d046',
        'medium-green': '#77BA56',
        'light-green': '#5CC8AF',
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        paralucentDemiBoldItalic: ['Paralucent DemiBold Italic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
