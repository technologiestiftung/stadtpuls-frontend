import { Story, Meta } from "@storybook/react";
import { LineChart } from ".";
import { LineGraphType } from "@common/interfaces";

export default {
  title: "Charts/LineChart",
  component: LineChart,
} as Meta;

const Template: Story<LineGraphType> = args => (
  <div className='bg-white' style={{ width: args.width, height: args.height }}>
    <LineChart {...args} />
  </div>
);

export const TemperatureThroughoutDay = Template.bind({});
TemperatureThroughoutDay.args = {
  width: 600,
  height: 300,
  yAxisUnit: "°C",
  xAxisUnit: "Messdatum",
  data: [
    {
      date: "2021-04-09T04:13:55.000Z",
      value: 13.9,
    },
    {
      date: "2021-04-09T08:43:01.000Z",
      value: 20.4,
    },
    {
      date: "2021-04-09T13:21:39.000Z",
      value: 18.6,
    },
    {
      date: "2021-04-09T17:09:10.000Z",
      value: 20.9,
    },
    {
      date: "2021-04-09T20:43:59.000Z",
      value: 22.6,
    },
  ],
};

export const HumidityOnceADay = Template.bind({});
HumidityOnceADay.args = {
  width: 600,
  height: 300,
  yAxisUnit: "%",
  xAxisUnit: "Messdatum",
  data: [
    {
      date: "2021-04-10T04:13:55.000Z",
      value: 70,
    },
    {
      date: "2021-04-11T04:13:55.000Z",
      value: 55,
    },
    {
      date: "2021-04-12T04:13:55.000Z",
      value: 61,
    },
    {
      date: "2021-04-13T04:13:55.000Z",
      value: 47,
    },
    {
      date: "2021-04-14T04:13:55.000Z",
      value: 68,
    },
    {
      date: "2021-04-15T04:13:55.000Z",
      value: 51,
    },
  ],
};

export const PaxcounterThroughoutDay = Template.bind({});
PaxcounterThroughoutDay.args = {
  width: 600,
  height: 300,
  yAxisUnit: "Anzahl an Personen",
  xAxisUnit: "Messdatum",
  data: [
    {
      date: "2021-04-10T07:13:55.000Z",
      value: 49,
    },
    {
      date: "2021-04-11T08:13:55.000Z",
      value: 189,
    },
    {
      date: "2021-04-12T09:13:55.000Z",
      value: 790,
    },
    {
      date: "2021-04-13T17:13:55.000Z",
      value: 100,
    },
    {
      date: "2021-04-14T18:13:55.000Z",
      value: 1002,
    },
    {
      date: "2021-04-15T19:13:55.000Z",
      value: 306,
    },
  ],
};

export const ValuesWithoutSuppliedUnit = Template.bind({});
ValuesWithoutSuppliedUnit.args = {
  width: 600,
  height: 300,
  data: [
    {
      date: "2021-04-10T04:13:55.000Z",
      value: 70,
    },
    {
      date: "2021-04-11T04:13:55.000Z",
      value: 55,
    },
    {
      date: "2021-04-12T04:13:55.000Z",
      value: 61,
    },
    {
      date: "2021-04-13T04:13:55.000Z",
      value: 47,
    },
    {
      date: "2021-04-14T04:13:55.000Z",
      value: 68,
    },
    {
      date: "2021-04-15T04:13:55.000Z",
      value: 51,
    },
  ],
};
