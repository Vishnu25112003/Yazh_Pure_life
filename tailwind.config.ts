import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a1628',
        ocean: '#0d3b6e',
        bright: '#1565c0',
        sky: '#42a5f5',
        cyan: '#00bcd4',
        pale: '#bbdefb',
        offwhite: '#f0f8ff',
        gold: '#ffd700',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'wave-slow': 'wave 8s linear infinite',
        'wave-mid': 'wave 6s linear infinite reverse',
        'wave-fast': 'wave 4s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        marquee: 'marquee 20s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'blue-glow': '0 0 24px rgba(0,188,212,0.4)',
        card: '0 4px 24px rgba(13,59,110,0.10)',
        'card-hover': '0 12px 40px rgba(13,59,110,0.20)',
      },
    },
  },
  plugins: [],
}

export default config
