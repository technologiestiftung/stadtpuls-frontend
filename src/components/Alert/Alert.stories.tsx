import { Story, Meta } from "@storybook/react";
import { Alert, AlertPropType } from ".";

export default {
  title: "UI Elements/Alert",
  component: Alert,
} as Meta;

const Template: Story<AlertPropType> = args => <Alert {...args} />;

export const Info = Template.bind({});
Info.args = {
  type: "info",
  title: "For your information",
  message: (
    <>
      You flight will be operated by Luftansa.
      <code className='ml-4 px-2 py-1 font-mono text-blue bg-blue bg-opacity-10'>
        D24H4J
      </code>
    </>
  ),
};

export const Error = Template.bind({});
Error.args = {
  type: "error",
  title: "Fehler",
  message: (
    <>
      Dein Token konnte nicht generiert werden.
      <code className='ml-4 px-2 py-1 font-mono bg-error bg-opacity-20'>
        500 Server Error
      </code>
    </>
  ),
};

export const Warning = Template.bind({});
Warning.args = {
  type: "warning",
  title: "Achtung!",
  message: "Dein Token wird nur einmal angezeigt",
};

export const Success = Template.bind({});
Success.args = {
  type: "success",
  title: "Erfolg!",
  message: "Dein Token wurde erfolgreich angelegt",
};

export const NonRemovable = Template.bind({});
NonRemovable.args = {
  isRemovable: false,
  type: "warning",
  title: "Achtung!",
  message: "This alert should not be removable because it's too important",
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  message: "Less is more",
};
