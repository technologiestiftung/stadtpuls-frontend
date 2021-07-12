import React, { FC } from "react";
import { extent, max } from "d3-array";
import { curveLinear } from "@visx/curve";
import { AreaClosed } from "@visx/shape";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { DateValueType, LineGraphType } from "../../common/interfaces";
import colors from "../../style/colors";

const getX = (d: DateValueType): Date => new Date(d.date);
const getY = (d: DateValueType): number => d.value;

const startDate = new Date();
const defaultArr = [
  {
    date: startDate.toISOString(),
    value: 0,
  },
  {
    date: new Date(startDate.getDate() + 1).toISOString(),
    value: 0,
  },
];

const normalizeData = (data: DateValueType[]): DateValueType[] =>
  data.length <= 1 ? defaultArr : data;

export const AreaPath: FC<LineGraphType> = ({ width, height, data }) => {
  const normalizedData = normalizeData(data);
  const xScale = scaleUtc<number>({
    domain: extent(normalizedData, getX) as [Date, Date],
    range: [0, width],
  });

  const yScale = scaleLinear<number>({
    domain: [0, max(normalizedData, getY) as number],
    range: [height, 0],
  });

  return (
    <AreaClosed<DateValueType>
      curve={curveLinear}
      data={normalizedData}
      x={d => xScale(getX(d))}
      y={d => yScale(getY(d))}
      yScale={yScale}
      strokeWidth={2}
      stroke={colors.blue}
      fill={colors.green}
      fillOpacity='10%'
      shapeRendering='geometricPrecision'
    />
  );
};
