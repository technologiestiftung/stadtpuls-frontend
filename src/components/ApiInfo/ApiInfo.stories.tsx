import { Story, Meta } from "@storybook/react";
import { ApiInfo, ApiTableType } from ".";

export default {
  title: "UI Elements/ApiInfo",
  component: ApiInfo,
} as Meta;

const Template: Story<ApiTableType> = args => <ApiInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  entries: [
    {
      label: "one",
      domain: "https://somedomain.com",
      route: "endpoint/one",
    },
    {
      label: "two",
      domain: "https://somedomain.com",
      route: "endpoint/two",
    },
    {
      label: "three",
      domain: "https://somedomain.com",
      route: "endpoint/three",
    },
  ],
};
