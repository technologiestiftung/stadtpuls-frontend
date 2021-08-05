const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
    "storybook-css-modules-preset",
  ],
  webpackFinal: async config => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
    ];
    return config;
  },
};
