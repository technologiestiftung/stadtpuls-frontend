import React, { FC } from "react";

interface SensorSymbolPropType {
  symbol: number;
  className?: string;
}

export const SensorSymbol: FC<SensorSymbolPropType> = ({ symbol, className }) =>
  symbol <= 32 && symbol > 0 ? (
    <span className={`${className || ""} inline-block bg-gray-50 w-6 h-6`}>
      <img
        src={`/images/sensor-symbols/${symbol}.svg`}
        alt={`Sensor Symbol ${symbol}`}
      />
    </span>
  ) : null;
