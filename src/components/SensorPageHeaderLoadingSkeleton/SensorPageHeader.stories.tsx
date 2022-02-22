import { Story, Meta } from "@storybook/react";
import {
  SensorPageHeader,
  SensorPageHeaderPropType,
} from "@components/SensorPageHeader";
import { SensorPageHeaderLoadingSkeleton } from ".";

export default {
  title: "Layout/SensorPageHeaderLoadingSkeleton",
  component: SensorPageHeaderLoadingSkeleton,
} as Meta;

const Template: Story<SensorPageHeaderPropType> = args => (
  <>
    <SensorPageHeaderLoadingSkeleton />
    <SensorPageHeader {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  name: "When Array is given",
  description:
    "@wdanxna when Array is given multiple arguments, it iterates over the arguments object.",
  categoryId: 2,
  categoryName: "Temperatur",
  symbolId: 1,
  latitude: 52.4961458,
  longitude: 13.4335723,
  authorUsername: "yupank1",
  authorName: "Atahualpa Yupanqui De la Vega Van Hilde",
  withEditButton: true,
};
