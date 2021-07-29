import classNames from "classnames";
import { FC, ReactNode } from "react";
import {
  Tooltip,
  TooltipReference,
  useTooltipState,
  TooltipArrow,
} from "reakit/Tooltip";
import { Button } from "reakit/Button";

export interface QuestionMarkTooltipType {
  content: ReactNode;
}

export const QuestionMarkTooltip: FC<QuestionMarkTooltipType> = ({
  content,
}) => {
  const tooltip = useTooltipState({ placement: "top" });
  return (
    <>
      <TooltipReference {...tooltip} as={Button}>
        {" "}
        <div
          className={classNames([
            "w-4 h-4 p-0",
            "bg-gray-50 text-gray-500",
            "border border-gray-500",
            "rounded-full",
            "text-[10px]",
            "flex items-center justify-center",
            "transform -translate-y-0.5",
          ])}
        >
          ?
        </div>{" "}
      </TooltipReference>
      <Tooltip {...tooltip}>
        <div
          className={classNames([
            "max-w-sm py-3 px-4",
            "text-xs",
            "bg-gray-900 text-white",
          ])}
        >
          <TooltipArrow {...tooltip} />
          {content}
        </div>
      </Tooltip>
    </>
  );
};
