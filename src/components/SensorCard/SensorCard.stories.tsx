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
  records: [
    { date: "2021-02-01T00:00:00+00:00", value: 0.51 },
    { date: "2021-01-31T23:00:00+00:00", value: 0.56 },
    { date: "2021-01-31T22:00:00+00:00", value: 0.61 },
    { date: "2021-01-31T21:00:00+00:00", value: 0.57 },
    { date: "2021-01-31T20:00:00+00:00", value: 0.61 },
    { date: "2021-01-31T19:00:00+00:00", value: 0.59 },
    { date: "2021-01-31T18:00:00+00:00", value: 0.65 },
    { date: "2021-01-31T17:00:00+00:00", value: 0.7 },
    { date: "2021-01-31T16:00:00+00:00", value: 0.74 },
    { date: "2021-01-31T15:00:00+00:00", value: 0.68 },
    { date: "2021-01-31T14:00:00+00:00", value: 0.71 },
    { date: "2021-01-31T13:00:00+00:00", value: 0.7 },
    { date: "2021-01-31T12:00:00+00:00", value: 0.66 },
    { date: "2021-01-31T11:00:00+00:00", value: 0.64 },
    { date: "2021-01-31T10:00:00+00:00", value: 0.61 },
    { date: "2021-01-31T09:00:00+00:00", value: 0.64 },
    { date: "2021-01-31T08:00:00+00:00", value: 0.63 },
    { date: "2021-01-31T07:00:00+00:00", value: 0.66 },
    { date: "2021-01-31T06:00:00+00:00", value: 0.67 },
    { date: "2021-01-31T05:00:00+00:00", value: 0.68 },
    { date: "2021-01-31T04:00:00+00:00", value: 0.75 },
    { date: "2021-01-31T03:00:00+00:00", value: 0.79 },
    { date: "2021-01-31T02:00:00+00:00", value: 0.72 },
    { date: "2021-01-31T01:00:00+00:00", value: 0.77 },
    { date: "2021-01-31T00:00:00+00:00", value: 0.77 },
    { date: "2021-01-30T23:00:00+00:00", value: 0.78 },
    { date: "2021-01-30T22:00:00+00:00", value: 0.72 },
    { date: "2021-01-30T21:00:00+00:00", value: 0.78 },
    { date: "2021-01-30T20:00:00+00:00", value: 0.84 },
    { date: "2021-01-30T19:00:00+00:00", value: 0.85 },
    { date: "2021-01-30T18:00:00+00:00", value: 0.87 },
    { date: "2021-01-30T17:00:00+00:00", value: 0.81 },
    { date: "2021-01-30T16:00:00+00:00", value: 0.78 },
    { date: "2021-01-30T15:00:00+00:00", value: 0.81 },
    { date: "2021-01-30T14:00:00+00:00", value: 0.8 },
    { date: "2021-01-30T13:00:00+00:00", value: 0.76 },
    { date: "2021-01-30T12:00:00+00:00", value: 0.71 },
    { date: "2021-01-30T11:00:00+00:00", value: 0.71 },
    { date: "2021-01-30T10:00:00+00:00", value: 0.66 },
    { date: "2021-01-30T09:00:00+00:00", value: 0.67 },
    { date: "2021-01-30T08:00:00+00:00", value: 0.61 },
    { date: "2021-01-30T07:00:00+00:00", value: 0.57 },
    { date: "2021-01-30T06:00:00+00:00", value: 0.56 },
    { date: "2021-01-30T05:00:00+00:00", value: 0.62 },
    { date: "2021-01-30T04:00:00+00:00", value: 0.65 },
    { date: "2021-01-30T03:00:00+00:00", value: 0.69 },
    { date: "2021-01-30T02:00:00+00:00", value: 0.64 },
    { date: "2021-01-30T01:00:00+00:00", value: 0.62 },
    { date: "2021-01-30T00:00:00+00:00", value: 0.67 },
    { date: "2021-01-29T23:00:00+00:00", value: 0.7 },
    { date: "2021-01-29T22:00:00+00:00", value: 0.73 },
    { date: "2021-01-29T21:00:00+00:00", value: 0.67 },
    { date: "2021-01-29T20:00:00+00:00", value: 0.62 },
    { date: "2021-01-29T19:00:00+00:00", value: 0.58 },
    { date: "2021-01-29T18:00:00+00:00", value: 0.53 },
    { date: "2021-01-29T17:00:00+00:00", value: 0.48 },
    { date: "2021-01-29T16:00:00+00:00", value: 0.44 },
    { date: "2021-01-29T15:00:00+00:00", value: 0.47 },
    { date: "2021-01-29T14:00:00+00:00", value: 0.45 },
    { date: "2021-01-29T13:00:00+00:00", value: 0.45 },
    { date: "2021-01-29T12:00:00+00:00", value: 0.42 },
    { date: "2021-01-29T11:00:00+00:00", value: 0.44 },
    { date: "2021-01-29T10:00:00+00:00", value: 0.4 },
    { date: "2021-01-29T09:00:00+00:00", value: 0.37 },
    { date: "2021-01-29T08:00:00+00:00", value: 0.41 },
    { date: "2021-01-29T07:00:00+00:00", value: 0.38 },
    { date: "2021-01-29T06:00:00+00:00", value: 0.35 },
    { date: "2021-01-29T05:00:00+00:00", value: 0.32 },
    { date: "2021-01-29T04:00:00+00:00", value: 0.32 },
    { date: "2021-01-29T03:00:00+00:00", value: 0.3 },
    { date: "2021-01-29T02:00:00+00:00", value: 0.27 },
    { date: "2021-01-29T01:00:00+00:00", value: 0.29 },
    { date: "2021-01-29T00:00:00+00:00", value: 0.3 },
    { date: "2021-01-28T23:00:00+00:00", value: 0.32 },
    { date: "2021-01-28T22:00:00+00:00", value: 0.35 },
    { date: "2021-01-28T21:00:00+00:00", value: 0.32 },
    { date: "2021-01-28T20:00:00+00:00", value: 0.34 },
    { date: "2021-01-28T19:00:00+00:00", value: 0.36 },
    { date: "2021-01-28T18:00:00+00:00", value: 0.38 },
    { date: "2021-01-28T17:00:00+00:00", value: 0.42 },
    { date: "2021-01-28T16:00:00+00:00", value: 0.45 },
    { date: "2021-01-28T15:00:00+00:00", value: 0.44 },
    { date: "2021-01-28T14:00:00+00:00", value: 0.42 },
    { date: "2021-01-28T13:00:00+00:00", value: 0.38 },
    { date: "2021-01-28T12:00:00+00:00", value: 0.39 },
    { date: "2021-01-28T11:00:00+00:00", value: 0.37 },
    { date: "2021-01-28T10:00:00+00:00", value: 0.36 },
    { date: "2021-01-28T09:00:00+00:00", value: 0.36 },
    { date: "2021-01-28T08:00:00+00:00", value: 0.36 },
    { date: "2021-01-28T07:00:00+00:00", value: 0.33 },
    { date: "2021-01-28T06:00:00+00:00", value: 0.32 },
    { date: "2021-01-28T05:00:00+00:00", value: 0.3 },
    { date: "2021-01-28T04:00:00+00:00", value: 0.33 },
    { date: "2021-01-28T03:00:00+00:00", value: 0.34 },
    { date: "2021-01-28T02:00:00+00:00", value: 0.33 },
    { date: "2021-01-28T01:00:00+00:00", value: 0.32 },
    { date: "2021-01-28T00:00:00+00:00", value: 0.29 },
    { date: "2021-01-27T23:00:00+00:00", value: 0.27 },
    { date: "2021-01-27T22:00:00+00:00", value: 0.29 },
    { date: "2021-01-27T21:00:00+00:00", value: 0.27 },
    { date: "2021-01-27T20:00:00+00:00", value: 0.26 },
    { date: "2021-01-27T19:00:00+00:00", value: 0.26 },
    { date: "2021-01-27T18:00:00+00:00", value: 0.27 },
    { date: "2021-01-27T17:00:00+00:00", value: 0.25 },
    { date: "2021-01-27T16:00:00+00:00", value: 0.24 },
    { date: "2021-01-27T15:00:00+00:00", value: 0.26 },
    { date: "2021-01-27T14:00:00+00:00", value: 0.24 },
    { date: "2021-01-27T13:00:00+00:00", value: 0.24 },
    { date: "2021-01-27T12:00:00+00:00", value: 0.23 },
    { date: "2021-01-27T11:00:00+00:00", value: 0.25 },
    { date: "2021-01-27T10:00:00+00:00", value: 0.25 },
    { date: "2021-01-27T09:00:00+00:00", value: 0.27 },
    { date: "2021-01-27T08:00:00+00:00", value: 0.27 },
    { date: "2021-01-27T07:00:00+00:00", value: 0.27 },
    { date: "2021-01-27T06:00:00+00:00", value: 0.25 },
    { date: "2021-01-27T05:00:00+00:00", value: 0.24 },
    { date: "2021-01-27T04:00:00+00:00", value: 0.23 },
    { date: "2021-01-27T03:00:00+00:00", value: 0.24 },
    { date: "2021-01-27T02:00:00+00:00", value: 0.23 },
    { date: "2021-01-27T01:00:00+00:00", value: 0.23 },
    { date: "2021-01-27T00:00:00+00:00", value: 0.26 },
    { date: "2021-01-26T23:00:00+00:00", value: 0.28 },
    { date: "2021-01-26T22:00:00+00:00", value: 0.3 },
    { date: "2021-01-26T21:00:00+00:00", value: 0.29 },
    { date: "2021-01-26T20:00:00+00:00", value: 0.32 },
    { date: "2021-01-26T19:00:00+00:00", value: 0.31 },
    { date: "2021-01-26T18:00:00+00:00", value: 0.3 },
    { date: "2021-01-26T17:00:00+00:00", value: 0.32 },
    { date: "2021-01-26T16:00:00+00:00", value: 0.29 },
    { date: "2021-01-26T15:00:00+00:00", value: 0.29 },
    { date: "2021-01-26T14:00:00+00:00", value: 0.27 },
    { date: "2021-01-26T13:00:00+00:00", value: 0.28 },
    { date: "2021-01-26T12:00:00+00:00", value: 0.31 },
    { date: "2021-01-26T11:00:00+00:00", value: 0.28 },
    { date: "2021-01-26T10:00:00+00:00", value: 0.26 },
    { date: "2021-01-26T09:00:00+00:00", value: 0.26 },
    { date: "2021-01-26T08:00:00+00:00", value: 0.26 },
    { date: "2021-01-26T07:00:00+00:00", value: 0.26 },
    { date: "2021-01-26T06:00:00+00:00", value: 0.29 },
    { date: "2021-01-26T05:00:00+00:00", value: 0.3 },
    { date: "2021-01-26T04:00:00+00:00", value: 0.33 },
    { date: "2021-01-26T03:00:00+00:00", value: 0.34 },
    { date: "2021-01-26T02:00:00+00:00", value: 0.31 },
    { date: "2021-01-26T01:00:00+00:00", value: 0.28 },
    { date: "2021-01-26T00:00:00+00:00", value: 0.27 },
    { date: "2021-01-25T23:00:00+00:00", value: 0.26 },
    { date: "2021-01-25T22:00:00+00:00", value: 0.28 },
    { date: "2021-01-25T21:00:00+00:00", value: 0.29 },
    { date: "2021-01-25T20:00:00+00:00", value: 0.27 },
    { date: "2021-01-25T19:00:00+00:00", value: 0.27 },
    { date: "2021-01-25T18:00:00+00:00", value: 0.26 },
    { date: "2021-01-25T17:00:00+00:00", value: 0.24 },
    { date: "2021-01-25T16:00:00+00:00", value: 0.25 },
    { date: "2021-01-25T15:00:00+00:00", value: 0.26 },
    { date: "2021-01-25T14:00:00+00:00", value: 0.28 },
    { date: "2021-01-25T13:00:00+00:00", value: 0.28 },
    { date: "2021-01-25T12:00:00+00:00", value: 0.28 },
    { date: "2021-01-25T11:00:00+00:00", value: 0.28 },
    { date: "2021-01-25T10:00:00+00:00", value: 0.29 },
    { date: "2021-01-25T09:00:00+00:00", value: 0.29 },
    { date: "2021-01-25T08:00:00+00:00", value: 0.27 },
    { date: "2021-01-25T07:00:00+00:00", value: 0.3 },
    { date: "2021-01-25T06:00:00+00:00", value: 0.27 },
    { date: "2021-01-25T05:00:00+00:00", value: 0.29 },
    { date: "2021-01-25T04:00:00+00:00", value: 0.31 },
    { date: "2021-01-25T03:00:00+00:00", value: 0.29 },
    { date: "2021-01-25T02:00:00+00:00", value: 0.31 },
    { date: "2021-01-25T01:00:00+00:00", value: 0.33 },
    { date: "2021-01-25T00:00:00+00:00", value: 0.32 },
    { date: "2021-01-24T23:00:00+00:00", value: 0.29 },
    { date: "2021-01-24T22:00:00+00:00", value: 0.32 },
    { date: "2021-01-24T21:00:00+00:00", value: 0.3 },
    { date: "2021-01-24T20:00:00+00:00", value: 0.28 },
    { date: "2021-01-24T19:00:00+00:00", value: 0.28 },
    { date: "2021-01-24T18:00:00+00:00", value: 0.26 },
    { date: "2021-01-24T17:00:00+00:00", value: 0.26 },
    { date: "2021-01-24T16:00:00+00:00", value: 0.26 },
    { date: "2021-01-24T15:00:00+00:00", value: 0.27 },
    { date: "2021-01-24T14:00:00+00:00", value: 0.26 },
    { date: "2021-01-24T13:00:00+00:00", value: 0.27 },
    { date: "2021-01-24T12:00:00+00:00", value: 0.26 },
    { date: "2021-01-24T11:00:00+00:00", value: 0.29 },
    { date: "2021-01-24T10:00:00+00:00", value: 0.32 },
    { date: "2021-01-24T09:00:00+00:00", value: 0.3 },
    { date: "2021-01-24T08:00:00+00:00", value: 0.29 },
    { date: "2021-01-24T07:00:00+00:00", value: 0.27 },
    { date: "2021-01-24T06:00:00+00:00", value: 0.29 },
    { date: "2021-01-24T05:00:00+00:00", value: 0.32 },
    { date: "2021-01-24T04:00:00+00:00", value: 0.34 },
    { date: "2021-01-24T03:00:00+00:00", value: 0.33 },
    { date: "2021-01-24T02:00:00+00:00", value: 0.36 },
    { date: "2021-01-24T01:00:00+00:00", value: 0.38 },
    { date: "2021-01-24T00:00:00+00:00", value: 0.38 },
    { date: "2021-01-23T23:00:00+00:00", value: 0.39 },
    { date: "2021-01-23T22:00:00+00:00", value: 0.42 },
    { date: "2021-01-23T21:00:00+00:00", value: 0.38 },
    { date: "2021-01-23T20:00:00+00:00", value: 0.35 },
    { date: "2021-01-23T19:00:00+00:00", value: 0.36 },
    { date: "2021-01-23T18:00:00+00:00", value: 0.36 },
    { date: "2021-01-23T17:00:00+00:00", value: 0.39 },
    { date: "2021-01-23T16:00:00+00:00", value: 0.43 },
    { date: "2021-01-23T15:00:00+00:00", value: 0.44 },
    { date: "2021-01-23T14:00:00+00:00", value: 0.41 },
    { date: "2021-01-23T13:00:00+00:00", value: 0.41 },
    { date: "2021-01-23T12:00:00+00:00", value: 0.4 },
    { date: "2021-01-23T11:00:00+00:00", value: 0.44 },
    { date: "2021-01-23T10:00:00+00:00", value: 0.42 },
    { date: "2021-01-23T09:00:00+00:00", value: 0.43 },
    { date: "2021-01-23T08:00:00+00:00", value: 0.42 },
    { date: "2021-01-23T07:00:00+00:00", value: 0.45 },
    { date: "2021-01-23T06:00:00+00:00", value: 0.41 },
    { date: "2021-01-23T05:00:00+00:00", value: 0.44 },
    { date: "2021-01-23T04:00:00+00:00", value: 0.44 },
    { date: "2021-01-23T03:00:00+00:00", value: 0.49 },
    { date: "2021-01-23T02:00:00+00:00", value: 0.46 },
    { date: "2021-01-23T01:00:00+00:00", value: 0.48 },
    { date: "2021-01-23T00:00:00+00:00", value: 0.54 },
    { date: "2021-01-22T23:00:00+00:00", value: 0.59 },
    { date: "2021-01-22T22:00:00+00:00", value: 0.65 },
    { date: "2021-01-22T21:00:00+00:00", value: 0.69 },
    { date: "2021-01-22T20:00:00+00:00", value: 0.69 },
    { date: "2021-01-22T19:00:00+00:00", value: 0.73 },
    { date: "2021-01-22T18:00:00+00:00", value: 0.74 },
    { date: "2021-01-22T17:00:00+00:00", value: 0.73 },
    { date: "2021-01-22T16:00:00+00:00", value: 0.72 },
    { date: "2021-01-22T15:00:00+00:00", value: 0.78 },
    { date: "2021-01-22T14:00:00+00:00", value: 0.82 },
    { date: "2021-01-22T13:00:00+00:00", value: 0.88 },
    { date: "2021-01-22T12:00:00+00:00", value: 0.82 },
    { date: "2021-01-22T11:00:00+00:00", value: 0.89 },
    { date: "2021-01-22T10:00:00+00:00", value: 0.96 },
    { date: "2021-01-22T09:00:00+00:00", value: 1.03 },
    { date: "2021-01-22T08:00:00+00:00", value: 1.14 },
    { date: "2021-01-22T07:00:00+00:00", value: 1.14 },
    { date: "2021-01-22T06:00:00+00:00", value: 1.07 },
    { date: "2021-01-22T05:00:00+00:00", value: 1.09 },
    { date: "2021-01-22T04:00:00+00:00", value: 1.17 },
    { date: "2021-01-22T03:00:00+00:00", value: 1.07 },
    { date: "2021-01-22T02:00:00+00:00", value: 1.03 },
    { date: "2021-01-22T01:00:00+00:00", value: 1.05 },
    { date: "2021-01-22T00:00:00+00:00", value: 1.12 },
    { date: "2021-01-21T23:00:00+00:00", value: 1.21 },
    { date: "2021-01-21T22:00:00+00:00", value: 1.11 },
    { date: "2021-01-21T21:00:00+00:00", value: 1.17 },
    { date: "2021-01-21T20:00:00+00:00", value: 1.1 },
    { date: "2021-01-21T19:00:00+00:00", value: 1.12 },
    { date: "2021-01-21T18:00:00+00:00", value: 1.12 },
    { date: "2021-01-21T17:00:00+00:00", value: 1.14 },
    { date: "2021-01-21T16:00:00+00:00", value: 1.12 },
    { date: "2021-01-21T15:00:00+00:00", value: 1.09 },
    { date: "2021-01-21T14:00:00+00:00", value: 1.16 },
    { date: "2021-01-21T13:00:00+00:00", value: 1.25 },
    { date: "2021-01-21T12:00:00+00:00", value: 1.2 },
    { date: "2021-01-21T11:00:00+00:00", value: 1.28 },
    { date: "2021-01-21T10:00:00+00:00", value: 1.28 },
    { date: "2021-01-21T09:00:00+00:00", value: 1.29 },
    { date: "2021-01-21T08:00:00+00:00", value: 1.25 },
    { date: "2021-01-21T07:00:00+00:00", value: 1.34 },
    { date: "2021-01-21T06:00:00+00:00", value: 1.46 },
    { date: "2021-01-21T05:00:00+00:00", value: 1.33 },
    { date: "2021-01-21T04:00:00+00:00", value: 1.25 },
    { date: "2021-01-21T03:00:00+00:00", value: 1.19 },
    { date: "2021-01-21T02:00:00+00:00", value: 1.29 },
    { date: "2021-01-21T01:00:00+00:00", value: 1.39 },
    { date: "2021-01-21T00:00:00+00:00", value: 1.37 },
    { date: "2021-01-20T23:00:00+00:00", value: 1.27 },
    { date: "2021-01-20T22:00:00+00:00", value: 1.17 },
    { date: "2021-01-20T21:00:00+00:00", value: 1.22 },
    { date: "2021-01-20T20:00:00+00:00", value: 1.31 },
    { date: "2021-01-20T19:00:00+00:00", value: 1.28 },
    { date: "2021-01-20T18:00:00+00:00", value: 1.3 },
    { date: "2021-01-20T17:00:00+00:00", value: 1.38 },
    { date: "2021-01-20T16:00:00+00:00", value: 1.4 },
    { date: "2021-01-20T15:00:00+00:00", value: 1.5 },
    { date: "2021-01-20T14:00:00+00:00", value: 1.64 },
    { date: "2021-01-20T13:00:00+00:00", value: 1.56 },
    { date: "2021-01-20T12:00:00+00:00", value: 1.59 },
    { date: "2021-01-20T11:00:00+00:00", value: 1.51 },
    { date: "2021-01-20T10:00:00+00:00", value: 1.62 },
    { date: "2021-01-20T09:00:00+00:00", value: 1.52 },
    { date: "2021-01-20T08:00:00+00:00", value: 1.53 },
    { date: "2021-01-20T07:00:00+00:00", value: 1.5 },
    { date: "2021-01-20T06:00:00+00:00", value: 1.45 },
    { date: "2021-01-20T05:00:00+00:00", value: 1.35 },
    { date: "2021-01-20T04:00:00+00:00", value: 1.49 },
    { date: "2021-01-20T03:00:00+00:00", value: 1.5 },
    { date: "2021-01-20T02:00:00+00:00", value: 1.63 },
    { date: "2021-01-20T01:00:00+00:00", value: 1.76 },
    { date: "2021-01-20T00:00:00+00:00", value: 1.93 },
    { date: "2021-01-19T23:00:00+00:00", value: 1.98 },
    { date: "2021-01-19T22:00:00+00:00", value: 2.04 },
    { date: "2021-01-19T21:00:00+00:00", value: 2.14 },
    { date: "2021-01-19T20:00:00+00:00", value: 2.16 },
    { date: "2021-01-19T19:00:00+00:00", value: 2.11 },
    { date: "2021-01-19T18:00:00+00:00", value: 2.32 },
    { date: "2021-01-19T17:00:00+00:00", value: 2.41 },
    { date: "2021-01-19T16:00:00+00:00", value: 2.22 },
    { date: "2021-01-19T15:00:00+00:00", value: 2.08 },
    { date: "2021-01-19T14:00:00+00:00", value: 2.17 },
    { date: "2021-01-19T13:00:00+00:00", value: 2.12 },
    { date: "2021-01-19T12:00:00+00:00", value: 1.93 },
    { date: "2021-01-19T11:00:00+00:00", value: 1.78 },
    { date: "2021-01-19T10:00:00+00:00", value: 1.65 },
    { date: "2021-01-19T09:00:00+00:00", value: 1.62 },
    { date: "2021-01-19T08:00:00+00:00", value: 1.48 },
    { date: "2021-01-19T07:00:00+00:00", value: 1.53 },
    { date: "2021-01-19T06:00:00+00:00", value: 1.48 },
    { date: "2021-01-19T05:00:00+00:00", value: 1.49 },
    { date: "2021-01-19T04:00:00+00:00", value: 1.41 },
    { date: "2021-01-19T03:00:00+00:00", value: 1.46 },
    { date: "2021-01-19T02:00:00+00:00", value: 1.4 },
    { date: "2021-01-19T01:00:00+00:00", value: 1.46 },
    { date: "2021-01-19T00:00:00+00:00", value: 1.5 },
    { date: "2021-01-18T23:00:00+00:00", value: 1.48 },
    { date: "2021-01-18T22:00:00+00:00", value: 1.4 },
    { date: "2021-01-18T21:00:00+00:00", value: 1.4 },
    { date: "2021-01-18T20:00:00+00:00", value: 1.29 },
    { date: "2021-01-18T19:00:00+00:00", value: 1.3 },
    { date: "2021-01-18T18:00:00+00:00", value: 1.2 },
    { date: "2021-01-18T17:00:00+00:00", value: 1.12 },
    { date: "2021-01-18T16:00:00+00:00", value: 1.03 },
    { date: "2021-01-18T15:00:00+00:00", value: 0.99 },
    { date: "2021-01-18T14:00:00+00:00", value: 0.96 },
    { date: "2021-01-18T13:00:00+00:00", value: 0.91 },
    { date: "2021-01-18T12:00:00+00:00", value: 0.89 },
    { date: "2021-01-18T11:00:00+00:00", value: 0.86 },
    { date: "2021-01-18T10:00:00+00:00", value: 0.8 },
    { date: "2021-01-18T09:00:00+00:00", value: 0.82 },
    { date: "2021-01-18T08:00:00+00:00", value: 0.91 },
    { date: "2021-01-18T07:00:00+00:00", value: 0.83 },
    { date: "2021-01-18T06:00:00+00:00", value: 0.78 },
    { date: "2021-01-18T05:00:00+00:00", value: 0.8 },
    { date: "2021-01-18T04:00:00+00:00", value: 0.76 },
    { date: "2021-01-18T03:00:00+00:00", value: 0.79 },
    { date: "2021-01-18T02:00:00+00:00", value: 0.77 },
    { date: "2021-01-18T01:00:00+00:00", value: 0.82 },
    { date: "2021-01-18T00:00:00+00:00", value: 0.88 },
    { date: "2021-01-17T23:00:00+00:00", value: 0.87 },
    { date: "2021-01-17T22:00:00+00:00", value: 0.87 },
    { date: "2021-01-17T21:00:00+00:00", value: 0.92 },
    { date: "2021-01-17T20:00:00+00:00", value: 0.92 },
    { date: "2021-01-17T19:00:00+00:00", value: 0.99 },
    { date: "2021-01-17T18:00:00+00:00", value: 1.06 },
    { date: "2021-01-17T17:00:00+00:00", value: 1.02 },
    { date: "2021-01-17T16:00:00+00:00", value: 1.01 },
    { date: "2021-01-17T15:00:00+00:00", value: 1.04 },
    { date: "2021-01-17T14:00:00+00:00", value: 0.96 },
    { date: "2021-01-17T13:00:00+00:00", value: 0.89 },
    { date: "2021-01-17T12:00:00+00:00", value: 0.88 },
    { date: "2021-01-17T11:00:00+00:00", value: 0.94 },
    { date: "2021-01-17T10:00:00+00:00", value: 0.92 },
    { date: "2021-01-17T09:00:00+00:00", value: 1.01 },
    { date: "2021-01-17T08:00:00+00:00", value: 1.06 },
    { date: "2021-01-17T07:00:00+00:00", value: 1.11 },
    { date: "2021-01-17T06:00:00+00:00", value: 1.21 },
    { date: "2021-01-17T05:00:00+00:00", value: 1.33 },
    { date: "2021-01-17T04:00:00+00:00", value: 1.33 },
    { date: "2021-01-17T03:00:00+00:00", value: 1.46 },
    { date: "2021-01-17T02:00:00+00:00", value: 1.55 },
    { date: "2021-01-17T01:00:00+00:00", value: 1.41 },
    { date: "2021-01-17T00:00:00+00:00", value: 1.56 },
    { date: "2021-01-16T23:00:00+00:00", value: 1.42 },
    { date: "2021-01-16T22:00:00+00:00", value: 1.55 },
    { date: "2021-01-16T21:00:00+00:00", value: 1.7 },
    { date: "2021-01-16T20:00:00+00:00", value: 1.77 },
    { date: "2021-01-16T19:00:00+00:00", value: 1.92 },
    { date: "2021-01-16T18:00:00+00:00", value: 1.99 },
    { date: "2021-01-16T17:00:00+00:00", value: 1.96 },
    { date: "2021-01-16T16:00:00+00:00", value: 1.89 },
    { date: "2021-01-16T15:00:00+00:00", value: 1.97 },
    { date: "2021-01-16T14:00:00+00:00", value: 2.13 },
    { date: "2021-01-16T13:00:00+00:00", value: 2.22 },
    { date: "2021-01-16T12:00:00+00:00", value: 2.17 },
    { date: "2021-01-16T11:00:00+00:00", value: 2.36 },
    { date: "2021-01-16T10:00:00+00:00", value: 2.34 },
    { date: "2021-01-16T09:00:00+00:00", value: 2.52 },
    { date: "2021-01-16T08:00:00+00:00", value: 2.74 },
    { date: "2021-01-16T07:00:00+00:00", value: 2.95 },
    { date: "2021-01-16T06:00:00+00:00", value: 2.69 },
    { date: "2021-01-16T05:00:00+00:00", value: 2.84 },
    { date: "2021-01-16T04:00:00+00:00", value: 2.64 },
    { date: "2021-01-16T03:00:00+00:00", value: 2.56 },
    { date: "2021-01-16T02:00:00+00:00", value: 2.38 },
    { date: "2021-01-16T01:00:00+00:00", value: 2.25 },
    { date: "2021-01-16T00:00:00+00:00", value: 2.19 },
    { date: "2021-01-15T23:00:00+00:00", value: 2.34 },
    { date: "2021-01-15T22:00:00+00:00", value: 2.32 },
    { date: "2021-01-15T21:00:00+00:00", value: 2.33 },
    { date: "2021-01-15T20:00:00+00:00", value: 2.19 },
    { date: "2021-01-15T19:00:00+00:00", value: 2.23 },
    { date: "2021-01-15T18:00:00+00:00", value: 2.27 },
    { date: "2021-01-15T17:00:00+00:00", value: 2.18 },
    { date: "2021-01-15T16:00:00+00:00", value: 2.07 },
    { date: "2021-01-15T15:00:00+00:00", value: 2.18 },
    { date: "2021-01-15T14:00:00+00:00", value: 2.04 },
    { date: "2021-01-15T13:00:00+00:00", value: 1.91 },
    { date: "2021-01-15T12:00:00+00:00", value: 1.81 },
    { date: "2021-01-15T11:00:00+00:00", value: 1.73 },
    { date: "2021-01-15T10:00:00+00:00", value: 1.91 },
    { date: "2021-01-15T09:00:00+00:00", value: 1.8 },
    { date: "2021-01-15T08:00:00+00:00", value: 1.65 },
    { date: "2021-01-15T07:00:00+00:00", value: 1.79 },
    { date: "2021-01-15T06:00:00+00:00", value: 1.65 },
    { date: "2021-01-15T05:00:00+00:00", value: 1.59 },
    { date: "2021-01-15T04:00:00+00:00", value: 1.48 },
    { date: "2021-01-15T03:00:00+00:00", value: 1.46 },
    { date: "2021-01-15T02:00:00+00:00", value: 1.61 },
    { date: "2021-01-15T01:00:00+00:00", value: 1.56 },
    { date: "2021-01-15T00:00:00+00:00", value: 1.42 },
    { date: "2021-01-14T23:00:00+00:00", value: 1.57 },
    { date: "2021-01-14T22:00:00+00:00", value: 1.63 },
    { date: "2021-01-14T21:00:00+00:00", value: 1.77 },
    { date: "2021-01-14T20:00:00+00:00", value: 1.85 },
    { date: "2021-01-14T19:00:00+00:00", value: 1.82 },
    { date: "2021-01-14T18:00:00+00:00", value: 1.66 },
    { date: "2021-01-14T17:00:00+00:00", value: 1.74 },
    { date: "2021-01-14T16:00:00+00:00", value: 1.9 },
    { date: "2021-01-14T15:00:00+00:00", value: 1.89 },
    { date: "2021-01-14T14:00:00+00:00", value: 1.84 },
    { date: "2021-01-14T13:00:00+00:00", value: 1.78 },
    { date: "2021-01-14T12:00:00+00:00", value: 1.74 },
    { date: "2021-01-14T11:00:00+00:00", value: 1.78 },
    { date: "2021-01-14T10:00:00+00:00", value: 1.69 },
    { date: "2021-01-14T09:00:00+00:00", value: 1.66 },
    { date: "2021-01-14T08:00:00+00:00", value: 1.73 },
    { date: "2021-01-14T07:00:00+00:00", value: 1.67 },
    { date: "2021-01-14T06:00:00+00:00", value: 1.7 },
    { date: "2021-01-14T05:00:00+00:00", value: 1.65 },
    { date: "2021-01-14T04:00:00+00:00", value: 1.61 },
    { date: "2021-01-14T03:00:00+00:00", value: 1.54 },
    { date: "2021-01-14T02:00:00+00:00", value: 1.66 },
    { date: "2021-01-14T01:00:00+00:00", value: 1.8 },
    { date: "2021-01-14T00:00:00+00:00", value: 1.74 },
    { date: "2021-01-13T23:00:00+00:00", value: 1.8 },
    { date: "2021-01-13T22:00:00+00:00", value: 1.74 },
    { date: "2021-01-13T21:00:00+00:00", value: 1.88 },
    { date: "2021-01-13T20:00:00+00:00", value: 1.75 },
    { date: "2021-01-13T19:00:00+00:00", value: 1.76 },
    { date: "2021-01-13T18:00:00+00:00", value: 1.73 },
    { date: "2021-01-13T17:00:00+00:00", value: 1.61 },
    { date: "2021-01-13T16:00:00+00:00", value: 1.79 },
    { date: "2021-01-13T15:00:00+00:00", value: 1.72 },
    { date: "2021-01-13T14:00:00+00:00", value: 1.65 },
    { date: "2021-01-13T13:00:00+00:00", value: 1.72 },
    { date: "2021-01-13T12:00:00+00:00", value: 1.6 },
    { date: "2021-01-13T11:00:00+00:00", value: 1.72 },
    { date: "2021-01-13T10:00:00+00:00", value: 1.86 },
    { date: "2021-01-13T09:00:00+00:00", value: 1.77 },
    { date: "2021-01-13T08:00:00+00:00", value: 1.88 },
    { date: "2021-01-13T07:00:00+00:00", value: 1.77 },
    { date: "2021-01-13T06:00:00+00:00", value: 1.87 },
    { date: "2021-01-13T05:00:00+00:00", value: 1.85 },
    { date: "2021-01-13T04:00:00+00:00", value: 2.02 },
    { date: "2021-01-13T03:00:00+00:00", value: 2.21 },
    { date: "2021-01-13T02:00:00+00:00", value: 2.39 },
    { date: "2021-01-13T01:00:00+00:00", value: 2.45 },
    { date: "2021-01-13T00:00:00+00:00", value: 2.7 },
    { date: "2021-01-12T23:00:00+00:00", value: 2.97 },
    { date: "2021-01-12T22:00:00+00:00", value: 2.75 },
    { date: "2021-01-12T21:00:00+00:00", value: 3.03 },
    { date: "2021-01-12T20:00:00+00:00", value: 3.28 },
    { date: "2021-01-12T19:00:00+00:00", value: 3.01 },
    { date: "2021-01-12T18:00:00+00:00", value: 3.24 },
    { date: "2021-01-12T17:00:00+00:00", value: 3.42 },
    { date: "2021-01-12T16:00:00+00:00", value: 3.74 },
    { date: "2021-01-12T15:00:00+00:00", value: 3.66 },
    { date: "2021-01-12T14:00:00+00:00", value: 3.61 },
    { date: "2021-01-12T13:00:00+00:00", value: 3.4 },
    { date: "2021-01-12T12:00:00+00:00", value: 3.19 },
    { date: "2021-01-12T11:00:00+00:00", value: 3.31 },
    { date: "2021-01-12T10:00:00+00:00", value: 3.05 },
    { date: "2021-01-12T09:00:00+00:00", value: 2.87 },
    { date: "2021-01-12T08:00:00+00:00", value: 2.93 },
    { date: "2021-01-12T07:00:00+00:00", value: 3.1 },
    { date: "2021-01-12T06:00:00+00:00", value: 2.96 },
    { date: "2021-01-12T05:00:00+00:00", value: 2.87 },
    { date: "2021-01-12T04:00:00+00:00", value: 2.62 },
    { date: "2021-01-12T03:00:00+00:00", value: 2.5 },
    { date: "2021-01-12T02:00:00+00:00", value: 2.38 },
    { date: "2021-01-12T01:00:00+00:00", value: 2.54 },
    { date: "2021-01-12T00:00:00+00:00", value: 2.68 },
    { date: "2021-01-11T23:00:00+00:00", value: 2.58 },
    { date: "2021-01-11T22:00:00+00:00", value: 2.85 },
    { date: "2021-01-11T21:00:00+00:00", value: 3.14 },
    { date: "2021-01-11T20:00:00+00:00", value: 3.15 },
    { date: "2021-01-11T19:00:00+00:00", value: 3.16 },
    { date: "2021-01-11T18:00:00+00:00", value: 3.13 },
    { date: "2021-01-11T17:00:00+00:00", value: 2.88 },
    { date: "2021-01-11T16:00:00+00:00", value: 2.97 },
    { date: "2021-01-11T15:00:00+00:00", value: 3.15 },
    { date: "2021-01-11T14:00:00+00:00", value: 2.88 },
    { date: "2021-01-11T13:00:00+00:00", value: 2.85 },
    { date: "2021-01-11T12:00:00+00:00", value: 2.62 },
    { date: "2021-01-11T11:00:00+00:00", value: 2.67 },
    { date: "2021-01-11T10:00:00+00:00", value: 2.48 },
    { date: "2021-01-11T09:00:00+00:00", value: 2.7 },
    { date: "2021-01-11T08:00:00+00:00", value: 2.48 },
    { date: "2021-01-11T07:00:00+00:00", value: 2.66 },
    { date: "2021-01-11T06:00:00+00:00", value: 2.72 },
    { date: "2021-01-11T05:00:00+00:00", value: 2.7 },
  ],
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
  records: LongFields.args.records?.slice(0, 15),
  withMapBackground: false,
};