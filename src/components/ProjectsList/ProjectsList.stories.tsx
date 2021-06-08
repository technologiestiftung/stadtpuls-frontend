import { withNextRouter } from "storybook-addon-next-router";
import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { FC } from "react";
import theme from "../../style/theme";
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
  <ThemeProvider theme={theme}>
    <ProjectsListPage />
  </ThemeProvider>
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
