import { Story } from "@storybook/react";
import { TsbLogoSymbol } from ".";

export default {
  title: "Coporate identity/Technologiestiftung Symbol",
  component: TsbLogoSymbol,
};

const Template: Story = () => <TsbLogoSymbol />;

export const Default = Template.bind({});
Default.args = {};
