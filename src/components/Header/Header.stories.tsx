import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { Header } from ".";

export default {
  title: "Layout/Header",
  component: Header,
} as Meta;

const Template: Story = args => (
  <ThemeProvider theme={theme}>
    <Header {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
