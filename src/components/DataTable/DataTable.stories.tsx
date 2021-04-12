import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";

import theme from "../../style/theme";
import store from "../../state/store";
import { DataTableType, RecordType } from "../../common/interfaces";
import { DataTable } from ".";

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
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <DataTable {...args} />
    </ThemeProvider>
  </StoreProvider>
);

export const Default = Template.bind({});
Default.args = {
  data: createFakeData(20),
  title: "My supa dupa table",
};
