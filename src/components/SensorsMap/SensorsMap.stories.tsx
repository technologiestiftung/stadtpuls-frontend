import { Story } from "@storybook/react";
import { SensorsMap } from ".";
import { parsedSensors } from "@mocks/supabaseData/sensors";
import { action } from "@storybook/addon-actions";

export default {
  title: "Pages/SensorsMap",
  component: SensorsMap,
};

const Template: Story = () => (
  <SensorsMap
    sensors={parsedSensors}
    paginationProps={{
      pageCount: 12,
      currentPage: 3,
      onPageChange: action("Page was changed"),
    }}
  />
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
