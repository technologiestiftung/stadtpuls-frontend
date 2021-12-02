import { AnchorButton } from "@components/Button";
import { FC } from "react";
import styles from "./LandingStoriesIntro.module.css";

export const LandingStoriesIntro: FC = () => (
  <section
    className={[
      "relative z-10",
      "w-full",
      "pt-64 lg:pt-56",
      "px-4",
      "bg-white-dot-pattern",
    ].join(" ")}
  >
    <div
      className={[
        "bg-white",
        "border border-gray-200 shadow",
        "grid grid-cols-1 md:grid-cols-8",
        "mx-auto max-w-screen-lg",
        "translate-y-4 md:translate-y-8 lg:translate-y-12",
      ].join(" ")}
    >
      <div className={`col-span-3 relative -order-1 md:order-1`}>
        <div
          className={`${styles.storyThumbnail} h-full max-h-56 md:max-h-full`}
        >
          <img
            src='/images/photos/wrangelkiez_street.jpg'
            alt='Eine herbstliche Straße im Berliner Wrangelkiez'
            className={`object-cover w-full h-full`}
          />
        </div>
      </div>
      <div
        className={[
          "col-span-5",
          "w-full sm:w-auto",
          "px-4 sm:px-6 md:px-8",
          "py-6 md:py-8",
        ].join(" ")}
      >
        <h3 className='mb-0.5 text-md md:text-lg text-gray-600'>
          Stadtpuls Story #1
        </h3>
        <h2
          className={[
            "text-2xl md:text-3xl",
            "font-bold font-headline text-gray-800",
            "mb-3 text-left",
          ].join(" ")}
          style={{
            textShadow:
              "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
          }}
        >
          Der Puls des Wrangelkiez
        </h2>
        <p className='mb-4 text-base text-left max-w-prose'>
          Eine Boombox dröhnt im Park, die U1 quietscht über die Hochbahnstrecke
          und die Polizei rückt mal wieder mit Sirenen an: Eine typische
          Soundkulisse im Berliner Szenekiez. Wir haben uns gefragt, welche
          Rolle Lärm für die Identität eines Kiezes spielt und welche Muster es
          gibt. Hier erzählen wir die Geschichte von versteckten Hinterhöfen,
          einem lauten Supermarkt und einer Entführung.
        </p>
        <AnchorButton
          variant='primary'
          href='https://stories.stadtpuls.com/wrangelkiez'
          target='_blank'
          rel='noopener noreferrer'
        >
          Zur Story
        </AnchorButton>
        <p className='mt-4 text-sm text-gray-600'>
          <a
            href='https://stories.stadtpuls.com'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            Stadtpuls Stories
          </a>{" "}
          verbinden Citizen Science und Datenjournalismus. Hast Du Lust, deine
          eigene Geschichte mit Sensordaten zu erzählen? Wir stellen Dir hier{" "}
          <a
            href='https://stories.stadtpuls.com/template'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            unser Template zur Verfügung
          </a>
          .
        </p>
      </div>
    </div>
  </section>
);
