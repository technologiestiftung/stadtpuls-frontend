import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { RadioTabs } from ".";

export default {
  title: "RadioTabs",
  argTypes: {
    name: {
      description: "The HTML name for the radio field",
    },
    options: {
      description: "The tabs to display",
    },
    changeHandler: {
      description: "A callback called when a tab changes",
    },
  },
} as Meta;

const Template: Story<{
  name: string;
  options: {
    title: string;
    id: number;
    isActive: boolean;
  }[];
  changeHandler: (selected: number) => void;
}> = args => (
  <ThemeProvider theme={theme}>
    <RadioTabs {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  name: "story-radio",
  changeHandler: action("Changed tab"),
  options: [
    {
      id: 1,
      title: "My first tab",
      isActive: true,
    },
    {
      id: 2,
      title: "My second tab",
      isActive: false,
    },
  ],
};
