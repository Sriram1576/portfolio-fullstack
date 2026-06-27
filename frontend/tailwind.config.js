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
          base: '#09090B',       // 60% - Absolute Pitch Black (Zinc 950)
          surface: '#18181B',    // 30% - Stealth Charcoal (Zinc 900)
          primary: '#F8FAFC',    // High contrast text
          secondary: '#A1A1AA',  // Muted Zinc text
          accent: '#06B6D4',     // 10% - Neon Cyberpunk Cyan 
          text: '#F8FAFC',       // Primary Text
          border: 'rgba(255, 255, 255, 0.08)',
          success: '#10B981',
          error: '#EF4444',
        },
        slate: {
          900: '#0F172A',
          800: '#1E293B',
          400: '#94A3B8',
          50: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Body
        serif: ['"Playfair Display"', 'serif'], // Editorial Headings
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
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'blob': 'blob 7s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      backdropBlur: {
        '2xl': '20px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 107, 53, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
