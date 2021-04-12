/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import Link from "next/link";
import { jsx, Flex, Heading, Image } from "theme-ui";

const DatahubLogo = "/images/datahub-logo.svg";

export const Header: React.FC = () => {
  return (
    <header
      sx={{
        color: "text",
        bg: "background",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        width: "100%",
        p: 4,
        position: ["relative", "sticky", "sticky"],
        top: "0",
        display: "flex",
        flex: "1 1 auto",
        flexWrap: "wrap",
        justifyContent: "space-between",
        zIndex: 3,
      }}
    >
      <Link href='/'>
        <a sx={{ textDecoration: "none", color: "text", cursor: "pointer" }}>
          <Flex>
            <Image
              src={DatahubLogo}
              alt={"Logo des Berlin IoT Hub"}
              sx={{ width: "56px", height: "100%" }}
            />
            <Heading ml={3} sx={{ lineHeight: "inherit" }} className='text-2xl'>
              Berlin <span sx={{ fontWeight: "normal" }}>IoT Hub</span>
            </Heading>
          </Flex>
        </a>
      </Link>
    </header>
  );
};
