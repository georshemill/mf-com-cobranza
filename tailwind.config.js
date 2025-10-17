/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

module.exports = {
  darkMode: ['selector', '[class*="app-dark"]'],
  content: ['./index.html', './src/**/*.{ts,html}', './src/**/*.{js,ts}', './public/**/*.json'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px'
    }
  },
  plugins: [PrimeUI],
}

