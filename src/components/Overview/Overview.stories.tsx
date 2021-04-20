import { withNextRouter } from "storybook-addon-next-router";
import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";
import { FC } from "react";

import theme from "../../style/theme";
import store from "../../state/store";
import { Overview } from ".";
import { usePublicProjects } from "@lib/hooks/usePublicProjects";

export default {
  title: "Pages/Overview",
  component: Overview,
  decorators: [withNextRouter],
} as Meta;

const OverviewPage: FC = () => {
  const { data, error } = usePublicProjects();

  if (!data || error) return null;
  else return <Overview {...data} />;
};

const Template: Story = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <OverviewPage />
    </ThemeProvider>
  </StoreProvider>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  nextRouter: {
    query: {
      id: 1,
    },
  },
};
