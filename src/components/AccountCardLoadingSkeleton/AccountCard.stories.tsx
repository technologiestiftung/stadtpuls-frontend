import { AccountCard, AccountCardPropType } from "@components/AccountCard";
import { Story, Meta } from "@storybook/react";
import { AccoundCardLoadingSkeleton } from ".";

export default {
  title: "UI Elements/AccoundCardLoadingSkeleton",
  component: AccoundCardLoadingSkeleton,
} as Meta;

const Template: Story<AccountCardPropType> = args => (
  <div className='max-w-[640px] flex flex-col gap-8'>
    <AccountCard {...args} />
    <AccoundCardLoadingSkeleton />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  displayName: "Louis Dieudonné de Bourbon",
  username: "looee14",
  description:
    "Louis XIV, also known as Louis the Great or the Sun King, was King of France from 14 May 1643 until his death in 1715.",
  sensorsCount: 12345,
  recordsCount: 12345678,
  categories: [6, 4, 2],
};
