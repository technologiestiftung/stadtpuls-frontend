import { Story, Meta } from "@storybook/react";
import { RecordsTable, RecordsTablePropsType } from ".";

const testData = Array.from(Array(30)).map((_, i) => ({
  id: i + 1,
  date: `2022-01-${i + 1}T00:00:00:00Z`,
  value: 20,
}));

export default {
  title: "UI Elements/RecordsTable",
  component: RecordsTable,
} as Meta;

const Template: Story<RecordsTablePropsType> = args => (
  <RecordsTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: testData,
};
