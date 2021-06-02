import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { LineChart } from ".";

export default {
  title: "Charts/LineChart",
  component: LineChart,
} as Meta;

const Template: Story<{
  width: number;
  height: number;
  data: Array<{
    date: Date;
    value: number;
  }>;
}> = ({ width, height, data }) => (
  <ThemeProvider theme={theme}>
    <div className='bg-white' style={{ width, height }}>
      <LineChart {...{ width, height, data }} />
    </div>
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  width: 400,
  height: 200,
  data: [
    {
      date: new Date("2021-04-09T12:10:01.908Z"),
      value: 10,
    },
    {
      date: new Date("2021-04-08T12:10:01.908Z"),
      value: 20,
    },
    {
      date: new Date("2021-04-07T12:10:01.908Z"),
      value: 15,
    },
  ],
};
