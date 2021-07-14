import { AnchorButton } from "@components/Button";
import { LandingHeroImage } from "@components/LandingHeroImage";
import Link from "next/link";
import { FC } from "react";

export const LandingHero: FC = () => (
  <section className='bg-black-dot-pattern relative z-0'>
    <div>
      <div
        className={[
          "relative z-10",
          "container mx-auto max-w-8xl",
          "grid lg:grid-cols-2 gap-16",
          "px-6 md:px-8",
          "pt-16 sm:pt-24 lg:pt-40",
          "pb-96 md:pt-24 lg:pb-40",
          "text-white",
        ].join(" ")}
      >
        <div>
          <h1
            className={[
              "animate-fade-in",
              "text-xl sm:text-2xl md:text-3xl",
              "text-green font-headline font-bold",
              "mt-6",
            ].join(" ")}
          >
            Deine Sensoren erklären die (Um)welt?
          </h1>
          <h2
            className='animate-fade-in text-white text-lg font-sans font-normal mb-4'
            style={{ animationDelay: "50ms" }}
          >
            Teile die Daten und dein Wissen!
          </h2>
          <p
            className='animate-fade-in mb-8 max-w-prose'
            style={{ animationDelay: "100ms" }}
          >
            Stadtpuls ist eine{" "}
            <strong className='text-green'>
              offene Datenplattform für IoT-Projekte
            </strong>{" "}
            bei der jede*r mitmachen kann. Einfach deine Sensoren registrieren
            und alle Messwerte werden automatisch gespeichert, visualisiert und
            für andere verfügbar gemacht.
          </p>
          <Link href='/docs'>
            <AnchorButton
              href='/'
              variant='primary'
              className='animate-fade-in mr-4 mb-2'
              style={{ animationDelay: "150ms" }}
            >
              Mehr Erfahren
            </AnchorButton>
          </Link>
          <Link href='/projects'>
            <AnchorButton
              href='/projects'
              variant='secondary'
              className='animate-fade-in'
              style={{ animationDelay: "200ms" }}
            >
              Projekte ansehen
            </AnchorButton>
          </Link>
        </div>
        <LandingHeroImage />
      </div>
    </div>
  </section>
);
