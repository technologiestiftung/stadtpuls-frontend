import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { FormTextInput } from ".";

export default {
  title: "Forms/FormTextInput",
  component: FormTextInput,
} as Meta;

const Template: Story<{
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  errors?: string[];
  optional: boolean;
}> = args => {
  const { register } = useForm();

  return (
    <FormTextInput
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

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  name: "firstName",
  placeholder: "Enter your first name...",
  type: "text",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  name: "firstName",
  label: "First name",
  placeholder: "Enter your first name...",
  type: "text",
};

export const OptionalField = Template.bind({});
OptionalField.args = {
  name: "firstName",
  label: "First name",
  placeholder: "Enter your first name...",
  optional: true,
  type: "text",
};

export const WithError = Template.bind({});
WithError.args = {
  name: "firstName",
  label: "First name",
  placeholder: "Enter your first name...",
  errors: ["Your name has to be beautiful", "Your name is not long enough"],
  type: "text",
};

export const AsEmail = Template.bind({});
AsEmail.args = {
  name: "email",
  label: "E-Mail",
  placeholder: "Deine E-Mail-Adresse...",
  type: "email",
};

export const AsPassword = Template.bind({});
AsPassword.args = {
  name: "password",
  label: "Passwort",
  placeholder: "Dein Passwort...",
  type: "password",
};
