import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { MarkerMap } from ".";
import { MarkerType } from "@common/interfaces";

export default {
  title: "MarkerMap",
  component: MarkerMap,
} as Meta;

const Template: Story<{
  markers: MarkerType[];
  clickHandler: (markerId: number) => void;
  mapWidth: number;
  mapHeight: number;
}> = args => (
  <ThemeProvider theme={theme}>
    <MarkerMap {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  mapWidth: 600,
  mapHeight: 400,
  markers: [
    {
      id: 1,
      latitude: 52.48864,
      longitude: 13.342802,
      isActive: true,
    },
  ],
};
