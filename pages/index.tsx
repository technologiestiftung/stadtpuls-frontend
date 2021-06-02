import { LandingHero } from "@components/LandingHero";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <>
      <LandingHero />
      <LandingHowItWorks />
      <LandingProjectAbout />
      <LandingLabAbout />
    </>
  );
};

export default LandingPage;
