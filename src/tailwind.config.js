/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-slow': 'pulseSlow 8s ease-in-out infinite',
        'pulse-slower': 'pulseSlow 10s ease-in-out infinite reverse',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'indigo-glow': '0 0 20px rgba(99, 102, 241, 0.4)',
        'glow': '0 0 12px currentColor',
        'red': '0 0 4px #ff5f57',
        'yellow': '0 0 4px #febc2e',
        'green': '0 0 4px #28c840',
      },
    },
  },
  plugins: [],
};