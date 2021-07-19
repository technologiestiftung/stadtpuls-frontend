import useGithubUser from "@lib/hooks/useGithubUser";
import { GitHub } from "@material-ui/icons";
import { FC } from "react";
import styles from "./LandingLabAbout.module.css";

const AboutTitle: FC = ({ children }) => (
  <h1
    className={[
      "text-xl sm:text-2xl md:text-3xl",
      "text-purple font-bold font-headline",
      "mt-6 mb-1",
    ].join(" ")}
  >
    {children}
  </h1>
);

const furtherProjects = [
  {
    name: "Gieß den Kiez",
    repo: "giessdenkiez-de",
    logo: "giessdenkiez-logo",
  },
  {
    name: "Berlin Open Source",
    repo: "berlin-open-source-portal",
    logo: "berlin-open-source-logo",
  },
];

export const LandingLabAbout: FC = () => {
  const { user } = useGithubUser("technologiestiftung");
  return (
    <div className='bg-white pb-4 sm:pb-8 lg:pb-12 bg-white-dot-pattern'>
      <div className={`pt-4 sm:pt-8 lg:pt-12 ${styles.image}`}>
        <section
          className={[
            "container mx-auto max-w-8xl",
            "px-4 sm:px-6 md:px-8",
            "py-8 sm:py-12 md:py-16",
          ].join(" ")}
        >
          <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4 md:gap-8'>
            <div className='sm:col-span-2 lg:col-span-1'>
              <AboutTitle>Wir bauen Prototypen</AboutTitle>
              <p className='text-lg mb-8'>Für die Stadtgesellschaft</p>
              <div className='prose max-w-none'>
                <p className='max-w-none'>
                  In der Technologiestiftung Berlin arbeiten Expert*innen aus
                  den Bereichen Frontend- und Backendentwicklung, Data Science,
                  Datenvisualisierung, sowie UI/UX zusammen, um zu evaluieren
                  und aufzuzeigen, wie unsere Stadtgesellschaft von Technologie
                  profitieren kann.
                </p>
                <p>
                  Das CityLAB Berlin ist Hauptakteur bei der Umsetzung der
                  Prototypen. Neugierig geworden? Dann besuche einige unserer
                  Projekte auf GitHub.
                </p>
              </div>
            </div>
            <div className='md:text-right'>
              <img
                src='/images/tsb-logo.svg'
                alt='Logo der Technologiestiftung'
                className='max-w-full h-16 mt-8 inline-block'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mt-12'>
            <div>
              <a
                href='https://github.com/technologiestiftung'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub der Technologiestiftung Berlin'
              >
                <span
                  className={[
                    "group",
                    "p-0",
                    "text-lg sm:text-xl bg-blue text-green gap-4",
                    "font-headline font-bold flex place-items-center",
                  ].join(" ")}
                >
                  <strong
                    className={["px-4 py-3 bg-green text-blue"].join(" ")}
                  >
                    {user?.public_repos || 182}
                  </strong>{" "}
                  <span className='w-full'>Open Source Projekte</span>
                  <strong
                    className={[
                      "px-4 py-3",
                      "text-white bg-purple group-hover:bg-green transition-colors",
                    ].join(" ")}
                  >
                    <GitHub />
                  </strong>
                </span>
              </a>
            </div>

            <div className='lg:col-span-2 grid lg:grid-cols-2 gap-4 xl:gap-8'>
              {furtherProjects.map(({ name, repo, logo }) => (
                <a
                  key={name}
                  href={`https://github.com/technologiestiftung/${repo}`}
                  title={`Das Code-Repository von ${name}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={[
                    "p-4 bg-white border border-gray-200",
                    "gap-4 transition hover:border-blue hover:animate-borderpulse",
                    "flex flex-col justify-between max shadow",
                  ].join(" ")}
                >
                  <div className='flex justify-between'>
                    <h5 className='font-bold font-headline col-span-5 text-lg'>
                      {name}
                    </h5>
                    <img
                      src={`/images/repos/${logo}.svg`}
                      alt={`Logo des "${name}" Projektes`}
                      className='w-12'
                    />
                  </div>
                  <div className='col-span-6 text-sm text-gray-500 flex'>
                    <GitHub className='mr-1 transform scale-75' />
                    technologiestiftung/
                    <span className='text-purple'>{repo}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
