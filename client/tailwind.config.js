/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark': '#1A2424',
        'bg': '#EEFAF1',
        'main': '#6FA199',
        'second': '#221101',
        'third': '#3B7169',
        'fourth': '#C79941',
      },
    },
    screens: {
      'full': {'max': '1919px'},
      '3xl': {'max': '1800px'},
      '2xl': {'max': '1600px'},
      'xl': {'max': '1280px'},
      'lg': {'max': '1000px'},
      'md': {'max': '850px'},
      'sm': {'max': '650px'},
    }
  },
  plugins: [],
}