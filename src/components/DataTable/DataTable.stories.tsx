import { Story, Meta } from "@storybook/react";
import { DataTableType, DataTable } from ".";
import moment from "moment";

export default {
  title: "UI Elements/DataTable",
  component: DataTable,
} as Meta;

const createFakeData = (
  amount: number
): {
  id: number;
  date: moment.Moment;
  value: number;
}[] =>
  [...new Array(amount || 1).map((_, idx: number) => idx)].map(
    (_, idx: number) => ({
      id: idx,
      deviceId: idx,
      date: moment.parseZone("2021-04-08T13:23:04.753Z"),
      value: idx * 10,
    })
  );

const Template: Story<DataTableType> = args => <DataTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: createFakeData(20),
};
