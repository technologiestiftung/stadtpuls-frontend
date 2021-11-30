import { FC } from "react";
import styles from "./LandingProjectAbout.module.css";

const AboutTitle: FC = ({ children }) => (
  <h1
    className={[
      "text-xl sm:text-2xl md:text-3xl",
      "text-green font-headline font-bold",
      "mt-6 mb-8",
    ].join(" ")}
  >
    <img
      src='/images/illustrations/microcontroller-2.svg'
      alt='Microcontroller'
      className='inline-block mr-4 align-top'
    />
    {children}
  </h1>
);

export const LandingProjectAbout: FC = () => (
  <div className='bg-black-dot-pattern relative mt-16'>
    <div className={`${styles.image} absolute bg-cover w-1/2`} />
    <section
      className={[
        "container mx-auto max-w-8xl",
        "px-4 sm:px-6 md:px-8",
        "py-8 sm:py-12 md:py-16",
      ].join(" ")}
    >
      <AboutTitle>Was ist Stadtpuls?</AboutTitle>
      <div className='grid md:grid-cols-5 xl:grid-cols-2 gap-4 sm:gap-8'>
        <div className='md:col-span-3 xl:col-span-1'>
          <div className='text-white max-w-none leading-7'>
            <p className='max-w-none'>
              Mit <em>Stadtpuls</em> haben wir eine offene Plattform geschaffen,
              die dabei unterstützt, Sensordaten zu erfassen, zu visualisieren
              und für weitere Datenauswertung bereitzustellen. Wie laut ist es
              in meiner Straße? Wie hoch ist der CO2-Wert in meinem Klassenraum?
              Wie hoch ist die Feinstaubbelastung vor meiner Haustür?
              <br />
              <em>Stadtpuls</em> hilft, deine Stadt zu erklären.
            </p>
            <p className='mt-4'>
              So wie es Github für Open Source Software gibt, stellt{" "}
              <em>Stadtpuls</em> die Sensordaten von IoT-Devices (Internet of
              Things) frei zur Verfügung und bringt Maker (z.B.
              Hobbybastler:innen, Schulprojekte, Forschungstreibende, städtische
              Betriebe) und Taker (z.B. Data Scientists, Datenjournalisten,
              Wissenschafter:innen) zusammen. Egal ob du offene Daten suchst
              oder bereits eigene Sensoren und Daten hast: Stadtpuls hilft dir,
              tiefer in die Welt der Stadt-Sensorik einzutauchen und deine Stadt
              besser zu verstehen.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);
