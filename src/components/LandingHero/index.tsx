import { AnchorButton } from "@components/Button";
import Link from "next/link";
import { FC } from "react";

const datahubLogo = "/images/datahub-logo.svg";
const landingHeroStack = "/images/landing-hero-stack.svg";

export const LandingHero: FC = () => (
  <section
    className={[
      "container mx-auto max-w-8xl",
      "px-4 sm:px-6 md:px-8",
      "py-12 sm:py-24 md:py-40",
      "grid lg:grid-cols-2 gap-16",
    ].join(" ")}
  >
    <div>
      <img src={datahubLogo} alt='IOT Hub logo' className='w-24' />
      <h1
        className={[
          "text-xl sm:text-2xl md:text-3xl",
          "text-blue-500 font-semibold",
          "mt-6 mb-4",
        ].join(" ")}
      >
        Deine Sensoren erklären die (Um)welt?
        <br />
        <span className='text-blue-300'>Teile die Daten und dein Wissen!</span>
      </h1>
      <p className='mb-8 max-w-prose'>
        Das Berlin IoT Hub ist eine{" "}
        <strong>offene Datenplattform für IoT-Projekte</strong> bei der jede*r
        mitmachen kann. Einfach deine Sensoren registrieren und alle Messwerte
        werden automatisch gespeichert, visualisiert und für andere verfügbar
        gemacht.
      </p>
      <Link href='/docs'>
        <AnchorButton href='/' variant='primary' className='mr-4'>
          Mehr Erfahren
        </AnchorButton>
      </Link>
      <Link href='/projects'>
        <AnchorButton href='/projects' variant='secondary'>
          Projekte ansehen
        </AnchorButton>
      </Link>
    </div>
    <div>
      <img
        src={landingHeroStack}
        alt='IoT Projekte visualisiert als Liniendiagramm'
      />
    </div>
  </section>
);
