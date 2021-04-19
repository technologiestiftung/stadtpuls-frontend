import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { FormTextarea, FormTextareaPropType } from ".";

export default {
  title: "Forms/FormTextarea",
  component: FormTextarea,
} as Meta;

const Template: Story<FormTextareaPropType> = args => {
  const { register } = useForm();

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <FormTextarea
      {...(register(args.name),
      {
        required: true,
        min: 20,
        onChange: evt =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          action(`Textarea "${args.name}" changed`)(evt.target.value),
      })}
      {...args}
    />
  );
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  name: "Textarea with label",
  label: "Some label",
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  name: "Textarea without label",
};

export const WithCustomPlaceholder = Template.bind({});
WithCustomPlaceholder.args = {
  name: "Textarea with custom placeholder",
  placeholder: "This is a custom placeholder",
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  name: "Textarea with custom placeholder",
  errors: [
    "Please use less than X characters",
    "Please use more than Y characters",
  ],
};
