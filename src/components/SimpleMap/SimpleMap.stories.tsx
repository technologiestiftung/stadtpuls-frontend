import { Story, Meta } from "@storybook/react";

import { SimpleMap } from ".";

export default {
  title: "Map/SimpleMap",
  component: SimpleMap,
} as Meta;

const Template: Story<{
  mapWidth: number;
  mapHeight: number;
}> = args => <SimpleMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  mapWidth: 600,
  mapHeight: 400,
};
