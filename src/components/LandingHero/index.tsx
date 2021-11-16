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
        <div className='z-20 lg:z-auto'>
          <h1
            className={[
              "animate-slide-in",
              "text-xl sm:text-2xl md:text-3xl",
              "text-green font-headline font-bold",
              "mt-6 mb-1",
            ].join(" ")}
          >
            Deine Sensoren erklären die (Um)welt?
          </h1>
          <h2
            className='animate-slide-in text-white text-lg font-sans font-normal mb-4'
            style={{ animationDelay: "50ms" }}
          >
            Teile die Daten und dein Wissen!
          </h2>
          <p
            className='animate-slide-in mb-8 max-w-prose'
            style={{ animationDelay: "100ms" }}
          >
            Stadtpuls ist die{" "}
            <strong className='text-green'>
              offene Datenplattform für IoT-Projekte
            </strong>{" "}
            deiner Stadt. Und das beste: jede*r kann mitmachen. Egal ob du
            offene Daten suchst oder bereits eigene Sensoren und Daten hast:
            Stadtpuls hilft dir, tiefer in die Welt der Stadt-Sensorik
            einzutauchen und deine Stadt besser zu verstehen.
          </p>
          <Link href='/sensors'>
            <AnchorButton
              href='/sensors'
              variant='secondary'
              className='animate-slide-in mr-4 mb-2'
              style={{ animationDelay: "150ms" }}
            >
              Sensoren ansehen
            </AnchorButton>
          </Link>
          <Link href='/docs'>
            <AnchorButton
              href='/docs'
              variant='primary'
              className='animate-slide-in'
              style={{ animationDelay: "200ms" }}
            >
              Mitmachen
            </AnchorButton>
          </Link>
        </div>
        <LandingHeroImage />
      </div>
    </div>
  </section>
);
