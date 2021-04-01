module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Sacramento"],
      },
      colors: {
        logo: {
          red: "#f67944",
          white: "#fbfbfb",
          brown: "#B89958",
          blue: "#2677bb",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
