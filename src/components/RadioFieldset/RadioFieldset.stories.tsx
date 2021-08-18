import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import { RadioFieldset } from ".";

export default {
  title: "Forms/RadioFieldset",
  component: RadioFieldset,
} as Meta;

const Template: Story = () => {
  const [activeTab, setActiveTab] = useState<"a" | "b">("a");
  return (
    <div className='grid place-content-center h-screen'>
      <div className='grid grid-cols-2 gap-8'>
        <RadioFieldset
          label='I am a label'
          name='a'
          isSelected={activeTab === "a"}
          onSelect={() => setActiveTab("a")}
        >
          I am some content
        </RadioFieldset>
        <RadioFieldset
          label='I am a label'
          name='b'
          isSelected={activeTab === "b"}
          onSelect={() => setActiveTab("b")}
        >
          I am another thing
        </RadioFieldset>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
