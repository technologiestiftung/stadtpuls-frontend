import { Button } from "@components/Button";
import { Story, Meta } from "@storybook/react";
import { Dialog, DialogPropsType } from ".";

export default {
  title: "UI Elements/Dialog",
  component: Dialog,
} as Meta;

const Template: Story<DialogPropsType> = args => <Dialog {...args} />;

export const DangerousDialog = Template.bind({});
DangerousDialog.args = {
  title: "Willst du wirklich dein Leben löschen",
  description: "Das Auslöschen des eigenen Lebens kann tödlich sein.",
  children: <p>Bist du dir sicher?</p>,
  variant: "dangerous",
  footerContent: (
    <div className='flex flex-row-reverse justify-between w-full'>
      <Button>Abbrechen</Button>
      <Button variant='dangerous'>Löschen</Button>
    </div>
  ),
};
