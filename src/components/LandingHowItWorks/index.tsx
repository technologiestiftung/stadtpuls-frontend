import { ArrowForward } from "@material-ui/icons";
import { FC, ReactNode } from "react";
import styles from "./LandingHowItWorks.module.css";

interface ListItemType {
  text: ReactNode;
  icon?: string;
}

interface HowItWorksTitlePropType {
  final?: boolean;
}

interface HowItWorksDescriptionPropType {
  final?: boolean;
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

const HowItWorksTitle: FC<HowItWorksTitlePropType> = ({ children }) => (
  <h3
    className={[
      "text-lg md:text-xl lg:text-2xl font-bold",
      "sm:pt-4 md:mt-8 mb-2 font-headline",
    ].join(" ")}
  >
    {children}
  </h3>
);

const HowItWorksDescription: FC<HowItWorksDescriptionPropType> = ({
  children,
  final = false,
}) => (
  <p
    className={["text-sm mb-8 text-gray-500", final && "sm:text-gray-300"]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </p>
);

const HowItWorksColumn: FC<HowItWorksColumnPropType> = ({
  children,
  final = false,
  area,
}) => (
  <div
    className={[
      "sm:pr-4 md:pr-8",
      final ? "sm:bg-black-dot-pattern sm:text-white" : "",
    ].join(" ")}
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
      final && "sm:bg-black-dot-pattern sm:px-4 md:px-8",
      final && "sm:border-purple sm:border-opacity-50",
    ]
      .filter(Boolean)
      .join(" ")}
    style={{ gridArea: area }}
  >
    {listItems.map(({ text, icon = "#" }) => (
      <li
        key={text?.toString()}
        className={[
          "grid mb-2 sm:mb-3 gap-3 sm:gap-4 items-center bg-gray-50",
          final ? "sm:bg-green sm:bg-opacity-10 sm:text-white" : "",
        ].join(" ")}
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <span
          className={[
            "w-14 h-14 bg-no-repeat bg-center",
            final ? "bg-green" : "bg-purple text-white",
          ].join(" ")}
          style={{ backgroundImage: `url(${icon})` }}
        />
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
      { icon: "/images/icons/arduino.svg", text: "Arduino" },
      { icon: "/images/icons/raspberry-pi.svg", text: "Raspberry Pi" },
      { icon: "/images/icons/open-sense-box.svg", text: "Open Sense Box" },
    ],
  },
  {
    title: "Sensoren",
    description:
      "Wir unterstützen aktuell die folgenden, für die Umwelt relevanten Sensortypen.",
    listItems: [
      { icon: "/images/icons/temperature.svg", text: "Temperatur" },
      { icon: "/images/icons/co2.svg", text: "CO2" },
      { icon: "/images/icons/humidity.svg", text: "Luftfeuchtigkeit" },
      { icon: "/images/icons/pressure.svg", text: "Druck" },
      { icon: "/images/icons/lightness.svg", text: "Helligkeit" },
      { icon: "/images/icons/decibels.svg", text: "Lautstärke" },
      { icon: "/images/icons/crowd.svg", text: "Personenzähler" },
    ],
  },
  {
    title: "Protokolle",
    description:
      "Über die folgenden Protokolle kannst du deine Daten übertragen.",
    listItems: [{ icon: "/images/icons/arduino.svg", text: "LoRaWAN (TTN)" }],
  },
  {
    title: "Was wir bereitstellen",
    description:
      "Hast du erstmal deinen Sensoren registriert, stellen wir dir automatisch und kostenlos folgendes bereit:",
    listItems: [
      {
        icon: "/images/icons/profile.svg",
        text: "Ein Profil für dein Projekt",
      },
      {
        icon: "/images/icons/visualisations.svg",
        text: <>Daten&shy;visualisierungen</>,
      },
      { icon: "/images/icons/api.svg", text: "REST-API für alle Sensoren" },
      {
        icon: "/images/icons/downloads.svg",
        text: "Daten-Downloads (CSV & JSON)",
      },
    ],
  },
];

export const LandingHowItWorks: FC = () => (
  <div>
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
          "text-purple font-bold font-headline",
          "mt-6 mb-1",
        ].join(" ")}
      >
        Und so geht’s:
      </h1>
      <p className='mb-8 text-lg'>Eine kleine Übersicht</p>
      <div
        className={`grid grid-cols-2 lg:grid-cols-9 gap-x-4 sm:gap-x-0 ${styles.gridContainer}`}
      >
        {columnsData.map(({ title }, idx) => (
          <HowItWorksColumn
            key={title}
            final={idx + 1 === columnsData.length}
            area={`title-${idx + 1}`}
          >
            <HowItWorksTitle final={idx + 1 !== columnsData.length}>
              <span className='mr-2'>{title}</span>
              {idx + 1 !== columnsData.length && (
                <ArrowForward className='text-purple' />
              )}
            </HowItWorksTitle>
          </HowItWorksColumn>
        ))}
        {columnsData.map(({ description }, idx) => (
          <HowItWorksColumn
            key={description}
            final={idx + 1 === columnsData.length}
            area={`description-${idx + 1}`}
          >
            <HowItWorksDescription final={idx + 1 === columnsData.length}>
              {description}
            </HowItWorksDescription>
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
