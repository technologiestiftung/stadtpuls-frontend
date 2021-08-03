import classNames from "classnames";
import { FC, ReactNode, useEffect, useState } from "react";
import styles from "./QuestionMarkTooltip.module.css";
import { useWindowSize } from "@lib/hooks/useWindowSize";

export interface QuestionMarkTooltipType {
  id: string;
  title: string;
  content: ReactNode;
}

const TOOLTIP_WIDTH = 224;
const QUESTION_MARK_WIDTH = 16;

export const QuestionMarkTooltip: FC<QuestionMarkTooltipType> = ({
  id,
  title,
  content,
}) => {
  const { width: windowWidth } = useWindowSize();
  const [questionMarkXCoord, setQuestionMarkXCoord] = useState<
    number | undefined
  >(undefined);
  const [tooltipMightOverflowScreen, setTooltipMightOverflowScreen] = useState(
    false
  );

  const tooltipPositionClass = {
    start: "-left-2",
    end: "-right-2",
    // Hard-coded because Tailwind would otherwise purge the actual calculation:
    // `left-[-${TOOLTIP_WIDTH / 2 - QUESTION_MARK_WIDTH / 2}px]`
    // Could be safelisted in purge options, but better to keep this arbitrary value closeby.
    center: `left-[-104px]`,
  };

  const trianglePositionClass = {
    start: "left-2",
    end: "right-2",
    center: "left-1/2 transform -translate-x-2",
  };

  useEffect(() => {
    const questionMarkPosition = document
      .querySelector(`#${id}-tooltip`)
      ?.getBoundingClientRect();

    if (!windowWidth || !questionMarkPosition) return;

    setQuestionMarkXCoord(questionMarkPosition.left);

    if (questionMarkPosition.left + TOOLTIP_WIDTH > windowWidth) {
      setTooltipMightOverflowScreen(true);
    } else {
      setTooltipMightOverflowScreen(false);
    }
  }, [windowWidth, id]);

  return (
    <p className='inline-block transform -translate-y-0.5'>
      <button
        id={`${id}-tooltip`}
        aria-describedby={`${id}-tooltip`}
        style={{
          width: `${QUESTION_MARK_WIDTH}px`,
          height: `${QUESTION_MARK_WIDTH}px`,
        }}
        className={classNames(
          "rounded-full",
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
          `${
            tooltipMightOverflowScreen
              ? questionMarkXCoord && questionMarkXCoord < TOOLTIP_WIDTH
                ? tooltipPositionClass.center
                : tooltipPositionClass.end
              : tooltipPositionClass.start
          }`,
          "absolute top-9",
          "h-auto p-4",
          "bg-gray-900 text-white",
          "text-xs whitespace-normal"
        )}
        style={{
          width: `${TOOLTIP_WIDTH}px`,
        }}
      >
        <span
          aria-hidden
          className={classNames(
            "absolute w-0 h-0 -top-2",
            `${
              tooltipMightOverflowScreen
                ? questionMarkXCoord && questionMarkXCoord < TOOLTIP_WIDTH
                  ? trianglePositionClass.center
                  : trianglePositionClass.end
                : trianglePositionClass.start
            }`
          )}
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
