import { Story, Meta } from "@storybook/react";
import { ReactNode } from "react";
import { Button } from "@components/Button";
import { SmallModal } from ".";
import { UserAvatar } from "@components/UserAvatar";

export default {
  title: "UI Elements/SmallModal",
  component: SmallModal,
} as Meta;

const Template: Story<{
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
  variant?: "dangerous" | "primary";
}> = args => (
  <SmallModal
    title={args.title}
    footerContent={args.footerContent}
    variant={args.variant}
  >
    {args.children}
  </SmallModal>
);

export const WithoutFooterContent = Template.bind({});
WithoutFooterContent.args = {
  title: "Gehe zu deinen E-Mails",
  children: (
    <p>
      Wir haben dir eine E-Mail mit einem Anmeldungs-Link geschickt. Klicke den
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
        <UserAvatar username='User' className='mr-1.5' />
        <span className='text-gray-400'>user@usermail.com</span>
      </div>
    </div>
  ),
  footerContent: (
    <div className='block w-full text-right'>
      <Button variant='primary'>Dein Profil</Button>
    </div>
  ),
};

export const WithDangerousContent = Template.bind({});
WithDangerousContent.args = {
  title: "Bitte bestätige die Löschung deines Accounts",
  variant: "dangerous",
  children: (
    <p>
      Dein Account wird undwiederruflich gelöscht. Alle deine Projekte und Daten
      werden von der Platform und aus der Datenbank entfernt.
    </p>
  ),
  footerContent: (
    <div className='block w-full text-right'>
      <Button variant='dangerous' className='mr-4'>
        Löschen
      </Button>
      <Button variant='primary'>Abbrechen</Button>
    </div>
  ),
};
