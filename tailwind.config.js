/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height: {
        '112': '28rem',
        '128': '32rem',
        '160': '40rem',
      },
      width: {
        '112': '28rem',
        '128': '32rem',
        '160': '40rem',
      },
     colors: {
      primary: {
          50: '#f9dce2',
          100: '#f9b3c2',
          200: '#fa92a9',
          300: '#fb7a97',
          400: '#fa5e81',
          500: '#fa446c',
          600: '#ff2a59',
          700: '#e81443',
          800: '#d40d39',
          900: '#b2062c',
      },
      secondary: {
        50: '#f9fafb',
        100: '#e8eaed', 
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
          500: '#8a96a3',
          600: '#3571a3',
        700: '#374151',
        800: '#374151',
        900: '#111827',
      },
      background: {
        dark: '#161618', //18181b
        light: '#fff',
      },
      other: {
        whatsapp1: '#25d366',
        whatsapp2: '#1db154',
      },
      tertiary: {
        500: '#ff2a59'
      }
     }
    },

  },
  variants: {
    extend: {
      backgroundColor: ['group-hover'],
      // ...
    },
  },
  plugins: [],
}