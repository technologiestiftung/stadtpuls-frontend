const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false,
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#2f2f2f",
      blue: {
        25: "#f5f6fa",
        50: "#e9ebf4",
        100: "#d2d7e9",
        200: "#a5afd3",
        300: "#7887bd",
        400: "#4b5fa7",
        500: "#1e3791",
      },
      red: {
        50: "#fde6eb",
        100: "#faccd6",
        200: "#f599ad",
        300: "#f06684",
        400: "#eb335b",
        500: "#e60032",
      },
      gray: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
      },
    },
    fontFamily: {
      sans: [
        "IBM Plex Sans",
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
      ],
    },
    minWidth: {
      "xs": "20rem",
      "sm": "24rem",
      "md": "28rem",
      "lg": "32rem",
      "xl": "36rem",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/typography')],
};
