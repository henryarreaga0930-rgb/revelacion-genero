/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'baby-pink': '#FFD1DC',
        'baby-blue': '#C3E9FF',
        'baby-yellow': '#FFF9C4',
        'baby-mint': '#B2F4EA',
      },
      fontFamily: {
        'cute': ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
