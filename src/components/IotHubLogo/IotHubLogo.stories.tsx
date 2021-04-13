import { Story } from "@storybook/react";
import { IotHubLogo } from ".";

export default {
  title: "Coporate identity/Logo",
  component: IotHubLogo,
};

const Template: Story = () => <IotHubLogo />;

export const Default = Template.bind({});
Default.args = {};
