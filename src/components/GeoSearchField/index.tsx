import { FormTextInput } from "@components/FormTextInput";
import useClickOutside from "@lib/hooks/useClickOutside";
import {
  SearchResultType,
  useGeocodedPlace,
} from "@lib/hooks/useGeocodedPlace";
import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import GeoPinIcon from "../../../public/images/icons/16px/geopin.svg";

interface GeoSearchFieldPropType {
  onPlaceClick: (item: SearchResultType) => void;
}

interface SearchResultItemPropType extends SearchResultType {
  searchTerm: string;
  onClick: () => void;
  active?: boolean;
}

const SearchResultItem: FC<SearchResultItemPropType> = ({
  name,
  searchTerm,
  onClick,
  active = false,
}) => {
  const indexOfTerm = name.toLowerCase().indexOf(searchTerm.toLowerCase());
  const before = name.slice(0, indexOfTerm);
  const after = name.slice(indexOfTerm + searchTerm.length, name.length);
  return (
    <button
      onClick={onClick}
      className={[
        "grid grid-cols-[16px,1fr]",
        "items-center text-left w-full gap-2",
        "transition px-4 py-3",
        active
          ? "bg-purple bg-opacity-10"
          : "hover:bg-purple hover:bg-opacity-10",
        "group focus-offset border-b border-gray-100",
        "relative cursor-pointer",
      ].join(" ")}
    >
      <GeoPinIcon className='text-blue group-hover:text-purple transition-colors' />
      <p className='text-sm text-gray-500 group-hover:text-gray-700 leading-4'>
        {indexOfTerm === -1 ? (
          name
        ) : (
          <>
            {before}
            <span className='text-blue group-hover:text-purple transition-colors font-bold'>
              {searchTerm}
            </span>
            {after}
          </>
        )}
      </p>
    </button>
  );
};

export const GeoSearchField: FC<GeoSearchFieldPropType> = ({
  onPlaceClick,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchInputIsOpened, setSearchInputIsOpened] = useState(false);
  const searchInputRef = useClickOutside<HTMLDivElement>(() =>
    setSearchInputIsOpened(false)
  );
  const { results } = useGeocodedPlace(searchInput);
  const [highlightedResult, setHighlightedResult] = useState<number>(0);

  return (
    <div
      className='absolute top-2 left-2 w-[calc(100%-16px)] max-w-sm z-40'
      ref={searchInputRef}
    >
      <FormTextInput
        type='text'
        name='searchInput'
        placeholder='Nach einen Ort suchen'
        value={searchInput}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setSearchInput(evt.target.value);
          !searchInputIsOpened && setSearchInputIsOpened(true);
        }}
        containerClassName='m-0'
        className='w-full shadow'
        onKeyDown={(evt: KeyboardEvent<HTMLInputElement>) => {
          const highlightedItem = results[highlightedResult] || results[0];
          switch (evt.key) {
            case "ArrowDown":
              setHighlightedResult(
                highlightedResult === results.length - 1
                  ? 0
                  : highlightedResult + 1
              );
              break;
            case "ArrowUp":
              setHighlightedResult(
                highlightedResult === 0
                  ? results.length - 1
                  : highlightedResult - 1
              );
              break;
            case "Enter":
              setSearchInput(highlightedItem.name);
              setHighlightedResult(0);
              onPlaceClick(highlightedItem);
              setSearchInputIsOpened(false);
              break;
            case "Escape":
              setSearchInputIsOpened(false);
              break;
            default:
              break;
          }
        }}
      />
      {searchInputIsOpened && (
        <ul className='bg-white shadow -mt-4 focus-offset'>
          {results.map((item: SearchResultType, idx) => (
            <li key={`${item.id}`}>
              <SearchResultItem
                {...item}
                active={idx === highlightedResult}
                searchTerm={searchInput}
                onClick={() => {
                  onPlaceClick(item);
                  setSearchInputIsOpened(false);
                  setHighlightedResult(0);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
