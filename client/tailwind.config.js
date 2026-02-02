/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777', // Hot Pink
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#2e1065', // Deep Purple
          900: '#1e1b4b', // Darker Purple
          950: '#0f0518', // Cosmic Black
        },
        accent: {
          cyan: '#06b6d4',
          purple: '#d946ef',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'], // Mechanical/Sci-fi font
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to right bottom, #1e1b4b, #2e1065, #4c0519)',
        'neon-glow': 'radial-gradient(circle at center, rgba(219, 39, 119, 0.4) 0%, rgba(15, 5, 24, 0) 70%)',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(219, 39, 119, 0.5), 0 0 20px rgba(219, 39, 119, 0.3)',
        'neon-blue': '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
        'card': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'float': "float 6s ease-in-out infinite",
        'pulse-glow': "pulseGlow 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(219, 39, 119, 0.5)" },
          "50%": { boxShadow: "0 0 25px rgba(219, 39, 119, 0.8)" },
        }
      },
    },
  },
  plugins: [],
}
