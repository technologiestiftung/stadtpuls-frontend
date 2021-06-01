import { ArrowForward } from "@material-ui/icons";
import { FC, ReactNode } from "react";

interface ListItemType {
  text: string;
  icon?: ReactNode;
}

interface HowItWorksColumnPropType {
  final?: boolean;
}

interface ListWithIconsPropType {
  listItems: ListItemType[];
  final?: boolean;
}

const HowItWorksTitle: FC = ({ children }) => (
  <h3 className='text-lg md:text-xl lg:text-2xl font-bold text-blue-500 mt-8 mb-2'>
    {children}
  </h3>
);

const HowItWorksDescription: FC = ({ children }) => (
  <p className='text-sm text-gray-600 mb-8'>{children}</p>
);

const HowItWorksColumn: FC<HowItWorksColumnPropType> = ({
  children,
  final = false,
}) => (
  <div className={["pr-8", final ? "bg-white col-span-3" : "col-span-2"].join(" ")}>
    <header className={final ? "px-8" : ""}>{children}</header>
  </div>
);

const ListWithIcons: FC<ListWithIconsPropType> = ({
  listItems,
  final = false,
}) => (
  <ul
    className={[
      "pt-8 pr-8",
      final ? "bg-white px-8 col-span-3" : "col-span-2",
    ].join(" ")}
  >
    {listItems.map(({ text, icon = <i /> }) => (
      <li
        key={text}
        className='grid mb-2 sm:mb-3 gap-3 sm:gap-4 items-center'
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <span className='bg-gray-200 rounded-full w-8 h-8 sm:w-10 sm:h-10'>
          {icon}
        </span>
        <span>{text}</span>
      </li>
    ))}
  </ul>
);

const columnsData = [
  {
    title: "Hardware",
    description:
      "Die Hardware-Wahl  ist ganz dir überlassen. Arbeite z.B. mit Arduino, Raspberry Pi oder einer Open Sense Box.",
    listItems: [
      { text: "Arduino" },
      { text: "Raspberry Pi" },
      { text: "Open Sense Box" },
    ],
  },
  {
    title: "Sensoren",
    description:
      "Wir unterstützen aktuell die folgenden, für die Umwelt relevanten Sensortypen.",
    listItems: [
      { text: "Temperatur" },
      { text: "CO2" },
      { text: "Luftfeuchtigkeit" },
      { text: "Druck" },
      { text: "Helligkeit" },
      { text: "Lautstärke" },
      { text: "Personenzähler" },
    ],
  },
  {
    title: "Protokolle",
    description:
      "Über die folgenden Protokolle kannst du deine Daten übertragen.",
    listItems: [{ text: "TheThingsNetwork (TTN)" }],
  },
  {
    title: "Was wir bereitstellen",
    description:
      "Hast du erstmal deinen Sensoren registriert, stellen wir dir automatisch und kostenlos folgendes bereit:",
    listItems: [
      { text: "Ein Profil für dein Projekt" },
      { text: "Datenvisualisierungen" },
      { text: "REST-API für alle Sensoren" },
      { text: "Daten-Downloads (CSV & JSON)" },
    ],
  },
];

export const LandingHowItWorks: FC = () => (
  <div className='bg-gray-50'>
    <section
      className={[
        "container mx-auto max-w-8xl",
        "px-4 sm:px-6 md:px-8",
        "py-8 sm:py-12 md:py-16",
        "overflow-x-auto",
      ].join(" ")}
    >
      <h1
        className={[
          "text-xl sm:text-2xl md:text-3xl",
          "text-blue-500 font-semibold",
          "mt-6 mb-8",
        ].join(" ")}
      >
        Und so geht’s:
        <br />
        <span className='text-blue-300'>Eine kleine Übersicht</span>
      </h1>
      <div className='grid grid-cols-9 gap-0'>
        {columnsData.map(({ title }, idx) => (
          <HowItWorksColumn key={title} final={idx + 1 === columnsData.length}>
            <HowItWorksTitle>
              <span className='mr-2'>{title}</span>
              {idx + 1 !== columnsData.length && <ArrowForward />}
            </HowItWorksTitle>
          </HowItWorksColumn>
        ))}
      </div>
      <div className='grid grid-cols-9 gap-0 border-b border-gray-300'>
        {columnsData.map(({ description }, idx) => (
          <HowItWorksColumn
            key={description}
            final={idx + 1 === columnsData.length}
          >
            <HowItWorksDescription>{description}</HowItWorksDescription>
          </HowItWorksColumn>
        ))}
      </div>
      <div className='grid grid-cols-9 gap-0 pb-8 mb-8 sm:pb-12 sm:mb-12'>
        {columnsData.map(({ title, listItems }, idx) => (
          <ListWithIcons
            key={title}
            final={idx + 1 === columnsData.length}
            listItems={listItems}
          />
        ))}
      </div>
    </section>
  </div>
);
