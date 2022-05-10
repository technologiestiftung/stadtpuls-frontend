import { LineGraphType } from "@common/interfaces";
import { Story, Meta } from "@storybook/react";
import { LinePath } from ".";

export default {
  title: "Charts/LinePath",
  component: LinePath,
} as Meta;

const Template: Story<LineGraphType> = args => (
  <svg width={args.width} height={args.height}>
    <LinePath {...args} />
  </svg>
);

export const Default = Template.bind({});
Default.args = {
  width: 400,
  height: 200,
  data: [
    {
      id: 10,
      date: new Date("2021-04-09T12:10:01.908Z"),
      value: 10,
    },
    {
      id: 20,
      date: new Date("2021-04-08T12:10:01.908Z"),
      value: 20,
    },
    {
      id: 15,
      date: new Date("2021-04-07T12:10:01.908Z"),
      value: 15,
    },
  ],
};
