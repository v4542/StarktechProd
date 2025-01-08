/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // Include the Vite entry point
    "./src/**/*.{js,jsx,ts,tsx}" // Include all source files
  ],
  theme: {
    extend: {
      keyframes: {
        scale: {
          '0%': { transform: 'scale(2)' },
          '100%': { transform: 'scale(20)', opacity: '0' }
        }
      },
      animation: {
        scale: 'scale 1s ease-in forwards'
      },
      fontFamily: {
      sans: ['Poppins', 'sans-serif'], // Add Poppins to the sans family
    },},
  },
  plugins: [],
};
