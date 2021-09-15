import { Story } from "@storybook/react";
import { CopyTextField, CopyTextFieldPropType } from ".";

export default {
  title: "Forms/CopyTextField",
  component: CopyTextField,
};

const Template: Story<CopyTextFieldPropType> = args => (
  <CopyTextField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "api-route",
  label: "API Schnittstelle",
  children: "/api/v2/sensors/32/records",
};
