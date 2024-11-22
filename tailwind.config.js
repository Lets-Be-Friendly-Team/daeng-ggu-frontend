/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
        iconCaption: ['1rem', { lineHeight: '1.4rem' }], // 10px font size, 14px line height      },
      },
      colors: {
        white: 'rgba(var(--white))',
        black: 'rgba(var(--black))',
        primary: 'rgba(var(--primary))',
        secondary: 'rgba(var(--secondary))',
        gray: {
          50: 'rgba(var(--gray-50))',
          100: 'rgba(var(--gray-100))',
          200: 'rgba(var(--gray-200))',
          300: 'rgba(var(--gray-300))',
          400: 'rgba(var(--gray-400))',
          500: 'rgba(var(--gray-500))',
          600: 'rgba(var(--gray-600))',
          700: 'rgba(var(--gray-700))',
          800: 'rgba(var(--gray-800))',
          900: 'rgba(var(--gray-900))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
