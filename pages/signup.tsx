import { FC, useState } from "react";
import { SignupForm } from "@components/SignupForm";
import { useAuth } from "@auth/Auth";
import { MagicLinkModal } from "@components/MagicLinkModal";
import { Alert } from "@components/Alert";

const shutdownLevel = parseInt(
  `${process.env.NEXT_PUBLIC_SHUTDOWN_LEVEL || 0}`
);

const preShutdownTexts = {
  title: `Registrierung deaktiviert`,
  message: (
    <>
      Stadtpuls wird am <strong>31. Januar 2023</strong> beendet.
      <br />
      Ab dem <strong>16. Januar 2023</strong> wird keine Registrierung mehr
      möglich sein.
      <br />
      <a
        href='https://stories.stadtpuls.com/stadtpuls-ende'
        target='_blank'
        rel='noreferrer'
        className='mx-4 mb-4 navigation-link sm:mx-0 sm:mb-0'
      >
        Erfahre mehr dazu in der Stadtpuls Story.
      </a>
    </>
  ),
};
const shutdownTexts = {
  0: preShutdownTexts,
  1: preShutdownTexts,
  2: {
    title: preShutdownTexts.title,
    message: (
      <>
        Stadtpuls wurde nach einjähriger Pilotphase beendet.
        <br />
        <a
          href='https://stories.stadtpuls.com/stadtpuls-ende'
          target='_blank'
          rel='noreferrer'
          className='mx-4 mb-4 navigation-link sm:mx-0 sm:mb-0'
        >
          Erfahre mehr dazu in der Stadtpuls Story.
        </a>
      </>
    ),
  },
};

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

  const shutdownText = shutdownTexts[shutdownLevel as 0 | 1 | 2];

  const registrationDataWasSubmitted = isAuthenticating || magicLinkWasSent;
  return (
    <div
      className='w-full h-full relative flex flex-col justify-center items-center'
      style={{ padding: "calc(10vmax + 62px) 16px 10vmax" }}
    >
      {shutdownLevel >= 0 && shutdownText ? (
        <Alert
          type='warning'
          title={shutdownText.title}
          message={shutdownText.message}
          isRemovable={false}
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SigninPage;
