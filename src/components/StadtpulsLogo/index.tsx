import { forwardRef } from "react";

const stadtpulsLogo = "/images/stadtpuls-logo.svg";

// eslint-disable-next-line react/display-name
export const StadtpulsLogo = forwardRef<HTMLAnchorElement>((_props, ref) => (
  <a href='/' className='w-max flex items-center' ref={ref}>
    <img src={stadtpulsLogo} alt={"Stadtpuls logo"} className='w-10' />
    <div className='ml-2'>
      <span className='font-bold'>Stadt</span>puls
    </div>
  </a>
));
