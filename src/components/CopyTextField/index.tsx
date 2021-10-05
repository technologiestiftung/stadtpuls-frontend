import { useCopyToClipboard } from "@lib/hooks/useCopyToClipboard";
import classNames from "classnames";
import { FC } from "react";
import CheckMarkIcon from "../../../public/images/icons/16px/checkmark.svg";

export interface CopyTextFieldPropType {
  name: string;
  label: string;
  children: string;
}

export const CopyTextField: FC<CopyTextFieldPropType> = ({
  name,
  label,
  children,
}) => {
  const { hasCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <div className='flex-col'>
      <label htmlFor={name} className='text-sm text-gray-500 mb-1 block'>
        {label}
      </label>
      <input
        name={name}
        id={name}
        type='text'
        readOnly
        value={children}
        className='text-sm'
        onClick={() => {
          copyToClipboard(children);
        }}
      />
      <div
        aria-hidden={!hasCopied}
        aria-label='In Zwischenablage kopiert!'
        hidden={!hasCopied}
        className={classNames(
          "flex items-center justify-end",
          hasCopied ? "opacity-100" : "opacity-0"
        )}
      >
        <div className='text-green'>
          <CheckMarkIcon />
        </div>
        <span className='ml-1 text-xs text-gray-600'>
          In Zwischenablage kopiert!
        </span>
      </div>
    </div>
  );
};
