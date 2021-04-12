import React from "react";

const DatahubLogo = "/images/datahub-logo.svg";

export const Header: React.FC = () => {
  return (
    <header
      className={[
        "w-full p-4 bg-white shadow-lg z-50",
        "relative",
        "md:sticky md:top-0",
      ].join(" ")}
    >
      <a href='/' className='w-max flex items-center'>
        <img
          src={DatahubLogo}
          alt={"Logo des Berlin IoT Hub"}
          className='w-10'
        />
        <div className='ml-2'>
          <span className='font-bold'>Berlin</span> IoT Hub
        </div>
      </a>
    </header>
  );
};
