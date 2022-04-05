import { Story, Meta } from "@storybook/react";
import { RecordsTable, RecordsTablePropsType } from ".";

const testData = Array.from(Array(30)).map((_, i) => {
  const dateISOString = `2022-01-${i < 9 ? `0${i + 1}` : i + 1}T00:00:00Z`;
  return {
    id: i + 1,
    dateISOString,
    date: new Date(dateISOString),
    value: 20 + i,
    formattedDay: dateISOString.split("T")[0],
    formattedTime: dateISOString.split("T")[1].split("Z")[0],
  };
});

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
