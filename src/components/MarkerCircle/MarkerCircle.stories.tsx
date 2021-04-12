import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { MarkerCircle } from ".";

export default {
  title: "Map/MarkerCircle",
  component: MarkerCircle,
} as Meta;

const Template: Story<{
  isActive: boolean;
}> = args => (
  <ThemeProvider theme={theme}>
    <MarkerCircle {...args} />
  </ThemeProvider>
);

export const Active = Template.bind({});
Active.args = { isActive: true };

export const Inactive = Template.bind({});
Inactive.args = { isActive: false };
