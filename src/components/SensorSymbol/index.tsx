import React, { FC } from "react";
import Image from "next/image";

export const NUMBER_OF_SENSOR_SYMBOLS = 32;

const sizeToPixelsMap = {
  5: 20,
  6: 24,
};

interface SensorSymbolPropType {
  symbol: number;
  className?: string;
  size?: keyof typeof sizeToPixelsMap;
}

export const SensorSymbol: FC<SensorSymbolPropType> = ({
  symbol,
  className,
  size = 6,
}) =>
  symbol <= NUMBER_OF_SENSOR_SYMBOLS && symbol > 0 ? (
    <span
      className={`${className || ""} inline-block`}
      style={{
        width: sizeToPixelsMap[size],
        height: sizeToPixelsMap[size],
      }}
    >
      <Image
        src={`/images/sensor-symbols/${symbol}.svg`}
        alt={`Sensor Symbol ${symbol}`}
        className='bg-gray-50'
        width={sizeToPixelsMap[size]}
        height={sizeToPixelsMap[size]}
      />
    </span>
  ) : null;
