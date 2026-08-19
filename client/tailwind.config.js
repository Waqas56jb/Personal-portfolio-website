/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '400px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // Deep navy / near-black engineering surfaces
        ink: {
          950: '#04070E',
          900: '#070B14',
          850: '#0A101C',
          800: '#0E1522',
          700: '#141C2B',
          600: '#1B2534',
          500: '#25324A',
        },
        // Cool blue / electric blue
        azure: {
          300: '#7DB3FB',
          400: '#5A96F7',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        // Subtle cyan accent
        cyan: {
          300: '#67E8F9',
          400: '#38DDF0',
          500: '#22D3EE',
        },
        steel: {
          200: '#CBD5E1',
          300: '#A9B6C8',
          400: '#8595AC',
          500: '#64748B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(4,7,14,0.06), 0 16px 44px -24px rgba(4,7,14,0.35)',
        lift: '0 26px 70px -34px rgba(59,130,246,0.55)',
        ring: '0 0 0 1px rgba(59,130,246,0.22)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'ring-pulse': 'ring-pulse 3.2s ease-out infinite',
        'rise': 'rise 0.8s cubic-bezier(0.22,1,0.36,1) both',
        orb: 'orb 9s ease-in-out infinite',
        ripple: 'ripple 3.4s cubic-bezier(0.16,1,0.3,1) infinite',
        drift: 'drift 16s linear infinite',
        aurora: 'aurora 14s ease-in-out infinite',
        'rise-in': 'rise-in 0.85s cubic-bezier(0.16,1,0.3,1) both',
        dash: 'dash 2.6s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        sweep: 'sweep 3.2s ease-in-out infinite',
        blink: 'blink 1.1s steps(2, start) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        dash: {
          to: { strokeDashoffset: '-160' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'ring-pulse': {
          '0%': { transform: 'scale(0.85)', opacity: '0.55' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        orb: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-16px) scale(1.025)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.82)', opacity: '0.55' },
          '100%': { transform: 'scale(2.15)', opacity: '0' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)', opacity: '0' },
          '12%': { opacity: '0.8' },
          '88%': { opacity: '0.8' },
          '100%': { transform: 'translate3d(0,-190px,0)', opacity: '0' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.5' },
          '33%': { transform: 'translate3d(5%,-7%,0) scale(1.14)', opacity: '0.75' },
          '66%': { transform: 'translate3d(-6%,5%,0) scale(0.94)', opacity: '0.55' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
