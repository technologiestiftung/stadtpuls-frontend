import { PublicProject } from "@lib/hooks/usePublicProjects";
import { fakeCuratedProjects } from "@mocks/supabaseData/publicProjects";
import { Story, Meta } from "@storybook/react";
import { LandingProjectsSlider } from ".";

export default {
  title: "Promotional/LandingProjectsSlider",
  component: LandingProjectsSlider,
} as Meta;

const Template: Story<{
  projects: PublicProject[];
}> = args => <LandingProjectsSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  projects: fakeCuratedProjects,
};
