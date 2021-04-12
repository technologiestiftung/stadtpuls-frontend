import { FC, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { SignupForm } from "@components/SignupForm";
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

const SigningUpState: FC = () => (
  <SmallModal title='Registrierung'>Sie werden registriert</SmallModal>
);

const SigninPage: FC = () => {
  const [magicLinkWasSent, setMagicLinkWasSent] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: { email: string }): Promise<void> => {
      setIsSigningUp(true);
      const { error } = await signIn(data);

      if (error) throw new Error(error.message);
      setMagicLinkWasSent(true);
      setIsSigningUp(false);
    },
    [signIn, setMagicLinkWasSent, setIsSigningUp]
  );

  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ paddingTop: "10vmax" }}
    >
      {isSigningUp && <SigningUpState />}
      {!isSigningUp && magicLinkWasSent && (
        <MagicLinkConfirmationModal onClose={() => router.push("/")} />
      )}
      {!isSigningUp && !magicLinkWasSent && (
        <SignupForm onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default SigninPage;
