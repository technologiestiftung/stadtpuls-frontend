import { AnchorButton } from "@components/Button";
import { FC, HTMLProps } from "react";
import Link from "next/link";

export interface ProjectCreatedInfoType extends HTMLProps<HTMLElement> {
  projectTitle: string;
  token: string;
}

export const ProjectCreatedInfo: FC<ProjectCreatedInfoType> = ({
  projectTitle,
  token,
  children,
  ...props
}) => {
  return (
    <article className='bg-white max-w-prose' {...props}>
      <h2 className='text-3xl text-blue-500 font-bold'>{projectTitle}</h2>
      <p className='mt-4'>Dein Projekt wurde erfolgreich angelegt.</p>
      <h3 className='mt-12 text-2xl text-blue-500 font-bold'>
        Nächste Schritte
      </h3>
      <div className='mt-4'>{children}</div>
      <h4 className='mt-12'>Token</h4>
      <p className='mt-2 p-3 border border-gray-200 text-gray-500'>{token}</p>
      <footer className='mt-24 flex justify-end'>
        <Link href='/myprojects'>
          <AnchorButton href='/myprojects'>Zur Projektübersicht</AnchorButton>
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
