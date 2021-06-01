import React, { FC } from "react";
import { extent, max } from "d3-array";
import { curveLinear } from "@visx/curve";
import { AreaClosed } from "@visx/shape";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { DateValueType, LineGraphType } from "../../common/interfaces";
import theme from "../../style/theme";

const getX = (d: DateValueType): Date => d.date;
const getY = (d: DateValueType): number => d.value;

const startDate = new Date();
const defaultArr = [
  {
    date: startDate,
    value: 0,
  },
  {
    date: new Date(startDate.getDate() + 1),
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
    <>
      <defs>
        <linearGradient id='area-gradient' x1='0' x2='0' y1='0' y2='1'>
          <stop
            stopColor={theme.colors.primary}
            stopOpacity='30%'
            offset='0%'
          />
          <stop
            stopColor={theme.colors.primary}
            stopOpacity='5%'
            offset='100%'
          />
        </linearGradient>
      </defs>
      <AreaClosed<DateValueType>
        curve={curveLinear}
        data={normalizedData}
        x={d => xScale(getX(d))}
        y={d => yScale(getY(d))}
        yScale={yScale}
        strokeWidth={2}
        stroke={theme.colors.primary}
        fill='url(#area-gradient)'
        shapeRendering='geometricPrecision'
      />
    </>
  );
};
