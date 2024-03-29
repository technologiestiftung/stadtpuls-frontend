import { FC, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SensorsListRow } from "@components/SensorsListRow";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { useRouter } from "next/router";
import { SensorsListRowLoadingSkeleton } from "@components/SensorsListRowLoadingSkeleton";
import { Alert } from "@components/Alert";
import { useWindowSize } from "@lib/hooks/useWindowSize";
import MapIcon from "../../../public/images/icons/16px/map.svg";
import ListIcon from "../../../public/images/icons/16px/list.svg";
import { Switch } from "@headlessui/react";
import useClickOutside from "@lib/hooks/useClickOutside";
import { SensorSymbol } from "@components/SensorSymbol";
import { UserAvatar } from "@components/UserAvatar";
import { CategoryIcon } from "@components/CategoryIcon";
import { useReducedMotion } from "@lib/hooks/useReducedMotion";

const MarkerMap = dynamic(
  async () => {
    const { MarkerMap: MarkerMapComponent } = await import(
      "@components/MarkerMap"
    );
    return MarkerMapComponent;
  },
  {
    ssr: false,
  }
);

interface SensorsMapType {
  sensors?: ParsedSensorType[];
  sensorsAreLoading?: boolean;
  error?: Error;
}

function isInViewport(el: HTMLLIElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollToTargetAdjusted(
  el: HTMLLIElement,
  reducedMotionWished = false
): void {
  if (isInViewport(el)) return;
  const paddingTop = 10;
  const elementPosition = el.getBoundingClientRect().top;
  const footerHeight =
    document.querySelector("#__next > footer")?.getBoundingClientRect()
      .height || 0;
  const headerHeight =
    document.querySelector("#__next > main > header")?.getBoundingClientRect()
      .height || 0;
  const maxScrollDist =
    document.documentElement.scrollHeight -
    window.outerHeight -
    footerHeight +
    headerHeight;
  const offsetPosition =
    elementPosition + window.pageYOffset - headerHeight - paddingTop;

  window.scrollTo({
    top: Math.min(offsetPosition, maxScrollDist),
    behavior: reducedMotionWished ? "auto" : "smooth",
  });
}

const MapListSwitch: FC<{
  showMap: boolean;
  setShowMap: (newVal: boolean) => void;
}> = ({ showMap, setShowMap }) => {
  const reducedMotionWished = useReducedMotion(false);
  return (
    <div
      data-cy='map-list-switch'
      className={[
        "bg-white rounded-full border border-gray-200",
        "fixed w-[calc(100vw-1rem)] left-2 bottom-2 z-30",
        "shadow flex transform justify-center gap-2",
        "transition-transform translate-y-0",
      ].join(" ")}
    >
      <button
        data-cy='map-list-switch-list-link'
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: reducedMotionWished ? "auto" : "smooth",
          });
          setShowMap(false);
        }}
        className={[
          "px-4 py-3 flex gap-2 items-center justify-center",
          !showMap && "font-bold text-blue",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Liste <ListIcon />
      </button>
      <div className='grid items-center justify-center'>
        <Switch
          checked={showMap}
          onChange={setShowMap}
          className={`bg-blue relative inline-flex items-center h-6 rounded-full w-11`}
          data-cy='map-list-switch-button'
        >
          <span
            className={`${
              showMap ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
      <button
        data-cy='map-list-switch-map-link'
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: reducedMotionWished ? "auto" : "smooth",
          });
          setShowMap(true);
        }}
        className={[
          "px-4 py-3 flex gap-2 items-center justify-center",
          showMap && "font-bold text-blue",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Karte <MapIcon />
      </button>
    </div>
  );
};

const MapThumbnailSensor: FC<
  ParsedSensorType & {
    onClose: () => void;
  }
> = ({
  id,
  name,
  symbolId,
  authorUsername,
  authorName,
  categoryId,
  categoryName,
  onClose,
}) => {
  const ref = useClickOutside<HTMLAnchorElement>(onClose);
  return (
    <Link href={`/${authorUsername}/sensors/${id}`}>
      <a
        data-cy='map-thumbnail-sensor'
        ref={ref}
        className={[
          "fixed inset-x-4 bottom-16 z-40 bg-white px-2.5 py-2",
          "border border-gray-200 shadow transform -translate-y-2",
          "flex flex-col gap-1",
        ].join(" ")}
      >
        <div className='grid gap-2 items-center grid-cols-[20px,1fr]'>
          <SensorSymbol symbol={symbolId} size={5} className='flex-grow-0' />
          <h3 className='font-bold font-headline text-lg flex-grow-0 truncate whitespace-nowrap'>
            {name}
          </h3>
        </div>
        <div className='flex gap-2'>
          <span className='inline-grid xl:grid grid-cols-[16px,1fr] gap-2 items-center'>
            {authorName && <UserAvatar username={authorName} size={16} />}
            <span className='inline-block truncate whitespace-nowrap text-sm text-gray-600 leading-4 mt-0.5'>
              {authorName}
            </span>
          </span>
          <span className='inline-grid xl:grid grid-cols-[16px,1fr] gap-2 items-center'>
            <CategoryIcon categoryId={categoryId} className='text-gray-500' />
            <span className='inline-block truncate whitespace-nowrap text-sm text-gray-600 leading-4 mt-0.5'>
              {categoryName}
            </span>
          </span>
        </div>
      </a>
    </Link>
  );
};

export const SensorsMap: FC<SensorsMapType> = ({
  sensors = [],
  sensorsAreLoading = false,
  error,
}) => {
  const router = useRouter();
  const { push } = router || {};
  const reducedMotionWished = useReducedMotion(false);
  const [hoveredSensorIds, setHoveredSensorIds] = useState<number[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [thumbnailItem, setThumbnailItem] = useState<ParsedSensorType | null>(
    null
  );
  const { width: windowWidth } = useWindowSize();
  const isSm = windowWidth && windowWidth < 640;

  const markers = sensors.map(sensor => ({
    ...sensor,
    isActive: true,
    isHighlighted: hoveredSensorIds.includes(sensor.id),
  }));
  return (
    <>
      {isSm && thumbnailItem && (
        <MapThumbnailSensor
          {...thumbnailItem}
          onClose={() => setThumbnailItem(null)}
        />
      )}
      {isSm && <MapListSwitch showMap={showMap} setShowMap={setShowMap} />}
      <section className='sm:grid sm:grid-cols-2 relative'>
        <aside
          className={[
            "p-4 bg-white overflow-y-auto",
            showMap && isSm && "hidden",
            !showMap && isSm && "pt-8 pb-24",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={[
              "sm:mt-1 md:mt-2",
              "mb-4 sm:mb-5 md:mb-6",
              "flex place-content-between",
              "px-2",
            ].join(" ")}
          >
            <h1
              className={[
                "font-bold text-lg sm:text-xl md:text-2xl font-headline",
              ].join(" ")}
            >
              Alle Sensoren
            </h1>
          </div>
          {error?.message && (
            <Alert
              type='error'
              title='Fehler'
              message={
                <>
                  Die Sensoren konnten nicht geladen werden: <br />
                  <code className='px-2 py-1 font-mono bg-error bg-opacity-20'>
                    {error.message}
                  </code>
                </>
              }
              isRemovable={false}
            />
          )}
          {!error && (
            <ul
              data-cy='sensors-list'
              className='flex flex-col w-[calc(100%+16px)] ml-[-8px]'
            >
              {sensorsAreLoading
                ? Array.from(Array(30).keys()).map(i => (
                    <SensorsListRowLoadingSkeleton key={i} />
                  ))
                : markers.map(marker => (
                    <SensorsListRow
                      {...marker}
                      isHighlighted={
                        !!hoveredSensorIds.find(s => s === marker.id)
                      }
                      onMouseEnter={
                        !isSm
                          ? () => setHoveredSensorIds([marker.id])
                          : undefined
                      }
                      onMouseLeave={() => setHoveredSensorIds([])}
                      onHighlighted={(_id, el) =>
                        scrollToTargetAdjusted(el, reducedMotionWished)
                      }
                      key={marker.id}
                    />
                  ))}
            </ul>
          )}
        </aside>
        {!(isSm && !showMap) && (
          <div
            className={[
              `w-full top-[62px]`,
              isSm ? `fixed bottom-0` : `sticky h-[calc(100vh-62px)]`,
            ].join(" ")}
          >
            <MarkerMap
              clickHandler={ids => {
                if (ids.length === 0) return;
                const sensor = sensors.find(s => s.id === ids[0]);
                if (!sensor) return;
                if (isSm) return setThumbnailItem(sensor);
                const path = `${sensor.authorUsername}/sensors/${sensor.id}`;
                void push(path, path, { scroll: false });
              }}
              highlightedMarkerIds={hoveredSensorIds}
              mouseEnterHandler={
                !isSm ? ids => setHoveredSensorIds(ids) : undefined
              }
              mouseLeaveHandler={() => setHoveredSensorIds([])}
              markers={markers}
              markersAreLoading={sensorsAreLoading}
              withControls={isSm ? !thumbnailItem : true}
            />
          </div>
        )}
      </section>
    </>
  );
};
