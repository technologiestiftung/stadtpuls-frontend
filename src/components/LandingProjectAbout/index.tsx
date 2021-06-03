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

const techInfoColumns = [
  {
    title: "Backend",
    repo: "next-iot-hub-api",
    technologies: [
      {
        name: "Supabase",
        description: "Open Source Firebase-like Service",
        link: "http://supabase.io/",
      },
      {
        name: "Fastify",
        description: "Fast and low overhead web framework, for Node.js",
        link: "https://www.fastify.io/",
      },
      {
        name: "PostgreSQL Database",
        description: "Open Source Relational Database",
        link: "https://www.postgresql.org/",
      },
    ],
  },
  {
    title: "Frontend",
    repo: "next-iot-hub",
    technologies: [
      {
        name: "Next.js",
        description: "The React Framework for Production",
        link: "https://nextjs.org/",
      },
      {
        name: "Visx",
        description:
          "A collection of expressive, low-level visualization primitives for React",
        link: "https://airbnb.io/visx/",
      },
      {
        name: "SWR",
        description: "React Hooks library for data fetching",
        link: "https://swr.vercel.app/",
      },
    ],
  },
];

export const LandingProjectAbout: FC = () => (
  <div className='bg-white'>
    <section
      className={[
        "container mx-auto max-w-8xl",
        "px-4 sm:px-6 md:px-8",
        "py-8 sm:py-12 md:py-16",
      ].join(" ")}
    >
      <AboutTitle>Über das Projekt</AboutTitle>
      <div className='grid md:grid-cols-5 xl:grid-cols-2 gap-4 sm:gap-8'>
        <div className='md:col-span-3 xl:col-span-1 prose max-w-none'>
          <p className='max-w-none'>
            Hier steht ein ausführlicher Beschreibungstext über Hintergründe des
            Projekts, TSB, usw. Hier steht ein ausführlicher Beschreibungstext
            über Hintergründe des Projekts, TSB, usw. Hier steht ein
            ausführlicher Beschreibungstext über Hintergründe des Projekts, TSB,
            usw. Hier steht ein ausführlicher Beschreibungstext über
            Hintergründe des Projekts, TSB, usw. Hier steht ein ausführlicher
            Beschreibungstext über Hintergründe des Projekts, TSB, usw.
          </p>
          <p className='max-w-none'>
            Hier steht ein ausführlicher Beschreibungstext über Hintergründe des
            Projekts, TSB, usw. Hier steht ein ausführlicher Beschreibungstext
            über Hintergründe des Projekts, TSB, usw.
          </p>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 md:col-span-2 xl:col-span-1 gap-4 lg:gap-8'>
          {techInfoColumns.map(({ repo, title, technologies }) => (
            <div key={title} className=''>
              <h4 className='text-xl font-bold mb-1'>{title}</h4>
              <a
                href={`https://github.com/technologiestiftung/${repo}`}
                title={`Das Code-Repository von der IoT Hub ${title}`}
                className='text-sm text-gray-500 mb-4 block'
              >
                <GitHub className='mr-1 transform scale-75' />
                technologiestiftung/
                <span className='text-black'>{repo}</span>
              </a>
              <ul>
                {technologies.map(({ link, description, name }) => (
                  <li key={name}>
                    <a
                      href={link}
                      title={description}
                      className='text-gray-500 underline hover:text-blue-500 transition'
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
