import { withNextRouter } from "storybook-addon-next-router";
import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";
import { FC } from "react";

import theme from "../../style/theme";
import store from "../../state/store";
import { ProjectsList } from ".";
import { usePublicProjects } from "@lib/hooks/usePublicProjects";

export default {
  title: "Pages/ProjectsList",
  component: ProjectsList,
  decorators: [withNextRouter],
} as Meta;

const ProjectsListPage: FC = () => {
  const { data, error } = usePublicProjects();

  if (!data || error) return null;
  else return <ProjectsList {...data} />;
};

const Template: Story = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <ProjectsListPage />
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
