import { Story } from "@storybook/react";
import { CityLABLogoSymbol } from ".";

export default {
  title: "Coporate identity/CityLAB Berlin Symbol",
  component: CityLABLogoSymbol,
};

const Template: Story = () => <CityLABLogoSymbol />;

export const Default = Template.bind({});
Default.args = {};
