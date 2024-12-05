/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          '0%': { transform: 'translate(-50%, -100%)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0%)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slideUp 0.2s ease-in-out',
      },
      borderRadius: {
        sm: '0.4rem',
        md: '0.8rem',
        lg: '1.2rem',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        'pretendard-variable': ['Pretendard-Variable', 'sans-serif'],
      },
      fontSize: {
        h1: ['2.4rem', { lineHeight: '3rem' }], // 24px font size, 30px line height
        h2: ['2rem', { lineHeight: '2.6rem' }], // 20px font size, 26px line height
        h3: ['1.8rem', { lineHeight: '2.4rem' }], // 18px font size, 24px line height
        sub_h1: ['1.6rem', { lineHeight: '2.2rem' }], // 16px font size, 22px line height
        sub_h2: ['1.4rem', { lineHeight: '2rem' }], // 14px font size, 20px line height
        sub_h3: ['1.2rem', { lineHeight: '1.6rem' }], // 12px font size, 16px line height
        body1: ['1.6rem', { lineHeight: '2.2rem' }], // 16px font size, 22px line height
        body2: ['1.4rem', { lineHeight: '2rem' }], // 14px font size, 20px line height
        body3: ['1.2rem', { lineHeight: '1.6rem' }], // 12px font size, 16px line height
        caption: ['1rem', { lineHeight: '1.4rem' }], // 10px font size, 14px line height
        iconCaption: ['0.8rem', { lineHeight: '1.2rem' }], // 8px font size, 12px line height      },
      },
      colors: {
        white: 'rgba(var(--white))',
        black: 'rgba(var(--black))',
        primary: 'rgba(var(--primary))',
        secondary: 'rgba(var(--secondary))',
        warning: 'rgba(var(--warning))',
        gray: {
          50: 'rgba(var(--gray50))',
          100: 'rgba(var(--gray100))',
          200: 'rgba(var(--gray200))',
          300: 'rgba(var(--gray300))',
          400: 'rgba(var(--gray400))',
          500: 'rgba(var(--gray500))',
          600: 'rgba(var(--gray600))',
          700: 'rgba(var(--gray700))',
          800: 'rgba(var(--gray800))',
          900: 'rgba(var(--gray900))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
};
