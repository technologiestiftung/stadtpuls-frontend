import { IotHubLogo } from "@components/IotHubLogo";
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header
      className={[
        "w-full p-4 bg-white shadow-lg z-50",
        "relative",
        "md:sticky md:top-0",
      ].join(" ")}
    >
      <Link href='/'>
        <IotHubLogo />
      </Link>
    </header>
  );
};
