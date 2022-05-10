import { LineGraphType } from "@common/interfaces";
import { Story, Meta } from "@storybook/react";

import { ChartThumbnail } from ".";

export default {
  title: "Charts/ChartThumbnail",
  component: ChartThumbnail,
} as Meta;

const Template: Story<LineGraphType> = args => <ChartThumbnail {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      id: 15,
      date: new Date("2021-04-07T12:10:01.908Z"),
      value: 15,
    },
    {
      id: 20,
      date: new Date("2021-04-08T12:10:01.908Z"),
      value: 20,
    },
    {
      id: 10,
      date: new Date("2021-04-09T12:10:01.908Z"),
      value: 10,
    },
  ],
};
