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

export const LandingLabAbout: FC = () => (
  <div className='bg-white pb-96'>
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
            className='max-w-full h-16 mt-6 inline-block'
          />
        </div>
      </div>
    </section>
  </div>
);
