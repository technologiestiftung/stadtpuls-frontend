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
      headline: [ "'SpaceGrotesk'", ...fallbackFonts ],
      sans: [ "Sora", ...fallbackFonts ],
    },
    minWidth: {
      "xs": "20rem",
      "sm": "24rem",
      "md": "28rem",
      "lg": "32rem",
      "xl": "36rem",
    },
    boxShadow: {
      "DEFAULT": "0 4px 0 0 rgba(87,83,122,0.05)",
      "blue": `0 4px 0 0 ${colors.blue}`,
      "purple": `0 4px 0 0 ${colors.purple}`,
      "green": `0 4px 0 0 ${colors.green}`,
      "inner": "inset 0 2px 0 0 rgba(87,83,122,0.05)",
      "none": "none",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/typography')],
};
