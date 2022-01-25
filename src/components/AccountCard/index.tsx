import { FC } from "react";
import Link from "next/link";
import { UserAvatar } from "@components/UserAvatar";
import { useWindowSize } from "@lib/hooks/useWindowSize";
import { CategoryIcon } from "@components/CategoryIcon";

export interface AccountCardPropType {
  displayName: string;
  description?: string;
  username: string;
  sensorsCount: number;
  recordsCount: number;
  categories?: number[];
}

export const DESCRIPTION_MAX_LENGTH = 100;

const numberFormatter = new Intl.NumberFormat("de-DE", {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  notation: "compact",
  compactDisplay: "short",
});

export const AccountCard: FC<AccountCardPropType> = ({
  displayName,
  description,
  username,
  sensorsCount,
  recordsCount,
  categories = [],
}) => {
  const { width: windowWidth } = useWindowSize();
  const isSm = windowWidth && windowWidth < 640;
  const isMd = windowWidth && windowWidth >= 640 && windowWidth < 768;
  const avatarSize = isSm ? 32 : isMd ? 40 : 48;
  return (
    <Link href={`/${username}/sensors`}>
      <a
        href={`/${username}/sensors`}
        className={[
          "group border border-gray-200 bg-white shadow block",
          "flex gap-x-3 sm:gap-x-4 md:gap-x-5",
          "py-4 sm:py-5 md:py-6",
          "px-4 sm:px-5 md:px-6",
          "transition hover:border-blue hover:animate-borderpulse",
        ].join(" ")}
      >
        <div className='flex-grow-0'>
          <UserAvatar username={username} size={avatarSize} />
        </div>
        <div className='flex-grow group-hover:animate-textpulse'>
          <h4
            className={[
              "leading-tight sm:leading-tight md:leading-tight",
              "font-bold text-lg sm:text-xl md:text-2xl font-headline",
            ].join(" ")}
          >
            {displayName}
          </h4>
          <span className='text-purple group-hover:animate-textpulse'>
            @{username}
          </span>
          <p className='pt-2'>
            {description && description.length > DESCRIPTION_MAX_LENGTH
              ? `${description.slice(0, DESCRIPTION_MAX_LENGTH)}...`
              : description}
          </p>
          <div className='flex gap-4 sm:gap-6 md:gap-8 justify-self-end items-center pt-6'>
            <div className='flex flex-col'>
              <span
                className={[
                  "text-lg sm:text-xl pt-1",
                  "leading-snug sm:leading-snug",
                  "font-mono text-gray-700",
                  "group-hover:animate-textpulse",
                ].join(" ")}
              >
                {numberFormatter.format(sensorsCount)}
              </span>
              <span className='text-sm'>
                Sensor{sensorsCount === 1 ? "" : "en"}
              </span>
            </div>
            <div className='flex flex-col'>
              <span
                className={[
                  "text-lg sm:text-xl pt-1",
                  "leading-snug sm:leading-snug",
                  "font-mono text-gray-700",
                  "group-hover:animate-textpulse",
                ].join(" ")}
              >
                {numberFormatter.format(recordsCount)}
              </span>
              <span className='text-sm'>
                Messwert{recordsCount === 1 ? "" : "e"}
              </span>
            </div>
          </div>
        </div>
        <div className='flex flex-col-reverse flex-grow-0 text-gray-500 group-hover:animate-textpulse'>
          {categories.slice(0, 4).map(id => (
            <span className='mt-3' key={id}>
              <CategoryIcon categoryId={id} />
            </span>
          ))}
          {categories.length > 4 && (
            <span className='text-xs font-bold'>+{categories.length - 4}</span>
          )}
        </div>
      </a>
    </Link>
  );
};
