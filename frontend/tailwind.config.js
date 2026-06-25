/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        oled: '#000000',
        slate: '#0A0A0A',
        neon: {
          purple: '#a855f7',
          rose: '#ec4899',
          amber: '#f59e0b',
        }
      },
      spacing: {
        'bento': '24px',
        'bento-sm': '16px',
        'bento-lg': '32px',
      },
      borderRadius: {
        'bento': '24px',
        'bento-sm': '16px',
        'bento-lg': '32px',
      }
    },
  },
  plugins: [],
}
