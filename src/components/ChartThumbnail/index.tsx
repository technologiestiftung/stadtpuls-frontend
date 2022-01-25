import React, { FC } from "react";
import { extent, max, min } from "d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { DateValueType } from "../../common/interfaces";
import colors from "../../style/colors";
import moment from "moment";

interface ChartThumbnailPropType {
  data: Array<DateValueType>;
}

const CHART_WIDTH = 140;
const CHART_HEIGHT = 76;
const MARGIN_SIZE = 24;
const STROKE_WIDTH = 2;

const getX = (d: DateValueType): Date => new Date(d.date);
const getY = (d: DateValueType): number => d.value;

const numberFormatter = new Intl.NumberFormat("de-DE");

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
  data.length <= 1
    ? defaultArr
    : data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

export const ChartThumbnail: FC<ChartThumbnailPropType> = ({ data }) => {
  const normalizedData = normalizeData(data);
  const xScale = scaleUtc<number>({
    domain: extent(normalizedData, getX) as [Date, Date],
    range: [0, CHART_WIDTH],
  });

  const minVal = min(normalizedData, getY) || 0;
  const maxVal = max(normalizedData, getY) || 0;
  const yScale = scaleLinear<number>({
    domain: [minVal > 0 ? 0 : minVal, maxVal < 0 ? 0 : maxVal],
    range: [CHART_HEIGHT - MARGIN_SIZE, MARGIN_SIZE],
  });
  const lastItem = normalizedData[normalizedData.length - 1];

  return (
    <div
      className={[
        "w-full h-[76px]",
        "relative flex-shrink-0 flex-grow-0 justify-self-end",
      ].join(" ")}
    >
      <span className='absolute bottom-0 left-0 text-xs text-gray-300'>
        {data.length
          ? `Zul. ${moment(lastItem.date).fromNow()}`
          : "Keine Daten"}
      </span>
      {data.length > 1 && (
        <>
          <span
            className={[
              "absolute top-0 right-0 bg-white",
              "text-xs text-purple font-mono font-semibold",
              "px-0.5 py-[1px] border border-gray-200 leading-3",
            ].join(" ")}
          >
            {numberFormatter.format(lastItem.value)}
          </span>
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'
            className={[
              "block w-full",
              "text-purple group-hover:animate-textpulse",
            ].join(" ")}
            height={CHART_HEIGHT}
          >
            <line
              x1={CHART_WIDTH}
              y1={yScale(getY(lastItem))}
              x2={CHART_WIDTH}
              y2={STROKE_WIDTH}
              stroke={colors.gray[200]}
              strokeWidth={STROKE_WIDTH}
              vectorEffect='non-scaling-stroke'
              shapeRendering='geometricPrecision'
              strokeLinecap='round'
            />
            <LinePath<DateValueType>
              curve={curveLinear}
              data={normalizedData}
              x={d => xScale(getX(d))}
              y={d => yScale(getY(d))}
              strokeWidth={STROKE_WIDTH}
              stroke='currentColor'
              shapeRendering='geometricPrecision'
              vectorEffect='non-scaling-stroke'
              strokeLinecap='round'
            />
          </svg>
        </>
      )}
    </div>
  );
};
