import { FC } from "react";

export const NotFoundPage: FC = () => {
  return (
    <div className='container mx-auto max-w-8xl py-32 px-4'>
      <h2 className='text-2xl font-bold'>
        <span className='text-6xl text-purple'>404</span>
        <br />
        Die angeforderte Seite existiert leider nicht.
      </h2>
      <p className='mt-8'>
        Zurück zur&nbsp;
        <a
          className='border-b border-green text-blue hover:text-green hover:border-blue transition-colors'
          href='/'
        >
          Startseite
        </a>
      </p>
    </div>
  );
};
