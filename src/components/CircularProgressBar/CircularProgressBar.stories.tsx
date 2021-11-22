import { useState } from "react";
import { CategoryIcon } from "@components/CategoryIcon";
import { Story } from "@storybook/react";
import { CircularProgressBar, CircularProgressBarPropType } from ".";
import { Button } from "@components/Button";

export default {
  title: "UI Elements/CircularProgressBar",
  component: CircularProgressBar,
};

const Template: Story<CircularProgressBarPropType> = args => {
  const [progress, setProgress] = useState(0);

  return (
    <div className='flex flex-col gap-6'>
      <div className='w-10 h-10'>
        <CircularProgressBar percentage={progress} {...args} />
      </div>
      <div className='flex gap-4'>
        <Button onClick={() => setProgress(0)}>0</Button>
        <Button onClick={() => setProgress(33)}>33</Button>
        <Button onClick={() => setProgress(66)}>66</Button>
        <Button onClick={() => setProgress(100)}>100</Button>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: (
    <span className='text-blue'>
      <CategoryIcon categoryId={1} />
    </span>
  ),
};
