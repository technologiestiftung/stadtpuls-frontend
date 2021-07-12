const colors = require('./src/style/colors')

const fallbackFonts = [
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Arial",
  "Noto Sans",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "Noto Color Emoji",
]

module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false,
  theme: {
    colors,
    fontFamily: {
      headline: [ "Space Grotesk", ...fallbackFonts ],
      sans: [ "Sora", ...fallbackFonts ],
    },
    minWidth: {
      "xs": "20rem",
      "sm": "24rem",
      "md": "28rem",
      "lg": "32rem",
      "xl": "36rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/typography')],
};
