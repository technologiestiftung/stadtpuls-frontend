import { Story, Meta } from "@storybook/react";
import { AccountsGrid } from ".";
import { publicAccounts } from "@mocks/supabaseData/accounts";
import { mapPublicAccount } from "@lib/hooks/usePublicAccounts";

export default {
  title: "Pages/AccountsGrid",
  component: AccountsGrid,
} as Meta;

const Template: Story = () => (
  <AccountsGrid accounts={publicAccounts.map(mapPublicAccount)} />
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
