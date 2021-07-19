import { Story } from "@storybook/react";
import { StadtpulsLogo } from ".";

export default {
  title: "Visual identity/Stadtpuls Logo",
  component: StadtpulsLogo,
};

const Template: Story = () => <StadtpulsLogo />;

export const Default = Template.bind({});
Default.args = {};
