import { AnchorButton, Button } from "@components/Button";
import { Dialog } from "@components/Dialog";
import { FormCheckbox } from "@components/FormCheckbox";
import {
  useLocalStorageValue,
  useSessionStorageValue,
} from "@lib/hooks/useBrowserStorageValue";
import Image from "next/image";
import { FC, useCallback, useState } from "react";

const shutdownLevel = parseInt(
  `${process.env.NEXT_PUBLIC_SHUTDOWN_LEVEL || 0}`
);

const gracePeriodText = (
  <div className='flex flex-col gap-3'>
    <p>
      Am <strong>11. Januar 2023</strong> werden wir die Registrierungen
      abschalten und die Möglichkeit deaktivieren, POST-Anfragen an Deine
      Sensoren zu stellen.
    </p>
    <p>
      Am <strong>31. Januar 2023</strong> werden die Daten entfernt und die
      Logging-Funktion abgeschaltet.
    </p>
  </div>
);
const shutdownAnnouncementText = (
  <p>
    Am <strong>31. Januar 2023</strong> werden die Daten entfernt und die
    Logging-Funktion abgeschaltet.
  </p>
);
const shutdownDoneText = (
  <p>
    Wir haben Stadtpuls entwickelt, weil wir davon überzeugt sind, dass wir eine
    freie und zugängliche Plattform für Sensordaten brauchen, die für jeden
    öffentlich zugänglich ist. Leider war der Erfolg von Stadtpuls nicht der,
    den wir uns gewünscht haben und die Pflege ist nicht mehr nachhaltig.
  </p>
);

export const useHasClosedShutdownModal = (): [
  isClosed: boolean,
  closeModal: (remember: boolean) => void
] => {
  const storageKey = `hasClosedShutdownModal-${shutdownLevel}`;
  const [isClosedDefinitively, setIsClosedDefinitively] =
    useLocalStorageValue<boolean>(storageKey, false);
  const [isClosedMomentarily, setIsClosedMomentarily] =
    useSessionStorageValue<boolean>(storageKey, false);

  const setter = useCallback((remember: boolean) => {
    remember && setIsClosedDefinitively(true);
    setIsClosedMomentarily(true);
  }, []);

  return [Boolean(isClosedMomentarily || isClosedDefinitively), setter];
};

const warningIcon = (
  <svg width='33' height='33' xmlns='http://www.w3.org/2000/svg'>
    <g fill='none' fillRule='evenodd'>
      <path
        d='m.23 30.016 14.423-28.89a2.063 2.063 0 0 1 3.691.001l14.393 28.89A2.063 2.063 0 0 1 30.891 33H2.075A2.062 2.062 0 0 1 .23 30.016Z'
        fill='#FFB756'
      />
      <path
        d='M16.5 28.875a2.062 2.062 0 1 0 0-4.125 2.062 2.062 0 0 0 0 4.125Zm-1.063-18.563h2.126a1 1 0 0 1 1 1v10.376a1 1 0 0 1-1 1h-2.126a1 1 0 0 1-1-1V11.313a1 1 0 0 1 1-1Z'
        fill='#100C53'
      />
    </g>
  </svg>
);

export const ShutdownModal: FC = () => {
  const [shouldRemember, setShouldRemember] = useState(false);
  const [isClosed, closeBanner] = useHasClosedShutdownModal();

  return (
    <Dialog
      className='w-[760px] max-w-full'
      modalClassName={[
        "relative overflow-hidden sm:pt-6",
        shutdownLevel < 2
          ? "bg-white-dot-pattern border-gray-200 pt-[300px]"
          : "bg-black-dot-pattern text-white border-blue pt-[220px]",
      ].join(" ")}
      contentClassName=''
      isOpen={!isClosed}
      setIsOpen={isOpen => !isOpen && closeBanner(shouldRemember)}
      footerContent={
        <div className='flex flex-col-reverse flex-wrap items-start sm:items-center gap-3 sm:gap-6 sm:flex-row'>
          <Button
            onClick={() => closeBanner(shouldRemember)}
            variant='secondary'
          >
            Schliessen
          </Button>
          <FormCheckbox
            name='shouldRemember'
            checked={shouldRemember}
            onChange={event =>
              setShouldRemember(
                !!(event.target as unknown as { checked: boolean }).checked
              )
            }
            label='Nicht mehr anzeigen'
          />
        </div>
      }
    >
      {shutdownLevel < 2 && (
        <div className='absolute top-0 right-0 z-0 pointer-events-none'>
          <Image
            src='/images/patterns/white-pixels.svg'
            width='778'
            height='290'
          />
        </div>
      )}
      <div
        className={[
          "absolute z-10 pointer-events-none",
          "sm:top-auto sm:-bottom-2 ",
          "left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto",
          shutdownLevel < 2
            ? "top-[-450px] sm:right-8"
            : "-top-12 sm:-right-48 md:-right-24",
        ].join(" ")}
      >
        {shutdownLevel < 2 ? (
          <Image
            src='/images/illustrations/shutdown-announcement.svg'
            width='257'
            height='710'
            layout='fixed'
          />
        ) : (
          <Image
            src='/images/illustrations/shutdown-done.svg'
            width='427'
            height='228'
            layout='fixed'
            className=''
          />
        )}
      </div>
      <div className='relative z-20 sm:max-w-sm'>
        <h2 className='flex items-center mb-4 text-2xl font-bold gap-4 font-headline'>
          {warningIcon}
          {shutdownLevel < 2 && "Stadtpuls wird eingestellt"}
          {shutdownLevel >= 2 && "Stadtpuls wurde eingestellt"}
        </h2>
        {shutdownLevel === 0 && gracePeriodText}
        {shutdownLevel === 1 && shutdownAnnouncementText}
        {shutdownLevel >= 2 && shutdownDoneText}
        <AnchorButton
          href='https://stories.stadtpuls.com'
          variant='primary'
          className='mt-6 mb-10'
        >
          Blogbeitrag lesen
        </AnchorButton>
      </div>
    </Dialog>
  );
};
