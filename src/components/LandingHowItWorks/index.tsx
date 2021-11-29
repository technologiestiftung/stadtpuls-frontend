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
      "Die Wahl der Hardware  ist ganz dir überlassen. Arbeite mit Arduino, Raspberry Pi oder einer Open Sense Box. Wichtig ist, dass dein Board über eine LoRaWan-Antenne verfügt.",
    listItems: [
      { icon: "/images/icons/arduino.svg", text: "Arduino" },
      { icon: "/images/icons/raspberry-pi.svg", text: "Raspberry Pi" },
      { icon: "/images/icons/open-sense-box.svg", text: "Open Sense Box" },
    ],
  },
  {
    title: "Sensoren",
    description:
      "Prinzipiell kannst du jeden Sensor verbinden. Wir unterstützen aktuell die folgenden, für die Umwelt relevanten, Sensortypen und machen sie mit einer Kategorie sichtbar.",
    listItems: [
      { icon: "/images/icons/temperature.svg", text: "Temperatur" },
      { icon: "/images/icons/co2.svg", text: "CO2" },
      { icon: "/images/icons/humidity.svg", text: "Luftfeuchtigkeit" },
      { icon: "/images/icons/pressure.svg", text: "Druck" },
      { icon: "/images/icons/lightness.svg", text: "Helligkeit" },
      { icon: "/images/icons/decibels.svg", text: "Lautstärke" },
      { icon: "/images/icons/unit-counter.svg", text: "Zähler" },
    ],
  },
  {
    title: "Protokolle",
    description: "Stadtpuls unterstützt aktuell HTTP und LoRaWan über TTN.",
    listItems: [
      { icon: "/images/icons/HTTP.svg", text: "HTTP" },
      { icon: "/images/icons/lorawan.svg", text: "LoRaWAN (TTN)" },
    ],
  },
  {
    title: "Was wir bereitstellen",
    description:
      "Hast du erst einmal ein eigenes Stadtpuls-Account, stellen wir dir automatisch und kostenlos folgendes bereit:",
    listItems: [
      {
        icon: "/images/icons/profile.svg",
        text: "Ein Profil für deine Sensoren",
      },
      {
        icon: "/images/icons/visualisations.svg",
        text: <>Daten&shy;visualisierungen</>,
      },
      { icon: "/images/icons/api.svg", text: "REST-API für alle Sensoren" },
      {
        icon: "/images/icons/downloads.svg",
        text: "Daten-Downloads (CSV)",
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
        "sm:py-24 lg:py-32",
      ].join(" ")}
    >
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
      <div className='grid grid-cols-2 lg:grid-cols-9 mt-32'>
        <div className='col-span-6 lg:pr-12'>
          <h1
            className={[
              "text-xl sm:text-2xl md:text-3xl",
              "text-purple font-bold font-headline",
              "mb-4 mt-8",
            ].join(" ")}
          >
            Stadtpuls unterstützt die Anbindung an TTN!
          </h1>
          <p className='mb-3'>
            Durch die TTN-Anbindung kannst du deine TTN-Projekte ganz einfach
            über einen Webhook mit Stadtpuls verbinden und eigene Projekte
            anlegen. Deine Daten werden dadurch visualisiert und per API, sowie
            per CSV offen und kostenlos der gesamten Stadtgesellschaft zur
            Verfügung gestellt.
          </p>
          <p>
            So trägst auch du dazu bei, unsere Stadt ein Stück smarter zu
            machen. Wir arbeiten parallel an weiteren Schnittstellen, um in
            Zukunft die Anbindung aller Protkolle und Sensortypen zu
            ermöglichen.
          </p>
        </div>
        <aside
          className={[
            "col-span-3",
            "w-full",
            "p-8 mt-8 lg:mt-0",
            "border border-green shadow-green",
          ].join(" ")}
        >
          <h3
            className={[
              "flex gap-4 items-center",
              "font-headline font-bold",
              "text-xl sm:text-2xl md:text-3xl",
              "mb-4",
            ].join(" ")}
          >
            <img
              src='/images/illustrations/microcontroller-2.svg'
              alt='Microcontroller'
            />
            TTN? LoRa-Was?
          </h3>
          <p className='col-span-2'>
            In Berlin gibt es ein offenes{" "}
            <a
              href='https://de.wikipedia.org/wiki/Long_Range_Wide_Area_Network'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:text-blue transition-colors'
            >
              LoRaWan-Netzwerk
            </a>
            , welches seit 2017 durch die{" "}
            <a
              href='https://www.thethingsnetwork.org/'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:text-blue transition-colors'
            >
              The Things Network (TTN)
            </a>{" "}
            Community betrieben wird. Jeder kann und darf es komplett kostenlos
            benutzten, seine Sensoren mit dem Netzwerk verbinden und die Stadt
            auf eigene Faust vermessen.
          </p>
        </aside>
      </div>
    </section>
  </div>
);
