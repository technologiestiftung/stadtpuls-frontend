import React from "react";

const TSBLogo = "/images/tsb-logo.svg";
const CityLABLogo = "/images/citylab-logo.svg";
const BerlinLogo = "/images/berlin-logo.svg";

export const Footer: React.FC = () => {
  return (
    <footer>
      <section className='bg-white border-t border-gray-200'>
        <div className='max-w-screen-2xl mx-auto p-8'>
          <div className='w-full flex'>
            <div className='block'>
              <span className='w-full block text-xs text-gray-700'>
                Ein Projekt der:
              </span>
              <a
                href='https://technologiestiftung-berlin.de/'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 block'
                aria-label='Technologiestiftung Berlin'
              >
                <img
                  src={TSBLogo}
                  alt='Logo der Technologiestiftung Berlin'
                  className='w-32'
                />
              </a>
            </div>
            <div className='ml-8 md:ml-12 block'>
              <span className='w-full block text-xs text-gray-700'>
                Durchgeführt vom:
              </span>
              <a
                href='https://www.citylab-berlin.org'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 block'
                aria-label='CityLAB Berlin'
              >
                <img
                  src={CityLABLogo}
                  alt='Logo des CityLAB Berlin'
                  className='w-40'
                />
              </a>
            </div>
            <div className='ml-8 md:ml-12 block'>
              <span className='w-full block text-xs text-gray-700'>
                Gefördert von:
              </span>
              <a
                href='https://www.berlin.de/'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 block'
                aria-label='berlin.de'
              >
                <img src={BerlinLogo} alt='Berlin Logo' className='w-32' />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white-dot-pattern'>
        <div className='max-w-screen-2xl mx-auto px-8 py-6 block sm:flex justify-between'>
          <div className='flex items-center'>
            <p className='text-sm text-gray-700'>
              &copy; {new Date().getFullYear()} Technologiestiftung Berlin
            </p>
          </div>
          <ul className='flex items-center mt-2 sm:mt-0'>
            <li>
              <a
                href='https://www.technologiestiftung-berlin.de/de/impressum/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-gray-700'
              >
                Impressum
              </a>
            </li>
            <li className='ml-4'>
              <a
                href='https://www.technologiestiftung-berlin.de/de/datenschutz/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-gray-700'
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
