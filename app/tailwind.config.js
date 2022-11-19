/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'primary': '#0080FF',
      'regular_primary': '#F4FAFF',
      'light_primary': '#369AFE',
      'semi_primary': '#2196F3',
      'white': '#FFFFFF',
      'light_blue': '#2291FF',
      'sapphire_blue': '#242F57',
      'white_blue': '#97A0C3',
      'white_gray': '#636E95',
      'light_gray': '#FAFCFE',
      'light_grey': '#BFC7E0',
      'light_white_gray': '#DCE9F7',
      'red': '#FA5087',
      'green': '#1FD0A3',
      'gray': '#ECEFF8',
      'body': '#F4F7FC',
      'black': '#000000',
      'dark_grey': '#eaedf7',
      'dark_gray': '#7c88b1',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      'transitionTimingFunction': {
        'only-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'
      },
      'boxShadow': {
        'xxl': '0px 2px 4px rgba(28, 41, 90, 0.0367952)',
        'xsl': '0px 4px 8px rgba(28, 41, 90, 0.0367952)'
      }
    },
    keyframes: {
      loading: {
        '0%': { width: '0' },
        '100%': { width: '80%' },
      },
      completing: {
        '100%': { width: '80%' },
      },
      completed: {
        '0%': { width: '80%' },
        '100%': { width: '100%' },
      }
    },
    screens: {
      'sm': {'max': '768px'},
    }
  },
  plugins: [],
}
