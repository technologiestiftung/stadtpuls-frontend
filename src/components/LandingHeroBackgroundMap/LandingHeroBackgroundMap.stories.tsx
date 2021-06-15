import { PublicProject } from "@lib/hooks/usePublicProjects";
import { fakeCuratedProjects } from "@mocks/supabaseData/publicProjects";
import { Story, Meta } from "@storybook/react";
import { LandingHeroBackgroundMap } from ".";

export default {
  title: "Promotional/LandingHeroBackgroundMap",
  component: LandingHeroBackgroundMap,
} as Meta;

const Template: Story<{
  project: PublicProject;
}> = args => <LandingHeroBackgroundMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  project: fakeCuratedProjects[0],
};
