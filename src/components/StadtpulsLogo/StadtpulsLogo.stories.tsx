import { Story } from "@storybook/react";
import { StadtpulsLogo } from ".";

export default {
  title: "Coporate identity/Stadtpuls",
  component: StadtpulsLogo,
};

const Template: Story = () => <StadtpulsLogo />;

export const Default = Template.bind({});
Default.args = {};
