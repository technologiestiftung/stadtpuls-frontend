import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { ApiInfo } from ".";
import { ApiTableType } from "../../common/interfaces";

export default {
  title: "ApiInfo",
  component: ApiInfo,
} as Meta;

const Template: Story<ApiTableType> = args => (
  <ThemeProvider theme={theme}>
    <ApiInfo {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  entries: [
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" },
    { id: 4, name: "Four" },
  ],
};
