import { FC } from "react";
import { useRouter } from "next/router";
import { SignupForm } from "@components/SignupForm";
import { useAuth } from "@auth/Auth";
import { SmallModal } from "@components/SmallModal";
import { Button } from "@components/Button";

const MagicLinkConfirmationModal: FC<{
  onClose: () => void;
}> = ({ onClose }) => (
  <SmallModal
    title='Bestätige deine E-Mail Adresse'
    footerContent={
      <div className='block w-full text-right'>
        <Button onClick={onClose}>Alles klar</Button>
      </div>
    }
  >
    Wir haben dir eine E-Mail mit einem Registrierungs-Link geschickt. Klicke
    den Link an, um deine E-Mail Adresse zu bestätigen.
  </SmallModal>
);

const SigningUpLoading: FC = () => (
  <SmallModal title='Registrierung'>
    Ein Bestätigungs-Link wird an deine E-Mail Adresse gesendet.
  </SmallModal>
);

const SigningUpError: FC<{ error: string; onReload: () => void }> = ({
  error,
  onReload,
}) => (
  <SmallModal
    title='Registrierung Fehler'
    footerContent={
      <div className='block w-full text-right'>
        <Button onClick={onReload}>Neuladen</Button>
      </div>
    }
  >
    Es ist bei der Registrierung deines Kontos einen Fehler aufgetreten:
    <pre className='p-4 border border-gray-300 bg-gray-50 mt-3 text-gray-500'>
      {error}
    </pre>
  </SmallModal>
);

const SigninPage: FC = () => {
  const router = useRouter();
  const { error, authenticate, isAuthenticating, magicLinkWasSent } = useAuth();

  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ padding: "10vmax 0" }}
    >
      {isAuthenticating && <SigningUpLoading />}
      {error && (
        <SigningUpError error={error} onReload={() => router.reload()} />
      )}
      {!isAuthenticating && magicLinkWasSent && (
        <MagicLinkConfirmationModal onClose={() => router.push("/")} />
      )}
      {!isAuthenticating && !magicLinkWasSent && !error && (
        <SignupForm onSubmit={authenticate} />
      )}
    </div>
  );
};

export default SigninPage;
