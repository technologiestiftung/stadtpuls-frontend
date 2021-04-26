import { AnchorButton } from "@components/Button";
import { FC, HTMLProps, useEffect, useState } from "react";
import Link from "next/link";
import { useProjectTokens } from "@lib/hooks/useProjectTokens";
import { useAuth } from "@auth/Auth";

export interface ProjectCreatedInfoType extends HTMLProps<HTMLElement> {
  projectId: number;
  projectTitle: string;
}

interface TokenResponseObjectType {
  comment: string;
  method: string;
  url: string;
  data: {
    token: string;
  };
}

export const ProjectCreatedInfo: FC<ProjectCreatedInfoType> = ({
  projectId,
  projectTitle,
  children,
  ...props
}) => {
  const { accessToken } = useAuth();
  const { createToken, error } = useProjectTokens(projectId);

  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const createTokenFunction = async (): Promise<void> => {
      const responseString = await createToken(`Token for ${projectTitle}`);
      const parsedResponse: TokenResponseObjectType = JSON.parse(
        responseString
      ) as TokenResponseObjectType;
      setToken(parsedResponse.data.token);
    };

    if (!accessToken) return;
    void createTokenFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <article className='bg-white max-w-prose' {...props}>
      <h2 className='text-3xl text-blue-500 font-bold'>{projectTitle}</h2>
      <p className='mt-4'>Dein Projekt wurde erfolgreich angelegt.</p>
      <h3 className='mt-12 text-2xl text-blue-500 font-bold'>
        Nächste Schritte
      </h3>
      <div className='mt-4'>{children}</div>
      <h4 className='mt-12'>Token</h4>
      {!token && error && (
        <p className='mt-2 p-3 border border-gray-200 text-gray-500 break-words'>
          Das Token konnte nicht generiert werden.
        </p>
      )}
      {!token && !error && (
        <p className='mt-2 p-3 border border-gray-200 text-gray-400 break-words'>
          Token wird generiert...
        </p>
      )}
      {token && (
        <p className='mt-2 p-3 border border-gray-200 text-gray-500 break-words'>
          {token}
        </p>
      )}
      <footer className='mt-24 flex justify-end'>
        <Link href={`/account/projects/${projectId}`}>
          <AnchorButton href={`/account/projects/${projectId}`}>
            Zur Projektübersicht
          </AnchorButton>
        </Link>
        <AnchorButton
          href='https://console.thethingsnetwork.org/'
          target='_blank'
          rel='noopener noreferrer'
          variant='primary'
          className='ml-4'
        >
          Zur TTN-Konsole
        </AnchorButton>
      </footer>
    </article>
  );
};
