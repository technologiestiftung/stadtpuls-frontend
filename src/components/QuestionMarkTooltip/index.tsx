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
        <span className='sr-only'>{title}</span>
      </button>
      <span
        role='tooltip'
        id={`${id}-tooltip`}
        className={classNames(
          `${styles.tooltipToggle}`,
          "absolute top-7 left-2",
          "max-w-[224px] w-max h-auto p-4",
          "bg-gray-900 text-white",
          "text-xs whitespace-normal"
        )}
      >
        {content}
      </span>
    </p>
  );
};
