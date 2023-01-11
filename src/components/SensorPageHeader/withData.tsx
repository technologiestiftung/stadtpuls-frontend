import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { FC } from "react";
import { SensorPageHeader } from ".";

interface SensorPageHeaderWithDataPropType {
  initialSensor: ParsedSensorType;
}

export const SensorPageHeaderWithData: FC<SensorPageHeaderWithDataPropType> = ({
  initialSensor,
}) => {
  return (
    <SensorPageHeader
      {...initialSensor}
      withEditButton={false}
      onEditButtonClick={() => undefined}
    />
  );
};
