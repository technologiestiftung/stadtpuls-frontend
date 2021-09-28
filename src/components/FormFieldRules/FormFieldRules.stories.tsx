import { FormTextInput } from "@components/FormTextInput";
import { Story, Meta } from "@storybook/react";
import { FormFieldRules, FormFieldRulesPropType } from ".";

export default {
  title: "Forms/FormFieldRules",
  component: FormFieldRules,
} as Meta;

interface FormFieldRulesStoryPropType extends FormFieldRulesPropType {
  value: string;
  errors: string[];
}

const Template: Story<FormFieldRulesStoryPropType> = ({
  value,
  errors = [],
  ...args
}) => {
  return (
    <div>
      <FormTextInput
        name='username'
        label='Username'
        placeholder='Enter your username'
        value={value}
        errors={errors}
        type='text'
      />
      <FormFieldRules {...args} />
    </div>
  );
};

export const Untouched = Template.bind({});
Untouched.args = {
  isTouched: false,
  value: "",
  rules: [
    { id: "uniqueness", msg: "Unique", isFulfilled: false },
    {
      id: "characters",
      msg: "Only letters, digits, _ and/or -",
      isFulfilled: true,
    },
    {
      id: "length",
      msg: "No long than 20 characters",
      isFulfilled: false,
    },
  ],
};

export const SomeFulfilled = Template.bind({});
SomeFulfilled.args = {
  isTouched: true,
  value: "$%^&",
  rules: [
    { id: "uniqueness", msg: "Unique", isFulfilled: true },
    {
      id: "characters",
      msg: "Only letters, digits, _ and/or -",
      isFulfilled: false,
    },
    {
      id: "length",
      msg: "No long than 20 characters",
      isFulfilled: true,
    },
  ],
};

export const SomeLoading = Template.bind({});
SomeLoading.args = {
  isTouched: true,
  value: "$%^&",
  rules: [
    { id: "uniqueness", msg: "Unique", isFulfilled: true },
    {
      id: "characters",
      msg: "Only letters, digits, _ and/or -",
      isFulfilled: false,
    },
    {
      id: "length",
      msg: "No long than 20 characters",
      isFulfilled: false,
      isLoading: true,
    },
  ],
};

export const AllFulfilled = Template.bind({});
AllFulfilled.args = {
  isTouched: true,
  value: "perfect username",
  rules: [
    { id: "uniqueness", msg: "Unique", isFulfilled: true },
    {
      id: "characters",
      msg: "Only letters, digits, _ and/or -",
      isFulfilled: true,
    },
    {
      id: "length",
      msg: "No long than 20 characters",
      isFulfilled: true,
    },
  ],
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  isTouched: true,
  value: "πø∆ø∑∆ˆ“ˆ“∆∆∆wefwef",
  errors: [
    "The username is too long",
    "The username can only include lettersm digits, _ and/or -",
  ],
  rules: [
    { id: "uniqueness", msg: "Unique", isFulfilled: true },
    {
      id: "characters",
      msg: "Only letters, digits, _ and/or -",
      isFulfilled: false,
    },
    {
      id: "length",
      msg: "No long than 20 characters",
      isFulfilled: false,
    },
  ],
};
