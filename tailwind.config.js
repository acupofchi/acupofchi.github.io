module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Pacifico"],
      },
      colors: {
        logo: {
          red: "#f67944",
          white: "#fbfbfb",
          brown: "#c7943e",
          blue: "#2677bb",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
