import { FC } from "react";
import Link from "next/link";
import { ChartThumbnail } from "@components/ChartThumbnail";
import { UserAvatar } from "@components/UserAvatar";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { SensorSymbol } from "@components/SensorSymbol";
import { CategoryIcon } from "@components/CategoryIcon";
import ReactAutolinker from "react-autolinker";

const DISPLAYABLE_RECORDS_AMOUNT = 20;
export const DESCRIPTION_MAX_LENGTH = 70;

export const SensorsListRow: FC<ParsedSensorType> = ({
  id,
  name,
  symbolId,
  description,
  parsedRecords,
  authorName,
  categoryId,
  categoryName,
}) => (
  <li className='list-none'>
    <Link href={`/sensors/${id}`}>
      <a
        href={`/sensors/${id}`}
        title={`${name} - ${categoryName} Sensor von ${authorName}`}
        className={[
          "flex flex-wrap md:grid gap-2 md:gap-8 p-4 md:py-2",
          "grid-cols-1 focus-offset",
          "md:grid-cols-[5fr,2fr,2fr,140px]",
          "xl:grid-cols-[5fr,2fr,2fr,minmax(0,4fr),140px]",
          "bg-white md:justify-between shadow-none",
          "group border border-white border-b-gray-100",
          "hover:border-purple hover:z-10 hover:shadow-purple",
          "cursor-pointer transition",
          "relative group md:items-center",
        ].join(" ")}
      >
        <div className='grid grid-cols-[24px,minmax(0,1fr)] w-full gap-3 items-center'>
          <SensorSymbol symbol={symbolId} />
          <h3
            className={[
              "text-xl leading-6 pt-1 md:whitespace-nowrap",
              "md:leading-7 md:pt-0 break-words",
              "font-headline font-bold block md:truncate",
            ].join(" ")}
          >
            {name}
          </h3>
        </div>
        <p className='inline-grid md:grid grid-cols-[16px,1fr] gap-2 items-center'>
          {authorName && <UserAvatar username={authorName} size={16} />}
          <span className='inline-block truncate whitespace-nowrap text-sm text-gray-600 leading-4 mt-0.5'>
            {authorName}
          </span>
        </p>
        <p className='inline-grid md:grid grid-cols-[16px,1fr] gap-2 items-center'>
          <CategoryIcon categoryId={categoryId} className='text-gray-500' />
          <span className='inline-block truncate whitespace-nowrap text-sm text-gray-600 leading-4 mt-0.5'>
            {categoryName}
          </span>
        </p>
        {description ? (
          <ReactAutolinker
            className='text-sm break-words text-gray-600 md:hidden xl:block flex-grow-0'
            tagName='p'
            renderLink={({ attrs, innerHtml: text }) => {
              const url = new URL(attrs.href);
              const isTwitter = url.host === "twitter.com";
              if (isTwitter) return text;
              return (
                <span
                  key={attrs.key}
                  className='underline underline-gray break-all'
                >{`${url.host}`}</span>
              );
            }}
            text={
              description.length > DESCRIPTION_MAX_LENGTH
                ? `${description.slice(0, DESCRIPTION_MAX_LENGTH)}...`
                : description
            }
          />
        ) : (
          <div className='hidden xl:block' />
        )}
        <div
          className={[
            "w-full xl:w-[140px] h-[72px]",
            "relative flex-shrink-0 flex-grow-0 justify-self-end",
          ].join(" ")}
        >
          <ChartThumbnail
            //FIXME: Figure out how we want to handle multiple data points
            data={parsedRecords.slice(DISPLAYABLE_RECORDS_AMOUNT * -1)}
          />
        </div>
      </a>
    </Link>
  </li>
);
