/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['Cairo', 'Arial', 'sans-serif'],
        'montserrat': ['Montserrat', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
