import React, { FC } from "react";

export const NUMBER_OF_SENSOR_SYMBOLS = 32;

interface SensorSymbolPropType {
  symbol: number;
  className?: string;
}

export const SensorSymbol: FC<SensorSymbolPropType> = ({ symbol, className }) =>
  symbol <= NUMBER_OF_SENSOR_SYMBOLS && symbol > 0 ? (
    <span className={`${className || ""} inline-block bg-gray-50 w-6 h-6`}>
      <img
        src={`/images/sensor-symbols/${symbol}.svg`}
        alt={`Sensor Symbol ${symbol}`}
      />
    </span>
  ) : null;
