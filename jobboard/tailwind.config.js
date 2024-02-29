/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        Lato: ['Lato', 'sans-serif'],
        PlayfairDisplay: ['Playfair Display', 'sans-serif']
      },
      backgroundColor: {
        navcolor: 'rgb(18, 18, 62)',
        backcolor: 'rgb(0, 0, 33)'
      }
    },
  },
  plugins: [],
}