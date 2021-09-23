import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { FormListBox, SelectOptionType } from ".";
import ArrowBidirectionalVertical from "../../../public/images/icons/16px/arrowBidirectionalVertical.svg";
import ArrowOutOfDoor from "../../../public/images/icons/16px/arrowOutOfDoor.svg";
import Funnel from "../../../public/images/icons/16px/funnel.svg";

export default {
  title: "Forms/FormListBox",
  component: FormListBox,
} as Meta;

const Template: Story<{
  name: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options: SelectOptionType[];
  errors: string[];
}> = args => {
  const { register } = useForm();

  return (
    <FormListBox
      {...(register(args.name),
      {
        required: true,
        min: 20,
        onChange: val => action(`Select "${args.name}" changed`)(val),
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
      value: "first_option",
    },
    {
      name: "Second option",
      value: "second_option",
    },
    {
      name: "Third option",
      value: "third_option",
    },
  ],
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  name: "Select without label",
  options: [
    {
      name: "First option",
      value: "first_option",
    },
    {
      name: "Second option",
      value: "second_option",
    },
    {
      name: "Third option",
      value: "third_option",
    },
  ],
};

export const WithSelectedDefault = Template.bind({});
WithSelectedDefault.args = {
  name: "Select without label",
  defaultValue: "second_option",
  options: [
    {
      name: "First option",
      value: "first_option",
    },
    {
      name: "Second option",
      value: "second_option",
    },
    {
      name: "Third option",
      value: "third_option",
    },
  ],
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  name: "Select without label",
  defaultValue: "second_option",
  options: [
    {
      name: (
        <span className='flex items-center gap-2'>
          <ArrowBidirectionalVertical /> First option
        </span>
      ),
      value: "first_option",
    },
    {
      name: (
        <span className='flex items-center gap-2'>
          <ArrowOutOfDoor /> Second option
        </span>
      ),
      value: "second_option",
    },
    {
      name: (
        <span className='flex items-center gap-2'>
          <Funnel /> Third option
        </span>
      ),
      value: "third_option",
    },
  ],
};

export const WithCustomPlaceholder = Template.bind({});
WithCustomPlaceholder.args = {
  name: "Select with custom placeholder",
  placeholder: "This is a custom placeholder",
  options: [
    {
      name: "First option",
      value: "first_option",
    },
    {
      name: "Second option",
      value: "second_option",
    },
    {
      name: "Third option",
      value: "third_option",
    },
  ],
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  name: "Select with custom placeholder",
  options: [
    {
      name: "First option",
      value: "first_option",
    },
    {
      name: "Second option",
      value: "second_option",
    },
    {
      name: "Third option",
      value: "third_option",
    },
  ],
  errors: ["This is an error message", "This is another error message"],
};

export const WithDisabledOption = Template.bind({});
WithDisabledOption.args = {
  name: "Select with custom placeholder",
  options: [
    {
      name: "First option",
      value: "first_option",
    },
    {
      name: "Second option",
      value: "second_option",
      disabled: true,
    },
    {
      name: "Third option",
      value: "third_option",
    },
  ],
  errors: [],
};
