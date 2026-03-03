/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rockwell: ['Arvo', 'Rockwell', 'Courier New', 'serif'],
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Arvo', 'serif'],
      },
      colors: {
        team: {
          red: '#e73546',
          green: '#63b986',
          yellow: '#e4e022',
          orange: '#f28b39',
        },
        res: {
          samenwerking: '#c89b6c',
          kennis: '#88be43',
          besluitkracht: '#ae77af',
          tijd: '#2fb7c2',
          materiaal: '#3e67af',
        },
        catan: {
          red: '#ee3244',
          green: '#10b981',
          yellow: '#e7e514',
          orange: '#f97316',
          navy: '#002b47',
          bg: '#f0f4f8',
        },
      },
    },
  },
  plugins: [],
};
