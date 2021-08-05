import { Story, Meta } from "@storybook/react";
import React from "react";
import { QuestionMarkTooltip, QuestionMarkTooltipType } from ".";

export default {
  title: "UI Elements/QuestionMarkTooltip",
  component: QuestionMarkTooltip,
} as Meta;

const Template: Story<QuestionMarkTooltipType> = args => (
  <h3 className='inline-block mt-16'>
    Here is a heading that needs some explaining{" "}
    <QuestionMarkTooltip {...args} />
  </h3>
);

export const Default = Template.bind({});
Default.args = {
  id: "one",
  title: "title one",
  additionalClasses: "inline-block",
  content: "I am a tooltip, I explain things",
};

export const LongContent = Template.bind({});
LongContent.args = {
  id: "two",
  title: "title two",
  additionalClasses: "inline-block",
  content: (
    <div>
      <p>Hi there.</p>
      <p>
        I am also <em>tooltip content</em>.
      </p>
      <p>
        Only this time with <strong>more content </strong> and using several DOM
        nodes as the content.
      </p>
    </div>
  ),
};
