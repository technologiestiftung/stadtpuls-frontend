import { FC, useState } from "react";
import { SignupForm } from "@components/SignupForm";
import { useAuth } from "@auth/Auth";
import { MagicLinkModal } from "@components/MagicLinkModal";

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
  const [previouslySubmittedData, setPreviouslySubmittedData] = useState<
    | {
        email?: string;
        username?: string;
        areConditionsAccepted?: boolean;
      }
    | undefined
  >(undefined);
  const { error, signUp, isAuthenticating, magicLinkWasSent } = useAuth();

  const registrationDataWasSubmitted = isAuthenticating || magicLinkWasSent;
  return (
    <div
      className='w-full h-full relative flex flex-col justify-center items-center'
      style={{ padding: "calc(10vmax + 62px) 16px 10vmax" }}
    >
      {!registrationDataWasSubmitted && (
        <SignupForm
          onSubmit={data => {
            void signUp(data);
            setPreviouslySubmittedData(data);
          }}
          defaultValues={previouslySubmittedData}
          serverErrors={parseServerErrors(error)}
        />
      )}
      {registrationDataWasSubmitted && (
        <MagicLinkModal
          isLoading={isAuthenticating && !magicLinkWasSent}
          email={previouslySubmittedData?.email || ""}
        />
      )}
    </div>
  );
};

export default SigninPage;
