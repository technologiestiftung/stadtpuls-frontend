import { CategoryIcon } from "@components/CategoryIcon";
import { UserAvatar } from "@components/UserAvatar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { FC } from "react";
import Link from "next/link";
import { SensorSymbol } from "@components/SensorSymbol";
import { CopyTextField } from "@components/CopyTextField";
import { ProjectPreviewMap } from "@components/ProjectPreviewMap";
import { Button } from "@components/Button";

export interface SensorPageHeaderPropType {
  id: string | number;
  name: string;
  symbol: number;
  category: { id: number; name: string; description?: string };
  description?: string;
  author: {
    username: string;
    displayName: string;
  };
  geocoordinates: { latitude: number; longitude: number };
  withEditButton?: boolean;
  onEditButtonClick?: () => void | undefined;
}

const MapBackground: FC<Pick<SensorPageHeaderPropType, "geocoordinates">> = ({
  geocoordinates,
}) => (
  <div
    className={[
      "md:absolute z-0 inset-0 bg-purple bg-opacity-5",
      "grid md:grid-cols-2 h-80 md:h-auto",
    ].join(" ")}
  >
    <div className='bg-white hidden md:block' />
    <div className='relative'>
      <ProjectPreviewMap
        mapWidth='100%'
        mapHeight='100%'
        viewport={geocoordinates}
      />
      <span
        className={[
          "bg-blue w-3 h-3 rounded-full absolute inline-block",
          "top-1/2 left-1/2 transform -translate-x-1.5 -translate-y-1.5",
        ].join(" ")}
      />
      <div
        className={[
          "absolute inset-0 bg-left-bottom bg-no-repeat pointer-events-none",
          "bg-sensor-page-header-mobile bg-repeat-x",
          "md:bg-sensor-page-header md:bg-no-repeat",
        ].join(" ")}
      />
    </div>
  </div>
);

const UserLink: FC<Pick<SensorPageHeaderPropType, "author">> = ({ author }) => (
  <Link href={`/accounts/${author.username}`}>
    <a
      className={[
        "flex gap-2 items-center leading-tight",
        "hover:text-purple transition",
        "focus-offset",
        "truncate",
      ].join(" ")}
    >
      <UserAvatar username={author.username} />
      <span className='truncate'>{author.displayName}</span>
    </a>
  </Link>
);

const CategoryLabel: FC<Pick<SensorPageHeaderPropType, "category">> = ({
  category,
}) => (
  <span
    className={[
      "inline-flex gap-2 items-center px-2.5 py-2 text-blue",
      "leading-tight bg-green bg-opacity-10 text-sm",
      "flex-grow-0",
    ].join(" ")}
  >
    <CategoryIcon categoryId={category.id} />
    {category.name}
  </span>
);

const BackLink: FC = () => (
  <Link href='/sensors'>
    <a
      href='/sensors'
      className={[
        "text-blue hover:text-purple transition items-center",
        "font-bold flex gap-2 mb-8 text-sm sm:text-base",
        "focus-offset",
      ].join(" ")}
    >
      <ArrowBackIcon /> Zurück zu Sensoren
    </a>
  </Link>
);

const Title: FC<Pick<SensorPageHeaderPropType, "name" | "symbol">> = ({
  name,
  symbol,
}) => (
  <h1
    className={[
      "grid gap-4 grid-cols-[24px,1fr]",
      "font-semibold font-headline text-blue mb-2",
      "leading-tight sm:leading-tight md:leading-tight",
      "text-xl sm:text-2xl md:text-3xl",
    ].join(" ")}
  >
    <SensorSymbol symbol={symbol} className='mt-1' />
    <span>{name}</span>
  </h1>
);

export const SensorPageHeader: FC<SensorPageHeaderPropType> = ({
  id,
  name,
  symbol,
  category,
  description,
  author,
  geocoordinates,
  withEditButton = false,
  onEditButtonClick = () => undefined,
}) => {
  return (
    <div className='bg-gray-50 relative'>
      <MapBackground geocoordinates={geocoordinates} />
      <div
        className={["container max-w-8xl", "mx-auto relative z-10"].join(" ")}
      >
        <aside className='md:w-1/2 bg-white px-4 py-8 md:py-32 md:pr-12 md:max-w-[560px]'>
          <BackLink />
          <Title name={name} symbol={symbol} />
          <div className='flex gap-4'>
            <CategoryLabel category={category} />
            <UserLink author={author} />
          </div>
          <div className='py-6'>
            <p className='text-sm sm:text-base max-w-prose'>{description}</p>
          </div>
          <CopyTextField name='api-url' label='API Schnittstelle'>
            {`/api/v2/sensors/${id}/records`}
          </CopyTextField>
          {withEditButton && onEditButtonClick && (
            <div className='w-full order-last mt-6'>
              <Button onClick={onEditButtonClick}>Sensor editieren</Button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
