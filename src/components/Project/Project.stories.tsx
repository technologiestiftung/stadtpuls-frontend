import { withNextRouter } from "storybook-addon-next-router";
import { Story, Meta } from "@storybook/react";
import { FC } from "react";
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Project {...project} />;
};

const Template: Story = () => <ProjectPage />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  nextRouter: {
    query: {
      id: 1,
    },
  },
};
