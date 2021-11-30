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
              Die Plattform <em>Stadtpuls</em> ist eine prototypische Offene
              Datenplattform, welche{" "}
              <strong className='text-green'>
                Sensordaten von &amp; für Berlin
              </strong>{" "}
              als Open Data sammelt, frei zugänglich macht und der Stadt Berlin
              auf ihrem Weg zur smarten Stadt der Zukunft helfen soll.
            </p>
            <p className='mt-4'>
              Ziel der Plattform ist es Sensordaten der Stadt Berlin
              aufzubereiten, zu visualisieren und für alle Akteure der
              Stadtgesellschaft frei und kostenlos zur Verfügung zu stellen.
              Nutzer:innen können sich über einzelne IoT-Projekte informieren,
              selber Projekte und Sensoren anlegen oder Daten aus Projekten für
              die eigene Analyse nutzen. Dabei spielen Klimadaten, aber auch
              städtische Sensordaten ein große Rolle. Diese Daten in einer
              gemeinsamen Datenbasis vorzuhalten, zugänglich zu machen und zu
              visualisieren ist ein erster Schritt in Richtung einer smarten,
              vernetzten Stadt.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);
