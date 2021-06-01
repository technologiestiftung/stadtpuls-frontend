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
  <div className={["pr-8", final ? "bg-white" : ""].join(" ")}>
    <header className={final ? "px-8" : ""}>{children}</header>
  </div>
);

const ListWithIcons: FC<ListWithIconsPropType> = ({
  listItems,
  final = false,
}) => (
  <ul className={["pt-8 pr-8", final ? "bg-white px-8" : ""].join(" ")}>
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

export const LandingHowItWorks: FC = () => (
  <section
    className={[
      "container mx-auto max-w-8xl",
      "px-4 sm:px-6 md:px-8",
      "py-12 sm:py-24 md:py-40",
      "overflow-x-auto",
    ].join(" ")}
  >
    <div className='grid grid-cols-4 gap-0'>
      <HowItWorksColumn>
        <HowItWorksTitle>
          <span className='mr-2'>Hardware</span>
          <ArrowForward />
        </HowItWorksTitle>
      </HowItWorksColumn>
      <HowItWorksColumn>
        <HowItWorksTitle>
          <span className='mr-2'>Sensoren</span>
          <ArrowForward />
        </HowItWorksTitle>
      </HowItWorksColumn>
      <HowItWorksColumn>
        <HowItWorksTitle>
          <span className='mr-2'>Protokolle</span>
          <ArrowForward />
        </HowItWorksTitle>
      </HowItWorksColumn>
      <HowItWorksColumn final={true}>
        <HowItWorksTitle>Was wir bereitstellen</HowItWorksTitle>
      </HowItWorksColumn>
    </div>
    <div className='grid grid-cols-4 gap-0 border-b border-gray-300'>
      <HowItWorksColumn>
        <HowItWorksDescription>
          Die Hardware-Wahl ist ganz dir überlassen. Arbeite z.B. mit Arduino,
          Raspberry Pi oder einer Open Sense Box.
        </HowItWorksDescription>
      </HowItWorksColumn>
      <HowItWorksColumn>
        <HowItWorksDescription>
          Wir unterstützen aktuell die folgenden, für die Umwelt relevanten
          Sensortypen.
        </HowItWorksDescription>
      </HowItWorksColumn>
      <HowItWorksColumn>
        <HowItWorksDescription>
          Über die folgenden Protokolle kannst du deine Daten übertragen.
        </HowItWorksDescription>
      </HowItWorksColumn>
      <HowItWorksColumn final={true}>
        <HowItWorksDescription>
          Hast du erstmal deinen Sensoren registriert, stellen wir dir
          automatisch und kostenlos folgendes bereit:
        </HowItWorksDescription>
      </HowItWorksColumn>
    </div>
    <div className='grid grid-cols-4 gap-0 pb-8 mb-8 sm:pb-12 sm:mb-12'>
      <ListWithIcons
        listItems={[
          { text: "Arduino" },
          { text: "Raspberry Pi" },
          { text: "Open Sense Box" },
        ]}
      />
      <ListWithIcons
        listItems={[
          { text: "Temperatur" },
          { text: "CO2" },
          { text: "Luftfeuchtigkeit" },
          { text: "Druck" },
          { text: "Helligkeit" },
          { text: "Lautstärke" },
          { text: "Personenzähler" },
        ]}
      />
      <ListWithIcons listItems={[{ text: "TTN" }]} />
      <ListWithIcons
        final={true}
        listItems={[
          { text: "Ein Profil für dein Projekt" },
          { text: "Datenvisualisierungen" },
          { text: "REST-API für alle Sensoren" },
          { text: "Daten-Downloads (CSV & JSON)" },
        ]}
      />
    </div>
  </section>
);
