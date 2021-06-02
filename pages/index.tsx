import { LandingHero } from "@components/LandingHero";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <>
      <LandingHero />
      <LandingHowItWorks />
      <LandingProjectAbout />
    </>
  );
};

export default LandingPage;
