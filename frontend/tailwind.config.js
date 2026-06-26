/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        tech: {
          base: '#0f172a',    // 60% (Slate 900)
          surface: '#1e293b', // 30% (Slate 800)
          border: '#334155',  // (Slate 700)
          accent: '#22c55e',  // 10% Highlight (Green 500)
        },
        slate: {
          900: '#0F172A',
          800: '#1E293B',
          400: '#94A3B8',
          50: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'], // Techy font
        mono: ['Fira Code', 'monospace'],
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
