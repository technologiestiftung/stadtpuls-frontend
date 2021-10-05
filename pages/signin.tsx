import { FC, useState } from "react";
import { SigninForm } from "@components/SigninForm";
import { useAuth } from "@auth/Auth";
import { MagicLinkModal } from "@components/MagicLinkModal";

const SigninPage: FC = () => {
  const [emailUsedToSignIn, setEmailUsedToSignIn] = useState<
    string | undefined
  >(undefined);
  const { error, signIn, isAuthenticating, magicLinkWasSent } = useAuth();

  const registrationDataWasSubmitted = isAuthenticating || magicLinkWasSent;

  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ padding: "calc(10vmax + 62px) 16px 10vmax" }}
    >
      {!registrationDataWasSubmitted && (
        <SigninForm
          onSubmit={data => {
            void signIn(data);
            setEmailUsedToSignIn(data.email);
          }}
          serverError={error}
          defaultValues={{ email: emailUsedToSignIn }}
        />
      )}
      {registrationDataWasSubmitted && (
        <MagicLinkModal
          isLoading={isAuthenticating && !magicLinkWasSent}
          email={emailUsedToSignIn || ""}
        />
      )}
    </div>
  );
};

export default SigninPage;
