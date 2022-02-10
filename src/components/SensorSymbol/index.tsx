import React, { FC } from "react";

export const NUMBER_OF_SENSOR_SYMBOLS = 32;

const sizeClassesMap = {
  5: "w-5 h-5",
  6: "w-6 h-6",
};

interface SensorSymbolPropType {
  symbol: number;
  className?: string;
  size?: keyof typeof sizeClassesMap;
}

export const SensorSymbol: FC<SensorSymbolPropType> = ({
  symbol,
  className,
  size = 6,
}) =>
  symbol <= NUMBER_OF_SENSOR_SYMBOLS && symbol > 0 ? (
    <span
      className={`${className || ""} inline-block bg-gray-50 ${
        sizeClassesMap[size]
      }}`}
    >
      <img
        src={`/images/sensor-symbols/${symbol}.svg`}
        alt={`Sensor Symbol ${symbol}`}
        className={sizeClassesMap[size]}
      />
    </span>
  ) : null;
