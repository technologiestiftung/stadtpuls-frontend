const colors = require("./src/style/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

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
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
      "3xl": "1920px",
    },
    fontFamily: {
      headline: ["'SpaceGrotesk'", ...fallbackFonts],
      mono: ["'SpaceMono'", "monospace"],
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
      maxWidth: {
        "8xl": "90rem",
      },
      backgroundImage: {
        "sensor-page-header": "url('/images/sensor-page-header-pixels.svg')",
        "sensor-page-header-mobile":
          "url('/images/sensor-page-header-pixels-mobile.svg')",
      },
      animation: {
        borderpulse: "border-pulse 3s ease-in-out infinite",
        textpulse: "text-pulse 3s ease-out infinite",
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
        "text-pulse": {
          "0%, 25%, 100%": { color: colors.purple },
          "50%": { color: colors.blue },
          "75%": { color: colors.green },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      const extendUnderline = {
        ".underline-green": { "text-decoration-color": colors.green },
        ".underline-blue": { "text-decoration-color": colors.blue },
        ".underline-purple": { "text-decoration-color": colors.purple },
        ".underline-gray": { "text-decoration-color": colors.gray["200"] },
      };
      addUtilities(extendUnderline);
    },
  ],
};
