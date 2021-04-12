import { FC, useState, useCallback } from "react";
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
    Wir haben dir eine E-Mail mir einem Anmeldungs-Link geschickt. Klicke den
    Link an, um dich einzuloggen.
  </SmallModal>
);

const SigningInState: FC = () => (
  <SmallModal title='Login'>Sie werden eingeloggt</SmallModal>
);

const SigninPage: FC = () => {
  const [magicLinkWasSent, setMagicLinkWasSent] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: { email: string }): Promise<void> => {
      setIsSigningIn(true);
      const { error } = await signIn(data);

      if (error) throw new Error(error.message);
      setMagicLinkWasSent(true);
      setIsSigningIn(false);
    },
    [signIn, setMagicLinkWasSent, setIsSigningIn]
  );

  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ paddingTop: "10vmax" }}
    >
      {isSigningIn && <SigningInState />}
      {!isSigningIn && magicLinkWasSent && (
        <MagicLinkConfirmationModal onClose={() => router.push("/")} />
      )}
      {!isSigningIn && !magicLinkWasSent && (
        <SigninForm onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default SigninPage;
