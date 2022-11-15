/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
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
      'light_white_gray': '#DCE9F7',
      'red': '#FA5087',
      'green': '#1FD0A3',
      'gray': '#ECEFF8',
      'body': '#F4F7FC',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {},
    screens: {
      'sm': {'max': '768px'},
    }
  },
  plugins: [],
}
