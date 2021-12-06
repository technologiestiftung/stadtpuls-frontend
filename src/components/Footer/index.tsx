import React from "react";

const TSBLogo = "/images/tsb-logo.svg";
const CityLABLogo = "/images/citylab-logo.svg";
const BerlinLogo = "/images/berlin-skzl-logo.svg";

export const Footer: React.FC = () => {
  return (
    <footer>
      <section className='bg-white border-t border-gray-100'>
        <div className='container max-w-8xl mx-auto py-8 px-4'>
          <div className='w-full flex'>
            <div className='block'>
              <span className='w-full block text-xs text-gray-700'>&nbsp;</span>
              <a
                href='https://www.citylab-berlin.org'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 block focus-offset'
                aria-label='CityLAB Berlin'
              >
                <img
                  src={CityLABLogo}
                  alt='Logo des CityLAB Berlin'
                  className='w-44'
                />
              </a>
            </div>
            <div className='ml-8 md:ml-12 block'>
              <span className='w-full block text-xs text-gray-700'>
                Ein Projekt der:
              </span>
              <a
                href='https://technologiestiftung-berlin.de/'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 block focus-offset'
                aria-label='Technologiestiftung Berlin'
              >
                <img
                  src={TSBLogo}
                  alt='Logo der Technologiestiftung Berlin'
                  className='w-40'
                />
              </a>
            </div>
            <div className='ml-8 md:ml-12 block'>
              <span className='w-full block text-xs text-gray-700'>
                Gefördert durch:
              </span>
              <a
                href='https://www.berlin.de/rbmskzl/'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 block focus-offset'
                aria-label='Der Regierende Bürgermeister von Berlin - Senatskanzlei'
              >
                <img
                  src={BerlinLogo}
                  alt='Logo: Der Regierende Bürgermeister von Berlin - Senatskanzlei'
                  className='w-32'
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white-dot-pattern'>
        <div className='container max-w-8xl mx-auto px-4 py-6 block sm:flex justify-between'>
          <div className='flex items-center'>
            <p className='text-sm text-gray-700'>
              &copy; {new Date().getFullYear()} Technologiestiftung Berlin
            </p>
          </div>
          <ul className='flex items-center mt-2 sm:mt-0 flex-wrap gap-x-4 gap-y-2'>
            <li>
              <a
                href='https://github.com/technologiestiftung/stadtpuls/discussions'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-gray-700 focus-offset'
              >
                Feedback
              </a>
            </li>
            <li>
              <a
                href='/docs/terms'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-gray-700 focus-offset'
              >
                Nutzungsbedingungen
              </a>
            </li>
            <li>
              <a
                href='https://www.technologiestiftung-berlin.de/de/impressum/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-gray-700 focus-offset'
              >
                Impressum
              </a>
            </li>
            <li>
              <a
                href='https://www.technologiestiftung-berlin.de/de/datenschutz/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-gray-700 focus-offset'
              >
                Datenschutzerklärung
              </a>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};
