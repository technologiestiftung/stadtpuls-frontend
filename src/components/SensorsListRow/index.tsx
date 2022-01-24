import { FC, useRef, useEffect } from "react";
import Link from "next/link";
import { ChartThumbnail } from "@components/ChartThumbnail";
import { UserAvatar } from "@components/UserAvatar";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { SensorSymbol } from "@components/SensorSymbol";
import { CategoryIcon } from "@components/CategoryIcon";
import ReactAutolinker from "react-autolinker";

const DISPLAYABLE_RECORDS_AMOUNT = 20;
export const DESCRIPTION_MAX_LENGTH = 70;

export interface SensorsListRowPropType extends ParsedSensorType {
  isHighlighted?: boolean;
  onMouseEnter?: (id: number) => void;
  onMouseLeave?: (id: number) => void;
  onHighlighted?: (id: number, el: HTMLLIElement) => void;
}

export const SensorsListRow: FC<SensorsListRowPropType> = ({
  id,
  name,
  symbolId,
  description,
  parsedRecords,
  authorName,
  authorUsername,
  categoryId,
  categoryName,
  isHighlighted = false,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined,
  onHighlighted = () => undefined,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!isHighlighted || !ref.current) return;
    onHighlighted(id, ref.current);
  }, [id, isHighlighted, onHighlighted]);
  return (
    <li
      className='list-none'
      ref={ref}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={() => onMouseLeave(id)}
    >
      <Link href={`/${authorUsername}/sensors/${id}`}>
        <a
          href={`/${authorUsername}/sensors/${id}`}
          title={`${name} - ${categoryName} Sensor von ${authorName}`}
          aria-current={isHighlighted ? "page" : undefined}
          className={[
            "flex flex-wrap xl:grid gap-2 xl:gap-8 p-4 xl:py-2",
            "grid-cols-1 focus-offset",
            "xl:grid-cols-[5fr,2fr,2fr,120px]",
            "2xl:grid-cols-[5fr,2fr,2fr,140px]",
            "md:justify-between z-10 relative",
            "group border",
            "hover:border-purple hover:bg-white hover:z-20 hover:shadow-purple",
            "cursor-pointer focus:z-20",
            "relative group md:items-center",
            isHighlighted
              ? "border-green bg-green bg-opacity-10 z-20"
              : "bg-white border-white border-b-gray-100",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className='grid grid-cols-[24px,minmax(0,1fr)] w-full gap-3 items-center'>
            <SensorSymbol symbol={symbolId} />
            <h3
              className={[
                "text-xl leading-6 pt-1 xl:whitespace-nowrap",
                "xl:leading-7 xl:pt-0 break-words",
                "font-headline font-bold block xl:truncate",
              ].join(" ")}
            >
              {name}
            </h3>
          </div>
          <p className='inline-grid xl:grid grid-cols-[16px,1fr] gap-2 items-center'>
            {authorName && <UserAvatar username={authorName} size={16} />}
            <span className='inline-block truncate whitespace-nowrap text-sm text-gray-600 leading-4 mt-0.5'>
              {authorName}
            </span>
          </p>
          <p className='inline-grid xl:grid grid-cols-[16px,1fr] gap-2 items-center'>
            <CategoryIcon categoryId={categoryId} className='text-gray-500' />
            <span className='inline-block truncate whitespace-nowrap text-sm text-gray-600 leading-4 mt-0.5'>
              {categoryName}
            </span>
          </p>
          {description && (
            <ReactAutolinker
              className='text-sm break-words text-gray-600 xl:hidden flex-grow-0 max-w-full'
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
          )}
          <div
            className={[
              "w-full xl:w-[140px] h-[72px]",
              "relative flex-shrink-0 flex-grow-0 max-w-full justify-self-end",
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
};
