module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans'],
      },
      keyframes: {
        progress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        progress: 'progress 5s linear',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
