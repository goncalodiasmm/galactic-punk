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
      width: {
        game: '1280px',
      },
      height: {
        game: '673px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
