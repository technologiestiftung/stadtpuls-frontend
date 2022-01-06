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

const width = 140;
const height = 76;

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
  data.length <= 1 ? defaultArr : data;

export const ChartThumbnail: FC<ChartThumbnailPropType> = ({ data }) => {
  const normalizedData = normalizeData(data);
  const xScale = scaleUtc<number>({
    domain: extent(normalizedData, getX) as [Date, Date],
    range: [0, width],
  });

  const minVal = min(normalizedData, getY) || 0;
  const maxVal = max(normalizedData, getY) || 0;
  const yScale = scaleLinear<number>({
    domain: [minVal > 0 ? 0 : minVal, maxVal < 0 ? 0 : maxVal],
    range: [height - 20, 16],
  });
  const lastItem = data[data.length - 1];

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
      <span className='absolute top-0 right-2 text-xs text-purple font-mono font-semibold'>
        {data.length ? numberFormatter.format(lastItem.value) : ""}
      </span>
      {data.length > 1 && (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio='none'
          xmlns='http://www.w3.org/2000/svg'
          className={[
            "block w-full h-[76px]",
            "text-purple group-hover:animate-textpulse",
          ].join(" ")}
        >
          <line
            x1={width}
            y1={yScale(getY(lastItem))}
            x2={width}
            y2={2}
            stroke={colors.gray[200]}
            strokeWidth={2}
            vectorEffect='non-scaling-stroke'
            shapeRendering='geometricPrecision'
            strokeLinecap='round'
          />
          <LinePath<DateValueType>
            curve={curveLinear}
            data={normalizedData}
            x={d => xScale(getX(d))}
            y={d => yScale(getY(d))}
            strokeWidth={2}
            stroke='currentColor'
            shapeRendering='geometricPrecision'
            vectorEffect='non-scaling-stroke'
            strokeLinecap='round'
          />
        </svg>
      )}
    </div>
  );
};
