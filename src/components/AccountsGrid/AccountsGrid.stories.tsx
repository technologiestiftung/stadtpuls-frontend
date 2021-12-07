import { Story, Meta } from "@storybook/react";
import { AccountsGrid } from ".";
import { extendedUserProfiles } from "@mocks/supabaseData/accounts";
import { mapPublicAccount } from "@lib/hooks/usePublicAccounts";

export default {
  title: "Pages/AccountsGrid",
  component: AccountsGrid,
} as Meta;

const Template: Story = () => (
  <AccountsGrid accounts={extendedUserProfiles.map(mapPublicAccount)} />
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
