import { Story, Meta } from "@storybook/react";
import { ProjectCreatedInfo, ProjectCreatedInfoType } from ".";

export default {
  title: "Layout/ProjectCreatedInfo",
  component: ProjectCreatedInfo,
} as Meta;

const Template: Story<ProjectCreatedInfoType> = args => (
  <ProjectCreatedInfo {...args}>{args.children}</ProjectCreatedInfo>
);

export const Default = Template.bind({});
Default.args = {
  projectId: 1,
  projectTitle: "I'm a user controlled project title",
  token: "1234-example-token-5678",
  children: (
    <>
      <p>
        {
          "This is a next steps description. This is a next steps description. This is a next steps description. This is a next steps description. This is a next steps description. This is a next steps description."
        }
      </p>
      <p>
        {
          "Possibly in two paragraphs. Possibly in two paragraphs. Possibly in two paragraphs. Possibly in two paragraphs. Possibly in two paragraphs. Possibly in two paragraphs."
        }
      </p>
    </>
  ),
};
