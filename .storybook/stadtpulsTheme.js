import { color, create } from '@storybook/theming';

const colors = {
  white: "#F9FCFD",
  black: "#100C53",
  blue: "#0000C2",
  green: "#46ECA1",
  purple: "#8330FF",
  gray: {
    "50": "#F2F3F8",
    "100": "#E7EAF2",
    "200": "#CFD0DC",
    "300": "#B4B4C7",
    "400": "#9695AE",
    "500": "#787696",
    "600": "#636188",
    "700": "#4A4878",
    "800": "#332F66",
    "900": "#1E1A5A",
  },
  error: "#FF568D",
  warning: "#FFB756",
};

export default create({
  base: 'dark',
  brandTitle: 'Stadtpuls',
  brandUrl: 'https://stadtpuls.com',
  brandImage: '/images/logo.svg',

  colorSecondary: colors.purple,
  colorPrimary: colors.blue,

  // UI
  appBg: 'url(/images/patterns/white.svg)',
  appContentBg: colors.white,
  appBorderColor: colors.gray['200'],
  appBorderRadius: 0,
  gridCellSize: 8,

  // Typography
  fontBase: '"Space Grotesk", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontCode: 'monospace',

  // Text colors
  textColor: colors.gray['700'],
  textInverseColor: colors.white,
  textMutedColor: colors.gray['400'],

  // Toolbar default and active colors
  barTextColor: colors.gray['700'],
  barSelectedColor: colors.purple,
  barBg: colors.white,

  // Form colors
  inputBg: colors.white,
  inputBorder: colors.gray['200'],
  inputTextColor: colors.white,
  inputBorderRadius: 0,
});
