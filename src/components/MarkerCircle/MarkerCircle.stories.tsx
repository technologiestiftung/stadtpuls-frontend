import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { MarkerCircle, MarkerCirclePropType } from ".";

export default {
  title: "Map/MarkerCircle",
  component: MarkerCircle,
} as Meta;

const Template: Story<MarkerCirclePropType> = args => (
  <div className='grid place-items-center place-content-center h-screen w-full'>
    <MarkerCircle {...args} />
  </div>
);

export const Active = Template.bind({});
Active.args = {
  isActive: true,
  clickHandler: action("Circle clicked"),
  mouseEnterHandler: action("Circle entered"),
  mouseLeaveHandler: action("Circle left"),
};

export const Inactive = Template.bind({});
Inactive.args = {
  isActive: false,
  clickHandler: action("Circle clicked"),
  mouseEnterHandler: action("Circle entered"),
  mouseLeaveHandler: action("Circle left"),
};

export const Pulsating = Template.bind({});
Pulsating.args = {
  isActive: true,
  isPulsating: true,
  clickHandler: action("Circle clicked"),
  mouseEnterHandler: action("Circle entered"),
  mouseLeaveHandler: action("Circle left"),
};
