import React, { FC } from "react";
import Image from "next/image";

export const NUMBER_OF_SENSOR_SYMBOLS = 32;

const sizeClassesMap = {
  5: {
    className: "w-5 h-5",
    size: 20,
  },
  6: {
    className: "w-6 h-6",
    size: 24,
  },
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
        sizeClassesMap[size].className
      }}`}
    >
      <Image
        src={`/images/sensor-symbols/${symbol}.svg`}
        alt={`Sensor Symbol ${symbol}`}
        className={sizeClassesMap[size].className}
        width={sizeClassesMap[size].size}
        height={sizeClassesMap[size].size}
      />
    </span>
  ) : null;
