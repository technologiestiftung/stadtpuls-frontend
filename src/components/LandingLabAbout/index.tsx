import { GitHub } from "@material-ui/icons";
import { FC } from "react";

const AboutTitle: FC = ({ children }) => (
  <h1
    className={[
      "text-xl sm:text-2xl md:text-3xl",
      "text-blue-500 font-semibold",
      "mt-6 mb-8",
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

export const LandingLabAbout: FC = () => (
  <div
    className='bg-white pb-40 sm:pb-56 lg:pb-96 bg-no-repeat'
    style={{
      backgroundImage: "url('/images/landing-lab-about.png')",
      backgroundSize: "100% auto",
      backgroundPosition: "center bottom",
    }}
  >
    <section
      className={[
        "container mx-auto max-w-8xl",
        "px-4 sm:px-6 md:px-8",
        "py-8 sm:py-12 md:py-16",
        "border-t border-gray-200",
      ].join(" ")}
    >
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4 md:gap-8'>
        <div className='sm:col-span-2 lg:col-span-1'>
          <AboutTitle>
            Wir bauen Prototypen
            <br />
            <span className='text-blue-300'>Für das Gemeinwohl</span>
          </AboutTitle>
          <div className='prose max-w-none'>
            <p className='max-w-none'>
              In der Technologiestiftung Berlin arbeiten Expert*innen aus den
              Bereichen Frontend- und Backendentwicklung, Data Science,
              Visualisierung, UI/UX zusammen, um aufzuzeigen, wie die
              Gemeinschaft von Technologie profitieren kann. Oder so.
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
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 mt-12'>
        <div
          className={[
            "text-2xl sm:text-3xl pb-4 pt-8 sm:pt-0 border-t",
            "sm:border-t-0 border-gray-200",
          ].join(" ")}
        >
          <strong className='font-bold'>226</strong> Open Source Projekte
          <span className='block text-gray-500'>and counting</span>
        </div>
        <div className='xl:col-span-2 grid xl:grid-cols-2 gap-4 xl:gap-8'>
          {furtherProjects.map(({ name, repo, logo }) => (
            <a
              key={name}
              href={`https://github.com/technologiestiftung/${repo}`}
              title={`Das Code-Repository von ${name}`}
              target='_blank'
              rel='noopener noreferrer'
              className={[
                "p-4 h-32 xl:h-48 rounded bg-white border border-gray-300",
                "gap-4 xl:gap-y-8 transition hover:border-blue-500 hover:bg-blue-50",
                "flex flex-col justify-between max",
              ].join(" ")}
            >
              <div className='flex justify-between'>
                <h5 className='font-bold col-span-5 text-lg'>{name}</h5>
                <img
                  src={`/images/repos/${logo}.svg`}
                  alt={`Logo des "${name}" Projektes`}
                  className='w-12'
                />
              </div>
              <div className='col-span-6 text-sm text-gray-500 flex'>
                <GitHub className='mr-1 transform scale-75' />
                technologiestiftung/
                <span className='text-black'>{repo}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  </div>
);
