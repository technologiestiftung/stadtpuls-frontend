import { FC } from "react";
import { extent, max, min } from "d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath as Path } from "@visx/shape";
import { scaleLinear, scaleTime } from "@visx/scale";
import { ArrayElement, LineGraphType } from "../../common/interfaces";
import colors from "../../style/colors";

const getX = (d: { date: Date }): Date => d.date;
const getY = (d: { value: number }): number => d.value;

export const MAX_RENDERABLE_VALUES = 3000;

export const LinePath: FC<LineGraphType> = ({
  width,
  height,
  data,
  startDateTimeString,
  endDateTimeString,
}) => {
  const xScale = scaleTime<number>({
    domain:
      startDateTimeString && endDateTimeString
        ? [new Date(startDateTimeString), new Date(endDateTimeString)]
        : (extent(data, getX) as [Date, Date]),
    range: [0, width],
  });

  const minVal = min(data, getY) || 0;
  const maxVal = (max(data, getY) || 0) * 1.2;
  const yScale = scaleLinear<number>({
    domain: [minVal > 0 ? 0 : minVal, maxVal < 0 ? 0 : maxVal],
    range: [height, 0],
  });

  return (
    <Path<ArrayElement<LineGraphType["data"]>>
      curve={curveLinear}
      data={data}
      x={d => xScale(getX(d))}
      y={d => yScale(getY(d))}
      stroke={colors.purple}
      strokeWidth={2}
      strokeOpacity={1}
      shapeRendering='geometricPrecision'
      vectorEffect='non-scaling-stroke'
    />
  );
};
