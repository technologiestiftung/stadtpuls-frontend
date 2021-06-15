import { Story, Meta } from "@storybook/react";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";

import { ProjectPreviewMap } from ".";

export default {
  title: "Map/ProjectPreviewMap",
  component: ProjectPreviewMap,
} as Meta;

const Template: Story<{
  mapWidth: number;
  mapHeight: number;
  viewport: InteractiveMapProps;
}> = args => <ProjectPreviewMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  mapWidth: 600,
  mapHeight: 400,
  viewport: {
    latitude: 10,
    longitude: 53.55,
  },
};
