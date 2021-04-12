import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { FormCheckbox } from ".";

export default {
  title: "Forms/FormCheckbox",
  component: FormCheckbox,
} as Meta;

const Template: Story<{
  name: string;
  label?: ReactNode;
  errors?: string[];
  optional: boolean;
}> = args => {
  const { register } = useForm();

  return (
    <FormCheckbox
      {...(register(args.name),
      {
        required: true,
        min: 20,
        onChange: evt =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          action(`Checkbox "${args.name}" changed`)(evt.target.value),
      })}
      {...args}
    />
  );
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  name: "areConditionsAccepted",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  name: "areConditionsAccepted",
  label: "Do you accept?",
};

export const OptionalField = Template.bind({});
OptionalField.args = {
  name: "areConditionsAccepted",
  label: "Do you accept?",
  optional: true,
};

export const WithError = Template.bind({});
WithError.args = {
  name: "areConditionsAccepted",
  label: (
    <>
      Ich akzeptiere die{" "}
      <a href='https://www.technologiestiftung-berlin.de/de/datenschutz/'>
        Nutzungsbedingungen
      </a>
      .
    </>
  ),
  errors: ["Your checkbox has to be beautiful", "Your checkbox is not checked"],
};
