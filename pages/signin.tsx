import { FC } from "react";
import { useRouter } from "next/router";
import { SigninForm } from "@components/SigninForm";
import { useAuth } from "@auth/Auth";
import { SmallModal } from "@components/SmallModal";
import { Button } from "@components/Button";

const MagicLinkConfirmationModal: FC<{
  onClose: () => void;
}> = ({ onClose }) => (
  <SmallModal
    title='Gehe zu deinen E-Mails'
    footerContent={
      <div className='block w-full text-right'>
        <Button onClick={onClose}>Alles klar</Button>
      </div>
    }
  >
    Wir haben dir eine E-Mail mit einem Anmeldungs-Link geschickt. Klicke den
    Link an, um dich einzuloggen.
    <br />
    <br />
    Bitte überprüfe auch Deinen Spam-Ordner..
  </SmallModal>
);

const SigningInState: FC = () => (
  <SmallModal title='Login'>Du wirst eingeloggt</SmallModal>
);

const SigninPage: FC = () => {
  const { signIn, isAuthenticating, magicLinkWasSent } = useAuth();
  const router = useRouter();

  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ padding: "calc(10vmax + 62px) 16px 10vmax" }}
    >
      {isAuthenticating && <SigningInState />}
      {!isAuthenticating && magicLinkWasSent && (
        <MagicLinkConfirmationModal onClose={() => router.push("/")} />
      )}
      {!isAuthenticating && !magicLinkWasSent && (
        <SigninForm onSubmit={signIn} />
      )}
    </div>
  );
};

export default SigninPage;
