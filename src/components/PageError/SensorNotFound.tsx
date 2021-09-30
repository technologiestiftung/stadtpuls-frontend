import { AnchorButton } from "@components/Button";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import Link from "next/link";
import { FC } from "react";

export const SensorNotFound: FC<{
  sensorId: string | number;
}> = ({ sensorId }) => (
  <SmallModalOverlay
    title='Sensor nicht gefunden'
    footerContent={
      <div className='block w-full text-right'>
        <Link href='/sensors'>
          <AnchorButton href='/sensors'>Zu alle Sensoren</AnchorButton>
        </Link>
      </div>
    }
  >
    {`Sie haben keinen Sensor mit der ID "${sensorId}".`}
  </SmallModalOverlay>
);
