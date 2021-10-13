import { FC } from "react";

export const NotFoundPage: FC = () => {
  return (
    <div className='mt-0 md:mt-5 p-4'>
      <h2>Die angeforderte Seite existiert nicht.</h2>
      <p className='mt-2'>
        Zurück zur&nbsp;
        <a href='/'>Startseite</a>
      </p>
    </div>
  );
};
