import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { AccountsGrid } from ".";
import { publicAccounts } from "@mocks/supabaseData/accounts";
import { mapPublicAccount } from "@lib/hooks/usePublicAccounts";

export default {
  title: "Pages/AccountsGrid",
  component: AccountsGrid,
} as Meta;

const Template: Story = () => (
  <ThemeProvider theme={theme}>
    <AccountsGrid accounts={publicAccounts.map(mapPublicAccount)} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
