import { FC, ReactNode, useState } from "react";

export interface AlertPropType {
  title?: string;
  type?: "info" | "error" | "success" | "warning";
  message: ReactNode;
  isRemovable?: boolean;
}

const getStylesByType = (type: AlertPropType["type"]): string =>
  [
    "border px-5 py-3 bg-opacity-5",
    "flex gap-x-5 pr-8 relative flex-wrap",
    type === "info" && "border-blue bg-gray-300",
    type === "error" && "border-error bg-error",
    type === "success" && "border-green bg-green",
    type === "warning" && "border-warning bg-warning",
  ]
    .filter(Boolean)
    .join(" ");

export const Alert: FC<AlertPropType> = ({
  title,
  type = "info",
  message,
  isRemovable = true,
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const styles = getStylesByType(type);
  if (isClosed) return null;
  return (
    <div className={styles} role='alert'>
      {title && <h4 className='font-bold'>{title}</h4>}
      <p>{message}</p>
      {isRemovable && (
        <button
          className={[
            "text-blue absolute top-2 right-3 transform",
            "hover:text-purple transition hover:rotate-180 p-2 rounded-full focus-offset",
          ].join(" ")}
          onClick={() => setIsClosed(true)}
          aria-label='Schließen'
        >
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M.387.21a1 1 0 0 1 1.226 0l.094.083L8 6.585 14.293.293l.094-.083a1 1 0 0 1 1.403 1.403l-.083.094L9.415 8l6.292 6.293a1 1 0 0 1-1.32 1.497l-.094-.083L8 9.415l-6.293 6.292a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094L6.585 8 .293 1.707.21 1.613a1 1 0 0 1 0-1.226L.293.293.387.21Z'
              fill='currentColor'
              fillRule='nonzero'
            />
          </svg>
        </button>
      )}
    </div>
  );
};
