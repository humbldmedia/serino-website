/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marble-white': '#FFFFFF',
        'roma-cream': '#F4F0EA',
        'gold': '#C2A878',
        'burnt-sienna': '#B45F40',
        'serino-black': '#0D0D0D',
        'sage': '#6D7B6B',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"EB Garamond"', 'serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        'ultra-wide': '0.3em',
      },
    },
  },
  plugins: [],
}
