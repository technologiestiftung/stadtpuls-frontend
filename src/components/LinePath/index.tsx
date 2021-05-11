/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from "react";
import { jsx } from "theme-ui";
import { extent, max } from "d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath as Path } from "@visx/shape";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { DateValueType, LineGraphType } from "../../common/interfaces";

const getX = (d: DateValueType): Date => d.date;
const getY = (d: DateValueType): number => d.value;

export const LinePath: FC<LineGraphType> = ({ width, height, data }) => {
  const xScale = scaleUtc<number>({
    domain: extent(data, getX) as [Date, Date],
    range: [0, width],
  });

  const yScale = scaleLinear<number>({
    domain: [0, max(data, getY) as number],
    range: [height, 0],
  });

  return (
    <Path<DateValueType>
      curve={curveLinear}
      data={data}
      x={d => xScale(getX(d))}
      y={d => yScale(getY(d))}
      sx={{
        stroke: "primary",
        strokeWidth: 2,
        strokeOpacity: 1,
        shapeRendering: "geometricPrecision",
      }}
    />
  );
};
