import { Story, Meta } from "@storybook/react";

import { ProjectPreviewMap } from ".";

export default {
  title: "Map/ProjectPreviewMap",
  component: ProjectPreviewMap,
} as Meta;

const Template: Story<{
  mapWidth: number;
  mapHeight: number;
}> = args => <ProjectPreviewMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  mapWidth: 600,
  mapHeight: 400,
};
