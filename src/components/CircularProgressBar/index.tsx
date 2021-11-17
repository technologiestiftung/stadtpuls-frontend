import { FC } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { CircularProgressbarProps } from "react-circular-progressbar/dist/types";
import { ReactNode } from "react-transition-group/node_modules/@types/react";
import colors from "../../style/colors";

export interface CircularProgressBarPropType
  extends Partial<CircularProgressbarProps> {
  percentage?: number;
  children?: ReactNode;
}

export const CircularProgressBar: FC<CircularProgressBarPropType> = ({
  percentage = 66,
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
      pathTransitionDuration: 0.3,
      pathColor: colors.purple,
      textColor: colors.blue,
      trailColor: colors.gray[50],
      backgroundColor: colors.white,
    })}
  >
    {children}
  </CircularProgressbarWithChildren>
);
