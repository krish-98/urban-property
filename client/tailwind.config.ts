/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: '#fff7f2',
        ubOrange: '#fb923c',
        ubBlack: '#191919',
      },
    },
  },
  plugins: [],
}
