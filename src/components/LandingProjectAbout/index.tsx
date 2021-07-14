import { GitHub } from "@material-ui/icons";
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

const techInfoColumns = [
  {
    title: "Backend",
    repo: "stadtpuls-api",
    bgImage: "/images/icons/stadtpuls-api-technologies.svg",
  },
  {
    title: "Frontend",
    repo: "stadtpuls-frontend",
    bgImage: "/images/icons/stadtpuls-frontend-technologies.svg",
  },
];

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
      <AboutTitle>Über das Projekt</AboutTitle>
      <div className='grid md:grid-cols-5 xl:grid-cols-2 gap-4 sm:gap-8'>
        <div className='md:col-span-3 xl:col-span-1'>
          <div className='prose text-white max-w-none'>
            <p className='max-w-none'>
              Hier steht ein ausführlicher Beschreibungstext über Hintergründe
              des Projekts, TSB, usw. Hier steht ein ausführlicher
              Beschreibungstext über Hintergründe des Projekts, TSB, usw. Hier
              steht ein ausführlicher Beschreibungstext über Hintergründe des
              Projekts, TSB, usw. Hier steht ein ausführlicher Beschreibungstext
              über Hintergründe des Projekts, TSB, usw. Hier steht ein
              ausführlicher Beschreibungstext über Hintergründe des Projekts,
              TSB, usw.
            </p>
          </div>
          {techInfoColumns.map(({ repo, title, bgImage }) => (
            <a
              href={`https://github.com/technologiestiftung/${repo}`}
              title={`Das Code-Repository von der Stadtpuls ${title}`}
              key={title}
              className={[
                styles.repoLink,
                "border border-blue shadow-blue",
                "mt-8 p-8 block hover:animate-borderpulse-blue",
                "bg-no-repeat",
              ].join(" ")}
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <h4 className='text-xl font-bold mb-1 text-green font-headline'>
                {title}
              </h4>
              <p className='text-sm text-gray-500 block'>
                <GitHub className='mr-1 transform scale-75 align-top inline-block' />
                technologiestiftung/
                <span className='text-white'>{repo}</span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  </div>
);
