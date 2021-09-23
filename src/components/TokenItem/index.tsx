import { Button } from "@components/Button";
import classNames from "classnames";
import { FC } from "react";
import KeyIcon from "../../../public/images/icons/16px/key.svg";

export interface TokenItemType {
  name: string;
  onRegenerate: () => void;
  onDelete: () => void;
  isFirstItem?: boolean;
  additionalClassNames?: string;
}

export const TokenItem: FC<TokenItemType> = ({
  name,
  onRegenerate,
  onDelete,
  isFirstItem,
  additionalClassNames,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-wrap place-content-between items-center",
        "py-6",
        "border-gray-100 border-b",
        isFirstItem ? "border-t" : null,
        additionalClassNames
      )}
    >
      <div className={classNames("flex py-2", "text-gray-800")}>
        <KeyIcon className='flex-shrink-0 self-center' aria-hidden />
        <p className='ml-3'>{name}</p>
      </div>
      <div className='py-2 ml-7'>
        <Button
          onClick={onRegenerate}
          className='mr-3 my-1'
          aria-label={`${name} neu generieren`}
        >
          Neu generieren
        </Button>
        <Button
          variant='dangerous'
          className='my-1'
          onClick={onDelete}
          aria-label={`${name} löschen`}
        >
          Löschen
        </Button>
      </div>
    </div>
  );
};