import { Button } from "@components/Button";
import { Story, Meta } from "@storybook/react";
import { Dialog, DialogPropsType } from ".";

export default {
  title: "UI Elements/Dialog",
  component: Dialog,
} as Meta;

const Template: Story<DialogPropsType> = args => (
  <Dialog
    title={args.title}
    footerContent={args.footerContent}
    variant={args.variant}
  >
    {args.children}
  </Dialog>
);

export const WitFooterContent = Template.bind({});
WitFooterContent.args = {
  title: "Willst du wirklich dein Leben löschen",
  description: "Das Auslöschen des eigenen Lebens kann tödlich sein.",
  children: (
    <div className='prose'>
      <p>Das Auslöschen des eigenen Lebens kann tödlich sein.</p>
      <p>Bist du dir sicher?</p>
    </div>
  ),
  variant: "dangerous",
  footerContent: (
    <div className='flex flex-row-reverse justify-between w-full'>
      <Button>Abbrechen</Button>
      <Button variant='dangerous'>Löschen</Button>
    </div>
  ),
};

export const WithoutFooterContent = Template.bind({});
WithoutFooterContent.args = {
  title: "Gehe zu deinen E-Mails",
  description:
    "Wir haben dir eine E-Mail mit einem Anmeldungs-Link geschickt. Klicke den Link an, um dich einzuloggen.",
  children: <p>Bitte überprüfe auch Deinen Spam-Ordner..</p>,
};
