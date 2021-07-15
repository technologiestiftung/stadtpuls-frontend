const colors = require("./src/style/colors");

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
];

module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  mode: "jit",
  darkMode: false,
  theme: {
    colors,
    fontFamily: {
      headline: ["'SpaceGrotesk'", ...fallbackFonts],
      sans: ["Sora", ...fallbackFonts],
    },
    minWidth: {
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
    },
    boxShadow: {
      DEFAULT: "0 4px 0 0 rgba(87,83,122,0.05)",
      blue: `0 4px 0 0 ${colors.blue}`,
      purple: `0 4px 0 0 ${colors.purple}`,
      green: `0 4px 0 0 ${colors.green}`,
      inner: "inset 0 2px 0 0 rgba(87,83,122,0.05)",
      none: "none",
    },
    extend: {
      animation: {
        borderpulse: "border-pulse 3s ease-in-out infinite",
        "borderpulse-blue": "border-pulse-blue 3s ease-in-out infinite",
        textpulse: "text-pulse 3s ease-out infinite",
        bgpulse: "bg-pulse 3s linear infinite",
      },
      keyframes: {
        "border-pulse": {
          "0%, 100%": {
            "border-color": colors.gray["200"],
            "box-shadow": `0 4px 0 0 rgba(87,83,122,0.05)`,
          },
          "25%": {
            "border-color": colors.purple,
            "box-shadow": `0 4px 0 0 ${colors.purple}`,
          },
          "50%": {
            "border-color": colors.blue,
            "box-shadow": `0 4px 0 0 ${colors.blue}`,
          },
          "75%": {
            "border-color": colors.green,
            "box-shadow": `0 4px 0 0 ${colors.green}`,
          },
        },
        "border-pulse-blue": {
          "0%, 100%": {
            "border-color": colors.blue,
            "box-shadow": `0 4px 0 0 ${colors.blue}`,
          },
          "33%": {
            "border-color": colors.green,
            "box-shadow": `0 4px 0 0 ${colors.green}`,
          },
          "66%": {
            "border-color": colors.purple,
            "box-shadow": `0 4px 0 0 ${colors.purple}`,
          },
        },
        "text-pulse": {
          "0%, 25%, 100%": { color: colors.purple },
          "50%": { color: colors.blue },
          "75%": { color: colors.green },
        },
        "bg-pulse": {
          "0%, 25%, 100%": { "background-color": colors.purple },
          "50%": { "background-color": colors.blue },
          "75%": { "background-color": colors.green },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
