import { FC } from "react";
import { extent, max, min } from "d3-array";
import { curveLinear } from "@visx/curve";
import { AreaClosed } from "@visx/shape";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { DateValueType, LineGraphType } from "@common/interfaces";

const getX = (d: { date: Date }): Date => d.date;
const getY = (d: { value: number }): number => d.value;

const startDate = new Date();
const endDate = new Date(startDate.getDate() + 1);
const defaultArr = [
  {
    id: 1,
    date: startDate,
    value: 0,
  },
  {
    id: 2,
    date: endDate,
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

  const minVal = min(normalizedData, getY) || 0;
  const maxVal = max(normalizedData, getY) || 0;
  const yScale = scaleLinear<number>({
    domain: [minVal > 0 ? 0 : minVal, maxVal < 0 ? 0 : maxVal],
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
      stroke='currentColor'
      fill='currentColor'
      fillOpacity='10%'
      shapeRendering='geometricPrecision'
      vectorEffect='non-scaling-stroke'
      strokeLinecap='round'
    />
  );
};
