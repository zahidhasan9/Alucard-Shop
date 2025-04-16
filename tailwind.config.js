/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Work_sans: ["Work Sans", 'sans-serif'],
        Oswald: ['Oswald', 'serif'],
        Fira: ['Fira Sans', 'serif'],
        Blinker: ['Blinker', 'serif'],
        NDlogo: ['ND LOGOS', 'sans-serif'],
       
      },
      // conntainer config
      container: {
        center: true,
        padding: '1rem',
        screens: {
          DEFAULT: '1170px', // custom default width
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-up': 'slideInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      
    },
  },
  plugins: [],
}