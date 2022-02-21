import React from "react";
import { Story, Meta } from "@storybook/react";
import { Header } from ".";

export default {
  title: "Layout/Header",
  component: Header,
} as Meta;

const Template: Story = () => <Header />;

const parameters = {
  nextRouter: {
    pathname: "/",
  },
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = parameters;
