import { FC, useState } from "react";
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
    <br />
    <br />
    Bitte überprüfe auch Deinen Spam-Ordner..
  </SmallModal>
);

const SigningUpLoading: FC = () => (
  <SmallModal title='Registrierung'>
    Ein Bestätigungs-Link wird an deine E-Mail Adresse gesendet.
  </SmallModal>
);

const parseServerErrors = (
  error: string | null
): {
  username?: string;
  email?: string;
  areConditionsAccepted?: string;
} => {
  const errorObj: Record<string, string | undefined> = {
    username: undefined,
    email: undefined,
    areConditionsAccepted: undefined,
  };
  if (!error) return errorObj;
  if (
    error &&
    error.startsWith("The email ") &&
    error.endsWith(" is already taken")
  ) {
    errorObj.email = error;
    return errorObj;
  }
  if (error && error === 'body.email should match format "email"') {
    errorObj.email = error;
    return errorObj;
  }
  if (
    error &&
    error.startsWith("The username ") &&
    error.endsWith(" is already taken")
  ) {
    errorObj.username = error;
    return errorObj;
  }
  errorObj.username = error;
  return errorObj;
};

const SigninPage: FC = () => {
  const router = useRouter();
  const [previouslySubmittedData, setPreviouslySubmittedData] = useState<
    | {
        email?: string;
        username?: string;
        areConditionsAccepted?: boolean;
      }
    | undefined
  >(undefined);
  const { error, signUp, isAuthenticating, magicLinkWasSent } = useAuth();

  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ padding: "calc(10vmax + 62px) 16px 10vmax" }}
    >
      {isAuthenticating && <SigningUpLoading />}
      {!isAuthenticating && magicLinkWasSent && (
        <MagicLinkConfirmationModal onClose={() => router.push("/")} />
      )}
      {!isAuthenticating && !magicLinkWasSent && (
        <SignupForm
          onSubmit={data => {
            void signUp(data);
            setPreviouslySubmittedData(data);
          }}
          defaultValues={previouslySubmittedData}
          serverErrors={parseServerErrors(error)}
        />
      )}
    </div>
  );
};

export default SigninPage;
