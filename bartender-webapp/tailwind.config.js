/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005b37', // This can be indigo-600
          light: '#005b37', // Indigo-500
          dark: '#005b37',  // Indigo-700
        },
        secondary: {
          DEFAULT: '#007649', // Indigo-400 or a custom value
          light: '#007649', // Indigo-300
          dark: '#007649',  // Indigo-800
        },
        background: {
          DEFAULT: '#003f27', // Gray-100
          light: '#003f27', // Gray-200
          dark: '#003f27',  // Gray-800
        }
      },
    },
  },
  plugins: [],
}