import { FC } from "react";
import Link from "next/link";
import { LinePath } from "@components/LinePath";
import { UserAvatar } from "@components/UserAvatar";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { SensorSymbol } from "@components/SensorSymbol";
import { CategoryIcon } from "@components/CategoryIcon";
import ReactAutolinker from "react-autolinker";
import moment from "moment";

const DISPLAYABLE_RECORDS_AMOUNT = 20;
export const DESCRIPTION_MAX_LENGTH = 100;

const numberFormatter = new Intl.NumberFormat("de-DE", {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  notation: "compact",
  compactDisplay: "short",
});

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
          "grid focus-offset gap-2 md:gap-8 p-4 md:py-2",
          "grid-cols-1",
          "md:grid-cols-[2fr,1fr,1fr,140px]",
          "xl:grid-cols-[2fr,1fr,1fr,2fr,140px]",
          "bg-white justify-between",
          "group border border-white border-b-gray-100",
          "hover:animate-borderpulse hover:z-10",
          "cursor-pointer transition-all",
          "relative group items-center",
        ].join(" ")}
      >
        <div className='grid grid-cols-[24px,1fr] gap-3 items-center'>
          <SensorSymbol symbol={symbolId} />
          <h3
            className={[
              "text-xl leading-6 pt-1 md:whitespace-nowrap",
              "md:leading-7 md:text-2xl md:pt-0",
              "font-headline font-bold block md:truncate",
            ].join(" ")}
          >
            {name}
          </h3>
        </div>
        <p className='grid grid-cols-[20px,1fr] gap-3 items-center'>
          {authorName && (
            <UserAvatar username={authorName} size={20} className='mr-1.5' />
          )}
          <span className='inline-block truncate whitespace-nowrap'>
            {authorName}
          </span>
        </p>
        <p className='text-base flex gap-x-1'>
          <CategoryIcon categoryId={categoryId} className='mt-1' />
          {categoryName}
        </p>
        {description ? (
          <ReactAutolinker
            className='text-base break-words hidden xl:block'
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
        ) : (
          <div className='hidden xl:block' />
        )}
        <div
          className={[
            "w-full xl:w-[140px] h-[72px] pt-[12px] pb-[20px]",
            "relative flex-shrink-0 flex-grow-0 justify-self-end",
          ].join(" ")}
        >
          <span className='absolute bottom-0 left-0 text-xs text-gray-300'>
            {parsedRecords.length
              ? `Zul. ${moment(
                  parsedRecords[parsedRecords.length - 1].date
                ).fromNow()}`
              : "Keine Daten"}
          </span>
          <span className='absolute top-0 right-0 text-xs text-purple font-mono font-semibold'>
            {parsedRecords.length
              ? numberFormatter.format(
                  parsedRecords[parsedRecords.length - 1].value
                )
              : "–"}
          </span>
          <svg
            viewBox={`0 0 140 40`}
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'
            className={[
              "block w-full md:w-[140px] h-[40px]",
              "text-purple group-hover:animate-textpulse",
            ].join(" ")}
          >
            <LinePath
              width={140}
              height={40}
              //FIXME: Figure out how we want to handle multiple data points
              data={parsedRecords.slice(DISPLAYABLE_RECORDS_AMOUNT * -1)}
            />
          </svg>
        </div>
      </a>
    </Link>
  </li>
);
