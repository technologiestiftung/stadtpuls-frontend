import { CategoryIcon } from "@components/CategoryIcon";
import { UserAvatar } from "@components/UserAvatar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { FC } from "react";
import Link from "next/link";
import { SensorSymbol } from "@components/SensorSymbol";
import { CopyTextField } from "@components/CopyTextField";
import { PreviewMap } from "@components/PreviewMap";
import { Button } from "@components/Button";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { createApiUrl } from "@lib/requests/createApiUrl";
import { normalizeURL } from "@lib/urlUtil";

export interface SensorPageHeaderPropType extends ParsedSensorType {
  withEditButton?: boolean;
  onEditButtonClick?: () => void | undefined;
}

const MapBackground: FC<{
  geocoordinates: Pick<ParsedSensorType, "latitude" | "longitude">;
}> = ({ geocoordinates }) => (
  <div
    className={[
      "md:absolute z-0 inset-0 bg-purple bg-opacity-5",
      "grid md:grid-cols-2 h-80 md:h-auto",
    ].join(" ")}
  >
    <div className='bg-white hidden md:block' />
    <div className='relative'>
      <PreviewMap
        mapWidth='100%'
        mapHeight='100%'
        viewport={{ ...geocoordinates, zoom: 16 }}
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

const UserLink: FC<Pick<ParsedSensorType, "authorName" | "authorUsername">> = ({
  authorName,
  authorUsername,
}) => (
  <Link href={`/accounts/${authorUsername}`}>
    <a
      className={[
        "flex gap-2 items-center leading-tight",
        "hover:text-purple transition",
        "focus-offset",
        "truncate",
      ].join(" ")}
    >
      <UserAvatar username={authorUsername} />
      <span className='truncate'>{authorName}</span>
    </a>
  </Link>
);

const CategoryLabel: FC<Pick<ParsedSensorType, "categoryName" | "categoryId">> =
  ({ categoryName, categoryId }) => (
    <span
      className={[
        "inline-flex gap-2 items-center px-2.5 py-2 text-blue",
        "leading-tight bg-green bg-opacity-10 text-sm",
        "flex-grow-0",
      ].join(" ")}
    >
      <CategoryIcon categoryId={categoryId} />
      {categoryName}
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

const Title: FC<Pick<ParsedSensorType, "name" | "symbolId">> = ({
  name,
  symbolId,
}) => (
  <h1
    className={[
      "grid gap-4 grid-cols-[24px,1fr]",
      "font-semibold font-headline text-blue mb-2",
      "leading-tight sm:leading-tight md:leading-tight",
      "text-xl sm:text-2xl md:text-3xl",
    ].join(" ")}
  >
    <SensorSymbol symbol={symbolId} className='mt-1' />
    <span>{name}</span>
  </h1>
);

const ApiUrl: FC<{ url: string }> = ({ url }) => {
  const normalizedUrl = normalizeURL(url);
  return (
    <CopyTextField
      name='api-url'
      label='API Schnittstelle'
      contentToCopy={normalizedUrl ? `https://${normalizedUrl}` : url}
    >
      {normalizedUrl || url}
    </CopyTextField>
  );
};

export const SensorPageHeader: FC<SensorPageHeaderPropType> = ({
  id,
  name,
  symbolId,
  categoryId,
  categoryName,
  description,
  authorName,
  authorUsername,
  latitude,
  longitude,
  withEditButton = false,
  onEditButtonClick = () => undefined,
}) => {
  return (
    <div className='bg-gray-50 relative mt-[calc(-1*var(--headerHeight))]'>
      <MapBackground geocoordinates={{ latitude, longitude }} />
      <div
        className={["container max-w-8xl", "mx-auto relative z-10"].join(" ")}
      >
        <aside className='md:w-1/2 bg-white px-4 py-8 md:py-40 md:pr-12 md:max-w-[560px]'>
          <BackLink />
          <Title name={name} symbolId={symbolId} />
          <div className='flex gap-4'>
            <CategoryLabel
              categoryId={categoryId}
              categoryName={categoryName}
            />
            <UserLink authorName={authorName} authorUsername={authorUsername} />
          </div>
          <div className='py-6'>
            <p className='text-sm sm:text-base max-w-prose'>{description}</p>
          </div>
          <ApiUrl url={`${createApiUrl()}sensors/${id}/records`} />
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
