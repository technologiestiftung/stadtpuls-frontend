import { fakeDateValueRecords } from "@mocks/supabaseData/deviceRecords";
import { Story, Meta } from "@storybook/react";
import { SensorCard, SensorCardPropType } from ".";

export default {
  title: "UI Elements/SensorCard",
  component: SensorCard,
} as Meta;

const Template: Story<SensorCardPropType> = args => (
  <div className='max-w-[600px]'>
    <SensorCard {...args} />
  </div>
);

export const LongFields = Template.bind({});
LongFields.args = {
  id: "12",
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
  authorName: "Atahualpa Yupanqui De la Vega Van Hilde",
  records: fakeDateValueRecords,
};

export const MinimalFields = Template.bind({});
MinimalFields.args = {
  id: "12",
  name: "AOL",
  description: "",
  category: {
    id: 4,
    name: "Druck",
    description: "Temperature sensor",
  },
  symbol: 32,
  geocoordinates: { latitude: 41.4840064, longitude: -72.961534 },
  records: [],
};

export const NoMap = Template.bind({});
NoMap.args = {
  id: "12",
  name: "LUFTY AAB3",
  description: "Luftqualität im Wagon AAB3 vom Ubahn der Linie 3",
  category: {
    id: 3,
    name: "Luftfeuchtigkeit",
    description: "Luftfeuchtigkeit sensor",
  },
  symbol: 15,
  authorName: "Vogelino",
  records: fakeDateValueRecords.slice(0, 15),
  withMapBackground: false,
};
