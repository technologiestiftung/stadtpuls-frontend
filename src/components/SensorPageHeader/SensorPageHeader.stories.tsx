import { Story, Meta } from "@storybook/react";
import { SensorPageHeader, SensorPageHeaderPropType } from ".";

export default {
  title: "Layout/SensorPageHeader",
  component: SensorPageHeader,
} as Meta;

const Template: Story<SensorPageHeaderPropType> = args => (
  <SensorPageHeader {...args} />
);

export const MaximumProps = Template.bind({});
MaximumProps.args = {
  id: "1",
  name: "When Array is given multiple arguments",
  description:
    "@wdanxna when Array is given multiple arguments, it iterates over the arguments object and explicitly applies each value to the new array. When you call Array.apply with an array or an object with a length property Array is going to use the length to explicitly set each value of the new array. This is why Array(5) gives an array of 5 elisions, while Array.apply(null, Array(5)) gives an array of 5 undefineds. For more information, see this answer.",
  category: {
    id: 2,
    name: "Temperatur",
    description: "Temperature sensor",
  },
  symbol: 1,
  geocoordinates: { latitude: 52.4961458, longitude: 13.4335723 },
  author: {
    username: "yupank1",
    displayName: "Atahualpa Yupanqui De la Vega Van Hilde",
  },
  withEditButton: true,
};

export const MinimumProps = Template.bind({});
MinimumProps.args = {
  id: "1",
  name: "LUFYA1",
  category: {
    id: 1,
    name: "CO2",
    description: "CO2 sensor",
  },
  symbol: 13,
  geocoordinates: { latitude: -41.495909, longitude: -72.971707 },
  author: {
    username: "lalushka",
    displayName: "Lala",
  },
};
