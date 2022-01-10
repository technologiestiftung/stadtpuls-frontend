import { FC } from "react";
import Link from "next/link";
import { PreviewMap } from "@components/PreviewMap";
import useIsInViewport from "use-is-in-viewport";
import { AreaPath } from "@components/AreaPath";
import { UserAvatar } from "@components/UserAvatar";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { SensorSymbol } from "@components/SensorSymbol";
import { CategoryIcon } from "@components/CategoryIcon";
import ReactAutolinker from "react-autolinker";

export interface SensorCardPropType extends ParsedSensorType {
  withMapBackground?: boolean;
  withMapLabels?: boolean;
  backgroundImage?: string;
}

const DISPLAYABLE_RECORDS_AMOUNT = 20;
export const DESCRIPTION_MAX_LENGTH = 100;

export const SensorCard: FC<SensorCardPropType> = ({
  id,
  name,
  symbolId,
  latitude,
  longitude,
  description,
  parsedRecords,
  authorName,
  authorUsername,
  categoryId,
  categoryName,
  withMapBackground = true,
  withMapLabels = true,
  backgroundImage,
}) => {
  const [isInViewport, mapWrapperRef] = useIsInViewport({ threshold: 50 });

  return (
    <Link href={`/${authorUsername}/sensors/${id}`}>
      <a
        href={`/${authorUsername}/sensors/${id}`}
        ref={mapWrapperRef}
        className={[
          "block focus-offset",
          "bg-white shadow",
          "border border-gray-200 group",
          "hover:animate-borderpulse",
          "cursor-pointer transition-all",
          "relative overflow-hidden group",
        ].join(" ")}
        style={{ minHeight: 280 }}
      >
        <div
          className={[
            "absolute inset-0 bottom-auto lg:bottom-0 lg:left-auto lg:w-1/3",
            "h-32 lg:h-full",
            "pointer-events-none transition overflow-hidden",
            "group-hover:opacity-60 bg-gray-50",
          ].join(" ")}
        >
          {!backgroundImage &&
            isInViewport &&
            withMapBackground &&
            latitude &&
            longitude && (
              <div
                className={["transition absolute inset-0"].join(" ")}
                style={{
                  animationDuration: "1s",
                  animationFillMode: "both",
                  animationName: "fadeIn",
                  animationDelay: "1s",
                }}
              >
                <PreviewMap
                  viewport={{
                    latitude,
                    longitude,
                  }}
                  mapWidth='100%'
                  mapHeight='100%'
                  withMapLabels={withMapLabels}
                />
                <span
                  className={[
                    "w-3 h-3",
                    "rounded-full bg-blue absolute inline-block",
                    "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
                  ].join(" ")}
                />
              </div>
            )}
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt={`Location of sensor "${name}"`}
              className='w-full h-full object-cover'
            />
          )}
          <div
            className={[
              "absolute right-0 bottom-0 left-0 h-1/2 pointer-events-none",
              "bg-gradient-to-t from-white z-30",
            ].join(" ")}
          />
          <div className='absolute inset-0 overflow-hidden z-40'>
            <svg
              viewBox={`0 0 100 82`}
              preserveAspectRatio='none'
              xmlns='http://www.w3.org/2000/svg'
              width='104%'
              height={82}
              className={[
                "overflow-visible absolute -bottom-1 -right-1 -left-1",
                "text-purple group-hover:animate-textpulse",
              ].join(" ")}
            >
              <AreaPath
                width={100}
                height={82}
                //FIXME: Figure out how we want to handle multiple data points
                data={parsedRecords.slice(DISPLAYABLE_RECORDS_AMOUNT * -1)}
              />
            </svg>
          </div>
        </div>
        <div
          className={[
            "lg:w-2/3 transition group-hover:animate-textpulse",
            "px-4 pb-3 pt-36 lg:px-5 lg:py-4",
            "relative z-10",
          ].join(" ")}
        >
          <div className='grid grid-cols-[24px,1fr] gap-3'>
            <SensorSymbol symbol={symbolId} className='mt-[1px]' />
            <h3
              className={[
                "text-xl leading-6 pt-1",
                "lg:leading-7 lg:text-2xl lg:pt-0",
                "font-headline font-bold inline",
              ].join(" ")}
            >
              {name}
            </h3>
          </div>
          <div className='pl-9 pt-2'>
            <p className='text-base mb-4 flex gap-x-1'>
              <CategoryIcon categoryId={categoryId} className='mt-1' />
              {categoryName}
            </p>
            {description && (
              <ReactAutolinker
                className='text-base break-words'
                tagName='p'
                renderLink={({ attrs, innerHtml: text }) => {
                  const url = new URL(attrs.href);
                  const isTwitter = url.host === "twitter.com";
                  if (isTwitter) return text;
                  return (
                    <span
                      key={attrs.key}
                      className='underline underline-gray'
                    >{`${url.host}`}</span>
                  );
                }}
                text={
                  description.length > DESCRIPTION_MAX_LENGTH
                    ? `${description.slice(0, DESCRIPTION_MAX_LENGTH)}...`
                    : description
                }
              />
            )}
            <p className='mt-4 mb-2 flex gap-2 flex-wrap'>
              {authorName && (
                <span
                  className='inline-block truncate'
                  style={{ maxWidth: "calc(100vw - 64px)" }}
                >
                  <UserAvatar
                    username={authorName}
                    size={20}
                    className='mr-1.5'
                  />
                  {authorName}
                </span>
              )}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};
