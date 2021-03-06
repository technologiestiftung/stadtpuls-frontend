import { FC, ReactNode } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { CircularProgressbarProps } from "react-circular-progressbar/dist/types";
import colors from "../../style/colors";

export interface CircularProgressBarPropType
  extends Partial<CircularProgressbarProps> {
  percentage?: number;
  children?: ReactNode;
}

export const CircularProgressBar: FC<CircularProgressBarPropType> = ({
  percentage = 0,
  children = "",
  ...rest
}) => (
  <CircularProgressbarWithChildren
    {...rest}
    value={percentage}
    strokeWidth={6}
    styles={buildStyles({
      rotation: 0,
      strokeLinecap: "round",
      pathTransition:
        percentage === 0
          ? "none"
          : "stroke-dashoffset 0.5s cubic-bezier(.13,.67,.17,.99) 0s",
      pathColor: colors.purple,
      textColor: colors.blue,
      trailColor: colors.gray[50],
      backgroundColor: colors.white,
    })}
  >
    {children}
  </CircularProgressbarWithChildren>
);
