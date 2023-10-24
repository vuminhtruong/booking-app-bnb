/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        rose: '#F5385D',
      },
      height: {
        '65': '21rem',
        '110': '30rem',
        '130': '42rem',
        '131': '43rem',
      },
      maxHeight: {
        '65': '21rem',
        '130': '42rem',
      }
    },
  },
  plugins: [],
}