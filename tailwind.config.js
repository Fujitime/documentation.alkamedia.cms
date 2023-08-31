module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '_sm': {
          'max': '640px'
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '98%'
          }
        }
      },
      colors: {
        primary: 'var(--primary)',
        'text-main': 'var(--text-main)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
