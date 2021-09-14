import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { Tabs, TabsPropType } from ".";

export default {
  title: "UI Elements/Tabs",
  component: Tabs,
} as Meta;

const Template: Story<TabsPropType> = args => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { id: "a", name: "Ingredients", onClick: action("tab a clicked") },
    { id: "b", name: "Preparation", onClick: action("tab b clicked") },
    { id: "c", name: "Serving", href: "/c" },
  ],
};

export const WithActiveTab = Template.bind({});
WithActiveTab.args = {
  tabs: [
    { id: "a", name: "Ingredients", onClick: action("tab a clicked") },
    { id: "b", name: "Preparation", onClick: action("tab b clicked") },
    { id: "c", name: "Serving", href: "/c" },
  ],
  activeTabIndex: 1,
};
