import { useCallback } from "react";
import { useThemeUI } from "theme-ui";
import { bisector, extent, max } from "d3-array";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { utcFormat } from "d3-time-format";
import { DateValueType, LineGraphType } from "@common/interfaces";
import { LinePath } from "../LinePath";

import { TooltipWithBounds, withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { Bar, Line } from "@visx/shape";
import { localPoint } from "@visx/event";
import { GridRows as HorizontalGridLines } from "@visx/grid";

const getX = (d: DateValueType): Date => new Date(d.date);
const getY = (d: DateValueType): number => d.value;
// eslint-disable-next-line @typescript-eslint/unbound-method
const bisectDate = bisector<DateValueType, Date>(d => new Date(d.date)).left;
const formatDate = utcFormat("%d.%m.%Y - %H:%M:%S");

const tooltipStyles = {
  ...defaultStyles,
  border: "1px solid white",
  color: "white",
};

delete tooltipStyles.backgroundColor;
delete tooltipStyles.boxShadow;

export const LineChart = withTooltip<LineGraphType, DateValueType>(
  ({
    data,
    width,
    height,
    yAxisUnit,
    xAxisUnit,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: LineGraphType & WithTooltipProvidedProps<DateValueType>) => {
    if (width < 10) return null;

    const context = useThemeUI();
    const { theme } = context;

    const padding = {
      left: 64,
      right: 32,
      top: 32,
      bottom: 80,
    };

    const graphWidth: number = width - padding.left - padding.right;
    const graphHeight: number = height - padding.top - padding.bottom;

    const xScale = scaleUtc<number>({
      domain: extent(data, getX) as [Date, Date],
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
          tooltipLeft: x,
          tooltipTop: yScale(getY(d)),
        });
      },
      [showTooltip, yScale, xScale, data, padding.left]
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
            hideAxisLine={true}
            numTicks={6}
            tickTransform='translate(0 16)'
            tickStroke={
              theme.colors?.lightgrey
                ? String(theme.colors.lightgrey)
                : "inherit"
            }
          />
          <AxisLeft
            scale={yAxis.scale}
            top={padding.top}
            left={padding.left}
            label={yAxisUnit}
            labelOffset={24}
            labelClassName='font-bold'
            hideAxisLine={true}
            hideTicks={true}
            numTicks={4}
            tickStroke={
              theme.colors?.mediumgrey
                ? String(theme.colors.mediumgrey)
                : "inherit"
            }
          />
          {tooltipData && (
            <Group top={padding.top}>
              <Line
                className='stroke-current text-gray-400'
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: graphHeight + 24 }}
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
          <Group left={padding.left} top={padding.top}>
            <LinePath width={graphWidth} height={graphHeight} data={data} />
          </Group>
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
              top={tooltipTop + 10}
              left={tooltipLeft}
              style={tooltipStyles}
              className='bg-blue'
            >
              {`${getY(tooltipData)} ${yAxisUnit ? yAxisUnit : ""}`}
            </TooltipWithBounds>
            <TooltipWithBounds
              top={graphHeight + 28}
              left={tooltipLeft}
              offsetLeft={10}
              style={{
                position: "absolute",
                fontSize: "10px",
                minWidth: 72,
                textAlign: "center",
              }}
              className='text-gray-900'
            >
              {formatDate(getX(tooltipData))}
            </TooltipWithBounds>
          </div>
        )}
      </div>
    );
  }
);
