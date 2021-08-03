import classNames from "classnames";
import { FC, ReactNode } from "react";
import styles from "./QuestionMarkTooltip.module.css";

export interface QuestionMarkTooltipType {
  id: string;
  title: string;
  content: ReactNode;
}

export const QuestionMarkTooltip: FC<QuestionMarkTooltipType> = ({
  id,
  title,
  content,
}) => {
  return (
    <p className='inline-block transform -translate-y-0.5'>
      <button
        aria-describedby={`${id}-tooltip`}
        className={classNames(
          "rounded-full",
          "w-4 h-4",
          "text-[10px]",
          "bg-gray-50 text-gray-600",
          "border border-gray-500",
          "focus:outline-none focus:ring"
        )}
      >
        <span aria-hidden>?</span>
        <span className='sr-only'>{title} Erklärung</span>
      </button>
      <span
        role='tooltip'
        id={`${id}-tooltip`}
        className={classNames(
          `${styles.tooltipToggle}`,
          "absolute top-9 -left-2",
          "max-w-[224px] w-max h-auto p-4",
          "bg-gray-900 text-white",
          "text-xs whitespace-normal"
        )}
      >
        <span
          aria-hidden
          className='absolute w-0 h-0 -top-2 left-2'
          style={{
            borderLeft: "solid transparent 8px",
            borderRight: "solid transparent 8px",
            borderBottom: "solid rgb(30, 26, 90) 8px",
          }}
        ></span>
        {content}
      </span>
    </p>
  );
};
