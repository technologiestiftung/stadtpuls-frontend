import { Story, Meta } from "@storybook/react";
import { AccountCard, AccountCardPropType } from ".";

export default {
  title: "UI Elements/AccountCard",
  component: AccountCard,
} as Meta;

const Template: Story<AccountCardPropType> = args => (
  <div className='max-w-[640px]'>
    <AccountCard {...args} />
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

export const TooManyCategories = Template.bind({});
TooManyCategories.args = {
  displayName: "Louis Dieudonné de Bourbon",
  username: "looee14",
  description:
    "Louis XIV, also known as Louis the Great or the Sun King, was King of France from 14 May 1643 until his death in 1715.",
  sensorsCount: 12345,
  recordsCount: 12345678,
  categories: [1, 2, 3, 4, 5, 6, 7],
};

export const MinimalProps = Template.bind({});
MinimalProps.args = {
  displayName: "Louis",
  username: "looee14",
  sensorsCount: 0,
  recordsCount: 0,
};
