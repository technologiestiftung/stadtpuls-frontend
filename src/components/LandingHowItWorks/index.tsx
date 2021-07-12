import { ArrowForward } from "@material-ui/icons";
import { FC, ReactNode } from "react";
import styles from "./LandingHowItWorks.module.css";

interface ListItemType {
  text: ReactNode;
  icon?: ReactNode;
}

interface HowItWorksColumnPropType {
  final?: boolean;
  area: string;
}

interface ListWithIconsPropType {
  listItems: ListItemType[];
  final?: boolean;
  area: string;
}

const HowItWorksTitle: FC = ({ children }) => (
  <h3 className='text-lg md:text-xl lg:text-2xl font-bold text-blue sm:pt-4 md:mt-8 mb-2'>
    {children}
  </h3>
);

const HowItWorksDescription: FC = ({ children }) => (
  <p className='text-sm text-gray-600 mb-8'>{children}</p>
);

const HowItWorksColumn: FC<HowItWorksColumnPropType> = ({
  children,
  final = false,
  area,
}) => (
  <div
    className={["sm:pr-4 md:pr-8", final ? "sm:bg-white" : ""].join(" ")}
    style={{ gridArea: area }}
  >
    <header className={final ? "sm:pl-4 md:pl-8" : ""}>{children}</header>
  </div>
);

const ListWithIcons: FC<ListWithIconsPropType> = ({
  listItems,
  final = false,
  area,
}) => (
  <ul
    className={[
      "sm:pr-4 md:pr-8",
      "pb-8 sm:pt-4 md:pt-8 sm:border-t border-gray-300",
      final ? "sm:bg-white sm:px-4 md:px-8" : "",
    ].join(" ")}
    style={{ gridArea: area }}
  >
    {listItems.map(({ text, icon = <i /> }) => (
      <li
        key={text?.toString()}
        className='grid mb-2 sm:mb-3 gap-3 sm:gap-4 items-center'
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <span className='bg-gray-200 rounded-full w-6 h-6 sm:w-10 sm:h-10'>
          {icon}
        </span>
        <span className='text-sm sm:text-base break-words sm:break-normal'>
          {text}
        </span>
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
    listItems: [{ text: "LoRaWAN (TTN)" }],
  },
  {
    title: "Was wir bereitstellen",
    description:
      "Hast du erstmal deinen Sensoren registriert, stellen wir dir automatisch und kostenlos folgendes bereit:",
    listItems: [
      { text: "Ein Profil für dein Projekt" },
      { text: <>Daten&shy;visualisierungen</> },
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
      ].join(" ")}
    >
      <h1
        className={[
          "text-xl sm:text-2xl md:text-3xl",
          "text-blue font-semibold",
          "mt-6 mb-8",
        ].join(" ")}
      >
        Und so geht’s:
        <br />
        <span className='text-purple'>Eine kleine Übersicht</span>
      </h1>
      <div
        className={`grid grid-cols-2 lg:grid-cols-9 gap-x-4 sm:gap-x-0 ${styles.gridContainer}`}
      >
        {columnsData.map(({ title }, idx) => (
          <HowItWorksColumn
            key={title}
            final={idx + 1 === columnsData.length}
            area={`title-${idx + 1}`}
          >
            <HowItWorksTitle>
              <span className='mr-2'>{title}</span>
              {idx + 1 !== columnsData.length && <ArrowForward />}
            </HowItWorksTitle>
          </HowItWorksColumn>
        ))}
        {columnsData.map(({ description }, idx) => (
          <HowItWorksColumn
            key={description}
            final={idx + 1 === columnsData.length}
            area={`description-${idx + 1}`}
          >
            <HowItWorksDescription>{description}</HowItWorksDescription>
          </HowItWorksColumn>
        ))}
        {columnsData.map(({ title, listItems }, idx) => (
          <ListWithIcons
            key={title}
            final={idx + 1 === columnsData.length}
            listItems={listItems}
            area={`list-${idx + 1}`}
          />
        ))}
      </div>
    </section>
  </div>
);
