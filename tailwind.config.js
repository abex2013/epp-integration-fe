module.exports = {
purge: {
  enabled: process.env.NODE_ENV === 'production',
  content: [
  './apps/**/*.html',
  './apps/**/*.js',
  './libs/**/*.html',
  './libs/**/*.js'
]},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
// ,