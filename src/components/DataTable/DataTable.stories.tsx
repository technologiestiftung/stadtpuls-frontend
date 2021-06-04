import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { RecordType } from "../../common/interfaces";
import { DataTableType, DataTable } from ".";

export default {
  title: "DataTable",
  component: DataTable,
} as Meta;

const createFakeData = (amount: number): RecordType[] =>
  [...new Array(amount || 1).map((_, idx: number) => idx)].map(
    (_, idx: number) => ({
      id: idx,
      deviceId: idx,
      recordedAt: "2021-04-08T13:23:04.753Z",
      value: idx * 10,
    })
  );

const Template: Story<DataTableType> = args => (
  <ThemeProvider theme={theme}>
    <DataTable {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  data: createFakeData(20),
  title: "My supa dupa table",
};
