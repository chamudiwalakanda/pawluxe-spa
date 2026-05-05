/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This matches the "HOW TO CARE FOR YOUR DOG" header
        serif: ['"Playfair Display"', 'serif'],
        // This matches the clean paragraph text
        sans: ['Lato', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

  