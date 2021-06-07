import { Story, Meta } from "@storybook/react";
import { ProjectPreview } from ".";
import { usePublicProjects } from "@lib/hooks/usePublicProjects";

export default {
  title: "ProjectPreview",
  component: ProjectPreview,
} as Meta;

const Template: Story = () => {
  const { data, error } = usePublicProjects();

  if (!data || error) return <div />;
  return <ProjectPreview {...data.projects[0]} />;
};

export const Default = Template.bind({});
Default.args = {};
