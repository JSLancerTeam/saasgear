const tailwindUI = require('@tailwindcss/ui');

module.exports = {
  purge: ['src/**/*.js', 'src/**/*.jsx', 'public/**/*.html'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [tailwindUI],
};
