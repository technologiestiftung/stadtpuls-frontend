import { useCallback } from "react";
import { bisector, extent, max } from "d3-array";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { DateValueType, LineGraphType } from "@common/interfaces";
import { LinePath } from "../LinePath";

import { TooltipWithBounds, withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { Bar, Line } from "@visx/shape";
import { localPoint } from "@visx/event";
import { GridRows as HorizontalGridLines } from "@visx/grid";
import colors from "../../style/colors";
import moment from "moment";

const getX = (d: DateValueType): Date => {
  return moment.parseZone(d.date).toDate();
};
const getY = (d: DateValueType): number => d.value;
// eslint-disable-next-line @typescript-eslint/unbound-method
const bisectDate = bisector<DateValueType, Date>(d => new Date(d.date)).left;

const tooltipStyles = {
  ...defaultStyles,
  border: "1px solid white",
  backgroundColor: colors.blue,
  color: "white",
};

delete tooltipStyles.boxShadow;

const padding = {
  left: 64,
  right: 32,
  top: 0,
  bottom: 80,
};

export const LineChart = withTooltip<LineGraphType, DateValueType>(
  ({
    data,
    width,
    height,
    yAxisUnit,
    xAxisUnit,
    startDateTimeString,
    endDateTimeString,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: LineGraphType & WithTooltipProvidedProps<DateValueType>) => {
    if (width < 10) return null;

    const graphWidth: number = width - padding.left - padding.right;
    const graphHeight: number = height - padding.top - padding.bottom;

    const xScale = scaleUtc<number>({
      domain:
        startDateTimeString && endDateTimeString
          ? [
              moment.parseZone(startDateTimeString).toDate(),
              moment.parseZone(endDateTimeString).toDate(),
            ]
          : (extent(data, getX) as [Date, Date]),
      range: [0, graphWidth],
    });

    const yScale = scaleLinear<number>({
      domain: [0, (max(data, getY) as number) * 1.2],
      range: [graphHeight, 0],
    });

    const xAxis = {
      scale: xScale,
      values: data.map(el => el.date),
    };

    const yAxis = {
      scale: yScale,
      values: data.map(el => el.value),
    };

    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = xScale.invert(x - padding.left);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getX(d1)) {
          d =
            x0.valueOf() - getX(d0).valueOf() >
            getX(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: xScale(getX(d)) + padding.left,
          tooltipTop: yScale(getY(d)) + padding.top,
        });
      },
      [xScale, data, showTooltip, yScale]
    );

    return (
      <div>
        <svg width={width} height={height} className='overflow-visible'>
          <HorizontalGridLines
            scale={yScale}
            width={graphWidth}
            top={padding.top}
            left={padding.left}
            numTicks={4}
          />
          <AxisBottom
            scale={xAxis.scale}
            top={graphHeight + padding.top + 12}
            left={padding.left}
            label={xAxisUnit}
            labelOffset={24}
            labelClassName='font-bold'
            labelProps={{
              fill: colors.purple,
              fontSize: 10,
              textAnchor: "middle",
            }}
            hideAxisLine={true}
            numTicks={6}
            tickTransform='translate(0 16)'
            tickStroke={colors.gray["200"]}
            tickLabelProps={() => ({
              fill: colors.gray["500"],
              fontSize: 9,
              textAnchor: "middle",
            })}
          />
          <AxisLeft
            scale={yAxis.scale}
            top={padding.top}
            left={padding.left}
            label={yAxisUnit}
            labelOffset={24}
            labelClassName='font-bold'
            labelProps={{
              fill: colors.purple,
              fontSize: 10,
              textAnchor: "middle",
            }}
            hideAxisLine={true}
            hideTicks={true}
            numTicks={4}
            tickLabelProps={() => ({
              fill: colors.gray["500"],
              fontSize: 9,
              textAnchor: "end",
            })}
          />
          <Group left={padding.left} top={padding.top}>
            <LinePath
              width={graphWidth}
              height={graphHeight}
              data={data}
              startDateTimeString={startDateTimeString}
              endDateTimeString={endDateTimeString}
            />
          </Group>
          {tooltipData && (
            <Group top={padding.top}>
              <Line
                className='stroke-current text-gray-400'
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: graphHeight }}
                strokeWidth={1}
                pointerEvents='none'
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                className='stroke-current fill-current text-blue'
                fillOpacity={0.2}
                strokeOpacity={0.2}
                strokeWidth={2}
                pointerEvents='none'
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                className='fill-current text-blue'
                r={4}
                stroke='white'
                strokeWidth={2}
                pointerEvents='none'
              />
            </Group>
          )}
          <Bar
            x={padding.left}
            y={padding.top}
            width={graphWidth}
            height={graphHeight}
            fill='transparent'
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={hideTooltip}
          />
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 40}
              left={tooltipLeft}
              style={tooltipStyles}
              className='bg-blue'
            >
              {`${getY(tooltipData)} ${yAxisUnit ? yAxisUnit : ""}`}
            </TooltipWithBounds>
            <TooltipWithBounds
              top={graphHeight}
              left={tooltipLeft}
              offsetLeft={0}
              offsetTop={5}
              style={{
                position: "absolute",
                fontSize: "10px",
                minWidth: 72,
                textAlign: "center",
              }}
              className='text-gray-900'
            >
              {moment.utc(tooltipData.date).format("DD.MM.YYYY - HH:mm")} (ISO)
            </TooltipWithBounds>
          </div>
        )}
      </div>
    );
  }
);
