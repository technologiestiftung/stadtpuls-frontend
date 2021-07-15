import { Story, Meta } from "@storybook/react";
import { LandingHeroImage } from ".";

export default {
  title: "Promotional/LandingHeroImage",
  component: LandingHeroImage,
} as Meta;

const Template: Story = args => (
  <section className='bg-black-dot-pattern fixed inset-0'>
    <div className='relative h-screen z-10 container mx-auto max-w-8xl'>
      <LandingHeroImage {...args} />
    </div>
  </section>
);

export const Default = Template.bind({});
Default.args = {};
