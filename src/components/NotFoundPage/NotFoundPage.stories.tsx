import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { NotFoundPage } from ".";

export default {
  title: "NotFoundPage",
  component: NotFoundPage,
} as Meta;

const Template: Story = args => (
  <ThemeProvider theme={theme}>
    <NotFoundPage {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
