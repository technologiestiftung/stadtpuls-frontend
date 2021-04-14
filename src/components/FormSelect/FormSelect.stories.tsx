import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { FormSelect, SelectOptionType } from ".";

export default {
  title: "Forms/FormSelect",
  component: FormSelect,
} as Meta;

const Template: Story<{
  name: string;
  label?: string;
  options: SelectOptionType[];
}> = args => {
  const { register } = useForm();

  return (
    <FormSelect
      {...(register(args.name),
      {
        required: true,
        min: 20,
        onChange: evt =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          action(`Input "${args.name}" changed`)(evt.target.value),
      })}
      {...args}
    />
  );
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  name: "Select with label",
  label: "Default label",
  options: [
    {
      name: "First option",
      value: "First option",
    },
    {
      name: "Second option",
      value: "Second option",
    },
    {
      name: "Third option",
      value: "Third option",
    },
  ],
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  name: "Select without label",
  options: [
    {
      name: "First option",
      value: "First option",
    },
    {
      name: "Second option",
      value: "Second option",
    },
    {
      name: "Third option",
      value: "Third option",
    },
  ],
};
