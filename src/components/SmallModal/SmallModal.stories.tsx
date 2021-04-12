import { Story, Meta } from "@storybook/react";
import { ReactNode } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button } from "@components/Button";
import { SmallModal } from ".";

export default {
  title: "UI Elements/SmallModal",
  component: SmallModal,
} as Meta;

const Template: Story<{
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
}> = args => (
  <SmallModal title={args.title} footerContent={args.footerContent}>
    {args.children}
  </SmallModal>
);

export const WithoutFooterContent = Template.bind({});
WithoutFooterContent.args = {
  title: "Gehe zu deinen E-Mails",
  children: (
    <p>
      Wir haben dir eine E-Mail mir einem Anmeldungs-Link geschickt. Klicke den
      Link an, um dich einzuloggen.
    </p>
  ),
};

export const WithFooterContent = Template.bind({});
WithFooterContent.args = {
  title: "Willkommen!",
  children: (
    <div>
      Du bist eingeloggt als:
      <div className='mt-1'>
        <span className='text-gray-300 mr-1'>
          <AccountCircleIcon />
        </span>
        <span className='text-gray-400'>user@usermail.com</span>
      </div>
    </div>
  ),
  footerContent: (
    <div className='block w-full text-right'>
      <Button>Dein Profil</Button>
    </div>
  ),
};
