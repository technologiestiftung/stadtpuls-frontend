import { FC } from "react";
import { extent, max, min } from "d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath as Path } from "@visx/shape";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { DateValueType, LineGraphType } from "../../common/interfaces";
import colors from "../../style/colors";

const getX = (d: DateValueType): Date => new Date(d.date);
const getY = (d: DateValueType): number => d.value;

export const LinePath: FC<LineGraphType> = ({
  width,
  height,
  data,
  startDateTimeString,
  endDateTimeString,
}) => {
  const xScale = scaleUtc<number>({
    domain:
      startDateTimeString && endDateTimeString
        ? [new Date(startDateTimeString), new Date(endDateTimeString)]
        : (extent(data, getX) as [Date, Date]),
    range: [0, width],
  });

  const yScale = scaleLinear<number>({
    domain: [min(data, getY) || 0, (max(data, getY) || 0) * 1.2],
    range: [height, 0],
  });

  return (
    <Path<DateValueType>
      curve={curveLinear}
      data={data}
      x={d => xScale(getX(d))}
      y={d => yScale(getY(d))}
      stroke={colors.purple}
      strokeWidth={2}
      strokeOpacity={1}
      shapeRendering='geometricPrecision'
    />
  );
};
