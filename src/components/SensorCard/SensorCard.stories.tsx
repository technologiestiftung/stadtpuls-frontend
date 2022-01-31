import { parseSensorRecords } from "@lib/hooks/usePublicSensors";
import { getSensorRecords } from "@mocks/supabaseData/records";
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
  id: 12,
  name: "When Array is given multiple arguments",
  description:
    "@wdanxna when Array is given multiple arguments, it iterates over the arguments object and explicitly applies each value to the new array. When you call Array.apply with an array or an object with a length property Array is going to use the length to explicitly set each value of the new array. This is why Array(5) gives an array of 5 elisions, while Array.apply(null, Array(5)) gives an array of 5 undefineds. For more information, see this answer.",
  categoryId: 2,
  categoryName: "Temperatur",
  symbolId: 1,
  latitude: 41.4840064,
  longitude: -72.961534,
  authorId: "1",
  authorName: "Atahualpa Yupanqui De la Vega Van Hilde",
  authorUsername: "atahualpa",
  parsedRecords: parseSensorRecords(
    getSensorRecords({
      sensorId: 12,
      numberOfRecords: 300,
      firstRecordDate: "2020-12-01T08:00:00",
    })
  ),
};

export const MinimalFields = Template.bind({});
MinimalFields.args = {
  id: 12,
  name: "AOL",
  description: "",
  categoryId: 4,
  categoryName: "Luftdruck",
  symbolId: 32,
  authorId: "1",
  authorName: "Atahualpa Yupanqui De la Vega Van Hilde",
  authorUsername: "atahualpa",
  latitude: 41.4840064,
  longitude: -72.961534,
  parsedRecords: [],
};

export const NoMap = Template.bind({});
NoMap.args = {
  id: 12,
  name: "LUFTY AAB3",
  description: "Luftqualität im Wagon AAB3 vom Ubahn der Linie 3",
  categoryId: 3,
  categoryName: "Luftfeuchtigkeit",
  symbolId: 15,
  authorId: "3",
  authorName: "Vogelino",
  authorUsername: "vogelino",
  parsedRecords: parseSensorRecords(
    getSensorRecords({
      sensorId: 12,
      numberOfRecords: 15,
      firstRecordDate: "2020-12-01T08:00:00",
    })
  ),
  withMapBackground: false,
};
