import { Theme } from "../common/interfaces";
import colors from "./colors";

const theme: Theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: ["768px", "1024px", "1408px"],
  fonts: {
    body:
      '"Sora", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading:
      '"SpaceGrotesk", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 16, 20, 24, 32, 48, 64, 72, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: colors.black,
    background: colors.white,
    primary: colors.blue,
    secondary: colors.purple,
    mediumgrey: colors.gray["500"],
    lightgrey: colors.gray["100"],
    muted: colors.gray["50"],
  },
  text: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
    },
    h1: {
      color: "secondary",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "body",
      fontSize: 4,
    },
    h3: {
      color: "primary",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
    },
    h4: {
      color: "secondary",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 0,
    },
  },
  layout: {
    container: {
      maxWidth: "1216px",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      minHeight: "100vh",
      backgroundSize: "cover",
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
    a: {
      color: "secondary",
      textDecoration: "none",
      "&:hover": {
        color: "primary",
      },
      "&:focus": {
        bg: "muted",
      },
      "&:active": {
        bg: "mediumgrey",
      },
    },
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 0,
      backgroundColor: "background",
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
    },
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
    text: {
      color: "secondary",
      bg: "transparent",
      fontWeight: "bold",
      p: 0,
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  links: {
    footer: {
      color: "mediumgrey",
      textDecoration: "none",
      "&:hover": {
        color: "text",
      },
      "&:focus": {
        bg: "muted",
      },
      "&:active": {
        bg: "mediumgrey",
      },
    },
  },
  forms: {
    input: {
      border: "1px solid #D8D8D8",
      borderRadius: "0",
      padding: 1,
      bg: "transparent",
    },
  },
};

export default theme;
