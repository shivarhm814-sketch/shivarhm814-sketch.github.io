/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
        display: ['Lalezar', 'Vazirmatn', 'sans-serif'],
        brand: ['Morabba', 'Vazirmatn', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#EEEEFC',
          100: '#DCDBF9',
          300: '#918CEC',
          500: '#5B54E8',
          600: '#4A43D1',
          700: '#3A34A8',
          DEFAULT: '#5B54E8',
        },
        accent: {
          soft: '#FFE7E0',
          300:  '#FFA98F',
          500:  '#FF7A59',
          700:  '#E85D3A',
          DEFAULT: '#FF7A59',
        },
        ink: {
          900: '#15151E',
          700: '#34343F',
          500: '#6B6B7B',
          400: '#9A9AAA',
          200: '#E5E5EE',
        },
        soft: '#F7F7FB',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        card:    '0 14px 34px rgba(91,84,232,.10)',
        service: '0 8px 18px rgba(91,84,232,.08)',
        cta:     '0 8px 20px rgba(255,122,89,.35)',
        brand:   '0 6px 15px rgba(91,84,232,.34)',
      },
      maxWidth: {
        content: '1140px',
      },
    },
  },
  plugins: [],
}
