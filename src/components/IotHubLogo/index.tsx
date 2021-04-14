import { forwardRef } from "react";

const DatahubLogo = "/images/datahub-logo.svg";

// eslint-disable-next-line react/display-name
export const IotHubLogo = forwardRef<HTMLAnchorElement>((_props, ref) => (
  <a href='/' className='w-max flex items-center' ref={ref}>
    <img src={DatahubLogo} alt={"Logo des Berlin IoT Hub"} className='w-10' />
    <div className='ml-2'>
      <span className='font-bold'>Berlin</span> IoT Hub
    </div>
  </a>
));
