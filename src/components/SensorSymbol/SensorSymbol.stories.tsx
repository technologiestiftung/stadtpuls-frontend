import { Story, Meta } from "@storybook/react";
import { NUMBER_OF_SENSOR_SYMBOLS, SensorSymbol } from ".";

export default {
  title: "UI Elements/SensorSymbol",
  component: SensorSymbol,
} as Meta;

const Template: Story = () => (
  <div className='inline-grid grid-cols-8 gap-4'>
    {Array.from(Array(NUMBER_OF_SENSOR_SYMBOLS)).map((_, i) => (
      <SensorSymbol key={i} symbol={i + 1} />
    ))}
  </div>
);

export const Default = Template.bind({});
Default.args = { symbol: 1 };
