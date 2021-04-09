import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { IconButton, IconButtonType } from ".";

export default {
  title: "UI Elements/IconButton",
  component: IconButton,
} as Meta;

const Template: Story<IconButtonType> = args => (
  <ThemeProvider theme={theme}>
    <IconButton {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  value: "Download",
  iconSource: "/images/download.svg",
};
