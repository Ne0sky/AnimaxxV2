/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'main':['Montserrat'],
        'secondary':['Poppins']
      },
      colors: {
        'accent-1': '#212121',
        'accent-2': '#1db954',
      }
    },
  },
  plugins: [],
}