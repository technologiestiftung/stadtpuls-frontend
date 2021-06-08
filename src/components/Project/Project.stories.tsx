import { withNextRouter } from "storybook-addon-next-router";
import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { FC } from "react";
import theme from "../../style/theme";
import { Project } from ".";
import { useProjectData } from "@lib/hooks/useProjectData";

export default {
  title: "Pages/Project",
  component: Project,
  decorators: [withNextRouter],
} as Meta;

const ProjectPage: FC = () => {
  const { data: project } = useProjectData(10);

  if (!project) return null;
  return <Project {...project} />;
};

const Template: Story = () => (
  <ThemeProvider theme={theme}>
    <ProjectPage />
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
