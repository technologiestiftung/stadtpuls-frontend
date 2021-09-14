import { TextLink } from "@components/TextLink";
import { UserAvatar } from "@components/UserAvatar";
import { useWindowSize } from "@lib/hooks/useWindowSize";
import { FC } from "react";
import Link from "next/link";
import { normalizeURL } from "@lib/urlUtil";
import { Button } from "@components/Button";

export interface UserInfoHeaderPropType {
  displayName: string;
  description?: string;
  username: string;
  link?: string;
  sensorsCount: number;
  recordsCount: number;
  withEditButton?: boolean;
  onEditButtonClick?: () => void | undefined;
}

const numberFormatter = new Intl.NumberFormat("de-DE", {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  notation: "compact",
  compactDisplay: "short",
});

export const UserInfoHeader: FC<UserInfoHeaderPropType> = ({
  displayName,
  description,
  link,
  username,
  sensorsCount,
  recordsCount,
  withEditButton = false,
  onEditButtonClick,
}) => {
  const { width: windowWidth } = useWindowSize();
  const cleanURL = link ? normalizeURL(link) : undefined;
  return (
    <header className='py-16 sm:py-20 md:py-28 '>
      <div
        className={[
          "flex flex-wrap md:flex-nowrap",
          "gap-4 sm:gap-6 md:gap-8",
          "relative pl-16 sm:pl-24 md:pl-28",
        ].join(" ")}
      >
        <div className='absolute top-0 left-0'>
          <span className='inline-block shadow rounded-full'>
            <UserAvatar
              username={username}
              size={windowWidth && windowWidth > 640 ? 80 : 48}
            />
          </span>
        </div>
        <div className='flex-grow flex flex-wrap gap-x-6 gap-y-0'>
          <h1
            className={[
              "text-xl sm:text-2xl lg:text-3xl font-bold",
              "font-headline leading-tight w-full",
              "order-1 pt-1 sm:pt-0",
            ].join(" ")}
          >
            {displayName}
          </h1>
          {description && (
            <div className='w-full mt-3 order-3 sm:order-2'>
              <p className='max-w-prose text-sm sm:text-base'>{description}</p>
            </div>
          )}
          <Link href={`/accounts/${username}`}>
            <a
              href={`/accounts/${username}`}
              className={[
                "text-purple hover:text-blue transition-colors",
                "inline-block order-2 sm:order-3",
                "mt-0 sm:mt-3",
              ].join(" ")}
            >
              @{username}
            </a>
          </Link>
          {cleanURL && (
            <TextLink
              href={`https://${cleanURL}`}
              target='_blank'
              rel='noopener noreferrer'
              className='break-all inline-block order-4 sm:order-5 mt-3'
            >
              {cleanURL}
            </TextLink>
          )}
        </div>
        <div className='flex gap-8 justify-self-end items-center'>
          <div className='flex flex-col'>
            <span
              className={[
                "text-lg sm:text-xl lg:text-2xl pt-1",
                "font-mono lg:font-light text-gray-700",
              ].join(" ")}
            >
              {numberFormatter.format(sensorsCount)}
            </span>
            <span>Sensoren</span>
          </div>
          <div className='flex flex-col'>
            <span
              className={[
                "text-lg sm:text-xl lg:text-2xl pt-1",
                "font-mono lg:font-light text-gray-700",
              ].join(" ")}
            >
              {numberFormatter.format(recordsCount)}
            </span>
            <span>Messwerte</span>
          </div>
        </div>
      </div>
      {withEditButton && onEditButtonClick && (
        <div className='pl-16 sm:pl-24 md:pl-28'>
          <div className='w-full order-last mt-4'>
            <Button onClick={onEditButtonClick}>Sensor editieren</Button>
          </div>
        </div>
      )}
    </header>
  );
};
