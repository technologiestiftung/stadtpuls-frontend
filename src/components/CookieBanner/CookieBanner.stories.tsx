import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { CookieBanner } from ".";

export default {
  title: "UI Elements/CookieBanner",
  component: CookieBanner,
} as Meta;

// CAUTION: This story is not visible with AsBlocker enabled
const Template: Story = args => (
  <ThemeProvider theme={theme}>
    <CookieBanner ignoreCookie {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
