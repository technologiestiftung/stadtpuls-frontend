import { Story, Meta } from "@storybook/react";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";

import { SensorPreviewMap } from ".";

export default {
  title: "Map/SensorPreviewMap",
  component: SensorPreviewMap,
} as Meta;

const Template: Story<{
  mapWidth: number;
  mapHeight: number;
  viewport: InteractiveMapProps;
}> = args => <SensorPreviewMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  mapWidth: 600,
  mapHeight: 400,
  viewport: {
    latitude: 10,
    longitude: 53.55,
  },
};
